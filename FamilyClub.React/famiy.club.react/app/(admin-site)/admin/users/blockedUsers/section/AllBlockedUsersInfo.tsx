"use client";

import { useMemo } from "react";
import { UserInfo } from "../../hooks/useAllUsersInfo";
import UserCardBlockedUser from "./UserCardBlockedUser";
import {
    daysLeft,
    formatDate,
    getBlockStatus,
} from "../../hooks/blockUtils";
import { usePagination } from "../../hooks/usePagination";
import PaginationBlockedUser from "../PaginationBlockedUser";
import { useTheme } from "@/lib/theme/ThemeProvider";

interface Props {
    users: UserInfo[];
    search: string;
    status: string;
    sort: string;
    reason: string;
    onSelectUser: (user: UserInfo) => void;
    selectedUserId?: string;
    onLockToggle: (user: UserInfo) => void;
    onDelete: (user: UserInfo) => void;
}

const GRID_COLS =
    "grid-cols-[minmax(80px,2fr)_minmax(100px,1fr)_minmax(100px,1.4fr)_minmax(90px,1fr)_minmax(90px,1fr)_minmax(120px,auto)]";

export default function AllBlockedUsersInfo({
    users,
    search,
    sort,
    reason,
    onSelectUser,
    onLockToggle,
}: Props) {
    const { theme } = useTheme();
    const isNight = theme === "ink-night";
    const ink = isNight ? "var(--color-cream)" : "var(--color-black)";

    const filteredUsers = useMemo(() => {
        let result = [...users];

        const q = search.trim().toLowerCase();
        if (q) {
            result = result.filter((u) => {
                const fullName = `${u.name ?? ""} ${u.surname ?? ""}`
                    .trim()
                    .toLowerCase();
                return (
                    fullName.includes(q) ||
                    u.email?.toLowerCase().includes(q) ||
                    u.id?.toLowerCase().includes(q)
                );
            });
        }

        if (reason !== "all") {
            result = result.filter((u) => String(u.lockoutReason) === reason);
        }

        switch (sort) {
            case "nameAsc":
                result.sort((a, b) =>
                    `${a.name ?? ""} ${a.surname ?? ""}`.localeCompare(
                        `${b.name ?? ""} ${b.surname ?? ""}`,
                        "uk"
                    )
                );
                break;
            case "nameDesc":
                result.sort((a, b) =>
                    `${b.name ?? ""} ${b.surname ?? ""}`.localeCompare(
                        `${a.name ?? ""} ${a.surname ?? ""}`,
                        "uk"
                    )
                );
                break;
            case "newest":
                result.sort(
                    (a, b) =>
                        new Date(b.lockedAt ?? 0).getTime() -
                        new Date(a.lockedAt ?? 0).getTime()
                );
                break;
            case "oldest":
                result.sort(
                    (a, b) =>
                        new Date(a.lockedAt ?? 0).getTime() -
                        new Date(b.lockedAt ?? 0).getTime()
                );
                break;
            case "expires":
                result.sort(
                    (a, b) =>
                        new Date(a.lockoutEnd ?? 0).getTime() -
                        new Date(b.lockoutEnd ?? 0).getTime()
                );
                break;
        }

        return result;
    }, [users, search, sort, reason]);

    const {
        currentPage,
        totalPages,
        paginatedItems: paginatedUsers,
        setCurrentPage,
    } = usePagination(filteredUsers, 6);

    return (
        <div className="relative w-[78.3vw] max-w-full flex flex-col h-auto min-h-[820px] rounded-1xl overflow-hidden">
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none admin-parchment-bg"
                style={{
                    backgroundImage: "url('/images/usersPageAdmin/Rectangle 793.png')",
                    backgroundSize: "100% 100%",
                }}
            />
            <div className="relative z-10 flex flex-col flex-1" style={{ color: ink }}>
                <div
                    className={`grid ${GRID_COLS} gap-x-1 mt-[4vh] mx-16 text-[20px] font-semibold`}
                >
                    <span className="whitespace-nowrap text-left ml-2">
                        Користувач
                    </span>
                    <span className="whitespace-nowrap text-left">Статус</span>
                    <span className="whitespace-nowrap text-left">
                        Причина блокування
                    </span>
                    <span className="whitespace-nowrap text-left">Заблоковано</span>
                    <span className="whitespace-nowrap text-left">Дійсно до</span>
                    <span className="whitespace-nowrap text-left -ml-3">Дії</span>
                </div>

                <div
                    className="mx-7 h-px mt-3 mb-4"
                    style={{
                        backgroundColor: isNight
                            ? "rgba(237,232,223,0.25)"
                            : "#8D8C89",
                    }}
                />

                <div className="flex-1">
                    {filteredUsers.length === 0 ? (
                        <p className="ml-12 mt-6 text-[var(--color-muted-fg)]">
                            Нічого не знайдено
                        </p>
                    ) : (
                        paginatedUsers.map((user) => {
                            const left = daysLeft(user.lockoutEnd);
                            const status = getBlockStatus(user.lockoutEnd);
                            return (
                                <div
                                    key={user.id}
                                    onClick={() => onSelectUser(user)}
                                    className={`grid ${GRID_COLS} ml-8 w-[95%] gap-x-13 relative px-8 py-4 items-center transition ${
                                        isNight
                                            ? "hover:bg-white/5"
                                            : "hover:bg-black/[0.03]"
                                    }`}
                                >
                                    <div className="min-w-0">
                                        <UserCardBlockedUser
                                            user={user}
                                            variant="row"
                                        />
                                    </div>

                                    <div className="min-w-0 h-[60px] w-[130px] ml-4">
                                        <span
                                            className={`inline-block rounded-[9px] w-full px-3 py-1 text-[16px] font-medium whitespace-wrap ${status.className}`}
                                        >
                                            {status.label}
                                        </span>
                                    </div>

                                    <div className="min-w-0 text-sm ml-7">
                                        <p className="font-medium truncate">
                                            {user.lockoutReason ?? ""}
                                        </p>
                                        {user.lockoutReasonDetail && (
                                            <p className="text-[var(--color-muted-fg)] truncate">
                                                {user.lockoutReasonDetail}
                                            </p>
                                        )}
                                    </div>

                                    <div className="min-w-0 text-sm">
                                        <p className="font-medium truncate">
                                            {user.lockedBy ?? ""}
                                        </p>
                                        <p className="text-[var(--color-muted-fg)] truncate">
                                            {formatDate(user.lockedAt)}
                                        </p>
                                    </div>

                                    <div className="min-w-0 text-sm">
                                        <p className="font-medium truncate">
                                            {status.permanent
                                                ? ""
                                                : formatDate(user.lockoutEnd)}
                                        </p>
                                        <p className="text-[var(--color-muted-fg)] truncate">
                                            {status.permanent
                                                ? "Назавжди"
                                                : left !== null
                                                  ? `Залишилося ${left} днів`
                                                  : ""}
                                        </p>
                                    </div>

                                    <div
                                        className="flex items-center w-[120px] h-[60px] gap-2 justify-self-center"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button
                                            onClick={() => onLockToggle(user)}
                                            className="px-3 py-2 rounded-[9px] w-full bg-[var(--color-green)] text-[var(--color-cream)] text-[16px] font-medium whitespace-wrap hover:opacity-90 transition"
                                        >
                                            {status.blocked
                                                ? "Розблокувати"
                                                : "Заблокувати"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
                <div className="w-full flex justify-center pt-2 pb-10 mt-auto shrink-0 px-8">
                    <PaginationBlockedUser
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        totalItems={filteredUsers.length}
                        itemsPerPage={6}
                    />
                </div>
            </div>
        </div>
    );
}
