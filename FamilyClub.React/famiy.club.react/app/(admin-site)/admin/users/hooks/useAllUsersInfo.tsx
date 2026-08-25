"use client";

import { useCallback, useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

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
    /////
    blockReasonId?: number | null;
    lockoutReason?: string;
    lockoutReasonDetail?: string;
    lockedBy?: string;
    lockedAt?: string;
}

export default function useAllUsersInfo() {
    const [usersInfo, setUsersInfo] = useState<UserInfo[]>([]);
    const [loadingUsersInfo, setLoadingUsersInfo] = useState(true);

    const fetchUsers = useCallback(async () => {
        try {
            setLoadingUsersInfo(true);
            const token = getAuthToken();
            const res = await fetch(`${apiBasePath}/api/ClubMember`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });

            if (!res.ok) {
                console.error("Failed to fetch users", res.status);
                setUsersInfo([]);
                return;
            }

            const data = await res.json();
            if (!Array.isArray(data)) {
                setUsersInfo([]);
                return;
            }

            const mapped: UserInfo[] = data.map((u: UserInfo) => ({
                ...u,
                role: u.roles?.[0] ?? "User",
            }));

            setUsersInfo(mapped);
        } catch (e) {
            console.error(e);
            setUsersInfo([]);
        } finally {
            setLoadingUsersInfo(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return { usersInfo, loadingUsersInfo, refetch: fetchUsers };
}
