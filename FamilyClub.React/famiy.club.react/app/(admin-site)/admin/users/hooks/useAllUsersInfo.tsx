"use client";

import { useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";

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
                const res = await fetch(`${apiBasePath}/api/ClubMember`);
                const data = await res.json();

                const mapped: UserInfo[] = data.map((u: any) => ({
                    ...u,
                    role: u.roles?.[0] ?? "User",
                }));

                setUsersInfo(mapped);
            } catch (e) {
                console.error(e);
            } finally {
                setLoadingUsersInfo(false);
            }
        };
        fetchUsers();
    }, []);

    return { usersInfo, loadingUsersInfo };
}