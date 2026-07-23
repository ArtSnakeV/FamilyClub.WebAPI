"use client";

import { COMPLAINT_REASONS } from "@/lib/constants/complaintTypes";
import {
    COMPLAINT_PRIORITY_META,
    COMPLAINT_STATUS_META,
} from "../utils/complaintStatus";
import type { ComplaintsFilterState } from "../utils/filterComplaints";

type Props = {
    filters: ComplaintsFilterState;
    onChange: (next: ComplaintsFilterState) => void;
    onReset: () => void;
};

const selectClass =
    "rounded-[9px] border border-[#E0DCD3] bg-white px-3 py-2.5 text-[13px] text-[#2F2F2F] outline-none focus:border-[#005b33] min-w-0 w-full";

export default function ComplaintsFiltersBar({
    filters,
    onChange,
    onReset,
}: Props) {
    const set = <K extends keyof ComplaintsFilterState>(
        key: K,
        value: ComplaintsFilterState[K]
    ) => onChange({ ...filters, [key]: value });

    return (
        <div className="rounded-[12px] bg-white px-4 py-4 shadow-[0_0_15px_rgba(0,0,0,0.12)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-3 items-end">
                <label className="xl:col-span-2 flex flex-col gap-1">
                    <span className="text-[12px] text-[#777]">Пошук</span>
                    <div className="relative">
                        <input
                            value={filters.search}
                            onChange={(e) => set("search", e.target.value)}
                            placeholder="Пошук за ключовим словом..."
                            className={`${selectClass} pl-9`}
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999] text-[14px]">
                            ⌕
                        </span>
                    </div>
                </label>

                <label className="flex flex-col gap-1">
                    <span className="text-[12px] text-[#777]">Тип скарги</span>
                    <select
                        value={filters.type}
                        onChange={(e) => set("type", e.target.value)}
                        className={selectClass}
                    >
                        <option value="all">Всі типи</option>
                        {COMPLAINT_REASONS.map((r) => (
                            <option key={r.value} value={r.value}>
                                {r.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex flex-col gap-1">
                    <span className="text-[12px] text-[#777]">Статус</span>
                    <select
                        value={filters.status}
                        onChange={(e) =>
                            set(
                                "status",
                                e.target.value as ComplaintsFilterState["status"]
                            )
                        }
                        className={selectClass}
                    >
                        <option value="all">Всі статуси</option>
                        {(
                            Object.keys(COMPLAINT_STATUS_META) as Array<
                                keyof typeof COMPLAINT_STATUS_META
                            >
                        ).map((id) => (
                            <option key={id} value={id}>
                                {COMPLAINT_STATUS_META[id].label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex flex-col gap-1">
                    <span className="text-[12px] text-[#777]">Пріоритет</span>
                    <select
                        value={filters.priority}
                        onChange={(e) =>
                            set(
                                "priority",
                                e.target
                                    .value as ComplaintsFilterState["priority"]
                            )
                        }
                        className={selectClass}
                    >
                        <option value="all">Всі пріоритети</option>
                        {(
                            Object.keys(COMPLAINT_PRIORITY_META) as Array<
                                keyof typeof COMPLAINT_PRIORITY_META
                            >
                        ).map((id) => (
                            <option key={id} value={id}>
                                {COMPLAINT_PRIORITY_META[id].label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex flex-col gap-1">
                    <span className="text-[12px] text-[#777]">Період</span>
                    <div className="flex gap-1">
                        <input
                            type="date"
                            value={filters.dateFrom}
                            onChange={(e) => set("dateFrom", e.target.value)}
                            className={selectClass}
                            aria-label="Дата від"
                        />
                        <input
                            type="date"
                            value={filters.dateTo}
                            onChange={(e) => set("dateTo", e.target.value)}
                            className={selectClass}
                            aria-label="Дата до"
                        />
                    </div>
                </label>
            </div>

            <div className="mt-3 flex justify-end">
                <button
                    type="button"
                    onClick={onReset}
                    className="text-[13px] text-[#005b33] hover:underline"
                >
                    Скинути фільтри
                </button>
            </div>
        </div>
    );
}
