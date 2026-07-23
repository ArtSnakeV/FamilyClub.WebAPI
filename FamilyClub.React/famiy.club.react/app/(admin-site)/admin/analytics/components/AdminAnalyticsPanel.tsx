"use client";

import { useMemo } from "react";
import type {
    AuthorDTO,
    CategoryDto,
    ClubMemberReadDto,
    OrderDTO,
    ProductDto,
    ReviewDto,
} from "@/lib/api/generated";
import AnalyticsKpiCard from "./AnalyticsKpiCard";
import PeriodFilterBar from "./PeriodFilterBar";
import { DualLineChartCard, LineChartCard } from "./AnalyticsCharts";
import AnalyticsDonutCard from "./AnalyticsDonutCard";
import TopBooksRevenueList from "./TopBooksRevenueList";
import BottomMetricsBar from "./BottomMetricsBar";
import {
    type AnalyticsPeriod,
    formatNumber,
    formatPercent,
    formatUah,
} from "../utils/analyticsPeriod";
import {
    buildBottomMetrics,
    buildGenreSalesDonut,
    buildKpiMetrics,
    buildOrderStatusDonut,
    buildRegistrationOrdersSeries,
    buildSalesSeries,
    buildTopBooksWithRevenue,
} from "../utils/buildAnalyticsMetrics";

type Props = {
    members: ClubMemberReadDto[];
    orders: OrderDTO[];
    products: ProductDto[];
    authors: AuthorDTO[];
    categories: CategoryDto[];
    reviews: ReviewDto[];
    period: AnalyticsPeriod;
    onPeriodChange: (period: AnalyticsPeriod) => void;
    isLoading?: boolean;
};

const ICON = {
    users: "/images/admin_manager/desktop/user-group-solid-full 1.svg",
    newUsers: "/images/admin_manager/desktop/user-solid-full (4) 1.svg",
    sales: "/images/admin_manager/desktop/tag-solid-full (1) 1.svg",
    orders: "/images/admin_manager/desktop/shopping-cart-solid-full 1.svg",
    returns: "/images/admin_manager/desktop/reply-solid-full 1.svg",
};

export default function AdminAnalyticsPanel({
    members,
    orders,
    products,
    authors,
    categories,
    reviews,
    period,
    onPeriodChange,
    isLoading,
}: Props) {
    const kpi = useMemo(
        () => buildKpiMetrics(members, orders, period),
        [members, orders, period]
    );
    const dualSeries = useMemo(
        () => buildRegistrationOrdersSeries(members, orders, period),
        [members, orders, period]
    );
    const salesSeries = useMemo(
        () => buildSalesSeries(orders, period),
        [orders, period]
    );
    const genreDonut = useMemo(
        () => buildGenreSalesDonut(orders, products, categories, period),
        [orders, products, categories, period]
    );
    const statusDonut = useMemo(
        () => buildOrderStatusDonut(orders, period),
        [orders, period]
    );
    const topBooks = useMemo(
        () => buildTopBooksWithRevenue(orders, products, authors, period, 4),
        [orders, products, authors, period]
    );
    const bottom = useMemo(
        () => buildBottomMetrics(members, orders, reviews, products, period),
        [members, orders, reviews, products, period]
    );

    const granularityLabel =
        period === "180d" || period === "365d"
            ? "Статистика: Місяці"
            : "Статистика: Дні";

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-[#1F1F1F]">Аналітика</h1>

            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                <AnalyticsKpiCard
                    title="Всього кор."
                    value={formatNumber(kpi.totalUsers)}
                    delta={formatPercent(kpi.totalUsersDelta)}
                    deltaPositive={kpi.totalUsersDelta >= 0}
                    icon={ICON.users}
                    isLoading={isLoading}
                />
                <AnalyticsKpiCard
                    title="Нові кор."
                    value={formatNumber(kpi.newUsers)}
                    delta={formatPercent(kpi.newUsersDelta)}
                    deltaPositive={kpi.newUsersDelta >= 0}
                    icon={ICON.newUsers}
                    isLoading={isLoading}
                />
                <AnalyticsKpiCard
                    title="Продажі"
                    value={formatNumber(kpi.sales)}
                    delta={`+${formatNumber(kpi.salesWeekDelta)} за тиждень`}
                    deltaPositive
                    icon={ICON.sales}
                    isLoading={isLoading}
                />
                <AnalyticsKpiCard
                    title="Замовлення"
                    value={formatNumber(kpi.orders)}
                    delta={formatPercent(kpi.ordersDelta)}
                    deltaPositive={kpi.ordersDelta >= 0}
                    icon={ICON.orders}
                    isLoading={isLoading}
                />
                <AnalyticsKpiCard
                    title="Повернення"
                    value={formatNumber(kpi.returns)}
                    delta={formatPercent(kpi.returnsDelta)}
                    deltaPositive={kpi.returnsDelta >= 0}
                    icon={ICON.returns}
                    isLoading={isLoading}
                />
            </section>

            <PeriodFilterBar
                period={period}
                onPeriodChange={onPeriodChange}
                granularityLabel={granularityLabel}
            />

            <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <DualLineChartCard
                    title="Динаміка реєстрації та замовлень"
                    points={dualSeries}
                    isLoading={isLoading}
                />
                <LineChartCard
                    title="Продажі"
                    points={salesSeries}
                    legend="Сума продажів (грн)"
                    isLoading={isLoading}
                />
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <AnalyticsDonutCard
                    title="Топ жанрів за продажами"
                    slices={genreDonut.slices}
                    centerPrimary={formatUah(genreDonut.total)}
                    centerSecondary="Загальний дохід"
                    footerHref="/admin/books"
                    footerLabel="Переглянути всі жанри"
                    valueAsMoney
                    isLoading={isLoading}
                />
                <AnalyticsDonutCard
                    title="Замовлення за статусами"
                    slices={statusDonut.slices}
                    centerPrimary={formatNumber(statusDonut.total)}
                    centerSecondary="Замовлень"
                    footerHref="/admin/orders"
                    footerLabel="Переглянути деталі"
                    isLoading={isLoading}
                />
            </section>

            <TopBooksRevenueList items={topBooks} isLoading={isLoading} />

            <BottomMetricsBar
                isLoading={isLoading}
                metrics={[
                    {
                        title: "Конверсія покупок",
                        value: `${bottom.conversion.toFixed(2)}%`,
                        delta: formatPercent(bottom.conversionDelta),
                        subtitle: "Відвідувачі → замовлення",
                        positive: true,
                    },
                    {
                        title: "Частка повернень",
                        value: `${bottom.returnRate.toFixed(2)}%`,
                        delta: formatPercent(bottom.returnRateDelta),
                        subtitle: "Від загальної кількості",
                        positive: true,
                    },
                    {
                        title: "Середня оцінка книг",
                        value: bottom.avgRating > 0 ? bottom.avgRating.toFixed(1) : "—",
                        delta: formatPercent(bottom.avgRatingDelta),
                        subtitle: "На основі відгуків",
                        positive: true,
                    },
                    {
                        title: "Публікації видань",
                        value: formatNumber(bottom.newspaperCount),
                        delta: formatPercent(bottom.newspaperDelta),
                        subtitle: "За період",
                        positive: bottom.newspaperDelta >= 0,
                    },
                ]}
            />
        </div>
    );
}
