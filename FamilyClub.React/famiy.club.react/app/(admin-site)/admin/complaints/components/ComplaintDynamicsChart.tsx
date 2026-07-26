"use client";

import {
    formatSalesAxis,
    getNiceYMax,
} from "@/app/(admin-site)/admin/desktop/utils/buildSalesChartData";
import { COMPLAINT_STATUS_META } from "../utils/complaintStatus";
import type { DynamicsPoint } from "../utils/buildComplaintsMetrics";

type Props = {
    points: DynamicsPoint[];
    isLoading?: boolean;
};

const CHART_WIDTH = 560;
const CHART_HEIGHT = 240;
const PAD = { top: 16, right: 16, bottom: 36, left: 40 };
const GRID = "#E8E4DC";

const SERIES: {
    key: keyof Pick<
        DynamicsPoint,
        "all" | "under_review" | "resolved" | "overdue"
    >;
    label: string;
    color: string;
}[] = [
    { key: "all", label: "Усі", color: "#6B4C9A" },
    {
        key: "under_review",
        label: COMPLAINT_STATUS_META.under_review.label,
        color: COMPLAINT_STATUS_META.under_review.chartColor,
    },
    {
        key: "resolved",
        label: COMPLAINT_STATUS_META.resolved.label,
        color: COMPLAINT_STATUS_META.resolved.chartColor,
    },
    {
        key: "overdue",
        label: COMPLAINT_STATUS_META.overdue.label,
        color: COMPLAINT_STATUS_META.overdue.chartColor,
    },
];

export default function ComplaintDynamicsChart({ points, isLoading }: Props) {
    const plotW = CHART_WIDTH - PAD.left - PAD.right;
    const plotH = CHART_HEIGHT - PAD.top - PAD.bottom;
    const maxRaw = Math.max(
        ...points.flatMap((p) => [p.all, p.under_review, p.resolved, p.overdue]),
        0
    );
    const yMax = getNiceYMax(maxRaw);

    const toLine = (key: (typeof SERIES)[number]["key"]) =>
        points
            .map((point, index) => {
                const x =
                    points.length <= 1
                        ? PAD.left + plotW / 2
                        : PAD.left + (index / (points.length - 1)) * plotW;
                const y = PAD.top + plotH - (point[key] / yMax) * plotH;
                return `${x},${y}`;
            })
            .join(" ");

    return (
        <div className="rounded-[12px] bg-white px-5 py-5 shadow-[0_0_15px_rgba(0,0,0,0.12)] min-h-[300px]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-[16px] font-bold text-[#1F1F1F]">
                    Динаміка скарг
                </h3>
                <div className="flex flex-wrap gap-3 text-[11px] text-[#555]">
                    {SERIES.map((s) => (
                        <span key={s.key} className="flex items-center gap-1.5">
                            <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: s.color }}
                            />
                            {s.label}
                        </span>
                    ))}
                </div>
            </div>

            {isLoading ? (
                <div className="flex h-[200px] items-center justify-center">
                    <div className="w-8 h-8 border-4 border-[#005b33] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <svg
                    viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                    className="w-full h-auto"
                    role="img"
                    aria-label="Динаміка скарг"
                >
                    {Array.from({ length: 5 }, (_, i) => {
                        const value = (yMax / 4) * i;
                        const y = PAD.top + plotH - (value / yMax) * plotH;
                        return (
                            <g key={value}>
                                <line
                                    x1={PAD.left}
                                    y1={y}
                                    x2={CHART_WIDTH - PAD.right}
                                    y2={y}
                                    stroke={GRID}
                                    strokeWidth={1}
                                />
                                <text
                                    x={PAD.left - 6}
                                    y={y + 4}
                                    textAnchor="end"
                                    className="fill-[#888] text-[10px]"
                                >
                                    {formatSalesAxis(value)}
                                </text>
                            </g>
                        );
                    })}
                    {SERIES.map((s) => (
                        <polyline
                            key={s.key}
                            points={toLine(s.key)}
                            fill="none"
                            stroke={s.color}
                            strokeWidth={2.2}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                    ))}
                    {points.map((p, index) => {
                        if (p.showLabel === false) return null;
                        const x =
                            points.length <= 1
                                ? PAD.left + plotW / 2
                                : PAD.left +
                                  (index / (points.length - 1)) * plotW;
                        return (
                            <text
                                key={p.label + index}
                                x={x}
                                y={CHART_HEIGHT - 8}
                                textAnchor="middle"
                                className="fill-[#777] text-[9px]"
                            >
                                {p.label}
                            </text>
                        );
                    })}
                </svg>
            )}
        </div>
    );
}
