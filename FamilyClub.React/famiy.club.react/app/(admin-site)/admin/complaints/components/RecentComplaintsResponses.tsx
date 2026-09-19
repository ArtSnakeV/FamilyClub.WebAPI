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
        <div className="rounded-[12px] bg-[var(--background-elevated)] px-5 py-5 shadow-[var(--shadow-card)] min-h-[280px] flex flex-col border border-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)]">
            <h3 className="text-[16px] font-bold text-[var(--foreground-primary)] mb-4">
                Скарги та відповіді
            </h3>
            {isLoading ? (
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-8 h-8 border-4 border-[var(--color-green)] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : recent.length === 0 ? (
                <p className="text-[14px] text-[var(--color-muted-fg)] text-center py-8">
                    Немає скарг
                </p>
            ) : (
                <ul className="space-y-3 flex-1">
                    {recent.map((c) => (
                        <li
                            key={c.id}
                            className="flex items-start justify-between gap-3 border-b border-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)] pb-3 last:border-0 last:pb-0"
                        >
                            <div className="min-w-0">
                                <p className="text-[13px] font-semibold text-[var(--foreground-primary)]">
                                    ID: #{c.id ?? "—"}
                                </p>
                                <p className="text-[12px] text-[var(--color-muted-fg)] mt-0.5 break-words">
                                    {getComplaintTypeLabel(c.complaintType)}
                                    {c.complaintText
                                        ? ` — ${truncateText(c.complaintText, 60)}`
                                        : ""}
                                </p>
                                {c.resolutionNotes ? (
                                    <p className="text-[12px] text-[var(--color-green)] mt-1 break-words">
                                        Відповідь:{" "}
                                        {truncateText(c.resolutionNotes, 70)}
                                    </p>
                                ) : null}
                            </div>
                            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                                <span className="text-[11px] text-[var(--color-muted-fg)] whitespace-nowrap">
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
