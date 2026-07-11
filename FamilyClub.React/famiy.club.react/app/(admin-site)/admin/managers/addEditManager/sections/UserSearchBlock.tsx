// interface UserSearchBlockProps {
//     searchEmail: string;
//     onSearchEmailChange: (value: string) => void;
//     searching: boolean;
//     userFound: boolean;
//     onSearch: () => void;
// }

// export default function UserSearchBlock({
//     searchEmail,
//     onSearchEmailChange,
//     searching,
//     userFound,
//     onSearch,
// }: UserSearchBlockProps) {
//     return (
//         <div className="flex flex-col gap-1">
//             <label className="font-semibold text-sm text-[var(--color-black)]">
//                 Пошук користувача за email
//             </label>
//             <div className="flex gap-2">
//                 <input
//                     type="email"
//                     value={searchEmail}
//                     onChange={(e) => onSearchEmailChange(e.target.value)}
//                     placeholder="Введіть email для пошуку..."
//                     className="flex-1 rounded-[10px] bg-[#F0EDE7] px-5 py-3 text-sm outline-none 
//                     shadow-[0_0_10px_0_#00000040]
//                     focus:ring-2 focus:ring-[var(--color-green)]"
//                 />
//                 <button
//                     type="button"
//                     onClick={onSearch}
//                     disabled={searching}
//                     className="px-5 rounded-full bg-[var(--color-green)] text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
//                 >
//                     {searching ? "Пошук..." : "Знайти"}
//                 </button>
//             </div>
//             {userFound && (
//                 <span className="text-xs text-[var(--color-green)]">
//                     Користувача знайдено — дані підтягнуто нижче
//                 </span>
//             )}
//         </div>
//     );
// }
import { useEffect, useRef, useState } from "react";
import { clubMemberService } from "@/lib/api/services";
import { ClubMemberReadDto } from "@/lib/api/generated";

interface UserSearchBlockProps {
    searchEmail: string;
    onSearchEmailChange: (value: string) => void;
    searching: boolean;
    userFound: boolean;
    onSearch: () => void;
}

export default function UserSearchBlock({
    searchEmail,
    onSearchEmailChange,
    searching,
    userFound,
    onSearch,
}: UserSearchBlockProps) {
    const [allUsers, setAllUsers] = useState<ClubMemberReadDto[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadUsers() {
            try {
                const users = await clubMemberService.apiClubMemberGet();
                if (!cancelled) {
                    setAllUsers(users ?? []);
                }
            } catch (e) {
                console.error("Не вдалося завантажити список користувачів", e);
            }
        }

        loadUsers();
        return () => {
            cancelled = true;
        };
    }, []);

    // закриваємо підказки при кліку поза блоком
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const query = searchEmail.trim().toLowerCase();
    const filteredUsers =
        query.length > 0
            ? allUsers
                  .filter((u) =>
                      u.email?.toLowerCase().includes(query) ||
                      u.name?.toLowerCase().includes(query) ||
                      u.surname?.toLowerCase().includes(query)
                  )
                  .slice(0, 6)
            : [];

    const handleSelectSuggestion = (email?: string | null) => {
        if (!email) return;
        onSearchEmailChange(email);
        setShowSuggestions(false);
        setTimeout(() => onSearch(), 0);
    };

    return (
        <div className="flex flex-col gap-1 relative" ref={wrapperRef}>
            <label className="font-semibold text-sm text-[var(--color-black)]">
                Пошук користувача за email
            </label>
            <div className="flex gap-2 relative">
                <input
                    type="email"
                    value={searchEmail}
                    onChange={(e) => {
                        onSearchEmailChange(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Введіть email для пошуку..."
                    autoComplete="off"
                    className="flex-1 rounded-[10px] bg-[#F0EDE7] px-5 py-3 text-sm outline-none 
                    shadow-[0_0_10px_0_#00000040]
                    focus:ring-2 focus:ring-[var(--color-green)]"
                />
                <button
                    type="button"
                    onClick={onSearch}
                    disabled={searching}
                    className="px-5 rounded-full bg-[var(--color-green)] text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
                >
                    {searching ? "Пошук..." : "Знайти"}
                </button>

                {showSuggestions && filteredUsers.length > 0 && (
                    <ul className="absolute top-full left-0 right-[92px] mt-1 bg-white rounded-[10px] shadow-[0_0_10px_0_#00000040] max-h-60 overflow-y-auto z-20">
                        {filteredUsers.map((u) => (
                            <li
                                key={u.id ?? u.email}
                                onClick={() => handleSelectSuggestion(u.email)}
                                className="px-4 py-2 text-sm cursor-pointer hover:bg-[#F0EDE7] flex flex-col"
                            >
                                <span className="font-medium text-[var(--color-black)]">
                                    {u.name} {u.surname}
                                </span>
                                <span className="text-xs text-gray-500">{u.email}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {userFound && (
                <span className="text-xs text-[var(--color-green)]">
                    Користувача знайдено — дані підтягнуто нижче
                </span>
            )}
        </div>
    );
}