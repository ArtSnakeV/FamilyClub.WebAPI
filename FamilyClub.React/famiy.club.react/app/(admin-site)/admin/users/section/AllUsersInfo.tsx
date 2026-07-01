"use client";

import { useMemo, useState } from "react";
import { UserInfo } from "../hooks/useAllUsersInfo";
import SearchUsers from "./SearchUsers";
import UserCard from "./UserCard";

function getStatus(user: UserInfo): { label: string; color: string } {
    if (user.lockoutEnd && new Date(user.lockoutEnd).getTime() > Date.now()) {
        return { label: "Заблокований", color: "text-[#981717]" };
    }
    if (!user.lastLoginAt) return { label: "Офлайн", color: "text-[#B9B9B9]" };

    const diff = Date.now() - new Date(user.lastLoginAt).getTime();
    const minutes = diff / 1000 / 60;
    const hours = minutes / 60;
    const days = hours / 24;

    if (minutes < 15) return { label: "Онлайн", color: "text-[var(--color-green)]" };
    if (hours < 24) return { label: `${Math.floor(hours)} год тому`, color: "text-yellow-500" };
    return { label: `${Math.floor(days)} день тому`, color: "text-yellow-500" };
}

function formatDate(dateStr?: string): string {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const time = date.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });

    if (isToday) return `Сьогодні, ${time}`;
    if (isYesterday) return `Вчора, ${time}`;
    return date.toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function getRoleBadge(role?: string) {
    const map: Record<string, { label: string; className: string }> = {
        Admin: { label: "Адмін", className: "bg-purple-200 text-purple-800" },
        Author: { label: "Автор", className: "bg-[#31004030] text-[#310040]" },
        Publisher: { label: "Видавництво", className: "bg-[#5089BE40] text-[#5089BE]" },
        User: { label: "Користувач", className: "bg-[#3A3A3A40] text-[#595959]" },
    };
    const badge = map[role ?? "User"] ?? map["User"];
    return (
        <span className={`px-3 py-1 rounded-[9px] text-sm font-medium ${badge.className}`}>
            {badge.label}
        </span>
    );
}

interface Props {
    users: UserInfo[];
    onSelectUser: (user: UserInfo) => void;
    selectedUserId?: string;
}

export default function AllUsersInfo({ users, onSelectUser, selectedUserId }: Props) {
    const [search, setSearch] = useState("");

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
    return (
        <div className="w-[882px] h-[900px] rounded-2xl overflow-hidden"
            style={{
                backgroundImage: "url('/images/usersPageAdmin/Rectangle 793.png')",
                backgroundSize: "100% 100%",
            }}>
            <div className="mt-12">
                <SearchUsers value={search} onChange={setSearch} />
            </div>
            {/* Header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] mt-[3vh] ml-12 text-[20px] w-[780px] font-semibold">
                <span>Користувач</span>
                <span>Роль</span>
                <span>Статус</span>
                <span className="-ml-6">Дата реєстрації</span>
                <span>Дії</span>
            </div>
            <div className="w-[824px] h-px bg-[#8D8C89] ml-7 mt-4 mb-4" />
            {/* Rows */}
            {filteredUsers.map((user) => {
                const status = getStatus(user);
                return (
                    <div
                        key={user.id}
                        onClick={() => onSelectUser(user)}
                        className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] w-[840px] ml-5 px-6 py-4 items-center hover:bg-gray-50 transition"
                    >
                        <UserCard user={user} variant="row" />

                        {/* Role */}
                        <div>{getRoleBadge(user.role)}</div>

                        {/* Status */}
                        <div className={`text-sm font-medium flex items-center gap-1 ${status.color}`}>
                            <span className="w-2 h-2 rounded-full bg-current inline-block" />
                            {status.label}
                        </div>

                        {/* Registration date */}
                        <div className="text-sm ml-8 text-gray-500">{formatDate(user.createdAt)}</div>

                        {/* Actions */}
                        <button className="w-[30px] h-[32px] -ml-10 rounded-[9px] shadow-[0px_0px_15px_0px_#00000040]
                         hover:bg-gray-200 flex items-center justify-center text-[var(--color-black)] transition">
                            ...
                        </button>
                    </div>
                );
            })}
        </div>
    );
}