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
    <div className="rounded-[12px] bg-white px-5 py-5 shadow-[0_0_15px_rgba(0,0,0,0.12)] flex flex-col gap-4 h-full">
      <div>
        <h2 className="text-[18px] font-bold text-[#1F1F1F]">
          Доступи та права
        </h2>
        <p className="text-[13px] text-[#6B6B6B] mt-1">
          Роль: {loading ? "…" : roleLabels}
        </p>
      </div>

      {loading ? (
        <p className="text-[14px] text-[#888]">Завантаження прав…</p>
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
                      ? "text-[#1F1F1F] font-medium"
                      : "text-[#777]"
                  }
                >
                  {item.title}
                </span>
                <span className="block text-[12px] text-[#888]">
                  {item.subtitle}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}

      {/*
        MOCK / FUTURE — запит на розширення прав (потрібен бекенд заявок):
        <button
          type="button"
          disabled
          title="Потрібен бекенд для заявок на розширення прав"
          className="mt-auto w-full rounded-[9px] bg-[#F3EFE7] px-4 py-2.5 text-[13px] font-semibold text-[#888] cursor-not-allowed"
        >
          Запит на розширення прав
        </button>
      */}
    </div>
  );
}
