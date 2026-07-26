"use client";

import {
    COMPLAINT_PRIORITY_META,
    COMPLAINT_STATUS_META,
    type ComplaintPriorityId,
    type ComplaintStatusId,
} from "../utils/complaintStatus";

export function StatusBadge({ status }: { status: ComplaintStatusId }) {
    const meta = COMPLAINT_STATUS_META[status];
    return (
        <span
            className="inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-semibold whitespace-nowrap"
            style={{ backgroundColor: meta.bg, color: meta.text }}
        >
            {meta.label}
        </span>
    );
}

export function PriorityBadge({ priority }: { priority: ComplaintPriorityId }) {
    const meta = COMPLAINT_PRIORITY_META[priority];
    return (
        <span
            className="inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-semibold whitespace-nowrap"
            style={{ backgroundColor: meta.bg, color: meta.text }}
        >
            {meta.label}
        </span>
    );
}
