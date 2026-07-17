// import { useEffect, useState } from "react";
// import { useUsersTotal } from "./useUsersTotal";
// import { apiBasePath } from "@/lib/api/services";

// interface UserStat {
//     icon: string;
//     title: string;
//     value: string | number;
//     subtitle: string;
// }

// export function useUsersStats() {
//     const { members, total, loading } = useUsersTotal();
//     const [activeCount, setActiveCount] = useState<number | null>(null);
//     useEffect(() => {
//         const fetchActive = async () => {
//             try {
//                 const res = await fetch(`${apiBasePath}/api/Presence/active-count`);
//                 const data = await res.json();
//                 setActiveCount(data.count);
//             } catch {
//                 setActiveCount(null);
//             }
//         };

//         fetchActive();
//         const interval = setInterval(fetchActive, 15000); // оновлюємо кожні 15 сек
//         return () => clearInterval(interval);
//     }, []);
//     const blocked = members.filter((m) => {
//         if (!m.lockoutEnd) return false;
//         return new Date(m.lockoutEnd).getTime() > Date.now();
//     }).length;

//     const stats: UserStat[] = [
//         {
//             icon: "/images/usersPageAdmin/totalUsers.png",
//             title: "Всього",
//             value: total.toLocaleString("uk-UA"),
//             subtitle: "Дані недоступні",
//         },
//         {
//             icon: "/images/usersPageAdmin/heartUser.png",
//             title: "Активні",
//             value: activeCount !== null ? activeCount.toLocaleString("uk-UA") : "—",
//             subtitle: activeCount !== null ? "Зараз на сайті" : "Дані недоступні",
//         },
//         // {
//         //     icon: "/images/usersPageAdmin/userLastMons.png",
//         //     title: "Нові за місяць",
//         //     value: "—",
//         //     subtitle: "Дані недоступні",
//         // },
//         {
//             icon: "/images/usersPageAdmin/lockUsers.png",
//             title: "Заблоковані",
//             value: blocked,
//             subtitle: "Обмежений доступ",
//         },
//     ];

//     return { stats: loading ? null : stats, loading };
// }
import { useEffect, useState } from "react";
import { useUsersTotal } from "./useUsersTotal";
import { apiBasePath } from "@/lib/api/services";

interface UserStat {
    icon: string;
    title: string;
    value: string | number;
    subtitle: string;
}

export function useUsersStats(blockedOverride?: number) {
    const { members, total, loading } = useUsersTotal();
    const [activeCount, setActiveCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchActive = async () => {
            try {
                const res = await fetch(`${apiBasePath}/api/Presence/active-count`);
                const data = await res.json();
                setActiveCount(data.count);
            } catch {
                setActiveCount(null);
            }
        };

        fetchActive();
        const interval = setInterval(fetchActive, 15000);
        return () => clearInterval(interval);
    }, []);

    const blockedFromMembers = members.filter((m) => {
        if (!m.lockoutEnd) return false;
        return new Date(m.lockoutEnd).getTime() > Date.now();
    }).length;

    // якщо ззовні передали актуальніше число — використовуємо його
    const blocked = blockedOverride ?? blockedFromMembers;

    const stats: UserStat[] = [
        {
            icon: "/images/usersPageAdmin/totalUsers.png",
            title: "Всього",
            value: total.toLocaleString("uk-UA"),
            subtitle: "Дані недоступні",
        },
        {
            icon: "/images/usersPageAdmin/heartUser.png",
            title: "Активні",
            value: activeCount !== null ? activeCount.toLocaleString("uk-UA") : "—",
            subtitle: activeCount !== null ? "Зараз на сайті" : "Дані недоступні",
        },
        // {
        //         //     icon: "/images/usersPageAdmin/userLastMons.png",
        //         //     title: "Нові за місяць",
        //         //     value: "—",
        //         //     subtitle: "Дані недоступні",
        //         // },
        {
            icon: "/images/usersPageAdmin/lockUsers.png",
            title: "Заблоковані",
            value: blocked,
            subtitle: "Обмежений доступ",
        },
    ];

    return { stats: loading ? null : stats, loading };
}