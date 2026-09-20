"use client";

import { COMPLAINT_REASONS } from "@/lib/constants/complaintTypes";
import type { ComplaintsReadDto } from "@/lib/api/generated";

type Props = {
    complaints: ComplaintsReadDto[];
    activeType: string;
    onChange: (type: string) => void;
};

export default function ManagerComplaintTypeTabs({
    complaints,
    activeType,
    onChange,
}: Props) {
    const counts = new Map<string, number>();
    for (const c of complaints) {
        const key = c.complaintType ?? "other";
        counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    const tabs = [
        { id: "all", label: "Всі скарги", count: complaints.length },
        ...COMPLAINT_REASONS.map((r) => ({
            id: r.value,
            label: r.label,
            count: counts.get(r.value) ?? 0,
        })),
    ];

    return (
        <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
                const active = activeType === tab.id;
                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onChange(tab.id)}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                            active
                                ? "bg-[var(--color-green)] text-[var(--color-cream)]"
                                : "bg-[var(--background-elevated)] text-[var(--foreground-primary)] hover:bg-[color-mix(in_srgb,var(--color-green)_22%,var(--background-elevated))] border border-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)]"
                        }`}
                    >
                        <span className="break-words text-left">{tab.label}</span>
                        <span
                            className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                                active
                                    ? "bg-[var(--color-cream)] text-[var(--color-green)]"
                                    : "bg-[color-mix(in_srgb,var(--foreground-primary)_10%,var(--background-elevated))] text-[var(--color-muted-fg)]"
                            }`}
                        >
                            {tab.count}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
