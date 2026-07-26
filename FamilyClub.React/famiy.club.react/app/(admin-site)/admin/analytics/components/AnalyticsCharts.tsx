"use client";

import {
    formatSalesAxis,
    getNiceYMax,
} from "@/app/(admin-site)/admin/desktop/utils/buildSalesChartData";
import type { ChartPoint, DualChartPoint } from "../utils/buildAnalyticsMetrics";

const CHART_WIDTH = 560;
const CHART_HEIGHT = 220;
const PAD = { top: 16, right: 16, bottom: 36, left: 44 };
const GRID = "#E8E4DC";

type LineChartCardProps = {
    title: string;
    points: ChartPoint[];
    color?: string;
    legend?: string;
    isLoading?: boolean;
};

export function LineChartCard({
    title,
    points,
    color = "#005b33",
    legend,
    isLoading,
}: LineChartCardProps) {
    const plotW = CHART_WIDTH - PAD.left - PAD.right;
    const plotH = CHART_HEIGHT - PAD.top - PAD.bottom;
    const maxRaw = Math.max(...points.map((p) => p.value), 0);
    const yMax = getNiceYMax(maxRaw);
    const coords = points.map((point, index) => {
        const x =
            points.length <= 1
                ? PAD.left + plotW / 2
                : PAD.left + (index / (points.length - 1)) * plotW;
        const y = PAD.top + plotH - (point.value / yMax) * plotH;
        return { ...point, x, y };
    });
    const line = coords.map((c) => `${c.x},${c.y}`).join(" ");
    const area =
        coords.length > 0
            ? `${PAD.left},${PAD.top + plotH} ${line} ${CHART_WIDTH - PAD.right},${PAD.top + plotH}`
            : "";

    return (
        <div className="rounded-[12px] bg-white px-5 py-5 shadow-[0_0_15px_rgba(0,0,0,0.12)] min-h-[300px]">
            <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="text-[16px] font-bold text-[#1F1F1F]">{title}</h3>
                {legend && (
                    <span className="flex items-center gap-2 text-[12px] text-[#555]">
                        <span
                            className="inline-block w-3 h-3 rounded-full"
                            style={{ backgroundColor: color }}
                        />
                        {legend}
                    </span>
                )}
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
                    {area && (
                        <polygon points={area} fill={color} opacity={0.12} />
                    )}
                    <polyline
                        points={line}
                        fill="none"
                        stroke={color}
                        strokeWidth={2.5}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                    {coords.map((c) =>
                        c.showLabel === false ? null : (
                            <text
                                key={c.label + c.x}
                                x={c.x}
                                y={CHART_HEIGHT - 8}
                                textAnchor="middle"
                                className="fill-[#777] text-[9px]"
                            >
                                {c.label}
                            </text>
                        )
                    )}
                </svg>
            )}
        </div>
    );
}

type DualLineChartCardProps = {
    title: string;
    points: DualChartPoint[];
    isLoading?: boolean;
};

export function DualLineChartCard({
    title,
    points,
    isLoading,
}: DualLineChartCardProps) {
    const plotW = CHART_WIDTH - PAD.left - PAD.right;
    const plotH = CHART_HEIGHT - PAD.top - PAD.bottom;
    const maxRaw = Math.max(
        ...points.flatMap((p) => [p.users, p.orders]),
        0
    );
    const yMax = getNiceYMax(maxRaw);
    const userColor = "#005b33";
    const orderColor = "#E8A87C";

    const toCoords = (key: "users" | "orders") =>
        points.map((point, index) => {
            const x =
                points.length <= 1
                    ? PAD.left + plotW / 2
                    : PAD.left + (index / (points.length - 1)) * plotW;
            const y = PAD.top + plotH - (point[key] / yMax) * plotH;
            return { ...point, x, y, value: point[key] };
        });

    const users = toCoords("users");
    const orders = toCoords("orders");
    const userLine = users.map((c) => `${c.x},${c.y}`).join(" ");
    const orderLine = orders.map((c) => `${c.x},${c.y}`).join(" ");
    const userArea =
        users.length > 0
            ? `${PAD.left},${PAD.top + plotH} ${userLine} ${CHART_WIDTH - PAD.right},${PAD.top + plotH}`
            : "";
    const orderArea =
        orders.length > 0
            ? `${PAD.left},${PAD.top + plotH} ${orderLine} ${CHART_WIDTH - PAD.right},${PAD.top + plotH}`
            : "";

    return (
        <div className="rounded-[12px] bg-white px-5 py-5 shadow-[0_0_15px_rgba(0,0,0,0.12)] min-h-[300px]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-[16px] font-bold text-[#1F1F1F]">{title}</h3>
                <div className="flex items-center gap-4 text-[12px] text-[#555]">
                    <span className="flex items-center gap-2">
                        <span
                            className="inline-block w-3 h-3 rounded-full"
                            style={{ backgroundColor: userColor }}
                        />
                        Нові користувачі
                    </span>
                    <span className="flex items-center gap-2">
                        <span
                            className="inline-block w-3 h-3 rounded-full"
                            style={{ backgroundColor: orderColor }}
                        />
                        Замовлення
                    </span>
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
                    {orderArea && (
                        <polygon points={orderArea} fill={orderColor} opacity={0.15} />
                    )}
                    {userArea && (
                        <polygon points={userArea} fill={userColor} opacity={0.12} />
                    )}
                    <polyline
                        points={orderLine}
                        fill="none"
                        stroke={orderColor}
                        strokeWidth={2.5}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                    <polyline
                        points={userLine}
                        fill="none"
                        stroke={userColor}
                        strokeWidth={2.5}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                    {users.map((c) =>
                        c.showLabel === false ? null : (
                            <text
                                key={c.label + c.x}
                                x={c.x}
                                y={CHART_HEIGHT - 8}
                                textAnchor="middle"
                                className="fill-[#777] text-[9px]"
                            >
                                {c.label}
                            </text>
                        )
                    )}
                </svg>
            )}
        </div>
    );
}
