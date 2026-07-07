"use client";

import { useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";

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

        const fetchReviews = async () => {
            try {
                const res = await fetch(`${apiBasePath}/api/Reviews/by-user/${userId}`);
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