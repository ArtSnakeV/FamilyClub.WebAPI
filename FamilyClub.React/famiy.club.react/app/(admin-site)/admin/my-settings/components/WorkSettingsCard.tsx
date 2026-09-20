"use client";

import SettingsToggle from "@/app/(admin-site)/admin/platform-settings/components/SettingsToggle";
import type { WorkPrefs } from "../utils/mySettingsStorage";

type Props = {
  value: WorkPrefs;
  onChange: (next: WorkPrefs) => void;
};

/**
 * Work preferences — localStorage until backend preferences exist.
 */
export default function WorkSettingsCard({ value, onChange }: Props) {
  return (
    <div className="rounded-[12px] bg-[var(--background-elevated)] px-5 py-5 shadow-[var(--shadow-card)] border border-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)] flex flex-col gap-4 h-full">
      <div>
        <h2 className="text-[18px] font-bold text-[var(--foreground-primary)]">
          Робочі налаштування
        </h2>
        <p className="text-[12px] text-[var(--color-muted-fg)] mt-1">
          Зберігається локально (поки немає API)
        </p>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-[13px] text-[var(--color-muted-fg)]">Мова</span>
        <select
          value={value.language}
          onChange={(e) => onChange({ ...value, language: e.target.value })}
          className="rounded-[9px] border border-[color-mix(in_srgb,var(--foreground-primary)_18%,transparent)] bg-[var(--background-elevated)] px-3 py-2.5 text-[14px] text-[var(--foreground-primary)] outline-none focus:border-[var(--color-green)]"
        >
          <option value="uk">Українська</option>
          <option value="en">English</option>
        </select>
      </label>

      <ul className="flex flex-col gap-3">
        <li className="flex items-center justify-between gap-3">
          <span className="text-[14px] text-[var(--foreground-primary)]">
            Автоматичне оновлення замовлень
          </span>
          <SettingsToggle
            checked={value.autoRefreshOrders}
            label="Автоматичне оновлення замовлень"
            onChange={(next) =>
              onChange({ ...value, autoRefreshOrders: next })
            }
          />
        </li>
        <li className="flex items-center justify-between gap-3">
          <span className="text-[14px] text-[var(--foreground-primary)]">
            AI помічник
          </span>
          <SettingsToggle
            checked={value.aiAssistant}
            label="AI помічник"
            onChange={(next) => onChange({ ...value, aiAssistant: next })}
          />
        </li>
        {/*
          MOCK / FUTURE — push (потрібен notifications API):
          ...
        */}
      </ul>
    </div>
  );
}
