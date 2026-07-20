"use client";

import {
    ANALYTICS_PERIOD_OPTIONS,
    formatPeriodRangeLabel,
    type AnalyticsPeriod,
} from "../utils/analyticsPeriod";

type Props = {
    period: AnalyticsPeriod;
    onPeriodChange: (period: AnalyticsPeriod) => void;
};

export default function ManagerPeriodPicker({ period, onPeriodChange }: Props) {
    return (
        <label className="relative inline-flex items-center gap-2 rounded-[10px] bg-white px-4 py-2.5 shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer min-w-[260px]">
            <img
                src="/images/admin_manager/desktop/calendar-check-solid-full 1.svg"
                alt=""
                className="w-5 h-5 opacity-70 flex-shrink-0"
            />
            <span className="text-[13px] text-[#2F2F2F] truncate flex-1">
                {formatPeriodRangeLabel(period)}
            </span>
            <select
                value={period}
                onChange={(e) =>
                    onPeriodChange(e.target.value as AnalyticsPeriod)
                }
                className="absolute inset-0 opacity-0 cursor-pointer"
                aria-label="Обрати період"
            >
                {ANALYTICS_PERIOD_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <span className="text-[#777] text-[12px] flex-shrink-0" aria-hidden>
                ▾
            </span>
        </label>
    );
}
