"use client";

import { useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

export interface Review {
    id: number;
    productId: number;
    productName?: string | null;
    userId: string;
    rating: number;
    comment?: string | null;
    createdAt: string;
    approved: boolean;
}

export function useUserReviews(userId: string) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        let cancelled = false;
        setLoading(true);
         const token = getAuthToken();
        if (!token) {
            console.error("No auth token found");
            setReviews([]);
            setLoading(false);
            return;
        }

        const fetchReviews = async () => {
            try {
                const res = await fetch(`${apiBasePath}/api/Reviews/by-user/${userId}`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });
                if (!res.ok) throw new Error("Failed to fetch reviews");
                const data: Review[] = await res.json();
                if (!cancelled) setReviews(data);
            } catch (error) {
                console.error("Не вдалося завантажити відгуки користувача:", error);
                if (!cancelled) setReviews([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchReviews();
        return () => {
            cancelled = true;
        };
    }, [userId]);

    return { reviews, loading };
}