"use client";

import { useMemo } from "react";
import {
  PERMISSION_ROW_TEMPLATES,
  ROLE_LABELS_UK,
  normalizeRoleKey,
} from "@/app/(admin-site)/admin/roles/data/rolesData";
import { useAccessControl } from "@/lib/auth/useAccessControl";

/**
 * Read-only list of permissions for the current user's roles
 * (OR across roles via access matrix / defaults).
 */
export default function AccessRightsCard() {
  const { can, roles, loading } = useAccessControl();

  const roleLabels = useMemo(
    () =>
      roles
        .map((r) => ROLE_LABELS_UK[normalizeRoleKey(r)] ?? r)
        .filter(Boolean)
        .join(", ") || "—",
    [roles]
  );

  const items = useMemo(
    () =>
      PERMISSION_ROW_TEMPLATES.map((row) => ({
        id: row.id,
        title: row.title,
        subtitle: row.subtitle,
        allowed: can(row.id),
      })),
    [can]
  );

  return (
    <div className="rounded-[12px] bg-[var(--background-elevated)] px-5 py-5 shadow-[var(--shadow-card)] border border-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)] flex flex-col gap-4 h-full">
      <div>
        <h2 className="text-[18px] font-bold text-[var(--foreground-primary)]">
          Доступи та права
        </h2>
        <p className="text-[13px] text-[var(--color-muted-fg)] mt-1">
          Роль: {loading ? "…" : roleLabels}
        </p>
      </div>

      {loading ? (
        <p className="text-[14px] text-[var(--color-muted-fg)]">
          Завантаження прав…
        </p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-2.5 text-[14px] leading-snug"
            >
              <span
                className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[12px] font-bold ${
                  item.allowed
                    ? "bg-[#E6F4EC] text-[#005B33]"
                    : "bg-[#F8E8E8] text-[#981717]"
                }`}
                aria-hidden
              >
                {item.allowed ? "✓" : "✕"}
              </span>
              <span className="min-w-0">
                <span
                  className={
                    item.allowed
                      ? "text-[var(--foreground-primary)] font-medium"
                      : "text-[var(--color-muted-fg)]"
                  }
                >
                  {item.title}
                </span>
                <span className="block text-[12px] text-[var(--color-muted-fg)]">
                  {item.subtitle}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}

      {/*
        MOCK / FUTURE — запит на розширення прав (потрібен бекенд заявок):
        ...
      */}
    </div>
  );
}
