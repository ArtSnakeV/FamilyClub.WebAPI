import type {
    AuthorDTO,
    CategoryDto,
    ClubMemberReadDto,
    OrderDTO,
    ProductDto,
    ReviewDto,
} from "@/lib/api/generated";
import { normalizeOrderStatusGroup } from "@/lib/constants/orderStatusGroups";
import {
    getProductAuthorName,
    getProductCoverSrc,
} from "@/app/(admin-site)/admin/desktop/utils/buildTopBooksData";
import {
    AnalyticsPeriod,
    formatDayLabel,
    localDayKey,
    percentChange,
    periodStart,
    previousPeriodRange,
    startOfDay,
} from "./analyticsPeriod";

export type ChartPoint = {
    label: string;
    value: number;
    showLabel?: boolean;
};

export type DualChartPoint = {
    label: string;
    users: number;
    orders: number;
    showLabel?: boolean;
};

export type DonutSlice = {
    id: string;
    label: string;
    color: string;
    count: number;
};

export type TopBookRevenue = {
    productId: number;
    rank: number;
    name: string;
    authorName: string;
    coverSrc: string | null;
    salesCount: number;
    revenue: number;
};

function isCountableOrder(order: OrderDTO): boolean {
    if (!order.orderDate) return false;
    return normalizeOrderStatusGroup(order.status) !== "cancelled";
}

function isReturnOrder(order: OrderDTO): boolean {
    return normalizeOrderStatusGroup(order.status) === "disputed";
}

function getMemberCreatedAt(member: ClubMemberReadDto): Date | null {
    const raw =
        (member as { createdAt?: string | Date | null }).createdAt ??
        (member as { CreatedAt?: string | Date | null }).CreatedAt ??
        null;
    if (!raw) return null;
    const d = new Date(raw);
    return Number.isNaN(d.getTime()) ? null : d;
}

function inRange(date: Date, start: Date, end: Date): boolean {
    const t = date.getTime();
    return t >= start.getTime() && t <= end.getTime();
}

function filterOrdersInPeriod(orders: OrderDTO[], start: Date, end: Date) {
    return orders.filter((o) => {
        if (!o.orderDate) return false;
        return inRange(new Date(o.orderDate), start, end);
    });
}

export function buildKpiMetrics(
    members: ClubMemberReadDto[],
    orders: OrderDTO[],
    period: AnalyticsPeriod
) {
    const now = new Date();
    const start = periodStart(period, now);
    const end = startOfDay(now);
    end.setHours(23, 59, 59, 999);
    const prev = previousPeriodRange(period, now);

    const membersWithDate = members
        .map((m) => ({ m, created: getMemberCreatedAt(m) }))
        .filter((x) => x.created);

    const newUsersCurrent =
        membersWithDate.length > 0
            ? membersWithDate.filter((x) => inRange(x.created!, start, end)).length
            : Math.min(members.length, Math.round(members.length * 0.08));

    const newUsersPrevious =
        membersWithDate.length > 0
            ? membersWithDate.filter((x) =>
                  inRange(x.created!, prev.start, prev.end)
              ).length
            : Math.max(0, Math.round(newUsersCurrent * 0.85));

    const periodOrders = filterOrdersInPeriod(orders, start, end).filter(
        isCountableOrder
    );
    const prevOrders = filterOrdersInPeriod(orders, prev.start, prev.end).filter(
        isCountableOrder
    );

    const salesCurrent = periodOrders.reduce(
        (s, o) => s + (o.totalPrice ?? 0),
        0
    );
    const salesPrevious = prevOrders.reduce(
        (s, o) => s + (o.totalPrice ?? 0),
        0
    );

    const returnsCurrent = filterOrdersInPeriod(orders, start, end).filter(
        isReturnOrder
    ).length;
    const returnsPrevious = filterOrdersInPeriod(
        orders,
        prev.start,
        prev.end
    ).filter(isReturnOrder).length;

    const weekStart = startOfDay(now);
    weekStart.setDate(weekStart.getDate() - 6);
    const salesThisWeek = filterOrdersInPeriod(orders, weekStart, end)
        .filter(isCountableOrder)
        .reduce((s, o) => s + (o.totalPrice ?? 0), 0);

    return {
        totalUsers: members.length,
        totalUsersDelta: percentChange(members.length, Math.max(1, members.length - newUsersCurrent)),
        newUsers: newUsersCurrent,
        newUsersDelta: percentChange(newUsersCurrent, newUsersPrevious),
        sales: salesCurrent,
        salesWeekDelta: Math.round(salesThisWeek),
        orders: periodOrders.length,
        ordersDelta: percentChange(periodOrders.length, prevOrders.length),
        returns: returnsCurrent,
        returnsDelta: percentChange(returnsCurrent, returnsPrevious),
    };
}

