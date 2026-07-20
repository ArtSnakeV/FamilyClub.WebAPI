"use client";

import { useEffect, useMemo, useState } from "react";
import type {
    ClubMemberReadDto,
    ComplaintsReadDto,
} from "@/lib/api/generated";
import AnalyticsKpiCard from "@/app/(admin-site)/admin/analytics/components/AnalyticsKpiCard";
import AnalyticsDonutCard from "@/app/(admin-site)/admin/analytics/components/AnalyticsDonutCard";
import {
    formatNumber,
    formatPercent,
} from "@/app/(admin-site)/admin/analytics/utils/analyticsPeriod";
import {
    buildComplaintDynamics,
    buildComplaintKpis,
    buildComplaintTypeSlices,
    buildManagersWorkload,
} from "../utils/buildComplaintsMetrics";
import {
    DEFAULT_COMPLAINTS_FILTERS,
    filterComplaints,
    sortComplaintsNewest,
    type ComplaintsFilterState,
} from "../utils/filterComplaints";
import ComplaintDynamicsChart from "./ComplaintDynamicsChart";
import ComplaintsFiltersBar from "./ComplaintsFiltersBar";
import ComplaintsTable from "./ComplaintsTable";
import ManagersWorkloadPanel from "./ManagersWorkloadPanel";
import RecentComplaintsResponses from "./RecentComplaintsResponses";

type Props = {
    complaints: ComplaintsReadDto[];
    members: ClubMemberReadDto[];
    managers: ClubMemberReadDto[];
    isLoading?: boolean;
};

const ICON = {
    total: "/images/admin_manager/desktop/chart-simple-solid-full 1.svg",
    review: "/images/admin_manager/desktop/clock-regular-full 1.svg",
    resolved: "/images/admin_manager/desktop/calendar-check-solid-full 1.svg",
    rejected: "/images/admin_manager/desktop/ban-solid-full (2) 1.svg",
    overdue: "/images/admin_manager/desktop/heart-pulse-solid-full 1.svg",
    time: "/images/admin_manager/desktop/clock-solid-full 1.svg",
};

export default function AdminComplaintsPanel({
    complaints,
    members,
    managers,
    isLoading = false,
}: Props) {
    const [filters, setFilters] = useState<ComplaintsFilterState>(
        DEFAULT_COMPLAINTS_FILTERS
    );
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [filters]);

    const kpi = useMemo(() => buildComplaintKpis(complaints), [complaints]);
    const dynamics = useMemo(
        () => buildComplaintDynamics(complaints, 30),
        [complaints]
    );
    const typeDonut = useMemo(
        () => buildComplaintTypeSlices(complaints),
        [complaints]
    );
    const workload = useMemo(
        () => buildManagersWorkload(complaints, managers, 5),
        [complaints, managers]
    );

    const filtered = useMemo(
        () => sortComplaintsNewest(filterComplaints(complaints, filters)),
        [complaints, filters]
    );

    const resolutionDeltaLabel =
        kpi.avgResolutionDelta === 0
            ? "без змін"
            : `${kpi.avgResolutionDelta > 0 ? "+" : ""}${kpi.avgResolutionDelta.toFixed(1)} дн`;

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-[#1F1F1F]">
                    Скарги платформи
                </h1>
                <p className="text-[14px] text-[#6B6B6B] mt-1">
                    Огляд, динаміка та обробка скарг користувачів
                </p>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
                <AnalyticsKpiCard
                    title="Всього скарг"
                    value={formatNumber(kpi.total)}
                    delta={formatPercent(kpi.totalDelta)}
                    deltaPositive={kpi.totalDelta >= 0}
                    icon={ICON.total}
                    isLoading={isLoading}
                />
                <AnalyticsKpiCard
                    title="На розгляді"
                    value={formatNumber(kpi.underReview)}
                    delta={formatPercent(kpi.underReviewDelta)}
                    deltaPositive={kpi.underReviewDelta <= 0}
                    icon={ICON.review}
                    isLoading={isLoading}
                />
                <AnalyticsKpiCard
                    title="Вирішено"
                    value={formatNumber(kpi.resolved)}
                    delta={formatPercent(kpi.resolvedDelta)}
                    deltaPositive={kpi.resolvedDelta >= 0}
                    icon={ICON.resolved}
                    isLoading={isLoading}
                />
                <AnalyticsKpiCard
                    title="Відхилено"
                    value={formatNumber(kpi.rejected)}
                    delta={formatPercent(kpi.rejectedDelta)}
                    deltaPositive={kpi.rejectedDelta <= 0}
                    icon={ICON.rejected}
                    isLoading={isLoading}
                />
                <AnalyticsKpiCard
                    title="Прострочено"
                    value={formatNumber(kpi.overdue)}
                    delta={formatPercent(kpi.overdueDelta)}
                    deltaPositive={kpi.overdueDelta <= 0}
                    icon={ICON.overdue}
                    isLoading={isLoading}
                />
                <AnalyticsKpiCard
                    title="Час вирішення"
                    value={
                        kpi.avgResolutionDays > 0
                            ? `${kpi.avgResolutionDays.toFixed(1)} дн`
                            : "—"
                    }
                    delta={resolutionDeltaLabel}
                    deltaPositive={kpi.avgResolutionDelta <= 0}
                    icon={ICON.time}
                    isLoading={isLoading}
                />
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ComplaintDynamicsChart
                    points={dynamics}
                    isLoading={isLoading}
                />
                <AnalyticsDonutCard
                    title="Типи скарг"
                    slices={typeDonut.slices}
                    centerPrimary={formatNumber(typeDonut.total)}
                    centerSecondary="Скарг"
                    isLoading={isLoading}
                />
            </section>

            <ComplaintsFiltersBar
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(DEFAULT_COMPLAINTS_FILTERS)}
            />

            <ComplaintsTable
                complaints={filtered}
                members={members}
                managers={managers}
                page={page}
                onPageChange={setPage}
                isLoading={isLoading}
                variant="admin"
            />

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentComplaintsResponses
                    complaints={complaints}
                    isLoading={isLoading}
                />
                <ManagersWorkloadPanel
                    managers={workload}
                    isLoading={isLoading}
                />
            </section>
        </div>
    );
}
