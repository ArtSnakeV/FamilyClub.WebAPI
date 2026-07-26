"use client";

import { useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

export interface ApiRole {
    id: string;
    name: string;
}

export default function useRoles() {
    const [roles, setRoles] = useState<ApiRole[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const token = getAuthToken();
                const res = await fetch(`${apiBasePath}/api/RolesClubMember`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });

                if (!res.ok) {
                    throw new Error(`Failed to load roles: ${res.status}`);
                }

                const data = await res.json();
                const mapped: ApiRole[] = (Array.isArray(data) ? data : [])
                    .filter((r) => r?.name)
                    .map((r) => ({ id: r.id, name: r.name }));

                setRoles(mapped);
            } catch (e) {
                console.error(e);
                setError(e instanceof Error ? e.message : "Unknown error");
                setRoles([]);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    return { roles, loading, error };
}
