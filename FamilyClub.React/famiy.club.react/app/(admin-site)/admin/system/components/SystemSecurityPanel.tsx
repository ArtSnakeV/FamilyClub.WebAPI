"use client";

/**
 * Візуальний макет сторінки «Система та безпека» (Figma).
 * Дані не підключені — поля порожні; зразки в mockData.ts (закоментовано).
 */

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

function SeverityBadge({ level }: { level: "high" | "medium" | "low" }) {
  const map = {
    high: { label: "Високий", className: "bg-[#FDECEC] text-[#B42318]" },
    medium: { label: "Середній", className: "bg-[#FFF4E5] text-[#B54708]" },
    low: { label: "Низький", className: "bg-[#F0F0F0] text-[#5F5F5F]" },
  };
  const item = map[level];
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${item.className}`}
    >
      {item.label}
    </span>
  );
}

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${
        ok
          ? "bg-[#E3FEE5] text-[var(--color-green)]"
          : "bg-[#FDECEC] text-[#B42318]"
      }`}
    >
      {label}
    </span>
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
      className={`relative h-7 w-12 rounded-full flex-shrink-0 opacity-70 cursor-not-allowed ${
        checked ? "bg-[var(--color-green)]" : "bg-[#D0CBC2]"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function SystemSecurityPanel() {
  // MOCK / FUTURE — підключити mockData або API:
  // const kpi = MOCK_KPI;
  // const suspicious = MOCK_SUSPICIOUS;
  // const backups = MOCK_BACKUPS;
  // const logins = MOCK_ADMIN_LOGINS;
  // const blockedIps = MOCK_BLOCKED_IPS;
  // const security = MOCK_SECURITY;

  const suspicious: Array<{
    id: string;
    title: string;
    detail: string;
    severity: "high" | "medium" | "low";
    when: string;
  }> = [];
  const backups: Array<{
    id: string;
    title: string;
    when: string;
    size: string;
    status: "success" | "failed";
  }> = [];
  const logins: Array<{
    id: string;
    name: string;
    role: string;
    ip: string;
    device: string;
    location: string;
    time: string;
    ok: boolean;
  }> = [];
  const blockedIps: Array<{
    id: string;
    ip: string;
    reason: string;
    blockedAt: string;
    until: string;
  }> = [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F1F1F]">
          Система та безпека
        </h1>
        <p className="text-[14px] text-[#6B6B6B] mt-1">
          Моніторинг, резервні копії та налаштування безпеки (макет — без
          даних)
        </p>
      </div>

      {/* KPI */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
        <KpiCard
          title="Статус системи"
          value="—"
          hint="Дані недоступні"
          valueClass="text-[#999]"
        />
        {/* MOCK: value="Онлайн" hint="Усі системи працюють стабільно" valueClass="text-[var(--color-green)]" */}
        <KpiCard
          title="Навантаження серверу"
          value="—"
          hint="Норма до: 70%"
          valueClass="text-[#999]"
        />
        <KpiCard
          title="Використання пам'яті"
          value="—"
          hint="Норма до: 80%"
          valueClass="text-[#999]"
        />
        <KpiCard
          title="Активні сесії"
          value="—"
          hint="За останню годину"
          valueClass="text-[#999]"
        />
        <KpiCard
          title="Дисковий простір"
          value="—"
          hint="Використання диска"
          valueClass="text-[#999]"
        />
        <KpiCard
          title="Заблоковані IP"
          value="—"
          hint="За останню добу"
          valueClass="text-[#999]"
        />
      </section>

      {/* Suspicious + Backups */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className={`${cardClass} flex flex-col gap-4`}>
          <h2 className="text-[18px] font-bold text-[#1F1F1F]">
            Підозріла активність
          </h2>
          {suspicious.length === 0 ? (
            <EmptyList label="Подій немає (розділ у розробці)" />
          ) : (
            <ul className="flex flex-col gap-3">
              {suspicious.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-3 rounded-[10px] border border-[#F0EDE6] px-3 py-3"
                >
                  <span
                    className="mt-1 h-2.5 w-2.5 rounded-full bg-[#B54708] flex-shrink-0"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-semibold text-[#1F1F1F]">
                      {item.title}
                    </p>
                    <p className="text-[12px] text-[#888] mt-0.5">
                      {item.detail}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <SeverityBadge level={item.severity} />
                    <span className="text-[11px] text-[#999]">{item.when}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={`${cardClass} flex flex-col gap-4`}>
          <h2 className="text-[18px] font-bold text-[#1F1F1F]">
            Резервна копія системи
          </h2>
          {backups.length === 0 ? (
            <EmptyList label="Копій немає (розділ у розробці)" />
          ) : (
            <ul className="flex flex-col gap-3">
              {backups.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-[10px] border border-[#F0EDE6] px-3 py-3"
                >
                  <span
                    className="h-8 w-8 rounded-[8px] bg-[#E3FEE5] flex items-center justify-center flex-shrink-0"
                    aria-hidden
                  >
                    <span className="h-3 w-3 rounded-[2px] border-2 border-[var(--color-green)]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-semibold text-[#1F1F1F]">
                      {item.title}
                    </p>
                    <p className="text-[12px] text-[#888] mt-0.5">
                      {item.when} · {item.size}
                    </p>
                  </div>
                  <StatusPill
                    ok={item.status === "success"}
                    label={item.status === "success" ? "Успішно" : "Помилка"}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Quick actions — кнопки disabled / без дії */}
      <section className={`${cardClass}`}>
        <h2 className="text-[18px] font-bold text-[#1F1F1F] mb-4">
          Швидкі дії
        </h2>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled
            className="rounded-[9px] border border-[var(--color-green)] bg-transparent px-5 py-2.5 text-[14px] font-semibold text-[var(--color-green)] opacity-60 cursor-not-allowed"
          >
            + Додати менеджера
          </button>
          {/* FUTURE: router.push("/admin/managers/addEditManager") */}
          <button
            type="button"
            disabled
            className="rounded-[9px] border border-[#2F2F2F]/40 bg-white px-5 py-2.5 text-[14px] font-semibold text-[#2F2F2F] opacity-60 cursor-not-allowed"
          >
            Заблоковані користувачі
          </button>
          {/* FUTURE: router.push("/admin/users/blockedUsers") */}
          <button
            type="button"
            disabled
            className="rounded-[9px] bg-[var(--color-green)] px-5 py-2.5 text-[14px] font-semibold text-white opacity-60 cursor-not-allowed"
          >
            Експорт звіту
          </button>
          {/* FUTURE: export API */}
        </div>
      </section>

      {/* Admin logins */}
      <section className={`${cardClass} overflow-x-auto`}>
        <h2 className="text-[18px] font-bold text-[#1F1F1F] mb-4">
          Останні входи в адмін панель
        </h2>
        <table className="w-full min-w-[720px] text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E8E4DC] text-[12px] uppercase tracking-wide text-[#888]">
              <th className="pb-3 pr-3 font-semibold">Користувач</th>
              <th className="pb-3 pr-3 font-semibold">IP-адреса</th>
              <th className="pb-3 pr-3 font-semibold">Пристрій / Браузер</th>
              <th className="pb-3 pr-3 font-semibold">Локація</th>
              <th className="pb-3 pr-3 font-semibold">Час входу</th>
              <th className="pb-3 font-semibold">Статус</th>
            </tr>
          </thead>
          <tbody>
            {logins.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-[14px] text-[#999]"
                >
                  Записів немає (розділ у розробці)
                </td>
              </tr>
            ) : (
              logins.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#F0EDE6] last:border-0"
                >
                  <td className="py-3 pr-3">
                    <p className="text-[14px] font-semibold text-[#1F1F1F]">
                      {row.name}
                    </p>
                    <p className="text-[12px] text-[#888]">{row.role}</p>
                  </td>
                  <td className="py-3 pr-3 text-[14px] text-[#2F2F2F]">
                    {row.ip}
                  </td>
                  <td className="py-3 pr-3 text-[14px] text-[#2F2F2F]">
                    {row.device}
                  </td>
                  <td className="py-3 pr-3 text-[14px] text-[#2F2F2F]">
                    {row.location}
                  </td>
                  <td className="py-3 pr-3 text-[14px] text-[#2F2F2F]">
                    {row.time}
                  </td>
                  <td className="py-3">
                    <StatusPill
                      ok={row.ok}
                      label={row.ok ? "Успішно" : "Невдало"}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* Blocked IPs + Security settings */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className={`${cardClass} overflow-x-auto`}>
          <h2 className="text-[18px] font-bold text-[#1F1F1F] mb-4">
            Блокування IP-адрес
          </h2>
          <table className="w-full min-w-[480px] text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E4DC] text-[12px] uppercase tracking-wide text-[#888]">
                <th className="pb-3 pr-3 font-semibold">IP-адреса</th>
                <th className="pb-3 pr-3 font-semibold">Причина</th>
                <th className="pb-3 pr-3 font-semibold">Заблоковано</th>
                <th className="pb-3 font-semibold">Діє до</th>
              </tr>
            </thead>
            <tbody>
              {blockedIps.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-10 text-center text-[14px] text-[#999]"
                  >
                    Список порожній (розділ у розробці)
                  </td>
                </tr>
              ) : (
                blockedIps.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-[#F0EDE6] last:border-0"
                  >
                    <td className="py-3 pr-3 text-[14px] font-medium text-[#1F1F1F]">
                      {row.ip}
                    </td>
                    <td className="py-3 pr-3 text-[14px] text-[#2F2F2F]">
                      {row.reason}
                    </td>
                    <td className="py-3 pr-3 text-[14px] text-[#2F2F2F]">
                      {row.blockedAt}
                    </td>
                    <td className="py-3 text-[14px] text-[#2F2F2F]">
                      {row.until}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className={`${cardClass}`}>
          <h2 className="text-[18px] font-bold text-[#1F1F1F] mb-1">
            Налаштування безпеки
          </h2>
          <p className="text-[12px] text-[#888] mb-3">
            Лише макет — збереження вимкнено
          </p>
          <ul className="flex flex-col">
            <SecurityRow label="Двофакторна автентифікація">
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#999]">Вимкнено</span>
                <DisabledToggle checked={false} />
                {/* MOCK: checked={security.twoFactor} */}
              </div>
            </SecurityRow>
            <SecurityRow label="CAPTCHA для форм">
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#999]">Вимкнено</span>
                <DisabledToggle checked={false} />
              </div>
            </SecurityRow>
            <SecurityRow label="Обмеження спроб входу">
              <select
                disabled
                defaultValue=""
                className="rounded-[9px] border border-[#E0DCD3] bg-[#FAFAF7] px-3 py-2 text-[13px] text-[#999] cursor-not-allowed opacity-80"
              >
                <option value="" disabled>
                  Не налаштовано
                </option>
                {/* <option value="5">5 спроб</option> */}
                {/* <option value="10">10 спроб</option> */}
                {/* <option value="20">20 спроб</option> */}
              </select>
            </SecurityRow>
            <SecurityRow label="Таймаут сесії">
              <select
                disabled
                defaultValue=""
                className="rounded-[9px] border border-[#E0DCD3] bg-[#FAFAF7] px-3 py-2 text-[13px] text-[#999] cursor-not-allowed opacity-80"
              >
                <option value="" disabled>
                  Не налаштовано
                </option>
                {/* <option value="15">15 хвилин</option> */}
                {/* <option value="30">30 хвилин</option> */}
                {/* <option value="60">60 хвилин</option> */}
              </select>
            </SecurityRow>
            <SecurityRow label="Сповіщення про підозрілу активність">
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#999]">Вимкнено</span>
                <DisabledToggle checked={false} />
              </div>
            </SecurityRow>
            <SecurityRow label="Шифроване з'єднання">
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#999]">Вимкнено</span>
                <DisabledToggle checked={false} />
              </div>
            </SecurityRow>
          </ul>
        </div>
      </section>
    </div>
  );
}
