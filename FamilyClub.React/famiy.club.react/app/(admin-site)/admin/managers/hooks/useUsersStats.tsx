interface UserStat {
    icon: string;
    title: string;
    value: string | number;
    subtitle: string;
}

export interface UseUsersStatsOptions {
    totalOverride?: number;
    blockedOverride?: number;
    activeOverride?: number;
    listLoading?: boolean;
}

export function useUsersStats(options: UseUsersStatsOptions = {}) {
    const managerTotal = options.totalOverride ?? 0;
    const active = options.activeOverride ?? 0;
    const blocked = options.blockedOverride ?? 0;
    const loading = options.listLoading ?? false;

    const stats: UserStat[] = [
        {
            icon: "/images/usersPageAdmin/totalUsers.png",
            title: "Всього менеджерів",
            value: managerTotal.toLocaleString("uk-UA"),
            subtitle: "Менеджери в системі",
        },
        {
            icon: "/images/usersPageAdmin/heartUser.png",
            title: "Активні",
            value: active.toLocaleString("uk-UA"),
            subtitle: "Менеджери на сайті",
        },
        {
            icon: "/images/usersPageAdmin/lockUsers.png",
            title: "Заблоковані",
            value: blocked,
            subtitle: "Обмежений доступ",
        },
    ];

    return { stats: loading ? null : stats, loading };
}
