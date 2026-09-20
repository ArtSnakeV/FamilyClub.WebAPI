"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  type DonutSegment,
  withPercentages,
} from "./donutDiagramUtils";

export type { DonutSegment } from "./donutDiagramUtils";

type Props = {
  title: string;
  segments: DonutSegment[];
  isLoading?: boolean;
  href?: string;
  emptyLabel?: string;
  totalLabel?: string;
};

const SIZE = 200;
const STROKE = 36;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;

function DonutRing({ segments }: { segments: ReturnType<typeof withPercentages> }) {
  const total = segments.reduce((sum, s) => sum + s.count, 0);

  if (total === 0) {
    return (
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="color-mix(in srgb, var(--foreground-primary) 18%, transparent)"
          strokeWidth={STROKE}
        />
      </svg>
    );
  }

  let offset = 0;

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
      {segments.map((seg) => {
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
      })}
    </svg>
  );
}

export default function DonutDiagramChart({
  title,
  segments,
  isLoading = false,
  href,
  emptyLabel = "Немає даних",
  totalLabel = "Всього",
}: Props) {
  const chartSegments = useMemo(() => withPercentages(segments), [segments]);

  const total = chartSegments.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="flex flex-col gap-4 px-5 py-5 bg-[var(--background-elevated)] text-[var(--foreground-primary)] rounded-[10px] shadow-[var(--shadow-panel)] min-h-[280px]">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-bold text-[var(--foreground-primary)]">{title}</h3>
        {href && (
          <Link
            href={href}
            className="text-sm text-[var(--color-green)] hover:underline shrink-0"
          >
            Детальніше →
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-[var(--color-green)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : total === 0 ? (
        <div className="flex flex-1 items-center justify-center py-12 text-sm text-[var(--color-muted-fg)]">
          {emptyLabel}
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
            <DonutRing segments={chartSegments} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-[var(--foreground-primary)] leading-none">
                {total.toLocaleString("uk-UA")}
              </span>
              <span className="text-xs text-[var(--color-muted-fg)] mt-1">{totalLabel}</span>
            </div>
          </div>

          <ul className="flex flex-col gap-2.5 flex-1 w-full min-w-0">
            {chartSegments.map((seg) => (
              <li
                key={seg.id}
                className="flex items-center gap-2 text-sm text-[var(--foreground-primary)]"
              >
                <span
                  className="w-3 h-3 rounded-sm shrink-0"
                  style={{ backgroundColor: seg.color }}
                  aria-hidden
                />
                <span className="truncate flex-1">{seg.label}</span>
                <span className="text-[var(--color-muted-fg)] shrink-0 tabular-nums">
                  {seg.count} ({seg.percent.toFixed(1)}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
