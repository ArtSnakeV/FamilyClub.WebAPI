"use client";

import { useEffect, useState } from "react";
import { useCurrentUser } from "@/app/(user-site)/userProfile/hooks/useCurrentUser";
import AccessRightsCard from "./AccessRightsCard";
// MOCK / FUTURE: import NotificationsCard from "./NotificationsCard";
import ProfileCard from "./ProfileCard";
import SecurityCard from "./SecurityCard";
// MOCK / FUTURE: import TeamPresenceCard from "./TeamPresenceCard";
import WorkSettingsCard from "./WorkSettingsCard";
import {
  DEFAULT_PREFS,
  loadMySettingsPrefs,
  saveMySettingsPrefs,
  type MySettingsPrefs,
} from "../utils/mySettingsStorage";

export default function MySettingsPanel() {
  const { user, loading } = useCurrentUser();
  const [prefs, setPrefs] = useState<MySettingsPrefs>(DEFAULT_PREFS);
  const [draft, setDraft] = useState<MySettingsPrefs>(DEFAULT_PREFS);
  const [savedFlash, setSavedFlash] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const loaded = loadMySettingsPrefs();
    setPrefs(loaded);
    setDraft(loaded);
  }, []);

  const applySave = () => {
    saveMySettingsPrefs(draft);
    setPrefs(draft);
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 2000);
  };

  const applyCancel = () => {
    setDraft(prefs);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground-primary)]">
          Мої налаштування
        </h1>
        <p className="text-[14px] text-[var(--color-muted-fg)] mt-1">
          Профіль, безпека та права доступу
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-stretch">
        <ProfileCard
          user={user}
          loading={loading}
          onUpdated={() => setTick((t) => t + 1)}
        />
        <SecurityCard user={user} />
        {/*
          MOCK / FUTURE — сповіщення (потрібен notification preferences API):
          <NotificationsCard
            value={draft.notifications}
            onChange={(notifications) =>
              setDraft((d) => ({ ...d, notifications }))
            }
          />
        */}
        <WorkSettingsCard
          value={draft.work}
          onChange={(work) => setDraft((d) => ({ ...d, work }))}
        />
        <AccessRightsCard key={tick} />
        {/* MOCK / FUTURE: <TeamPresenceCard /> */}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
        {savedFlash && (
          <span className="text-[13px] text-[var(--color-green)] mr-auto">
            Локальні налаштування збережено
          </span>
        )}
        <button
          type="button"
          onClick={applyCancel}
          className="rounded-[9px] bg-[color-mix(in_srgb,var(--foreground-primary)_8%,var(--background-elevated))] px-5 py-2.5 text-[14px] font-semibold text-[var(--foreground-primary)] hover:bg-[color-mix(in_srgb,var(--color-green)_22%,var(--background-elevated))] transition"
        >
          Скасувати
        </button>
        <button
          type="button"
          onClick={applySave}
          className="rounded-[9px] bg-[var(--color-green)] px-5 py-2.5 text-[14px] font-semibold text-[var(--color-cream)] hover:opacity-95 transition"
        >
          Зберегти зміни
        </button>
      </div>
    </div>
  );
}
