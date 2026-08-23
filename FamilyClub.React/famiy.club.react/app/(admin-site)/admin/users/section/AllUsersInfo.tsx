"use client";

import { useMemo, useState } from "react";
import { UserInfo } from "../hooks/useAllUsersInfo";

import SearchUsers from "./SearchUsers";
import UserCard from "./UserCard";
import Pagination from "../Pagination";
import { usePagination } from "../hooks/usePagination";

interface Props {
    users: UserInfo[];
    onSelectUser: (user: UserInfo) => void;
    selectedUserId?: string;
    onLockToggle: (user: UserInfo) => void;
    onDelete: (user: UserInfo) => void;
    onMessage: (user: UserInfo) => void;
}

const GRID_COLS = "grid-cols-[minmax(180px,2fr)_minmax(90px,1fr)_minmax(90px,1fr)_minmax(60px,auto)]";
const ROLE_LABELS: Record<string, string> = {
    admin: "адмін",
    manager: "менеджер",
    user: "користувач",
};

export default function AllUsersInfo({
    users, onSelectUser, onLockToggle, selectedUserId, onDelete, onMessage
}: Props) {

    const [search, setSearch] = useState("");
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const filteredUsers = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return users;
        return users.filter((user) => {
            const fullName = `${user.name ?? ""} ${user.surname ?? ""}`.toLowerCase();
            const email = (user.email ?? "").toLowerCase();
            const roleKey = (user.role && user.role.trim() !== "" ? user.role : "User").toLowerCase();
            const translatedRole = ROLE_LABELS[roleKey] ?? "";
            return (
                fullName.includes(query) ||
                email.includes(query) ||
                roleKey.includes(query) ||
                translatedRole.includes(query)
            );
        });
    }, [users, search]);

    const {
        currentPage,
        totalPages,
        paginatedItems: paginatedUsers,
        setCurrentPage,
    } = usePagination(filteredUsers, 4);

    const isBlocked = (user: UserInfo) =>
        !!user.lockoutEnd && new Date(user.lockoutEnd).getTime() > Date.now();

    function getRoleBadge(role?: string) {
        const map: Record<string, { label: string; className: string }> = {
            Admin: { label: "Адмін", className: "bg-purple-200 text-purple-800" },
            Manager: { label: "Менеджер", className: "bg-[#31004030] text-[#310040]" },
            // Publisher: { label: "Видавництво", className: "bg-[#5089BE40] text-[#5089BE]" },
            User: { label: "Користувач", className: "bg-[#3A3A3A40] text-[#595959]" },
        };
        const badge = map[role ?? "User"] ?? map["User"];
        return (
            <span className={`px-3 py-1 rounded-[9px] h-[30px] text-sm font-medium whitespace-nowrap ${badge.className}`}>
                {badge.label}
            </span>
        );
    }

    return (
        <div
            className="w-[882px] max-w-full flex flex-col h-auto min-h-[900px] rounded-2xl overflow-hidden"
            style={{
                backgroundImage:
                    "url('/images/usersPageAdmin/Rectangle 793.png')",
                backgroundSize: "100% 100%",
            }}
        >
            {/* SEARCH */}
            <div className="mt-12">
                <SearchUsers value={search} onChange={setSearch} />
            </div>

            {/* HEADER */}
            <div className={`grid ${GRID_COLS} gap-x-1 mt-[3vh] mx-12 text-[20px] font-semibold`}>
                <span>Користувач</span>
                <span className="whitespace-nowrap text-left">Роль</span>
                <span className="whitespace-nowrap text-left -ml-2">Статус</span>
                <span>Дії</span>
            </div>

            <div className="mx-7 h-px bg-[#8D8C89] mt-4 mb-4" />

            {/* ROWS */}
            {/* {filteredUsers.map((user) => { */}
            <div className="flex-1">
                {paginatedUsers.map((user) => {
                    const blocked = isBlocked(user);

                    return (
                        <div
                            key={user.id}
                            onClick={() => onSelectUser(user)}
                            className={`grid ${GRID_COLS} gap-x-13 relative mx-5 px-8 py-4 items-center hover:bg-gray-50 transition`}
                        >
                            {/* USER */}
                            <div className="min-w-0">
                                <UserCard user={user} variant="row" />
                            </div>

                            {/* ROLE */}
                            <div className="min-w-0">{getRoleBadge(user.role)}</div>

                            {/* STATUS */}
                            <div
                                className={`text-sm font-medium flex items-center gap-1 min-w-0 whitespace-nowrap ${blocked
                                    ? "text-[#981717]"
                                    : "text-[#B9B9B9]"
                                    }`}
                            >
                                <span className="w-2 h-2 rounded-full bg-current inline-block shrink-0" />
                                {blocked ? "Заблокований" : "Активний"}
                            </div>

                            {/* ACTIONS BUTTON */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenuId((prev) =>
                                        prev === user.id ? null : user.id
                                    );
                                }}
                                className="w-[30px] h-[32px] rounded-[9px] shadow-[0px_0px_15px_0px_#00000040]
                            hover:bg-gray-200 flex items-center justify-center shrink-0 justify-self-center -ml-6"
                            >
                                ...
                            </button>

                            {/* DROPDOWN */}
                            {openMenuId === user.id && (
                                <div
                                    className="absolute right-4 top-full mt-1 w-[200px] max-w-[calc(100%-2rem)] bg-white rounded-lg shadow-[0_0_20px_rgba(80,137,190,0.6)] z-50"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        className="w-full px-4 py-2 text-left hover:bg-gray-100 whitespace-nowrap"
                                        onClick={() => {
                                            onMessage(user);
                                            setOpenMenuId(null);
                                        }}
                                    >
                                        Написати повідомлення
                                    </button>
                                    <button
                                        className="w-full px-4 py-2 text-left hover:bg-gray-100 whitespace-nowrap"
                                        onClick={() => {
                                            onLockToggle(user);
                                            setOpenMenuId(null);
                                        }}
                                    >
                                        {isBlocked(user) ? "Розблокувати" : "Заблокувати"}
                                    </button>

                                    <button
                                        className="w-full px-4 py-2 text-left hover:bg-red-100 text-red-600 whitespace-nowrap"
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
            <div className="w-full flex justify-center pt-2 pb-10 mt-auto shrink-0 px-8">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}