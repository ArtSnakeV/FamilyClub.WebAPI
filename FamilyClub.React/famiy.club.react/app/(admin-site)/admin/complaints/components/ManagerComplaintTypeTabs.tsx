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
                                ? "bg-[var(--color-green)] text-white"
                                : "bg-white/90 text-[#2F2F2F] hover:bg-white"
                        }`}
                    >
                        <span className="break-words text-left">{tab.label}</span>
                        <span
                            className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                                active
                                    ? "bg-white text-[#005b33]"
                                    : "bg-[#E8E4DC] text-[#555]"
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
