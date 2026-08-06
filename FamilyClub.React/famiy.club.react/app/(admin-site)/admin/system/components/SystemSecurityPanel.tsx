"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BlockedIpDto,
  fetchBlockedIps,
  blockIpAddress,
  unblockIpAddress,
} from "@/lib/api/blockedIpApi";
import {
  ActiveSessionDto,
  fetchActiveSessions,
} from "@/lib/api/presenceApi";

const cardClass =
  "rounded-[12px] bg-white px-5 py-5 shadow-[0_0_15px_rgba(0,0,0,0.12)]";

function KpiCard({
  title,
  value,
  hint,
  valueClass = "text-[#1F1F1F]",
}: {
  title: string;
  value: string;
  hint: string;
  valueClass?: string;
}) {
  return (
    <div className={`${cardClass} relative overflow-hidden min-h-[108px]`}>
      <div className="absolute left-0 top-3 bottom-3 w-[4px] rounded-full bg-[var(--color-green)]" />
      <p className="text-[13px] text-[#6B6B6B] pl-2">{title}</p>
      <p
        className={`mt-2 text-[28px] font-bold leading-none tracking-tight pl-2 ${valueClass}`}
      >
        {value}
      </p>
      <p className="mt-2 text-[12px] text-[#888] pl-2">{hint}</p>
    </div>
  );
}

function EmptyList({ label }: { label: string }) {
  return (
    <p className="text-[14px] text-[#999] py-6 text-center">{label}</p>
  );
}

function SecurityRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center justify-between gap-3 py-2.5 border-b border-[#F0EDE6] last:border-0">
      <span className="text-[14px] text-[#2F2F2F]">{label}</span>
      <div className="flex-shrink-0">{children}</div>
    </li>
  );
}

function DisabledToggle({ checked }: { checked: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled
      className={`relative h-7 w-12 rounded-full flex-shrink-0 opacity-70 cursor-not-allowed ${checked ? "bg-[var(--color-green)]" : "bg-[#D0CBC2]"
        }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow ${checked ? "translate-x-5" : "translate-x-0"
          }`}
      />
    </button>
  );
}

