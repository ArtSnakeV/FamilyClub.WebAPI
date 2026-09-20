"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ACTION_LABELS_UK,
  MODULE_LABELS_UK,
  actionTone,
  fetchActionLogArchiveInfo,
  fetchActionLogStats,
  fetchActionLogs,
  formatLogDate,
  downloadActionLogArchive,
  runActionLogArchive,
  type ActionLogArchiveInfo,
  type ActionLogDto,
  type ActionLogStatsDto,
} from "@/lib/actionLog/actionLogApi";

const cardClass =
  "rounded-[12px] bg-[var(--background-elevated)] px-5 py-5 shadow-[var(--shadow-card)] border border-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)]";

const filterClass =
  "rounded-[9px] border border-[color-mix(in_srgb,var(--foreground-primary)_18%,transparent)] bg-[var(--background-elevated)] px-3 py-2.5 text-[14px] text-[var(--foreground-primary)] outline-none focus:border-[var(--color-green)] disabled:opacity-70 disabled:cursor-not-allowed placeholder:text-[var(--color-muted-fg)]";

const borderSubtle =
  "border-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)]";

type LogLevel = "info" | "success" | "warning" | "error";

function KpiCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint: string;
}) {
  return (
    <div className={`${cardClass} relative overflow-hidden min-h-[108px]`}>
      <div className="absolute left-0 top-3 bottom-3 w-[4px] rounded-full bg-[var(--color-green)]" />
      <p className="text-[13px] text-[var(--color-muted-fg)] pl-2">{title}</p>
      <p className="mt-2 text-[28px] font-bold leading-none tracking-tight pl-2 text-[var(--foreground-primary)]">
        {value}
      </p>
      <p className="mt-2 text-[12px] pl-2 text-[var(--color-muted-fg)]">{hint}</p>
    </div>
  );
}

