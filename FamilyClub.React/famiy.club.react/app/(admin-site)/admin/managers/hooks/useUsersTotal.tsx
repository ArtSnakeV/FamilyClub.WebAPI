import { useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

export interface ClubMemberReadDto {
    id: string;
    lockoutEnd?: string | null;
}

const STAFF_ROLES = ["Manager", "Admin"] as const;

export function useUsersTotal() {
    const [members, setMembers] = useState<ClubMemberReadDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTotal = async () => {
            try {
                const token = getAuthToken();
                const results = await Promise.allSettled(
                    STAFF_ROLES.map(async (role) => {
                        const res = await fetch(
                            `${apiBasePath}/api/RolesClubMember/${encodeURIComponent(role)}/users`,
                            {
                                headers: token
                                    ? { Authorization: `Bearer ${token}` }
                                    : {},
                            }
                        );
                        if (!res.ok) {
                            throw new Error(
                                `Failed to load ${role} users: ${res.status}`
                            );
                        }
                        const data = await res.json();
                        return Array.isArray(data) ? data : [];
                    })
                );

                const byId = new Map<string, ClubMemberReadDto>();
                for (const result of results) {
                    if (result.status !== "fulfilled") {
                        console.error(result.reason);
                        continue;
                    }
                    for (const u of result.value) {
                        const id = u.id ?? "";
                        if (!id || byId.has(id)) continue;
                        byId.set(id, u);
                    }
                }

                setMembers(Array.from(byId.values()));
            } catch (err) {
                console.error("Failed to fetch users total", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTotal();
    }, []);

    return { members, total: members.length, loading };
}
