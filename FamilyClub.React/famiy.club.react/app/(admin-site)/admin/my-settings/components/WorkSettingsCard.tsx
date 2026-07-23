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
    <div className="rounded-[12px] bg-white px-5 py-5 shadow-[0_0_15px_rgba(0,0,0,0.12)] flex flex-col gap-4 h-full">
      <div>
        <h2 className="text-[18px] font-bold text-[#1F1F1F]">
          Робочі налаштування
        </h2>
        <p className="text-[12px] text-[#888] mt-1">
          Зберігається локально (поки немає API)
        </p>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-[13px] text-[#777]">Мова</span>
        <select
          value={value.language}
          onChange={(e) =>
            onChange({ ...value, language: e.target.value })
          }
          className="rounded-[9px] border border-[#E0DCD3] bg-white px-3 py-2.5 text-[14px] outline-none focus:border-[#005b33]"
        >
          <option value="uk">Українська</option>
          <option value="en">English</option>
        </select>
      </label>

      <ul className="flex flex-col gap-3">
        <li className="flex items-center justify-between gap-3">
          <span className="text-[14px] text-[#2F2F2F]">
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
          <span className="text-[14px] text-[#2F2F2F]">AI помічник</span>
          <SettingsToggle
            checked={value.aiAssistant}
            label="AI помічник"
            onChange={(next) =>
              onChange({ ...value, aiAssistant: next })
            }
          />
        </li>
        {/*
          MOCK / FUTURE — push (потрібен notifications API):
          <li className="flex items-center justify-between gap-3">
            <span className="text-[14px] text-[#2F2F2F]">Push-повідомлення</span>
            <SettingsToggle
              checked={value.pushNotifications}
              label="Push-повідомлення"
              onChange={(next) =>
                onChange({ ...value, pushNotifications: next })
              }
            />
          </li>
        */}
      </ul>
    </div>
  );
}
