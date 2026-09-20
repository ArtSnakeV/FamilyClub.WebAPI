"use client";

import { useState } from "react";
import type { CurrentUser } from "@/app/(user-site)/userProfile/hooks/useCurrentUser";
import {
  ClubMemberApi,
  Configuration,
} from "@/lib/api/generated";
import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

type Props = {
  user: CurrentUser | null;
};

const cardClass =
  "rounded-[12px] bg-[var(--background-elevated)] px-5 py-5 shadow-[var(--shadow-card)] border border-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)] flex flex-col gap-4 h-full";

const inputClass =
  "rounded-[9px] border border-[color-mix(in_srgb,var(--foreground-primary)_18%,transparent)] bg-[var(--background-elevated)] px-3 py-2 text-[14px] text-[var(--foreground-primary)] outline-none focus:border-[var(--color-green)] placeholder:text-[var(--color-muted-fg)]";

export default function SecurityCard({ user }: Props) {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const changePassword = async () => {
    if (!user?.id) return;
    if (!currentPassword || !newPassword) {
      setMsg("Заповніть обидва поля");
      return;
    }
    const token = getAuthToken();
    if (!token) return;

    setBusy(true);
    setMsg(null);
    try {
      const api = new ClubMemberApi(
        new Configuration({
          basePath: apiBasePath,
          headers: { Authorization: `Bearer ${token}` },
        })
      );
      await api.apiClubMemberIdChangePasswordPut({
        id: user.id,
        changePasswordClubMemberDto: {
          currentPassword,
          newPassword,
        },
      });
      setCurrentPassword("");
      setNewPassword("");
      setOpen(false);
      setMsg("Пароль змінено");
    } catch {
      setMsg("Не вдалося змінити пароль");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={cardClass}>
      <h2 className="text-[18px] font-bold text-[var(--foreground-primary)]">
        Безпека
      </h2>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[13px] text-[var(--color-muted-fg)]">Пароль</p>
          <p className="text-[15px] font-semibold tracking-widest text-[var(--foreground-primary)]">
            ••••••••
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setOpen((v) => !v);
            setMsg(null);
          }}
          className="rounded-[9px] bg-[color-mix(in_srgb,var(--foreground-primary)_8%,var(--background-elevated))] px-3 py-1.5 text-[13px] font-semibold text-[var(--foreground-primary)] hover:bg-[color-mix(in_srgb,var(--color-green)_22%,var(--background-elevated))] transition"
        >
          Змінити
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-2 rounded-[9px] bg-[color-mix(in_srgb,var(--foreground-primary)_6%,var(--background-elevated))] p-3">
          <input
            type="password"
            placeholder="Поточний пароль"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={inputClass}
          />
          <input
            type="password"
            placeholder="Новий пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClass}
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => void changePassword()}
            className="rounded-[9px] bg-[var(--color-green)] px-3 py-2 text-[13px] font-semibold text-[var(--color-cream)] disabled:opacity-50 transition"
          >
            {busy ? "…" : "Зберегти пароль"}
          </button>
        </div>
      )}

      {/*
        MOCK / FUTURE — двофакторна автентифікація (потрібен бекенд 2FA):
        ...
      */}

      {/*
        MOCK / FUTURE — активні пристрої / сесії (потрібен sessions API):
        ...
      */}

      {/*
        MOCK / FUTURE — вихід з усіх пристроїв:
        ...
      */}

      {msg && <p className="text-[13px] text-[var(--color-green)]">{msg}</p>}
    </div>
  );
}
