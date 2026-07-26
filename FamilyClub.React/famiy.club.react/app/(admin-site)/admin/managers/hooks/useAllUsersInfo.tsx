"use client";

import { useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

const STAFF_ROLES = ["Manager", "Admin"] as const;

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

function resolvePrimaryRole(roles?: string[] | null): string {
    if (roles?.includes("Admin")) return "Admin";
    if (roles?.includes("Manager")) return "Manager";
    return roles?.[0] ?? "Manager";
}

async function fetchUsersByRole(roleName: string, token: string | null) {
    const res = await fetch(
        `${apiBasePath}/api/RolesClubMember/${encodeURIComponent(roleName)}/users`,
        {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
    );

    if (!res.ok) {
        throw new Error(`Failed to load ${roleName} users: ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
}

/** Користувачі з ролями Manager та Admin (без дублікатів). */
export default function useAllUsersInfo() {
    const [usersInfo, setUsersInfo] = useState<UserInfo[]>([]);
    const [loadingUsersInfo, setLoadingUsersInfo] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = getAuthToken();
                const results = await Promise.allSettled(
                    STAFF_ROLES.map((role) => fetchUsersByRole(role, token))
                );

                const byId = new Map<string, UserInfo>();

                for (const result of results) {
                    if (result.status !== "fulfilled") {
                        console.error(result.reason);
                        continue;
                    }

                    for (const u of result.value) {
                        const id = u.id ?? (u as { Id?: string }).Id ?? "";
                        if (!id) continue;

                        const roles: string[] = Array.isArray(u.roles)
                            ? u.roles
                            : [];
                        const existing = byId.get(id);
                        const mergedRoles = [
                            ...new Set([...(existing?.roles ?? []), ...roles]),
                        ];

                        byId.set(id, {
                            ...existing,
                            ...u,
                            id,
                            roles: mergedRoles,
                            role: resolvePrimaryRole(mergedRoles),
                        });
                    }
                }

                setUsersInfo(Array.from(byId.values()));
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
