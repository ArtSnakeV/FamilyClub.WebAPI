"use client";

import { useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";
import { isBlocked, isPermanentBlock } from "../../hooks/blockUtils";
import { UserInfo } from "../../hooks/useAllUsersInfo";

interface BlockedUserStat {
    icon: string;
    title: string;
    value: string | number;
    subtitle: string;
}

export function useBlockedUsersStats(members: UserInfo[]) {
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

    const blockedMembers = members.filter((m) => isBlocked(m.lockoutEnd));
    const permanentlyBlockedCount = blockedMembers.filter((m) => isPermanentBlock(m.lockoutEnd)).length;
    const temporarilyBlockedCount = blockedMembers.length - permanentlyBlockedCount;
    const totalBlocked = blockedMembers.length;

    const stats: BlockedUserStat[] = [
        {
            icon: "/images/blockedUsersPageAdmin/blockedUsersAll.svg",
            title: "Заблоковані користувачі",
            value: totalBlocked.toLocaleString("uk-UA"),
            subtitle: "Зараз",
        },
        {
            icon: "/images/blockedUsersPageAdmin/someTimesBlocked.svg",
            title: "Тимчасово заблоковані",
            value: temporarilyBlockedCount.toLocaleString("uk-UA"),
            subtitle: "Діючі блокування",
        },
        {
            icon: "/images/blockedUsersPageAdmin/banForever.svg",
            title: "Заблоковані назавжди",
            value: permanentlyBlockedCount.toLocaleString("uk-UA"),
            subtitle: "Постійний бан",
        },
        {
            icon: "/images/blockedUsersPageAdmin/activitiesUsers.svg",
            title: "Активні користувачі",
            value: activeCount !== null ? activeCount.toLocaleString("uk-UA") : "—",
            subtitle: activeCount !== null ? "Протягом 7 днів" : "Дані недоступні",
        },
    ];

    return {
        stats,
        loading: false,
    };
}