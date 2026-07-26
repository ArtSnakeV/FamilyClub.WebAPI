"use client";

import {
    ANALYTICS_PERIOD_OPTIONS,
    type AnalyticsPeriod,
} from "../utils/analyticsPeriod";

type Props = {
    period: AnalyticsPeriod;
    onPeriodChange: (period: AnalyticsPeriod) => void;
    granularityLabel?: string;
};

export default function PeriodFilterBar({
    period,
    onPeriodChange,
    granularityLabel = "Статистика: Дні",
}: Props) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
                {ANALYTICS_PERIOD_OPTIONS.map((opt) => {
                    const active = period === opt.value;
                    return (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => onPeriodChange(opt.value)}
                            className={`rounded-full px-4 py-2 text-[14px] font-semibold transition ${
                                active
                                    ? "bg-[var(--color-green)] text-white"
                                    : "bg-white/80 text-[#2F2F2F] hover:bg-white"
                            }`}
                        >
                            {opt.label}
                        </button>
                    );
                })}
            </div>
            <div className="rounded-[9px] bg-white/90 px-4 py-2 text-[14px] text-[#2F2F2F] shadow-[0_0_8px_rgba(0,0,0,0.08)]">
                {granularityLabel}
            </div>
        </div>
    );
}