function formatDateTime(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function parseUserAgent(ua: string | null): string {
  if (!ua) return "Браузер / Невідомо";
  if (ua.includes("Chrome")) return "Chrome / Windows";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari / Mobile";
  if (ua.includes("Edge")) return "Edge";
  return ua.slice(0, 30);
}

export default function SystemSecurityPanel() {
  const router = useRouter();
  const [blockedIps, setBlockedIps] = useState<BlockedIpDto[]>([]);
  const [activeSessions, setActiveSessions] = useState<ActiveSessionDto[]>([]);
  const [loadingBlocked, setLoadingBlocked] = useState(true);
  const [loadingActive, setLoadingActive] = useState(true);

  // Block Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ipInput, setIpInput] = useState("");
  const [reasonInput, setReasonInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadBlockedIps = async () => {
    setLoadingBlocked(true);
    try {
      const data = await fetchBlockedIps();
      setBlockedIps(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingBlocked(false);
    }
  };

  const loadActiveSessions = async () => {
    try {
      const data = await fetchActiveSessions();
      setActiveSessions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingActive(false);
    }
  };

  useEffect(() => {
    loadBlockedIps();
    loadActiveSessions();

    const interval = setInterval(() => {
      loadActiveSessions();
    }, 10000); // refresh active users every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleOpenBlockModal = (initialIp: string = "") => {
    setIpInput(initialIp);
    setReasonInput("");
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleBlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ipInput.trim()) return;

    setSubmitting(true);
    setErrorMessage(null);
    try {
      await blockIpAddress(ipInput.trim(), reasonInput.trim() || undefined);
      setIsModalOpen(false);
      setIpInput("");
      setReasonInput("");
      await Promise.all([loadBlockedIps(), loadActiveSessions()]);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Помилка при блокуванні IP");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUnblock = async (ipAddress: string) => {
    if (!confirm(`Розблокувати IP ${ipAddress}?`)) return;
    try {
      await unblockIpAddress(ipAddress);
      await loadBlockedIps();
    } catch (err) {
      alert("Не вдалося розблокувати IP");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F1F1F]">
          Система та безпека
        </h1>
        <p className="text-[14px] text-[#6B6B6B] mt-1">
          Моніторинг системи, заблоковані IP-адреси та онлайн користувачі
        </p>
      </div>

      {/* KPI */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
        <KpiCard
          title="Статус системи"
          value="Онлайн"
          hint="Усі системи працюють"
          valueClass="text-[var(--color-green)]"
        />
        <KpiCard
          title="Навантаження серверу"
          value="Норма"
          hint="Норма до: 70%"
          valueClass="text-[var(--color-green)]"
        />
        <KpiCard
          title="Використання пам'яті"
          value="Оптимальне"
          hint="In-memory кешування"
          valueClass="text-[var(--color-green)]"
        />
        <KpiCard
          title="Активні сесії онлайн"
          value={loadingActive ? "..." : String(activeSessions.length)}
          hint="Користувачі зараз на сайті"
          valueClass="text-[var(--color-green)]"
        />
        <KpiCard
          title="Дисковий простір"
          value="Норма"
          hint="База даних PostgreSQL"
          valueClass="text-[#1F1F1F]"
        />
        <KpiCard
          title="Заблоковані IP"
          value={loadingBlocked ? "..." : String(blockedIps.length)}
          hint="Всього заблоковано"
          valueClass={blockedIps.length > 0 ? "text-[#B42318]" : "text-[#1F1F1F]"}
        />
      </section>

      {/* Quick actions */}
      <section className={`${cardClass}`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-[18px] font-bold text-[#1F1F1F]">
              Управління безпекою IP
            </h2>
            <p className="text-[13px] text-[#6B6B6B]">
              Додавання нових IP у чорний список або керування заблокованими
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => handleOpenBlockModal()}
              className="rounded-[9px] bg-[#B42318] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#911c13] transition shadow-sm"
            >
              + Заблокувати IP-адресу
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/users/blockedUsers")}
              className="rounded-[9px] border border-[#2F2F2F]/40 bg-white px-5 py-2.5 text-[14px] font-semibold text-[#2F2F2F] hover:bg-gray-50 transition"
            >
              Заблоковані акаунти користувачів
            </button>
          </div>
        </div>
      </section>

      {/* Active Online Users with IPs */}
      <section className={`${cardClass} overflow-x-auto`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[18px] font-bold text-[#1F1F1F]">
              Користувачі онлайн на сайті (IP-адреси)
            </h2>
          </div>
          <span className="rounded-full bg-[#E3FEE5] px-3 py-1 text-[12px] font-semibold text-[var(--color-green)]">
            ● Live: {activeSessions.length} активних
          </span>
        </div>

        <table className="w-full min-w-[720px] text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E8E4DC] text-[12px] uppercase tracking-wide text-[#888]">
              <th className="pb-3 pr-3 font-semibold">IP-адреса</th>
              <th className="pb-3 pr-3 font-semibold">Користувач / Сесія</th>
              <th className="pb-3 pr-3 font-semibold">Пристрій / Браузер</th>
              <th className="pb-3 pr-3 font-semibold">Останній пінг</th>
              <th className="pb-3 font-semibold text-right">Дія</th>
            </tr>
          </thead>
          <tbody>
            {loadingActive ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[14px] text-[#999]">
                  Завантаження активних сесій...
                </td>
              </tr>
            ) : activeSessions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[14px] text-[#999]">
                  Наразі немає активних користувачів на сайті
                </td>
              </tr>
            ) : (
              activeSessions.map((session) => (
                <tr
                  key={session.sessionId}
                  className="border-b border-[#F0EDE6] last:border-0 hover:bg-[#FAF9F5] transition"
                >
                  <td className="py-3 pr-3">
                    <span className="font-mono font-bold text-[14px] text-[#1F1F1F]">
                      {session.ipAddress || "127.0.0.1"}
                    </span>
                  </td>
                  <td className="py-3 pr-3">
                    <p className="text-[14px] font-medium text-[#1F1F1F]">
                      {session.userName || "Гість (Анонім)"}
                    </p>
                    <p className="text-[11px] text-[#888] font-mono">
                      ID: {session.sessionId.slice(0, 13)}...
                    </p>
                  </td>
                  <td className="py-3 pr-3 text-[13px] text-[#555]">
                    {parseUserAgent(session.userAgent)}
                  </td>
                  <td className="py-3 pr-3 text-[13px] text-[#555]">
                    {formatDateTime(session.lastSeen)}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleOpenBlockModal(session.ipAddress)}
                      className="rounded-[6px] bg-[#FDECEC] px-3 py-1 text-[12px] font-semibold text-[#B42318] hover:bg-[#fcd3d3] transition"
                    >
                      Заблокувати IP
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* Blocked IPs & Security Settings */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className={`${cardClass} overflow-x-auto`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-bold text-[#1F1F1F]">
              Чорний список IP-адрес
            </h2>
            <button
              type="button"
              onClick={() => handleOpenBlockModal()}
              className="text-[13px] font-semibold text-[var(--color-green)] hover:underline"
            >
              + Додати
            </button>
          </div>

          <table className="w-full min-w-[480px] text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E4DC] text-[12px] uppercase tracking-wide text-[#888]">
                <th className="pb-3 pr-3 font-semibold">IP-адреса</th>
                <th className="pb-3 pr-3 font-semibold">Причина</th>
                <th className="pb-3 pr-3 font-semibold">Заблоковано</th>
                <th className="pb-3 font-semibold text-right">Дія</th>
              </tr>
            </thead>
            <tbody>
              {loadingBlocked ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-[14px] text-[#999]">
                    Завантаження чорного списку...
                  </td>
                </tr>
              ) : blockedIps.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-[14px] text-[#999]">
                    Список заблокованих IP-адрес порожній
                  </td>
                </tr>
              ) : (
                blockedIps.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-[#F0EDE6] last:border-0 hover:bg-[#FAF9F5] transition"
                  >
                    <td className="py-3 pr-3 font-mono font-medium text-[14px] text-[#1F1F1F]">
                      {row.ipAddress}
                    </td>
                    <td className="py-3 pr-3 text-[13px] text-[#444]">
                      {row.reason || "—"}
                    </td>
                    <td className="py-3 pr-3 text-[13px] text-[#666]">
                      {formatDateTime(row.createdAt)}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleUnblock(row.ipAddress)}
                        className="rounded-[6px] border border-[#CCCCCC] bg-white px-2.5 py-1 text-[12px] font-semibold text-[#333] hover:bg-gray-100 transition"
                      >
                        Розблокувати
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className={`${cardClass}`}>
          <h2 className="text-[18px] font-bold text-[#1F1F1F] mb-1">
            Параметри захисту від спаму та атак
          </h2>
          <p className="text-[12px] text-[#888] mb-3">
            Системні правила фільтрації IP та ліміти запитів
          </p>
          <ul className="flex flex-col">
            <SecurityRow label="Автоматичне блокування за IP">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium text-[var(--color-green)]">Увімкнено</span>
                <span className="h-2 w-2 rounded-full bg-[var(--color-green)]" />
              </div>
            </SecurityRow>
            <SecurityRow label="Кешування чорного списку (IMemoryCache)">
              <span className="text-[13px] text-[#555]">Active (10 хв TTL)</span>
            </SecurityRow>
            <SecurityRow label="Rate Limiter (Обмеження частоти запитів)">
              <span className="text-[13px] text-[#555]">100 запитів / хв</span>
            </SecurityRow>
            <SecurityRow label="Двофакторна автентифікація">
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#999]">Вимкнено</span>
                <DisabledToggle checked={false} />
              </div>
            </SecurityRow>
            <SecurityRow label="CAPTCHA для підтвердження дій">
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#999]">Вимкнено</span>
                <DisabledToggle checked={false} />
              </div>
            </SecurityRow>
          </ul>
        </div>
      </section>

      {/* Block IP Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-[16px] bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-150">
            <h3 className="text-xl font-bold text-[#1F1F1F] mb-1">
              Блокування IP-адреси
            </h3>
            <p className="text-[13px] text-[#666] mb-4">
              Користувачі з цієї IP-адреси отримають помилку 403 Forbidden при спробі доступу до API.
            </p>

            {errorMessage && (
              <div className="mb-4 rounded-lg bg-[#FDECEC] p-3 text-[13px] text-[#B42318]">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleBlockSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#333] mb-1">
                  IP-адреса *
                </label>
                <input
                  type="text"
                  required
                  placeholder="наприклад 192.168.1.100 або 203.0.113.195"
                  value={ipInput}
                  onChange={(e) => setIpInput(e.target.value)}
                  className="w-full rounded-[9px] border border-[#D0CBC2] px-3.5 py-2 text-[14px] text-[#1F1F1F] focus:border-[var(--color-green)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#333] mb-1">
                  Причина блокування (необов&apos;язково)
                </label>
                <textarea
                  rows={3}
                  placeholder="наприклад: Спам-активність, підозрілі спроби входу"
                  value={reasonInput}
                  onChange={(e) => setReasonInput(e.target.value)}
                  className="w-full rounded-[9px] border border-[#D0CBC2] px-3.5 py-2 text-[14px] text-[#1F1F1F] focus:border-[var(--color-green)] focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-[9px] border border-[#CCCCCC] bg-white px-4 py-2 text-[14px] font-semibold text-[#444] hover:bg-gray-100 transition"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-[9px] bg-[#B42318] px-5 py-2 text-[14px] font-semibold text-white hover:bg-[#911c13] transition disabled:opacity-50"
                >
                  {submitting ? "Збереження..." : "Заблокувати"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
