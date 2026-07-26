"use client";

import { useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";
import {
    EXCLUDED_MATRIX_ROLES,
    normalizeRoleKey,
} from "../data/rolesData";

export type RoleCounts = Record<string, number>;

async function fetchRoleUserCount(roleName: string): Promise<number> {
    const token = getAuthToken();
    const res = await fetch(
        `${apiBasePath}/api/RolesClubMember/${encodeURIComponent(roleName)}/users`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );

    if (!res.ok) return 0;

    const data = await res.json();
    return Array.isArray(data) ? data.length : 0;
}

/** Кількість користувачів для наявних Identity-ролей (без Publisher/Author). */
export default function useRoleCounts(roleNames: string[]) {
    const [counts, setCounts] = useState<RoleCounts>({});
    const [loading, setLoading] = useState(true);

    const roleKey = roleNames
        .map(normalizeRoleKey)
        .filter((n) => !EXCLUDED_MATRIX_ROLES.has(n))
        .sort()
        .join("|");

    useEffect(() => {
        const names = roleKey ? roleKey.split("|") : [];
        if (names.length === 0) {
            setCounts({});
            setLoading(false);
            return;
        }

        let cancelled = false;
        setLoading(true);

        const load = async () => {
            try {
                const next: RoleCounts = {};
                await Promise.all(
                    names.map(async (name) => {
                        next[name] = await fetchRoleUserCount(name);
                    })
                );
                if (!cancelled) setCounts(next);
            } catch (error) {
                console.error("Failed to load role counts", error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [roleKey]);

    return { counts, loading };
}
