"use client";

import { useMemo } from "react";
import type {
    AuthorDTO,
    CategoryDto,
    ClubMemberReadDto,
    ComplaintsReadDto,
    OrderDTO,
    ProductDto,
    ReviewDto,
} from "@/lib/api/generated";
import AnalyticsKpiCard from "./AnalyticsKpiCard";
import AnalyticsDonutCard from "./AnalyticsDonutCard";
import ManagerPeriodPicker from "./ManagerPeriodPicker";
import ManagerSalesBarChart from "./ManagerSalesBarChart";
import ManagerTopSalesList from "./ManagerTopSalesList";
import ManagerActiveUsersList from "./ManagerActiveUsersList";
import ManagerReviewsBreakdown from "./ManagerReviewsBreakdown";
import {
    type AnalyticsPeriod,
    formatNumber,
    formatPercent,
    formatUah,
    periodCompareLabel,
} from "../utils/analyticsPeriod";
import {
    buildManagerBarSeries,
    buildManagerCategoryDonut,
    buildManagerKpi,
    buildManagerTopBooks,
    buildMostActiveUsers,
    buildReviewRatingBreakdown,
} from "../utils/buildManagerAnalytics";

type Props = {
    members: ClubMemberReadDto[];
    orders: OrderDTO[];
    products: ProductDto[];
    authors: AuthorDTO[];
    categories: CategoryDto[];
    reviews: ReviewDto[];
    complaints: ComplaintsReadDto[];
    period: AnalyticsPeriod;
    onPeriodChange: (period: AnalyticsPeriod) => void;
    isLoading?: boolean;
};

const ICON = {
    orders: "/images/admin_manager/desktop/shopping-cart-solid-full 1.svg",
    sales: "/images/admin_manager/desktop/wallet-solid-full (1) 1.svg",
    books: "/images/admin_manager/desktop/book-solid-full 2.svg",
    users: "/images/admin_manager/desktop/user-group-solid-full 1.svg",
    complaints: "/images/admin_manager/desktop/chart-simple-solid-full 1.svg",
};

export default function ManagerAnalyticsPanel({
    members,
    orders,
    products,
    authors,
    categories,
    reviews,
    complaints,
    period,
    onPeriodChange,
    isLoading = false,
}: Props) {
    const compareLabel = periodCompareLabel(period);

    const kpi = useMemo(
        () => buildManagerKpi(members, orders, complaints, period),
        [members, orders, complaints, period]
    );
    const categoryDonut = useMemo(
        () => buildManagerCategoryDonut(orders, products, categories, period),
        [orders, products, categories, period]
    );
    const barSeries = useMemo(
        () => buildManagerBarSeries(orders, period),
        [orders, period]
    );
    const topBooks = useMemo(
        () => buildManagerTopBooks(orders, products, authors, period, 4),
        [orders, products, authors, period]
    );
    const activeUsers = useMemo(
        () => buildMostActiveUsers(orders, members, period, 4),
        [orders, members, period]
    );
    const reviewStats = useMemo(
        () => buildReviewRatingBreakdown(reviews),
        [reviews]
    );

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1F1F1F]">
                        Аналітика
                    </h1>
                    <p className="text-[14px] text-[#6B6B6B] mt-1 max-w-xl">
                        Огляд ключових показників магазину та активності
                        користувачів
                    </p>
                </div>
                <ManagerPeriodPicker
                    period={period}
                    onPeriodChange={onPeriodChange}
                />
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                <AnalyticsKpiCard
                    title="Замовлень"
                    value={formatNumber(kpi.orders)}
                    delta={`${formatPercent(kpi.ordersDelta, 0)} ${compareLabel}`}
                    deltaPositive={kpi.ordersDelta >= 0}
                    icon={ICON.orders}
                    isLoading={isLoading}
                />
                <AnalyticsKpiCard
                    title="Продажів"
                    value={formatUah(kpi.sales)}
                    delta={`${formatPercent(kpi.salesDelta, 0)} ${compareLabel}`}
                    deltaPositive={kpi.salesDelta >= 0}
                    icon={ICON.sales}
                    isLoading={isLoading}
                />
                <AnalyticsKpiCard
                    title="Книг продано"
                    value={`${formatNumber(kpi.booksSold)} шт.`}
                    delta={`${formatPercent(kpi.booksSoldDelta, 0)} ${compareLabel}`}
                    deltaPositive={kpi.booksSoldDelta >= 0}
                    icon={ICON.books}
                    isLoading={isLoading}
                />
                <AnalyticsKpiCard
                    title="Нових користувачів"
                    value={formatNumber(kpi.newUsers)}
                    delta={`${formatNumber(kpi.newUsersToday)} нових`}
                    deltaPositive
                    icon={ICON.users}
                    isLoading={isLoading}
                />
                <AnalyticsKpiCard
                    title="Скарги"
                    value={formatNumber(kpi.complaints)}
                    delta={
                        kpi.complaintsDelta === 0
                            ? compareLabel.charAt(0).toUpperCase() +
                              compareLabel.slice(1)
                            : `${formatPercent(kpi.complaintsDelta, 0)} ${compareLabel}`
                    }
                    deltaPositive={kpi.complaintsDelta <= 0}
                    icon={ICON.complaints}
                    isLoading={isLoading}
                />
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <AnalyticsDonutCard
                    title="Продажі за категоріями"
                    slices={categoryDonut.slices}
                    centerPrimary={formatUah(categoryDonut.total)}
                    centerSecondary="За період"
                    valueAsMoney
                    isLoading={isLoading}
                />
                <ManagerSalesBarChart
                    points={barSeries}
                    isLoading={isLoading}
                />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ManagerTopSalesList items={topBooks} isLoading={isLoading} />
                <ManagerActiveUsersList
                    users={activeUsers}
                    isLoading={isLoading}
                />
                <ManagerReviewsBreakdown
                    buckets={reviewStats.buckets}
                    total={reviewStats.total}
                    isLoading={isLoading}
                />
            </section>
        </div>
    );
}
