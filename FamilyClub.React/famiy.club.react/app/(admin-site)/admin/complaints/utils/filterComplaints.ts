import type { ComplaintsReadDto } from "@/lib/api/generated";
import { getComplaintTypeLabel } from "@/lib/constants/complaintTypes";
import {
    getComplaintPriority,
    getComplaintStatus,
    type ComplaintPriorityId,
    type ComplaintStatusId,
} from "./complaintStatus";

export type ComplaintsFilterState = {
    search: string;
    type: string; // "all" | complaintType
    status: ComplaintStatusId | "all";
    priority: ComplaintPriorityId | "all";
    dateFrom: string; // yyyy-mm-dd or ""
    dateTo: string;
};

export const DEFAULT_COMPLAINTS_FILTERS: ComplaintsFilterState = {
    search: "",
    type: "all",
    status: "all",
    priority: "all",
    dateFrom: "",
    dateTo: "",
};

export function filterComplaints(
    complaints: ComplaintsReadDto[],
    filters: ComplaintsFilterState
): ComplaintsReadDto[] {
    const q = filters.search.trim().toLowerCase();

    return complaints.filter((c) => {
        if (filters.type !== "all" && (c.complaintType ?? "other") !== filters.type) {
            return false;
        }
        if (
            filters.status !== "all" &&
            getComplaintStatus(c) !== filters.status
        ) {
            return false;
        }
        if (
            filters.priority !== "all" &&
            getComplaintPriority(c) !== filters.priority
        ) {
            return false;
        }
        if (filters.dateFrom && c.createdAt) {
            const from = new Date(filters.dateFrom);
            from.setHours(0, 0, 0, 0);
            if (new Date(c.createdAt) < from) return false;
        }
        if (filters.dateTo && c.createdAt) {
            const to = new Date(filters.dateTo);
            to.setHours(23, 59, 59, 999);
            if (new Date(c.createdAt) > to) return false;
        }
        if (q) {
            const hay = [
                String(c.id ?? ""),
                c.complaintText ?? "",
                getComplaintTypeLabel(c.complaintType),
                c.clubMemberId ?? "",
                c.resolutionNotes ?? "",
            ]
                .join(" ")
                .toLowerCase();
            if (!hay.includes(q)) return false;
        }
        return true;
    });
}

export function sortComplaintsNewest(complaints: ComplaintsReadDto[]) {
    return [...complaints].sort((a, b) => {
        const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bt - at;
    });
}
