"use client";

import { useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";

export interface ComplaintImage {
    id: number;
    imageUrl: string;
}

export interface Complaint {
    id: number;
    complaintText: string;
    complaintType: string;
    isResolved: boolean;
    createdAt: string;
    resolvedAt: string | null;
    clubMemberId: string;
    resolutionNotes: string | null;
    images: ComplaintImage[];
}

export function useUserComplaints(clubMemberId: string) {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!clubMemberId) return;

        let cancelled = false;
        setLoading(true);

        const fetchComplaints = async () => {
            try {
                const res = await fetch(`${apiBasePath}/api/Complaints/by-member/${clubMemberId}`);
                if (!res.ok) throw new Error("Failed to fetch complaints");
                const data: Complaint[] = await res.json();
                if (!cancelled) setComplaints(data);
            } catch (error) {
                console.error("Не вдалося завантажити скарги користувача:", error);
                if (!cancelled) setComplaints([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchComplaints();
        return () => {
            cancelled = true;
        };
    }, [clubMemberId]);

    return { complaints, loading };
}