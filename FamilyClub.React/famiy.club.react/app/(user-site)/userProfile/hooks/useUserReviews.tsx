"use client";

import { useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";

export type ReviewDto = {
    id: number;
    productId: number;
    userId: string;
    rating: number;
    comment: string | null;
    createdAt: string;
    approved: boolean;
};

export function useUserReviews(userId: string | undefined) {
    const [reviews, setReviews] = useState<ReviewDto[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userId) return;

        const token = localStorage.getItem("token");
        setLoading(true);

        fetch(`${apiBasePath}/api/Reviews/by-user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then(setReviews)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [userId]);

    return { reviews, loading };
}