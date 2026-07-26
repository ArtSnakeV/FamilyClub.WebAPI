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
    <div className="rounded-[12px] bg-white px-5 py-5 shadow-[0_0_15px_rgba(0,0,0,0.12)] flex flex-col gap-4 h-full">
      <h2 className="text-[18px] font-bold text-[#1F1F1F]">Безпека</h2>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[13px] text-[#777]">Пароль</p>
          <p className="text-[15px] font-semibold tracking-widest">••••••••</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setOpen((v) => !v);
            setMsg(null);
          }}
          className="rounded-[9px] bg-[#F3EFE7] px-3 py-1.5 text-[13px] font-semibold text-[#2F2F2F] hover:bg-[#E8E4DC]"
        >
          Змінити
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-2 rounded-[9px] bg-[#F7F4EE] p-3">
          <input
            type="password"
            placeholder="Поточний пароль"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="rounded-[9px] border border-[#E0DCD3] bg-white px-3 py-2 text-[14px] outline-none focus:border-[#005b33]"
          />
          <input
            type="password"
            placeholder="Новий пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="rounded-[9px] border border-[#E0DCD3] bg-white px-3 py-2 text-[14px] outline-none focus:border-[#005b33]"
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => void changePassword()}
            className="rounded-[9px] bg-[var(--color-green)] px-3 py-2 text-[13px] font-semibold text-white disabled:opacity-50"
          >
            {busy ? "…" : "Зберегти пароль"}
          </button>
        </div>
      )}

      {/*
        MOCK / FUTURE — двофакторна автентифікація (потрібен бекенд 2FA):
        <div className="flex flex-wrap items-center justify-between gap-2 opacity-60">
          <div>
            <p className="text-[13px] text-[#777]">Двофакторна автентифікація</p>
            <p className="text-[14px] font-semibold text-[#888]">
              Недоступно (мок)
            </p>
          </div>
          <button
            type="button"
            disabled
            title="Потрібен бекенд 2FA"
            className="rounded-[9px] bg-[#F3EFE7] px-3 py-1.5 text-[13px] font-semibold text-[#AAA] cursor-not-allowed"
          >
            Керувати
          </button>
        </div>
      */}

      {/*
        MOCK / FUTURE — активні пристрої / сесії (потрібен sessions API):
        <div className="flex flex-wrap items-center justify-between gap-2 opacity-60">
          <div>
            <p className="text-[13px] text-[#777]">Активні пристрої</p>
            <p className="text-[14px] font-semibold text-[#888]">
              3 пристрої (мок)
            </p>
          </div>
          <button
            type="button"
            disabled
            title="Потрібен sessions API"
            className="rounded-[9px] bg-[#F3EFE7] px-3 py-1.5 text-[13px] font-semibold text-[#AAA] cursor-not-allowed"
          >
            Переглянути
          </button>
        </div>
      */}

      {/*
        MOCK / FUTURE — вихід з усіх пристроїв:
        <button
          type="button"
          disabled
          title="Потрібен бекенд"
          className="self-start text-[13px] font-semibold text-[#C9A0A0] cursor-not-allowed"
        >
          Вийти з всіх пристроїв
        </button>
      */}

      {msg && <p className="text-[13px] text-[#005b33]">{msg}</p>}
    </div>
  );
}