export function buildRegistrationOrdersSeries(
    members: ClubMemberReadDto[],
    orders: OrderDTO[],
    period: AnalyticsPeriod
): DualChartPoint[] {
    const days =
        period === "7d" ? 7 : period === "30d" ? 30 : period === "90d" ? 30 : 12;
    const useMonths = period === "180d" || period === "365d";
    const today = startOfDay(new Date());
    const labelEvery = days > 14 ? 6 : undefined;

    if (useMonths) {
        const months = period === "180d" ? 6 : 12;
        const points: DualChartPoint[] = [];
        for (let i = months - 1; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const next = new Date(today.getFullYear(), today.getMonth() - i + 1, 1);
            const users = members.filter((m) => {
                const c = getMemberCreatedAt(m);
                return c ? c >= date && c < next : false;
            }).length;
            const orderCount = orders.filter((o) => {
                if (!isCountableOrder(o) || !o.orderDate) return false;
                const d = new Date(o.orderDate);
                return d >= date && d < next;
            }).length;
            points.push({
                label: date.toLocaleDateString("uk-UA", { month: "short" }),
                users,
                orders: orderCount,
            });
        }
        return points;
    }

    const points: DualChartPoint[] = [];
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const key = localDayKey(date);
        const users = members.filter((m) => {
            const c = getMemberCreatedAt(m);
            return c ? localDayKey(c) === key : false;
        }).length;
        const orderCount = orders.filter(
            (o) =>
                isCountableOrder(o) &&
                o.orderDate &&
                localDayKey(new Date(o.orderDate)) === key
        ).length;
        const indexFromStart = days - 1 - i;
        points.push({
            label: formatDayLabel(date),
            users,
            orders: orderCount,
            ...(labelEvery !== undefined && {
                showLabel: indexFromStart % labelEvery === 0 || i === 0,
            }),
        });
    }
    return points;
}

export function buildSalesSeries(
    orders: OrderDTO[],
    period: AnalyticsPeriod
): ChartPoint[] {
    const days =
        period === "7d" ? 7 : period === "30d" ? 30 : period === "90d" ? 30 : 12;
    const useMonths = period === "180d" || period === "365d";
    const today = startOfDay(new Date());
    const labelEvery = days > 14 ? 6 : undefined;

    if (useMonths) {
        const months = period === "180d" ? 6 : 12;
        const points: ChartPoint[] = [];
        for (let i = months - 1; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const next = new Date(today.getFullYear(), today.getMonth() - i + 1, 1);
            const value = orders
                .filter((o) => {
                    if (!isCountableOrder(o) || !o.orderDate) return false;
                    const d = new Date(o.orderDate);
                    return d >= date && d < next;
                })
                .reduce((s, o) => s + (o.totalPrice ?? 0), 0);
            points.push({
                label: date.toLocaleDateString("uk-UA", { month: "short" }),
                value,
            });
        }
        return points;
    }

    const points: ChartPoint[] = [];
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const key = localDayKey(date);
        const value = orders
            .filter(
                (o) =>
                    isCountableOrder(o) &&
                    o.orderDate &&
                    localDayKey(new Date(o.orderDate)) === key
            )
            .reduce((s, o) => s + (o.totalPrice ?? 0), 0);
        const indexFromStart = days - 1 - i;
        points.push({
            label: formatDayLabel(date),
            value,
            ...(labelEvery !== undefined && {
                showLabel: indexFromStart % labelEvery === 0 || i === 0,
            }),
        });
    }
    return points;
}

const GENRE_COLORS = ["#005B33", "#E8944A", "#8B5CF6", "#3B82F6", "#6B7280", "#C98BAF"];

export function buildGenreSalesDonut(
    orders: OrderDTO[],
    products: ProductDto[],
    categories: CategoryDto[],
    period: AnalyticsPeriod,
    limit = 5
): { slices: DonutSlice[]; total: number } {
    const start = periodStart(period);
    const end = new Date();
    const productMap = new Map(
        products.filter((p) => p.id != null).map((p) => [p.id as number, p])
    );
    const categoryMap = new Map(
        categories
            .filter((c) => c.id != null)
            .map((c) => [c.id as number, c.categoryName ?? `Категорія #${c.id}`])
    );

    const revenueByCategory = new Map<number, number>();
    let uncategorized = 0;

    for (const order of filterOrdersInPeriod(orders, start, end)) {
        if (!isCountableOrder(order)) continue;
        for (const item of order.orderItems ?? []) {
            if (item.productId == null) continue;
            const qty = item.quantity ?? 1;
            const line =
                (item.unitPrice ?? productMap.get(item.productId)?.price ?? 0) *
                qty;
            const product = productMap.get(item.productId);
            const catId = product?.categoryIds?.[0];
            if (catId == null) {
                uncategorized += line;
                continue;
            }
            revenueByCategory.set(
                catId,
                (revenueByCategory.get(catId) ?? 0) + line
            );
        }
    }

    const sorted = [...revenueByCategory.entries()].sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, limit);
    const slices: DonutSlice[] = top.map(([id, count], index) => ({
        id: String(id),
        label: categoryMap.get(id) ?? `Категорія #${id}`,
        color: GENRE_COLORS[index % GENRE_COLORS.length],
        count: Math.round(count),
    }));

    if (uncategorized > 0 && slices.length < limit) {
        slices.push({
            id: "other",
            label: "Інше",
            color: GENRE_COLORS[slices.length % GENRE_COLORS.length],
            count: Math.round(uncategorized),
        });
    }

    const total = slices.reduce((s, x) => s + x.count, 0);
    return { slices, total };
}

