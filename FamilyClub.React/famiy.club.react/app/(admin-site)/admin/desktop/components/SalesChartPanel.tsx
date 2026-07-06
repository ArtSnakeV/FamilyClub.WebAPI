"use client";

import { useMemo, useState } from "react";
import type { OrderDTO } from "@/lib/api/generated";
import {
  buildSalesChartData,
  formatSalesAxis,
  getNiceYMax,
  type SalesPeriod,
  type SalesPoint,
} from "../utils/buildSalesChartData";

type Props = {
  orders: OrderDTO[];
  isLoading?: boolean;
  className?: string;
};

const PERIOD_OPTIONS: { value: SalesPeriod; label: string }[] = [
  { value: "week", label: "за тиждень" },
  { value: "month", label: "за 30 днів" },
  { value: "year", label: "за рік" },
];

const CHART_WIDTH = 560;
const CHART_HEIGHT = 200;
const PAD = { top: 12, right: 16, bottom: 32, left: 40 };
const LINE_COLOR = "#005b33";
const GRID_COLOR = "#E8E4DC";

function SalesLineChart({ points }: { points: SalesPoint[] }) {
  const plotW = CHART_WIDTH - PAD.left - PAD.right;
  const plotH = CHART_HEIGHT - PAD.top - PAD.bottom;
  const maxRaw = Math.max(...points.map((p) => p.value), 0);
  const yMax = getNiceYMax(maxRaw);
  const gridSteps = 4;
  const dotR = points.length > 14 ? 2.5 : 4;

  const coords = points.map((point, index) => {
    const x =
      points.length <= 1
        ? PAD.left + plotW / 2
        : PAD.left + (index / (points.length - 1)) * plotW;
    const y = PAD.top + plotH - (point.value / yMax) * plotH;
    return { ...point, x, y };
  });

  const polyline = coords.map((c) => `${c.x},${c.y}`).join(" ");

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="w-full h-auto"
      role="img"
      aria-label="Графік продажів"
    >
      {Array.from({ length: gridSteps + 1 }, (_, i) => {
        const value = (yMax / gridSteps) * i;
        const y = PAD.top + plotH - (value / yMax) * plotH;
        return (
          <g key={value}>
            <line
              x1={PAD.left}
              y1={y}
              x2={CHART_WIDTH - PAD.right}
              y2={y}
              stroke={GRID_COLOR}
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

      {coords.length > 1 && (
        <polyline
          fill="none"
          stroke={LINE_COLOR}
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          points={polyline}
        />
      )}

      {coords.map((point, index) => (
        <g key={`${point.label}-${index}`}>
          <circle cx={point.x} cy={point.y} r={dotR} fill={LINE_COLOR} />
          {point.showLabel !== false && (
            <text
              x={point.x}
              y={CHART_HEIGHT - 8}
              textAnchor="middle"
              className="fill-[#666] text-[9px]"
            >
              {point.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

export default function SalesChartPanel({
  orders,
  isLoading = false,
  className = "",
}: Props) {
  const [period, setPeriod] = useState<SalesPeriod>("week");

  const chartData = useMemo(
    () => buildSalesChartData(orders, period),
    [orders, period]
  );

  const hasData = chartData.some((point) => point.value > 0);

  return (
    <div
      className={`flex flex-col gap-4 px-5 py-5 bg-[var(--color-white)] rounded-[10px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.25)] min-h-[280px] ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base font-bold text-[#242424]">Продажі</h3>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as SalesPeriod)}
          className="text-sm text-[#242424] border border-[#242424]/25 rounded-lg px-3 py-1.5 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#005b33]/30"
          aria-label="Період продажів"
        >
          {PERIOD_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-[#005b33] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : !hasData ? (
        <div className="flex flex-1 items-center justify-center py-12 text-sm text-[#777]">
          Немає даних за обраний період
        </div>
      ) : (
        <SalesLineChart points={chartData} />
      )}
    </div>
  );
}
