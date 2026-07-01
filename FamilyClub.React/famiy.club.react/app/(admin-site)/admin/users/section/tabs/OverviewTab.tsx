"use client";

import { UserInfo } from "../../hooks/useAllUsersInfo";

interface Props {
    user: UserInfo;
}

export default function OverviewTab({ user }: Props) {
    const isLocked = !!user.lockoutEnd && new Date(user.lockoutEnd).getTime() > Date.now();

    const rows: [string, string][] = [
        ["Повне ім'я", `${user.name ?? ""} ${user.surname ?? ""}`.trim() || "—"],
        ["Email", user.email ?? "—"],
        ["Роль", user.role ?? "Користувач"],
        ["Статус", isLocked ? "Заблокований" : "Активний"],
    ];

    return (
        <div>
            <h3 className="font-semibold text-[20px] mb-3">Про користувача</h3>
            <div className="flex flex-col gap-2">
                {rows.map(([label, value]) => (
                    <div key={label} className="flex justify-between text-sm">
                        <span className="text-[var(--color-black)]">{label}:</span>
                        <span className="text-[var(--color-black)]">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}