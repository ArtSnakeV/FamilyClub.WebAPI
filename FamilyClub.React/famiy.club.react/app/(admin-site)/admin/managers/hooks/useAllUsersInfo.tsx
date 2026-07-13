"use client";

import { useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

const MANAGER_ROLE = "Manager";

export interface UserInfo {
    id: string;
    name?: string;
    surname?: string;
    email?: string;
    avatarData?: string;
    role?: string;
    roles?: string[];
    lockoutEnd?: string | null;
    ordersCount?: number;
    spentAmount?: number;
    reviewsCount?: number;
    complaintsCount?: number;
    lastLoginAt?: string;
    createdAt?: string;
    language?: string;
    timeZone?: string;
}

export default function useAllUsersInfo() {
    const [usersInfo, setUsersInfo] = useState<UserInfo[]>([]);
    const [loadingUsersInfo, setLoadingUsersInfo] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = getAuthToken();
                const res = await fetch(
                    `${apiBasePath}/api/RolesClubMember/${encodeURIComponent(MANAGER_ROLE)}/users`,
                    {
                        headers: token ? { Authorization: `Bearer ${token}` } : {},
                    }
                );

                if (!res.ok) {
                    throw new Error(`Failed to load managers: ${res.status}`);
                }

                const data = await res.json();
                const mapped: UserInfo[] = (Array.isArray(data) ? data : []).map((u) => ({
                    ...u,
                    role: u.roles?.[0] ?? MANAGER_ROLE,
                }));

                setUsersInfo(mapped);
            } catch (e) {
                console.error(e);
                setUsersInfo([]);
            } finally {
                setLoadingUsersInfo(false);
            }
        };

        fetchUsers();
    }, []);

    return { usersInfo, loadingUsersInfo };
}
