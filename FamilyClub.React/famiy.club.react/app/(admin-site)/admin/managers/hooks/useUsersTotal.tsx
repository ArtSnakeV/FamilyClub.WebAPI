import { useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";


export interface ClubMemberReadDto {
    id: string;
    lockoutEnd?: string | null;
}

export function useUsersTotal() {
    const [members, setMembers] = useState<ClubMemberReadDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTotal = async () => {
            try {
                const token = getAuthToken();
                const res = await fetch(
                    `${apiBasePath}/api/RolesClubMember/Manager/users`,
                    {
                        headers: token ? { Authorization: `Bearer ${token}` } : {},
                    }
                );

                if (!res.ok) {
                    throw new Error(`Failed to load managers: ${res.status}`);
                }

                const data = await res.json();
                setMembers(Array.isArray(data) ? data : []);
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