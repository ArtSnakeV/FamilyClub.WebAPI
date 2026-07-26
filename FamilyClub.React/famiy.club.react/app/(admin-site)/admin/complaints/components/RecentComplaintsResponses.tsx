"use client";

import type { ComplaintsReadDto } from "@/lib/api/generated";
import { getComplaintTypeLabel } from "@/lib/constants/complaintTypes";
import {
    formatRelativeTimeUk,
    truncateText,
} from "@/app/(admin-site)/admin/desktop/utils/formatRelativeTime";
import { getComplaintStatus } from "../utils/complaintStatus";
import { StatusBadge } from "./ComplaintBadges";

type Props = {
    complaints: ComplaintsReadDto[];
    isLoading?: boolean;
    limit?: number;
};

export default function RecentComplaintsResponses({
    complaints,
    isLoading,
    limit = 5,
}: Props) {
    const recent = [...complaints]
        .sort((a, b) => {
            const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return bt - at;
        })
        .slice(0, limit);

    return (
        <div className="rounded-[12px] bg-white px-5 py-5 shadow-[0_0_15px_rgba(0,0,0,0.12)] min-h-[280px] flex flex-col">
            <h3 className="text-[16px] font-bold text-[#1F1F1F] mb-4">
                Скарги та відповіді
            </h3>
            {isLoading ? (
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-8 h-8 border-4 border-[#005b33] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : recent.length === 0 ? (
                <p className="text-[14px] text-[#888] text-center py-8">
                    Немає скарг
                </p>
            ) : (
                <ul className="space-y-3 flex-1">
                    {recent.map((c) => (
                        <li
                            key={c.id}
                            className="flex items-start justify-between gap-3 border-b border-[#F0EBE3] pb-3 last:border-0 last:pb-0"
                        >
                            <div className="min-w-0">
                                <p className="text-[13px] font-semibold text-[#1F1F1F]">
                                    ID: #{c.id ?? "—"}
                                </p>
                                <p className="text-[12px] text-[#666] mt-0.5 break-words">
                                    {getComplaintTypeLabel(c.complaintType)}
                                    {c.complaintText
                                        ? ` — ${truncateText(c.complaintText, 60)}`
                                        : ""}
                                </p>
                                {c.resolutionNotes ? (
                                    <p className="text-[12px] text-[#005b33] mt-1 break-words">
                                        Відповідь:{" "}
                                        {truncateText(c.resolutionNotes, 70)}
                                    </p>
                                ) : null}
                            </div>
                            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                                <span className="text-[11px] text-[#888] whitespace-nowrap">
                                    {formatRelativeTimeUk(c.createdAt)}
                                </span>
                                <StatusBadge status={getComplaintStatus(c)} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
