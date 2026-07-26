"use client";

import {
    formatSalesAxis,
    getNiceYMax,
} from "@/app/(admin-site)/admin/desktop/utils/buildSalesChartData";
import type { ChartPoint } from "../utils/buildAnalyticsMetrics";

type Props = {
    title?: string;
    points: ChartPoint[];
    isLoading?: boolean;
};

const CHART_WIDTH = 520;
const CHART_HEIGHT = 240;
const PAD = { top: 16, right: 12, bottom: 36, left: 44 };
const BAR_COLOR = "#005b33";
const GRID = "#E8E4DC";

export default function ManagerSalesBarChart({
    title = "Продажі (грн)",
    points,
    isLoading,
}: Props) {
    const plotW = CHART_WIDTH - PAD.left - PAD.right;
    const plotH = CHART_HEIGHT - PAD.top - PAD.bottom;
    const maxRaw = Math.max(...points.map((p) => p.value), 0);
    const yMax = getNiceYMax(maxRaw);
    const gap = 0.35;
    const slot = points.length > 0 ? plotW / points.length : plotW;
    const barW = Math.max(8, slot * (1 - gap));

    return (
        <div className="rounded-[12px] bg-white px-5 py-5 shadow-[0_0_15px_rgba(0,0,0,0.12)] min-h-[300px]">
            <h3 className="text-[16px] font-bold text-[#1F1F1F] mb-3">{title}</h3>
            {isLoading ? (
                <div className="flex h-[200px] items-center justify-center">
                    <div className="w-8 h-8 border-4 border-[#005b33] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <svg
                    viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                    className="w-full h-auto"
                    role="img"
                    aria-label={title}
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
                                    x={PAD.left - 8}
                                    y={y + 4}
                                    textAnchor="end"
                                    className="fill-[#888] text-[10px]"
                                >
                                    {formatSalesAxis(value)}
                                </text>
                            </g>
                        );
                    })}
                    {points.map((point, index) => {
                        const h = yMax > 0 ? (point.value / yMax) * plotH : 0;
                        const x = PAD.left + index * slot + (slot - barW) / 2;
                        const y = PAD.top + plotH - h;
                        return (
                            <g key={`${point.label}-${index}`}>
                                <rect
                                    x={x}
                                    y={y}
                                    width={barW}
                                    height={Math.max(h, 0)}
                                    fill={BAR_COLOR}
                                    rx={3}
                                />
                                {point.showLabel === false ? null : (
                                    <text
                                        x={x + barW / 2}
                                        y={CHART_HEIGHT - 8}
                                        textAnchor="middle"
                                        className="fill-[#777] text-[9px]"
                                    >
                                        {point.label}
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </svg>
            )}
        </div>
    );
}