function LevelBadge({ level }: { level: string }) {
  const key = (level || "info").toLowerCase() as LogLevel;
  const map: Record<LogLevel, { label: string; className: string }> = {
    info: { label: "Інформація", className: "bg-[#E8F1FF] text-[#175CD3]" },
    success: {
      label: "Успіх",
      className: "bg-[#E3FEE5] text-[var(--color-green)]",
    },
    warning: {
      label: "Попередження",
      className: "bg-[#FFF4E5] text-[#B54708]",
    },
    error: { label: "Помилка", className: "bg-[#FDECEC] text-[#B42318]" },
  };
  const item = map[key] ?? map.info;
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-semibold whitespace-nowrap ${item.className}`}
    >
      {item.label}
    </span>
  );
}

function toneClass(action: string) {
  const tone = actionTone(action);
  if (tone === "success") return "text-[var(--color-green)] font-semibold";
  if (tone === "warning") return "text-[#B54708] font-semibold";
  return "text-[var(--foreground-primary)]";
}

function formatCount(n: number): string {
  return n.toLocaleString("uk-UA");
}

function buildPageNumbers(
  current: number,
  totalPages: number
): Array<number | "…"> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages = new Set<number>();
  pages.add(1);
  pages.add(totalPages);
  for (let i = current - 1; i <= current + 1; i++) {
    if (i >= 1 && i <= totalPages) pages.add(i);
  }
  const sorted = [...pages].sort((a, b) => a - b);
  const result: Array<number | "…"> = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("…");
    result.push(sorted[i]);
  }
  return result;
}

export default function ActionLogPanel() {
  const [stats, setStats] = useState<ActionLogStatsDto | null>(null);
  const [items, setItems] = useState<ActionLogDto[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [searchDraft, setSearchDraft] = useState("");
  const [action, setAction] = useState("");
  const [module, setModule] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [archiveInfo, setArchiveInfo] = useState<ActionLogArchiveInfo | null>(
    null
  );
  const [archiveMessage, setArchiveMessage] = useState<string | null>(null);
  const [archiving, setArchiving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [paged, nextStats, archive] = await Promise.all([
        fetchActionLogs({
          search: search || undefined,
          action: action || undefined,
          module: module || undefined,
          level: level || undefined,
          page,
          pageSize,
        }),
        fetchActionLogStats(),
        fetchActionLogArchiveInfo().catch(() => null),
      ]);
      setItems(paged.items);
      setTotalCount(paged.totalCount);
      setStats(nextStats);
      setArchiveInfo(archive);
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error &&
          (e.message.includes("401") || e.message.includes("403"))
          ? "Немає доступу. Увійдіть як Admin."
          : "Не вдалося завантажити журнал дій."
      );
      setItems([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [search, action, module, level, page, pageSize]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchDraft.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [searchDraft]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalCount);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground-primary)]">
          Журнал дій
        </h1>
        <p className="text-[14px] text-[var(--color-muted-fg)] mt-1">
          Живий журнал зберігається 90 днів. Старіші записи архівуються; при
          новому архіві попередній замінюється.
        </p>
      </div>

      <section className={`${cardClass} flex flex-col gap-3`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-[16px] font-bold text-[var(--foreground-primary)]">
              Архів
            </h2>
            {archiveInfo ? (
              <p className="text-[13px] text-[var(--color-muted-fg)] mt-1">
                Останній архів: {formatLogDate(archiveInfo.createdAt)} ·{" "}
                {archiveInfo.recordCount} записів · період{" "}
                {formatLogDate(archiveInfo.periodFromUtc)} —{" "}
                {formatLogDate(archiveInfo.periodToUtc)}
              </p>
            ) : (
              <p className="text-[13px] text-[var(--color-muted-fg)] mt-1">
                Архіву ще немає (немає записів старших за 90 днів).
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={archiving}
              onClick={async () => {
                setArchiving(true);
                setArchiveMessage(null);
                try {
                  const result = await runActionLogArchive();
                  setArchiveMessage(result.message);
                  setArchiveInfo(result.archive);
                  await load();
                } catch {
                  setArchiveMessage("Не вдалося виконати архівування.");
                } finally {
                  setArchiving(false);
                }
              }}
              className="rounded-[9px] border border-[var(--color-green)] bg-transparent px-4 py-2 text-[14px] font-semibold text-[var(--color-green)] hover:bg-[color-mix(in_srgb,var(--color-green)_22%,var(--background-elevated))] disabled:opacity-60 transition"
            >
              {archiving ? "Архівування..." : "Архівувати зараз"}
            </button>
            {archiveInfo && (
              <button
                type="button"
                onClick={async () => {
                  try {
                    await downloadActionLogArchive();
                  } catch {
                    setArchiveMessage("Не вдалося завантажити архів.");
                  }
                }}
                className="rounded-[9px] bg-[var(--color-green)] px-4 py-2 text-[14px] font-semibold text-[var(--color-cream)] hover:opacity-90 transition"
              >
                Завантажити архів
              </button>
            )}
          </div>
        </div>
        {archiveMessage && (
          <p className="text-[13px] text-[var(--color-muted-fg)]">
            {archiveMessage}
          </p>
        )}
      </section>

      {error && (
        <p className="rounded-[9px] bg-[#FDECEC] px-4 py-3 text-[14px] text-[#B42318]">
          {error}
        </p>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <KpiCard
          title="Всього дій"
          value={stats ? formatCount(stats.total) : loading ? "…" : "0"}
          hint="Усі записи"
        />
        <KpiCard
          title="Успішні дії"
          value={stats ? formatCount(stats.success) : loading ? "…" : "0"}
          hint="Рівень success"
        />
        <KpiCard
          title="Попередження"
          value={stats ? formatCount(stats.warning) : loading ? "…" : "0"}
          hint="Рівень warning"
        />
        <KpiCard
          title="Помилки"
          value={stats ? formatCount(stats.error) : loading ? "…" : "0"}
          hint="Рівень error"
        />
        <KpiCard
          title="Унікальні користувачі"
          value={stats ? formatCount(stats.uniqueUsers) : loading ? "…" : "0"}
          hint="Хто виконував дії"
        />
      </section>

      <section className={`${cardClass}`}>
        <div className="flex flex-col xl:flex-row xl:items-center gap-3">
          <input
            type="search"
            value={searchDraft}
            onChange={(e) => setSearchDraft(e.target.value)}
            placeholder="Пошук у журналі дій..."
            className={`${filterClass} w-full xl:flex-1 min-w-0`}
          />
          <select
            value={action}
            onChange={(e) => {
              setAction(e.target.value);
              setPage(1);
            }}
            className={`${filterClass} xl:w-[180px]`}
          >
            <option value="">Всі дії</option>
            {Object.entries(ACTION_LABELS_UK).map(([code, label]) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={module}
            onChange={(e) => {
              setModule(e.target.value);
              setPage(1);
            }}
            className={`${filterClass} xl:w-[160px]`}
          >
            <option value="">Всі модулі</option>
            {Object.entries(MODULE_LABELS_UK).map(([code, label]) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={level}
            onChange={(e) => {
              setLevel(e.target.value);
              setPage(1);
            }}
            className={`${filterClass} xl:w-[160px]`}
          >
            <option value="">Усі рівні</option>
            <option value="info">Інформація</option>
            <option value="success">Успіх</option>
            <option value="warning">Попередження</option>
            <option value="error">Помилка</option>
          </select>
        </div>
      </section>

      <section className={`${cardClass} overflow-x-auto`}>
        <h2 className="text-[18px] font-bold text-[var(--foreground-primary)] mb-4">
          Журнал дій
        </h2>
        <table className="w-full min-w-[960px] text-left border-collapse">
          <thead>
            <tr
              className={`border-b ${borderSubtle} text-[12px] uppercase tracking-wide text-[var(--color-muted-fg)]`}
            >
              <th className="pb-3 pr-3 font-semibold">Дата і час</th>
              <th className="pb-3 pr-3 font-semibold">Користувач</th>
              <th className="pb-3 pr-3 font-semibold">Дія</th>
              <th className="pb-3 pr-3 font-semibold">Модуль</th>
              <th className="pb-3 pr-3 font-semibold">Деталі</th>
              <th className="pb-3 pr-3 font-semibold">IP-адреса</th>
              <th className="pb-3 font-semibold">Рівень</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-[14px] text-[var(--color-muted-fg)]"
                >
                  Завантаження...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-[14px] text-[var(--color-muted-fg)]"
                >
                  Записів немає. Вони зʼявляться після створення/видалення
                  сутностей, зміни ролей або режиму обслуговування.
                </td>
              </tr>
            ) : (
              items.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b ${borderSubtle} last:border-0 align-top`}
                >
                  <td className="py-3 pr-3 text-[14px] text-[var(--foreground-primary)] whitespace-nowrap">
                    {formatLogDate(row.createdAt)}
                  </td>
                  <td className="py-3 pr-3">
                    <p className="text-[14px] font-semibold text-[var(--foreground-primary)]">
                      {row.userName || "Система"}
                    </p>
                    <p className="text-[12px] text-[var(--color-muted-fg)]">
                      {row.userRoleHint || "—"}
                    </p>
                  </td>
                  <td
                    className={`py-3 pr-3 text-[14px] ${toneClass(row.action)}`}
                  >
                    {ACTION_LABELS_UK[row.action] ?? row.action}
                  </td>
                  <td className="py-3 pr-3 text-[14px] text-[var(--foreground-primary)]">
                    {MODULE_LABELS_UK[row.module] ?? row.module}
                  </td>
                  <td className="py-3 pr-3 text-[14px] text-[var(--color-muted-fg)] max-w-[260px]">
                    {row.details || "—"}
                  </td>
                  <td className="py-3 pr-3 text-[14px] text-[var(--foreground-primary)] whitespace-nowrap">
                    {row.ipAddress || "—"}
                  </td>
                  <td className="py-3">
                    <LevelBadge level={row.level} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div
          className={`mt-5 pt-4 border-t ${borderSubtle} flex flex-col lg:flex-row lg:items-center gap-4 justify-between`}
        >
          <p className="text-[13px] text-[var(--color-muted-fg)]">
            Показано {from}–{to} з {formatCount(totalCount)}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {buildPageNumbers(page, totalPages).map((p, i) =>
              p === "…" ? (
                <span
                  key={`e-${i}`}
                  className="px-1 text-[var(--color-muted-fg)]"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`min-w-9 h-9 rounded-[8px] text-[13px] font-semibold transition ${
                    p === page
                      ? "bg-[var(--color-green)] text-[var(--color-cream)]"
                      : "bg-[color-mix(in_srgb,var(--foreground-primary)_8%,var(--background-elevated))] text-[var(--foreground-primary)] hover:bg-[color-mix(in_srgb,var(--color-green)_22%,var(--background-elevated))]"
                  }`}
                >
                  {p}
                </button>
              )
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-[13px] text-[var(--color-muted-fg)]">
              Показувати:
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className={`${filterClass} py-1.5 w-[72px]`}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </label>
            <button
              type="button"
              disabled
              title="Експорт буде додано пізніше"
              className="rounded-[9px] bg-[var(--color-green)] px-5 py-2.5 text-[14px] font-semibold text-[var(--color-cream)] opacity-60 cursor-not-allowed"
            >
              Експорт звіту
            </button>
            {/* FUTURE: CSV/Excel export */}
          </div>
        </div>
      </section>
    </div>
  );
}
