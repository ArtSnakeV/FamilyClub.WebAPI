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
                                    ? "bg-[var(--color-green)] text-[var(--color-cream)]"
                                    : "bg-[var(--background-elevated)] text-[var(--foreground-primary)] hover:bg-[color-mix(in_srgb,var(--color-green)_22%,var(--background-elevated))]"
                            }`}
                        >
                            {opt.label}
                        </button>
                    );
                })}
            </div>
            <div className="rounded-[9px] bg-[var(--background-elevated)] px-4 py-2 text-[14px] text-[var(--foreground-primary)] shadow-[var(--shadow-card)]">
                {granularityLabel}
            </div>
        </div>
    );
}
