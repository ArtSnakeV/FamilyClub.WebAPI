"use client";

import { useMemo } from "react";
import { UserInfo } from "../../hooks/useAllUsersInfo";
import UserCardBlockedUser from "./UserCardBlockedUser";
import { isBlocked, isPermanentBlock, daysLeft, formatDate, getBlockStatus } from "../../hooks/blockUtils";

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
    users, search, status, sort, reason, onSelectUser, onLockToggle, selectedUserId, onDelete
}: Props) {


    // const filteredUsers = useMemo(() => {
    //     const q = search.trim().toLowerCase();
    //     if (!q) return users;

    //     return users.filter((u) => {
    //         const fullName = `${u.name ?? ""} ${u.surname ?? ""}`.trim().toLowerCase();
    //         return (
    //             fullName.includes(q) ||
    //             u.email?.toLowerCase().includes(q) ||
    //             u.id?.toLowerCase().includes(q)
    //         );
    //     });
    // }, [users, search]);
    const filteredUsers = useMemo(() => {
        let result = [...users];

        // пошук
        const q = search.trim().toLowerCase();

        if (q) {
            result = result.filter((u) => {
                const fullName =
                    `${u.name ?? ""} ${u.surname ?? ""}`
                        .trim()
                        .toLowerCase();

                return (
                    fullName.includes(q) ||
                    u.email?.toLowerCase().includes(q) ||
                    u.id?.toLowerCase().includes(q)
                );
            });
        }

        // сортування
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
    }, [users, search, sort]);

    return (
        <div
            className="w-[78.3vw] max-w-full h-auto min-h-[900px] rounded-1xl overflow-hidden"
            style={{
                backgroundImage: "url('/images/usersPageAdmin/Rectangle 793.png')",
                backgroundSize: "100% 100%",
            }}
        >
            {/* HEADER */}
            <div className={`grid ${GRID_COLS} gap-x-1 mt-[4vh] mx-16 text-[20px] font-semibold`}>
                <span className="whitespace-nowrap text-left ml-2">Користувач</span>
                <span className="whitespace-nowrap text-left">Статус</span>
                <span className="whitespace-nowrap text-left">Причина блокування</span>
                <span className="whitespace-nowrap text-left">Заблоковано</span>
                <span className="whitespace-nowrap text-left">Дійсно до</span>
                <span className="whitespace-nowrap text-left -ml-3">Дії</span>
            </div>

            <div className="mx-7 h-px bg-[#8D8C89] mt-3 mb-4" />

            {/* ROWS */}
            {filteredUsers.length === 0 ? (
                <p className="ml-12 mt-6 opacity-60">Нічого не знайдено</p>
            ) : (
                filteredUsers.map((user) => {
                    // const permanent = isPermanentBlock(user.lockoutEnd);
                    // const blocked = isBlocked(user.lockoutEnd);
                    // const left = daysLeft(user.lockoutEnd);
                    // const status = getBlockStatus(user.lockoutEnd);
                    const left = daysLeft(user.lockoutEnd);
                    const status = getBlockStatus(user.lockoutEnd);
                    return (
                        <div
                            key={user.id}
                            onClick={() => onSelectUser(user)}
                            className={`grid ${GRID_COLS} ml-8  w-[95%] gap-x-13 relative px-8 py-4 items-center`}
                        >
                            {/* USER */}
                            <div className="min-w-0">
                                <UserCardBlockedUser user={user} variant="row" />
                            </div>

                            {/* STATUS */}
                            <div className="min-w-0 h-[60px] w-[130px] ml-4">
                                <span
                                    className={`inline-block rounded-[9px] w-full px-3 py-1 text-[16px] font-medium whitespace-wrap ${status.className}`}
                                >
                                    {status.label}
                                </span>
                            </div>

                            {/* BLOCK REASON */}
                            <div className="min-w-0 text-sm">
                                <p className="font-medium truncate">{user.lockoutReason ?? "-"}</p>
                                {user.lockoutReasonDetail && (
                                    <p className="opacity-60 truncate">{user.lockoutReasonDetail}</p>
                                )}
                            </div>

                            {/* BLOCKED BY / AT */}
                            <div className="min-w-0 text-sm">
                                <p className="font-medium truncate">{user.lockedBy ?? "-"}</p>
                                <p className="opacity-60 truncate">{formatDate(user.lockedAt)}</p>
                            </div>

                            {/* VALID UNTIL */}
                            <div className="min-w-0 text-sm">
                                <p className="font-medium truncate">
                                    {status.permanent
                                        ? "-"
                                        : formatDate(user.lockoutEnd)}
                                </p>
                                <p className="opacity-60 truncate">
                                    {status.permanent
                                        ? "Назавжди"
                                        : left !== null
                                            ? `Залишилося ${left} днів`
                                            : "-"}
                                </p>
                            </div>

                            {/* ACTIONS */}
                            <div
                                className="flex items-center w-[120px] h-[60px] gap-2 justify-self-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => onLockToggle(user)}
                                    className="px-3 py-2 rounded-[9px] w-full bg-[#1F5C3D] text-[var(--color-white)] text-[16px]
                                     font-medium whitespace-wrap hover:bg-[#164529] transition"
                                >
                                    {status.blocked ? "Розблокувати" : "Заблокувати"}
                                </button>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}