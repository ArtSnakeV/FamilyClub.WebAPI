"use client";

import { UserInfo } from "../../hooks/useAllUsersInfo";
import { useTheme } from "@/lib/theme/ThemeProvider";

interface Props {
    user: UserInfo;
    ordersCount: number;
    spentAmount: number;
    reviewsCount: number;
    complaintsCount: number;
    handleLockoutEnd: () => void;
    onAddManager: (id: string) => void;
}

export default function OverviewTab({
    user,
    ordersCount,
    spentAmount,
    reviewsCount,
    handleLockoutEnd,
    complaintsCount,
    onAddManager,
}: Props) {
    const { theme } = useTheme();
    const isNight = theme === "ink-night";
    const ink = isNight ? "var(--color-cream)" : "var(--color-black)";
    const muted = isNight ? "rgba(237, 232, 223, 0.75)" : "rgba(36, 36, 36, 0.7)";

    const isLocked =
        !!user.lockoutEnd && new Date(user.lockoutEnd).getTime() > Date.now();

    const rows: [string, string][] = [
        ["Повне ім'я", `${user.name ?? ""} ${user.surname ?? ""}`.trim() || "—"],
        ["Email", user.email ?? "—"],
        ["Роль", user.role ?? "Користувач"],
        ["Статус", isLocked ? "Заблокований" : "Активний"],
    ];
    const rowsStats: [string, string][] = [
        ["Оформлено замовлень", `${ordersCount}`],
        ["Витрачено коштів", `${spentAmount.toLocaleString("uk-UA")} грн`],
        ["Додано відгуків", `${reviewsCount}`],
        ["Додано скарг", `${complaintsCount}`],
    ];

    return (
        <div className="flex flex-col gap-1 h-auto min-h-[500px] max-w-full" style={{ color: ink }}>
            <div>
                <h3 className="font-semibold text-[20px] mb-3">Про користувача</h3>
                <div className="flex flex-col gap-2">
                    {rows.map(([label, value]) => (
                        <div
                            key={label}
                            className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm"
                        >
                            <span className="whitespace-nowrap" style={{ color: muted }}>
                                {label}:
                            </span>
                            <span className="text-right truncate max-w-full" style={{ color: ink }}>
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div
                className="w-[470px] max-w-full h-px mt-12 mb-4"
                style={{
                    backgroundColor: isNight ? "rgba(237,232,223,0.25)" : "#8D8C89",
                }}
            />
            <div>
                <h3 className="font-semibold text-[20px] mt-4 mb-3">Статистика</h3>
                <div className="flex flex-col gap-2">
                    {rowsStats.map(([label, value]) => (
                        <div
                            key={label}
                            className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm"
                        >
                            <span className="whitespace-nowrap" style={{ color: muted }}>
                                {label}:
                            </span>
                            <span className="text-right truncate max-w-full" style={{ color: ink }}>
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="p-4 top-[24px] relative w-full max-w-full gap-4 flex flex-wrap">
                    <button
                        type="submit"
                        onClick={onAddManager ? () => onAddManager(user.id) : undefined}
                        className="flex-1 min-w-[160px] h-[40px] rounded-[9px] bg-[var(--color-green)] text-[var(--color-cream)] 
                        text-[20px] font-medium transition-all duration-200 hover:opacity-90 hover:shadow-[var(--shadow-panel)] 
                        active:scale-[0.98] disabled:opacity-50 whitespace-nowrap"
                    >
                        Редагувати профіль
                    </button>
                    <button
                        type="button"
                        onClick={handleLockoutEnd}
                        className="flex-1 min-w-[160px] h-[40px] rounded-[9px] bg-transparent text-[var(--color-green)] border-2 
                        border-[var(--color-green)] text-[20px] font-medium transition-all
                         duration-200 hover:opacity-90 hover:shadow-[var(--shadow-panel)] 
                         active:scale-[0.98] disabled:opacity-50 whitespace-nowrap"
                    >
                        {isLocked ? "Розблокувати" : "Заблокувати"}
                    </button>
                </div>
            </div>
        </div>
    );
}
