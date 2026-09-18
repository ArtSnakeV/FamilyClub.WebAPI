"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { ComplaintsReadDto } from "@/lib/api/generated";
import { getComplaintTypeLabel } from "@/lib/constants/complaintTypes";
import { getComplaintBadge } from "../utils/complaintBadge";
import {
  formatRelativeTimeUk,
  truncateText,
} from "../utils/formatRelativeTime";

type Props = {
  complaints: ComplaintsReadDto[];
  isLoading?: boolean;
  href?: string;
  limit?: number;
};

export default function RecentComplaintsPanel({
  complaints,
  isLoading = false,
  href = "/admin/complaints",
  limit = 6,
}: Props) {
  const recent = useMemo(
    () =>
      [...complaints]
        .sort((a, b) => {
          const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bTime - aTime;
        })
        .slice(0, limit),
    [complaints, limit]
  );

  return (
    <div className="flex flex-col gap-4 px-5 py-5 bg-[var(--background-elevated)] text-[var(--foreground-primary)] rounded-[10px] shadow-[var(--shadow-panel)] min-h-[280px]">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-bold text-[var(--foreground-primary)]">
          Останні скарги
        </h3>
        {href && (
          <Link
            href={href}
            className="text-sm text-[var(--color-green)] hover:underline shrink-0"
          >
            Переглянути всі
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-[var(--color-green)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : recent.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-12 text-sm text-[var(--color-muted-fg)]">
          Немає скарг
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)]">
          {recent.map((complaint) => {
            const badge = getComplaintBadge(complaint);
            const typeLabel = getComplaintTypeLabel(complaint.complaintType);
            const preview = truncateText(complaint.complaintText ?? "", 100);

            return (
              <li
                key={complaint.id}
                className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--foreground-primary)] truncate">
                    {typeLabel}
                  </p>
                  {preview && (
                    <p className="text-xs text-[var(--color-muted-fg)] mt-0.5 line-clamp-2">
                      {preview}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-xs text-[var(--color-muted-fg)] whitespace-nowrap">
                    {formatRelativeTimeUk(complaint.createdAt)}
                  </span>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                    style={{ backgroundColor: badge.bg, color: badge.text }}
                  >
                    {badge.label}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
