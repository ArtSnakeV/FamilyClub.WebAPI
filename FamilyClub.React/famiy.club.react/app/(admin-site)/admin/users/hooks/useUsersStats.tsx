// hooks/useUsersStats.ts
import { useUsersTotal } from "./useUsersTotal";

interface UserStat {
    icon: string;
    title: string;
    value: string | number;
    subtitle: string;
}

export function useUsersStats() {
    const { members, total, loading } = useUsersTotal();

    const blocked = members.filter((m) => {
        if (!m.lockoutEnd) return false;
        return new Date(m.lockoutEnd).getTime() > Date.now();
    }).length;

    const stats: UserStat[] = [
        {
            icon: "/images/usersPageAdmin/icons/total.svg",
            title: "Всього",
            value: total.toLocaleString("uk-UA"),
            subtitle: "",
        },
        {
            icon: "/images/usersPageAdmin/icons/active.svg",
            title: "Активні",
            value: "—",
            subtitle: "Дані недоступні",
        },
        {
            icon: "/images/usersPageAdmin/icons/new.svg",
            title: "Нові за місяць",
            value: "—",
            subtitle: "Дані недоступні",
        },
        {
            icon: "/images/usersPageAdmin/icons/blocked.svg",
            title: "Заблоковані",
            value: blocked,
            subtitle: "Обмежений доступ",
        },
    ];

    return { stats: loading ? null : stats, loading };
}