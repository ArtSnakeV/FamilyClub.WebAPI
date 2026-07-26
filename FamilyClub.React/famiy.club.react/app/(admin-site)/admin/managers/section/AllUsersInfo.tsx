// "use client";

// import { useMemo, useState } from "react";
// import { UserInfo } from "../hooks/useAllUsersInfo";

// import SearchUsers from "./SearchUsers";
// import UserCard from "./UserCard";
// import { deleteUser, lockUser, unlockUser } from "../api/ActionUsers";

// function getStatus(user: UserInfo): { label: string; color: string } {
//     if (user.lockoutEnd && new Date(user.lockoutEnd).getTime() > Date.now()) {
//         return { label: "Заблокований", color: "text-[#981717]" };
//     }
//     if (!user.lastLoginAt) return { label: "Офлайн", color: "text-[#B9B9B9]" };

//     const diff = Date.now() - new Date(user.lastLoginAt).getTime();
//     const minutes = diff / 1000 / 60;
//     const hours = minutes / 60;
//     const days = hours / 24;

//     if (minutes < 15) return { label: "Онлайн", color: "text-[var(--color-green)]" };
//     if (hours < 24) return { label: `${Math.floor(hours)} год тому`, color: "text-yellow-500" };
//     return { label: `${Math.floor(days)} день тому`, color: "text-yellow-500" };
// }

// function formatDate(dateStr?: string): string {
//     if (!dateStr) return "—";
//     const date = new Date(dateStr);
//     const now = new Date();

//     const isToday = date.toDateString() === now.toDateString();
//     const yesterday = new Date(now);
//     yesterday.setDate(now.getDate() - 1);
//     const isYesterday = date.toDateString() === yesterday.toDateString();

//     const time = date.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });

//     if (isToday) return `Сьогодні, ${time}`;
//     if (isYesterday) return `Вчора, ${time}`;
//     return date.toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit", year: "numeric" });
// }

// function getRoleBadge(role?: string) {
//     const map: Record<string, { label: string; className: string }> = {
//         Admin: { label: "Адмін", className: "bg-purple-200 text-purple-800" },
//         Author: { label: "Автор", className: "bg-[#31004030] text-[#310040]" },
//         Publisher: { label: "Видавництво", className: "bg-[#5089BE40] text-[#5089BE]" },
//         User: { label: "Користувач", className: "bg-[#3A3A3A40] text-[#595959]" },
//     };
//     const badge = map[role ?? "User"] ?? map["User"];
//     return (
//         <span className={`px-3 py-1 rounded-[9px] text-sm font-medium ${badge.className}`}>
//             {badge.label}
//         </span>
//     );
// }

// interface Props {
//     users: UserInfo[];
//     onSelectUser: (user: UserInfo) => void;
//     selectedUserId?: string;
// }

// export default function AllUsersInfo({ users, onSelectUser, selectedUserId }: Props) {
//     const [search, setSearch] = useState("");
//     const [openMenuId, setOpenMenuId] = useState<string | null>(null);

//     const filteredUsers = useMemo(() => {
//         const query = search.trim().toLowerCase();
//         if (!query) return users;

//         return users.filter((user) => {
//             const fullName = `${user.name ?? ""} ${user.surname ?? ""}`.toLowerCase();
//             const email = (user.email ?? "").toLowerCase();
//             const role = (user.role ?? "User").toLowerCase();
//             return fullName.includes(query) || email.includes(query) || role.includes(query);
//         });
//     }, [users, search]);
//     return (
//         <div className="w-[882px] h-[900px] rounded-2xl overflow-hidden"
//             style={{
//                 backgroundImage: "url('/images/usersPageAdmin/Rectangle 793.png')",
//                 backgroundSize: "100% 100%",
//             }}>
//             <div className="mt-12">
//                 <SearchUsers value={search} onChange={setSearch} />
//             </div>
//             {/* Header */}
//             <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] mt-[3vh] ml-12 text-[20px] w-[780px] font-semibold">
//                 <span>Користувач</span>
//                 <span>Роль</span>
//                 <span >Статус</span>
//                 {/* <span className="-ml-6">Дата реєстрації</span> */}
//                 <span>Дії</span>
//             </div>
//             <div className="w-[824px] h-px bg-[#8D8C89] ml-7 mt-4 mb-4" />
//             {/* Rows */}
//             {filteredUsers.map((user) => {
//                 const status = getStatus(user);
//                 return (
//                     <div
//                         key={user.id}
//                         onClick={() => onSelectUser(user)}
//                         className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] w-[840px] relative ml-5 px-6 py-4 items-center hover:bg-gray-50 transition"
//                     >
//                         <UserCard user={user} variant="row" />

//                         {/* Role */}
//                         <div>{getRoleBadge(user.role)}</div>

//                         {/* Status */}
//                         <div className={`text-sm font-medium flex items-center gap-1 ${status.color}`}>
//                             <span className="w-2 h-2 rounded-full bg-current inline-block" />
//                             {status.label}
//                         </div>

//                         {/* Registration date */}
//                         {/* <div className="text-sm ml-4 text-gray-500">{formatDate(user.createdAt)}</div> */}

//                         {/* Actions */}
//                         <button
//                             onClick={(e) => {
//                                 e.stopPropagation();
//                                 setOpenMenuId(openMenuId === user.id ? null : user.id);
//                             }}
//                             className="w-[30px] h-[32px] rounded-[9px] shadow-[0px_0px_15px_0px_#00000040]
//      hover:bg-gray-200 flex items-center justify-center"
//                         >
//                             ...
//                         </button>
//                         {openMenuId === user.id && (
//                             <div
//                                 className="absolute right-10 mt-2 w-[160px] bg-white shadow-lg rounded-lg z-50"
//                                 onClick={(e) => e.stopPropagation()}
//                             >
//                                 <button
//                                     className="w-full px-4 py-2 text-left hover:bg-gray-100"
//                                     onClick={async () => {
//                                         const isBlocked =
//                                             user.lockoutEnd &&
//                                             new Date(user.lockoutEnd).getTime() > Date.now();

//                                         if (isBlocked) {
//                                             await unlockUser(user.id);
//                                         } else {
//                                             await lockUser(user.id);
//                                         }

//                                         setOpenMenuId(null);
//                                         window.location.reload(); 
//                                     }}
//                                 >
//                                     {user.lockoutEnd &&
//                                         new Date(user.lockoutEnd).getTime() > Date.now()
//                                         ? "Розблокувати"
//                                         : "Заблокувати"}
//                                 </button>

//                                 <button
//                                     className="w-full px-4 py-2 text-left hover:bg-red-100 text-red-600"
//                                     onClick={async () => {
//                                         await deleteUser(user.id);
//                                         setOpenMenuId(null);
//                                         window.location.reload();
//                                     }}
//                                 >
//                                     Видалити
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }
"use client";

import { useMemo, useState } from "react";
import { UserInfo } from "../hooks/useAllUsersInfo";

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
    users, onSelectUser, onLockToggle, selectedUserId, onDelete
}: Props) {

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
            className="w-[882px] max-w-full h-auto min-h-[900px] rounded-2xl overflow-hidden"
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
            {filteredUsers.map((user) => {
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
                                className="absolute right-4 top-full mt-1 w-[160px] max-w-[calc(100%-2rem)] bg-white shadow-lg rounded-lg z-50"
                                onClick={(e) => e.stopPropagation()}
                            >
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
    );
}