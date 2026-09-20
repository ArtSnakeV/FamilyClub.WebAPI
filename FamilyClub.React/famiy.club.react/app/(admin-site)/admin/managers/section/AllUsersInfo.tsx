"use client";

import { useMemo, useState } from "react";
import { UserInfo } from "../hooks/useAllUsersInfo";
import { useTheme } from "@/lib/theme/ThemeProvider";
import SearchUsers from "./SearchUsers";
import UserCard from "./UserCard";

interface Props {
    users: UserInfo[];
    onSelectUser: (user: UserInfo) => void;
    selectedUserId?: string;
    onLockToggle: (user: UserInfo) => void;
    onDelete: (user: UserInfo) => void;
}

const GRID_COLS = "grid-cols-[minmax(180px,2fr)_minmax(90px,1fr)_minmax(90px,1fr)_minmax(60px,auto)]";

export default function AllUsersInfo({
    users,
    onSelectUser,
    onLockToggle,
    onDelete,
}: Props) {
    const { theme } = useTheme();
    const isNight = theme === "ink-night";
    const ink = isNight ? "var(--color-cream)" : "var(--color-black)";

    const [search, setSearch] = useState("");
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const filteredUsers = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return users;
        return users.filter((user) => {
            const fullName = `${user.name ?? ""} ${user.surname ?? ""}`.toLowerCase();
            const email = (user.email ?? "").toLowerCase();
            const role = (user.role ?? "User").toLowerCase();
            return fullName.includes(query) || email.includes(query) || role.includes(query);
        });
    }, [users, search]);

    const isBlocked = (user: UserInfo) =>
        !!user.lockoutEnd && new Date(user.lockoutEnd).getTime() > Date.now();

    function getRoleBadge(role?: string) {
        const map: Record<string, { label: string; className: string }> = {
            Admin: { label: "Адмін", className: "bg-purple-200 text-purple-800" },
            Manager: { label: "Менеджер", className: "bg-[#31004030] text-[#310040]" },
            User: { label: "Користувач", className: "bg-[#3A3A3A40] text-[#595959]" },
        };
        const badge = map[role ?? "User"] ?? map["User"];
        return (
            <span
                className={`px-3 py-1 rounded-[9px] h-[30px] text-sm font-medium whitespace-nowrap ${badge.className}`}
            >
                {badge.label}
            </span>
        );
    }

    return (
        <div className="relative w-[882px] max-w-full h-auto min-h-[900px] rounded-2xl overflow-hidden">
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none admin-parchment-bg"
                style={{
                    backgroundImage: "url('/images/usersPageAdmin/Rectangle 793.png')",
                    backgroundSize: "100% 100%",
                }}
            />
            <div className="relative z-10" style={{ color: ink }}>
                <div className="mt-12">
                    <SearchUsers value={search} onChange={setSearch} />
                </div>

                <div className={`grid ${GRID_COLS} gap-x-1 mt-[3vh] mx-12 text-[20px] font-semibold`}>
                    <span>Користувач</span>
                    <span className="whitespace-nowrap text-left">Роль</span>
                    <span className="whitespace-nowrap text-left -ml-2">Статус</span>
                    <span>Дії</span>
                </div>

                <div
                    className="mx-7 h-px mt-4 mb-4"
                    style={{
                        backgroundColor: isNight ? "rgba(237,232,223,0.25)" : "#8D8C89",
                    }}
                />

                {filteredUsers.map((user) => {
                    const blocked = isBlocked(user);

                    return (
                        <div
                            key={user.id}
                            onClick={() => onSelectUser(user)}
                            className={`grid ${GRID_COLS} gap-x-13 relative mx-5 px-8 py-4 items-center transition ${
                                isNight ? "hover:bg-white/5" : "hover:bg-gray-50"
                            }`}
                        >
                            <div className="min-w-0">
                                <UserCard user={user} variant="row" />
                            </div>

                            <div className="min-w-0">{getRoleBadge(user.role)}</div>

                            <div
                                className={`text-sm font-medium flex items-center gap-1 min-w-0 whitespace-nowrap ${
                                    blocked ? "text-[#981717]" : ""
                                }`}
                                style={
                                    blocked
                                        ? undefined
                                        : {
                                              color: isNight
                                                  ? "rgba(237,232,223,0.7)"
                                                  : "#B9B9B9",
                                          }
                                }
                            >
                                <span className="w-2 h-2 rounded-full bg-current inline-block shrink-0" />
                                {blocked ? "Заблокований" : "Активний"}
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenuId((prev) =>
                                        prev === user.id ? null : user.id
                                    );
                                }}
                                className={`w-[30px] h-[32px] rounded-[9px] shadow-[var(--shadow-control)]
                                flex items-center justify-center shrink-0 justify-self-center -ml-6 ${
                                    isNight ? "hover:bg-white/10" : "hover:bg-gray-200"
                                }`}
                            >
                                ...
                            </button>

                            {openMenuId === user.id && (
                                <div
                                    className="absolute right-4 top-full mt-1 w-[160px] max-w-[calc(100%-2rem)] bg-[var(--background-elevated)] text-[var(--foreground-primary)] shadow-[var(--shadow-panel)] rounded-lg z-50"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        className="w-full px-4 py-2 text-left hover:bg-[var(--color-menu-hover)] whitespace-nowrap"
                                        onClick={() => {
                                            onLockToggle(user);
                                            setOpenMenuId(null);
                                        }}
                                    >
                                        {isBlocked(user) ? "Розблокувати" : "Заблокувати"}
                                    </button>

                                    <button
                                        className="w-full px-4 py-2 text-left hover:bg-red-100/20 text-red-500 whitespace-nowrap"
                                        onClick={() => {
                                            onDelete(user);
                                            setOpenMenuId(null);
                                        }}
                                    >
                                        Видалити
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
