"use client";

import { useEffect, useState } from "react";
import { apiBasePath, authorService, publisherService } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";
import { SUMMARY_CARD_DEFINITIONS } from "../data/rolesData";

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

export default function useRoleCounts() {
    const [counts, setCounts] = useState<RoleCounts>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const next: RoleCounts = {};

                await Promise.all(
                    SUMMARY_CARD_DEFINITIONS.map(async (card) => {
                        if (card.apiRoleName) {
                            next[card.key] = await fetchRoleUserCount(card.apiRoleName);
                        }
                    })
                );

                const [publishers, authors] = await Promise.all([
                    publisherService.apiPublishersGet().catch(() => []),
                    authorService.apiAuthorsGet().catch(() => []),
                ]);

                next.publishers = publishers.length;
                next.authors = authors.length;

                setCounts(next);
            } catch (error) {
                console.error("Failed to load role counts", error);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    return { counts, loading };
}
