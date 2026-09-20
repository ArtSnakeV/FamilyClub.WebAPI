"use client";

import Link from "next/link";
import { useMemo } from "react";
import { withPercentages } from "@/app/(admin-site)/common_elements/donutDiagramUtils";
import type { DonutSlice } from "../utils/buildAnalyticsMetrics";
import { formatNumber, formatUah } from "../utils/analyticsPeriod";

type Props = {
    title: string;
    slices: DonutSlice[];
    centerPrimary: string;
    centerSecondary?: string;
    footerHref?: string;
    footerLabel?: string;
    isLoading?: boolean;
    valueAsMoney?: boolean;
};

const SIZE = 180;
const STROKE = 32;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;

export default function AnalyticsDonutCard({
    title,
    slices,
    centerPrimary,
    centerSecondary,
    footerHref,
    footerLabel,
    isLoading,
    valueAsMoney,
}: Props) {
    const chartSegments = useMemo(
        () =>
            withPercentages(
                slices.map((s) => ({
                    id: s.id,
                    label: s.label,
                    color: s.color,
                    count: s.count,
                }))
            ),
        [slices]
    );
    const total = chartSegments.reduce((sum, s) => sum + s.count, 0);

    let offset = 0;

    return (
        <div className="rounded-[12px] bg-[var(--background-elevated)] px-5 py-5 shadow-[var(--shadow-card)] min-h-[320px] flex flex-col">
            <h3 className="text-[16px] font-bold text-[var(--foreground-primary)] mb-4">{title}</h3>

            {isLoading ? (
                <div className="flex flex-1 items-center justify-center py-10">
                    <div className="w-8 h-8 border-4 border-[var(--color-green)] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row gap-5 items-center flex-1">
                    <div className="relative flex-shrink-0">
                        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
                            {total === 0 ? (
                                <circle
                                    cx={SIZE / 2}
                                    cy={SIZE / 2}
                                    r={R}
                                    fill="none"
                                    stroke="color-mix(in srgb, var(--foreground-primary) 18%, transparent)"
                                    strokeWidth={STROKE}
                                />
                            ) : (
                                chartSegments.map((seg) => {
                                    const length = (seg.count / total) * C;
                                    const dashArray = `${length} ${C - length}`;
                                    const dashOffset = -offset;
                                    offset += length;
                                    return (
                                        <circle
                                            key={seg.id}
                                            cx={SIZE / 2}
                                            cy={SIZE / 2}
                                            r={R}
                                            fill="none"
                                            stroke={seg.color}
                                            strokeWidth={STROKE}
                                            strokeDasharray={dashArray}
                                            strokeDashoffset={dashOffset}
                                            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
                                        />
                                    );
                                })
                            )}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                            <p className="text-[15px] font-bold text-[var(--foreground-primary)] leading-tight">
                                {centerPrimary}
                            </p>
                            {centerSecondary && (
                                <p className="text-[11px] text-[var(--color-muted-fg)] mt-0.5">
                                    {centerSecondary}
                                </p>
                            )}
                        </div>
                    </div>

                    <ul className="flex-1 w-full space-y-2">
                        {chartSegments.map((seg) => (
                            <li
                                key={seg.id}
                                className="flex items-center justify-between gap-2 text-[13px]"
                            >
                                <span className="flex items-center gap-2 min-w-0">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: seg.color }}
                                    />
                                    <span className="truncate text-[var(--foreground-primary)]">
                                        {seg.label}
                                    </span>
                                </span>
                                <span className="text-[var(--color-muted-fg)] whitespace-nowrap">
                                    {valueAsMoney
                                        ? formatUah(seg.count)
                                        : formatNumber(seg.count)}{" "}
                                    <span className="text-[var(--color-muted-fg)]">
                                        ({seg.percent.toFixed(1)}%)
                                    </span>
                                </span>
                            </li>
                        ))}
                        {chartSegments.length === 0 && (
                            <li className="text-[13px] text-[var(--color-muted-fg)]">Немає даних</li>
                        )}
                    </ul>
                </div>
            )}

            {footerHref && footerLabel && (
                <div className="mt-4 pt-3 border-t border-[color-mix(in_srgb,var(--foreground-primary)_18%,transparent)]">
                    <Link
                        href={footerHref}
                        className="inline-flex w-full items-center justify-center rounded-[9px] bg-[color-mix(in_srgb,var(--color-green)_16%,var(--background-elevated))] px-4 py-2.5 text-[14px] font-medium text-[var(--color-green)] hover:bg-[color-mix(in_srgb,var(--color-green)_28%,var(--background-elevated))] transition"
                    >
                        {footerLabel}
                    </Link>
                </div>
            )}
        </div>
    );
}
