"use client";

import { useCallback, useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";
import { Review } from "../types";

export default function useReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loadingReviews, setLoadingReviews] = useState(true);

    const fetchReviews = useCallback(async () => {
        setLoadingReviews(true);
        try {
            const res = await fetch(`${apiBasePath}/api/Reviews`);
            if (!res.ok) throw new Error(`Failed to fetch reviews (${res.status})`);
            const data: Review[] = await res.json();
            setReviews(data);
        } catch (err) {
            console.error("useReviews failed:", err);
        } finally {
            setLoadingReviews(false);
        }
    }, []);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    return { reviews, loadingReviews, refetch: fetchReviews };
}