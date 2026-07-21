"use client";

import { useEffect, useMemo, useState } from "react";
import type {
    ClubMemberReadDto,
    ComplaintsReadDto,
} from "@/lib/api/generated";
import {
    DEFAULT_COMPLAINTS_FILTERS,
    filterComplaints,
    sortComplaintsNewest,
    type ComplaintsFilterState,
} from "../utils/filterComplaints";
import ComplaintsFiltersBar from "./ComplaintsFiltersBar";
import ComplaintsTable from "./ComplaintsTable";
import ManagerComplaintTypeTabs from "./ManagerComplaintTypeTabs";
import PlatformContactStrip from "@/app/(admin-site)/admin/platform-settings/components/PlatformContactStrip";

type Props = {
    complaints: ComplaintsReadDto[];
    members: ClubMemberReadDto[];
    managers: ClubMemberReadDto[];
    isLoading?: boolean;
};

export default function ManagerComplaintsPanel({
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

    const filtered = useMemo(
        () => sortComplaintsNewest(filterComplaints(complaints, filters)),
        [complaints, filters]
    );

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-[#1F1F1F]">Скарги</h1>
                <p className="text-[14px] text-[#6B6B6B] mt-1">
                    Обробка скарг користувачів за типами та статусами
                </p>
            </div>

            <PlatformContactStrip />

            <ManagerComplaintTypeTabs
                complaints={complaints}
                activeType={filters.type}
                onChange={(type) => setFilters((f) => ({ ...f, type }))}
            />

            <ComplaintsFiltersBar
                filters={filters}
                onChange={setFilters}
                onReset={() =>
                    setFilters({
                        ...DEFAULT_COMPLAINTS_FILTERS,
                        type: filters.type === "all" ? "all" : filters.type,
                    })
                }
            />

            <ComplaintsTable
                complaints={filtered}
                members={members}
                managers={managers}
                page={page}
                pageSize={5}
                onPageChange={setPage}
                isLoading={isLoading}
                variant="manager"
            />
        </div>
    );
}
