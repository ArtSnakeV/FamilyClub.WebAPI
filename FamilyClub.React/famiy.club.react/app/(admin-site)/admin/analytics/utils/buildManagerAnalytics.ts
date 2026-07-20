import type {
    AuthorDTO,
    CategoryDto,
    ClubMemberReadDto,
    ComplaintsReadDto,
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
import {
    buildGenreSalesDonut,
    type ChartPoint,
    type DonutSlice,
    type TopBookRevenue,
} from "./buildAnalyticsMetrics";

function isCountableOrder(order: OrderDTO): boolean {
    if (!order.orderDate) return false;
    return normalizeOrderStatusGroup(order.status) !== "cancelled";
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

function getMemberCreatedAt(member: ClubMemberReadDto): Date | null {
    const raw =
        (member as { createdAt?: string | Date | null }).createdAt ??
        (member as { CreatedAt?: string | Date | null }).CreatedAt ??
        null;
    if (!raw) return null;
    const d = new Date(raw);
    return Number.isNaN(d.getTime()) ? null : d;
}

function countBooksSold(orders: OrderDTO[]): number {
    let total = 0;
    for (const order of orders) {
        if (!isCountableOrder(order)) continue;
        for (const item of order.orderItems ?? []) {
            total += item.quantity ?? 1;
        }
    }
    return total;
}

export type ManagerKpi = {
    orders: number;
    ordersDelta: number;
    sales: number;
    salesDelta: number;
    booksSold: number;
    booksSoldDelta: number;
    newUsers: number;
    newUsersToday: number;
    complaints: number;
    complaintsDelta: number;
};

export function buildManagerKpi(
    members: ClubMemberReadDto[],
    orders: OrderDTO[],
    complaints: ComplaintsReadDto[],
    period: AnalyticsPeriod
): ManagerKpi {
    const now = new Date();
    const start = periodStart(period, now);
    const end = startOfDay(now);
    end.setHours(23, 59, 59, 999);
    const prev = previousPeriodRange(period, now);

    const currentOrders = filterOrdersInPeriod(orders, start, end).filter(
        isCountableOrder
    );
    const prevOrders = filterOrdersInPeriod(orders, prev.start, prev.end).filter(
        isCountableOrder
    );

    const salesCurrent = currentOrders.reduce(
        (s, o) => s + (o.totalPrice ?? 0),
        0
    );
    const salesPrevious = prevOrders.reduce(
        (s, o) => s + (o.totalPrice ?? 0),
        0
    );

    const booksCurrent = countBooksSold(currentOrders);
    const booksPrevious = countBooksSold(prevOrders);

    const membersWithDate = members
        .map((m) => ({ m, created: getMemberCreatedAt(m) }))
        .filter((x) => x.created);

    const newUsers =
        membersWithDate.length > 0
            ? membersWithDate.filter((x) => inRange(x.created!, start, end))
                  .length
            : Math.min(members.length, Math.round(members.length * 0.05));

    const todayKey = localDayKey(now);
    const newUsersToday =
        membersWithDate.length > 0
            ? membersWithDate.filter((x) => localDayKey(x.created!) === todayKey)
                  .length
            : Math.min(5, newUsers);

    const complaintsCurrent = complaints.filter((c) => {
        if (!c.createdAt) return false;
        return inRange(new Date(c.createdAt), start, end);
    }).length;
    const complaintsPrevious = complaints.filter((c) => {
        if (!c.createdAt) return false;
        return inRange(new Date(c.createdAt), prev.start, prev.end);
    }).length;

    return {
        orders: currentOrders.length,
        ordersDelta: percentChange(currentOrders.length, prevOrders.length),
        sales: salesCurrent,
        salesDelta: percentChange(salesCurrent, salesPrevious),
        booksSold: booksCurrent,
        booksSoldDelta: percentChange(booksCurrent, booksPrevious),
        newUsers,
        newUsersToday,
        complaints: complaintsCurrent,
        complaintsDelta: percentChange(complaintsCurrent, complaintsPrevious),
    };
}

export function buildManagerBarSeries(
    orders: OrderDTO[],
    period: AnalyticsPeriod
): ChartPoint[] {
    const useMonths = period === "180d" || period === "365d";
    const today = startOfDay(new Date());

    if (useMonths) {
        const months = period === "180d" ? 6 : 12;
        const points: ChartPoint[] = [];
        for (let i = months - 1; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const next = new Date(
                today.getFullYear(),
                today.getMonth() - i + 1,
                1
            );
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

    const days =
        period === "7d" ? 7 : period === "30d" ? 30 : 14;
    const labelEvery = days > 10 ? 3 : undefined;
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

export function buildManagerCategoryDonut(
    orders: OrderDTO[],
    products: ProductDto[],
    categories: CategoryDto[],
    period: AnalyticsPeriod
): { slices: DonutSlice[]; total: number } {
    return buildGenreSalesDonut(orders, products, categories, period, 5);
}

export function buildManagerTopBooks(
    orders: OrderDTO[],
    products: ProductDto[],
    authors: AuthorDTO[],
    period: AnalyticsPeriod,
    limit = 4
): TopBookRevenue[] {
    const start = periodStart(period);
    const end = new Date();
    const periodOrders = filterOrdersInPeriod(orders, start, end);
    const productMap = new Map(
        products.filter((p) => p.id != null).map((p) => [p.id as number, p])
    );
    const qty = new Map<number, number>();

    for (const order of periodOrders) {
        if (!isCountableOrder(order)) continue;
        for (const item of order.orderItems ?? []) {
            if (item.productId == null) continue;
            const q = item.quantity ?? 1;
            qty.set(item.productId, (qty.get(item.productId) ?? 0) + q);
        }
    }

    return [...qty.entries()]
        .sort((a, b) => b[1] - a[1])
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
                revenue: 0,
            };
        });
}

export type ActiveUserRow = {
    userId: string;
    name: string;
    avatarData: string | null;
    orderCount: number;
};

export function buildMostActiveUsers(
    orders: OrderDTO[],
    members: ClubMemberReadDto[],
    period: AnalyticsPeriod,
    limit = 4
): ActiveUserRow[] {
    const start = periodStart(period);
    const end = new Date();
    const periodOrders = filterOrdersInPeriod(orders, start, end).filter(
        isCountableOrder
    );
    const counts = new Map<string, number>();

    for (const order of periodOrders) {
        if (!order.userId) continue;
        counts.set(order.userId, (counts.get(order.userId) ?? 0) + 1);
    }

    const memberMap = new Map(
        members.filter((m) => m.id).map((m) => [m.id as string, m])
    );

    return [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([userId, orderCount]) => {
            const member = memberMap.get(userId);
            const first = member?.name?.trim() ?? "";
            const last = member?.surname?.trim() ?? "";
            const display =
                first || last
                    ? `${first}${last ? ` ${last.charAt(0)}.` : ""}`.trim()
                    : member?.email?.split("@")[0] ?? `Користувач`;
            return {
                userId,
                name: display,
                avatarData: member?.avatarData ?? null,
                orderCount,
            };
        });
}

export type RatingBucket = {
    stars: number;
    count: number;
};

export function buildReviewRatingBreakdown(
    reviews: ReviewDto[]
): { buckets: RatingBucket[]; total: number } {
    const counts = [0, 0, 0, 0, 0];
    for (const review of reviews) {
        const r = review.rating;
        if (typeof r === "number" && r >= 1 && r <= 5) {
            counts[r - 1] += 1;
        }
    }
    const buckets: RatingBucket[] = [5, 4, 3, 2, 1].map((stars) => ({
        stars,
        count: counts[stars - 1],
    }));
    const total = buckets.reduce((s, b) => s + b.count, 0);
    return { buckets, total };
}
