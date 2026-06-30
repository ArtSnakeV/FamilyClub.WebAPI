import { useEffect, useState } from "react";

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
                const token = localStorage.getItem("token");
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL ?? "https://localhost:7069"}/api/ClubMember`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const data: ClubMemberReadDto[] = await res.json();
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