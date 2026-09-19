"use client";

import { useRef, useState } from "react";
import type { CurrentUser } from "@/app/(user-site)/userProfile/hooks/useCurrentUser";
import {
  ClubMemberApi,
  Configuration,
} from "@/lib/api/generated";
import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";
import {
  ROLE_LABELS_UK,
  normalizeRoleKey,
} from "@/app/(admin-site)/admin/roles/data/rolesData";

type Props = {
  user: CurrentUser | null;
  loading: boolean;
  onUpdated: () => void;
};

const cardClass =
  "rounded-[12px] bg-[var(--background-elevated)] px-5 py-5 shadow-[var(--shadow-card)] border border-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)] flex flex-col gap-4 h-full";

const inputClass =
  "rounded-[9px] border border-[color-mix(in_srgb,var(--foreground-primary)_18%,transparent)] bg-[var(--background-elevated)] px-3 py-2 text-[var(--foreground-primary)] outline-none focus:border-[var(--color-green)]";

function avatarSrc(avatarData?: string | null): string | null {
  if (!avatarData) return null;
  const t = avatarData.trim();
  if (t.startsWith("data:") || t.startsWith("http") || t.startsWith("/")) {
    return t;
  }
  return `data:image/jpeg;base64,${t}`;
}

export default function ProfileCard({ user, loading, onUpdated }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const displayName =
    [user?.name, user?.surname].filter(Boolean).join(" ") || "—";
  const rolesLabel =
    user?.roles
      ?.map((r) => ROLE_LABELS_UK[normalizeRoleKey(r)] ?? r)
      .join(", ") || "—";
  const src = avatarSrc(user?.avatarData);

  const startEdit = () => {
    setName(user?.name ?? "");
    setSurname(user?.surname ?? "");
    setPhone(user?.phoneNumber ?? "");
    setEditing(true);
    setMsg(null);
  };

  const getApi = () => {
    const token = getAuthToken();
    if (!token || !user?.id) return null;
    return new ClubMemberApi(
      new Configuration({
        basePath: apiBasePath,
        headers: { Authorization: `Bearer ${token}` },
      })
    );
  };

  const saveProfile = async () => {
    const api = getApi();
    if (!api || !user?.id) return;
    setBusy(true);
    setMsg(null);
    try {
      await api.apiClubMemberIdFormPut({
        id: user.id,
        name: name.trim() || undefined,
        surname: surname.trim() || undefined,
        phoneNumber: phone.trim() || undefined,
      });
      setEditing(false);
      setMsg("Профіль збережено");
      window.dispatchEvent(new Event("auth-change"));
      onUpdated();
    } catch {
      setMsg("Не вдалося зберегти профіль");
    } finally {
      setBusy(false);
    }
  };

  const uploadAvatar = async (file: File) => {
    const api = getApi();
    if (!api || !user?.id) return;
    setBusy(true);
    setMsg(null);
    try {
      await api.apiClubMemberIdFormPut({
        id: user.id,
        avatar: file,
        name: user.name || undefined,
        surname: user.surname || undefined,
        phoneNumber: user.phoneNumber || undefined,
      });
      setMsg("Аватар оновлено");
      window.dispatchEvent(new Event("auth-change"));
      onUpdated();
    } catch {
      setMsg("Не вдалося оновити аватар");
    } finally {
      setBusy(false);
    }
  };

  /*
   * FUTURE: delete avatar endpoint (clear AvatarData on backend).
   * Currently API form PUT expects optional avatar Blob — empty delete
   * is not clearly supported, so UI is disabled.
   */
  // const deleteAvatar = async () => { ... }

  return (
    <div className={cardClass}>
      <h2 className="text-[18px] font-bold text-[var(--foreground-primary)]">
        Профіль менеджера
      </h2>

      {loading ? (
        <p className="text-[14px] text-[var(--color-muted-fg)]">Завантаження…</p>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="w-[96px] h-[96px] rounded-full overflow-hidden bg-[color-mix(in_srgb,var(--foreground-primary)_8%,var(--background-elevated))] border border-[color-mix(in_srgb,var(--foreground-primary)_18%,transparent)]">
                {src ? (
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('/images/admin_manager_layout/cat_circle.svg')",
                    }}
                  />
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void uploadAvatar(f);
                  e.target.value = "";
                }}
              />
              <button
                type="button"
                disabled={busy}
                onClick={() => fileRef.current?.click()}
                className="rounded-[9px] bg-[var(--color-green)] px-3 py-1.5 text-[12px] font-semibold text-[var(--color-cream)] hover:opacity-95 disabled:opacity-50 transition"
              >
                Змінити аватар
              </button>
              {/*
                MOCK / FUTURE — потрібен бекенд для видалення аватара:
                <button
                  type="button"
                  disabled
                  title="Потрібен бекенд для видалення аватара"
                  className="text-[12px] text-[var(--color-muted-fg)] cursor-not-allowed"
                >
                  Видалити аватар
                </button>
              */}
            </div>

            <div className="flex-1 min-w-0 flex flex-col gap-2 text-[14px] text-[var(--foreground-primary)]">
              {editing ? (
                <>
                  <label className="flex flex-col gap-1">
                    <span className="text-[12px] text-[var(--color-muted-fg)]">
                      Імʼя
                    </span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-[12px] text-[var(--color-muted-fg)]">
                      Прізвище
                    </span>
                    <input
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-[12px] text-[var(--color-muted-fg)]">
                      Телефон
                    </span>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClass}
                    />
                  </label>
                  <div className="flex gap-2 mt-1">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void saveProfile()}
                      className="rounded-[9px] bg-[var(--color-green)] px-3 py-2 text-[13px] font-semibold text-[var(--color-cream)] disabled:opacity-50 transition"
                    >
                      Зберегти
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="rounded-[9px] bg-[color-mix(in_srgb,var(--foreground-primary)_8%,var(--background-elevated))] px-3 py-2 text-[13px] font-semibold text-[var(--foreground-primary)] transition"
                    >
                      Скасувати
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    <span className="text-[var(--color-muted-fg)]">Імʼя: </span>
                    <span className="font-semibold text-[var(--foreground-primary)]">
                      {displayName}
                    </span>
                  </p>
                  {/*
                    FUTURE: nickname field in ClubMember DTO
                    <p>Нікнейм: @…</p>
                  */}
                  <p>
                    <span className="text-[var(--color-muted-fg)]">
                      Email:{" "}
                    </span>
                    <span className="font-medium">{user?.email || "—"}</span>
                  </p>
                  <p>
                    <span className="text-[var(--color-muted-fg)]">
                      Телефон:{" "}
                    </span>
                    <span className="font-medium">
                      {user?.phoneNumber || "—"}
                    </span>
                  </p>
                  <p>
                    <span className="text-[var(--color-muted-fg)]">Роль: </span>
                    <span className="font-medium">{rolesLabel}</span>
                  </p>
                  <button
                    type="button"
                    onClick={startEdit}
                    className="mt-2 self-start rounded-[9px] bg-[var(--foreground-primary)] px-4 py-2 text-[13px] font-semibold text-[var(--background-elevated)] hover:opacity-90 transition"
                  >
                    Редагувати профіль
                  </button>
                </>
              )}
            </div>
          </div>

          {msg && (
            <p className="text-[13px] text-[var(--color-green)]">{msg}</p>
          )}

          {/*
            MOCK / FUTURE — потрібні бекенд-агрегати (книги / скарги):
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1 opacity-60">
              <div className="rounded-[9px] bg-[color-mix(in_srgb,var(--foreground-primary)_6%,var(--background-elevated))] px-3 py-2.5 text-[13px] text-[var(--color-muted-fg)]">
                Додано книг: —
              </div>
              <div className="rounded-[9px] bg-[color-mix(in_srgb,var(--foreground-primary)_6%,var(--background-elevated))] px-3 py-2.5 text-[13px] text-[var(--color-muted-fg)]">
                Перевірено скарг: —
              </div>
            </div>
          */}
        </>
      )}
    </div>
  );
}