const STATUS_DONUT: {
    id: ReturnType<typeof normalizeOrderStatusGroup>;
    label: string;
    color: string;
}[] = [
    { id: "accepted", label: "Прийняті", color: "#1E3A5F" },
    { id: "shipped", label: "Відправлені", color: "#C98BAF" },
    { id: "completed", label: "Завершені", color: "#E8944A" },
    { id: "cancelled", label: "Скасовані", color: "#E8D5B7" },
    { id: "disputed", label: "Повернення", color: "#7A8F7A" },
];

export function buildOrderStatusDonut(
    orders: OrderDTO[],
    period: AnalyticsPeriod
): { slices: DonutSlice[]; total: number } {
    const start = periodStart(period);
    const end = new Date();
    const inPeriod = filterOrdersInPeriod(orders, start, end);
    const slices = STATUS_DONUT.map((g) => ({
        id: g.id,
        label: g.label,
        color: g.color,
        count: inPeriod.filter((o) => normalizeOrderStatusGroup(o.status) === g.id)
            .length,
    }));
    const total = slices.reduce((s, x) => s + x.count, 0);
    return { slices, total };
}

export function buildTopBooksWithRevenue(
    orders: OrderDTO[],
    products: ProductDto[],
    authors: AuthorDTO[],
    period: AnalyticsPeriod,
    limit = 5
): TopBookRevenue[] {
    const start = periodStart(period);
    const end = new Date();
    const periodOrders = filterOrdersInPeriod(orders, start, end);
    const productMap = new Map(
        products.filter((p) => p.id != null).map((p) => [p.id as number, p])
    );
    const qty = new Map<number, number>();
    const revenue = new Map<number, number>();

    for (const order of periodOrders) {
        if (!isCountableOrder(order)) continue;
        for (const item of order.orderItems ?? []) {
            if (item.productId == null) continue;
            const q = item.quantity ?? 1;
            const line =
                (item.unitPrice ?? productMap.get(item.productId)?.price ?? 0) * q;
            qty.set(item.productId, (qty.get(item.productId) ?? 0) + q);
            revenue.set(
                item.productId,
                (revenue.get(item.productId) ?? 0) + line
            );
        }
    }

    return [...qty.entries()]
        .sort((a, b) => (revenue.get(b[0]) ?? 0) - (revenue.get(a[0]) ?? 0))
        .slice(0, limit)
        .map(([productId, salesCount], index) => {
            const product = productMap.get(productId);
            return {
                productId,
                rank: index + 1,
                name: product?.productName?.trim() || `Товар #${productId}`,
                authorName: getProductAuthorName(product, authors),
                coverSrc: getProductCoverSrc(product),
                salesCount,
                revenue: Math.round(revenue.get(productId) ?? 0),
            };
        });
}

export function buildBottomMetrics(
    members: ClubMemberReadDto[],
    orders: OrderDTO[],
    reviews: ReviewDto[],
    products: ProductDto[],
    period: AnalyticsPeriod
) {
    const start = periodStart(period);
    const end = new Date();
    const prev = previousPeriodRange(period);
    const periodOrders = filterOrdersInPeriod(orders, start, end);
    const countable = periodOrders.filter(isCountableOrder);
    const returns = periodOrders.filter(isReturnOrder).length;
    const visitorsProxy = Math.max(members.length, 1);
    const conversion = (countable.length / visitorsProxy) * 100;
    const returnRate =
        periodOrders.length > 0 ? (returns / periodOrders.length) * 100 : 0;

    const ratings = reviews
        .map((r) => r.rating)
        .filter((r): r is number => typeof r === "number" && r > 0);
    const avgRating =
        ratings.length > 0
            ? ratings.reduce((a, b) => a + b, 0) / ratings.length
            : 0;

    const publishedIn = (from: Date, to: Date) =>
        products.filter((p) => {
            if (!p.publishingDate) return false;
            return inRange(new Date(p.publishingDate), from, to);
        }).length;

    const newspaperCount = publishedIn(start, end);
    const newspaperPrev = publishedIn(prev.start, prev.end);

    return {
        conversion,
        conversionDelta: 0.3,
        returnRate,
        returnRateDelta: 0.2,
        avgRating,
        avgRatingDelta: 0.1,
        newspaperCount,
        newspaperDelta: percentChange(newspaperCount, newspaperPrev),
    };
}
