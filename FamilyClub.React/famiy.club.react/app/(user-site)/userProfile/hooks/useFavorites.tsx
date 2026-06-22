"use client";

import { useEffect, useState } from "react";
import { favoriteService } from "@/lib/api/services";

export type FavoriteBook = {
    id: number;
    productName: string | null;
};

export function useFavorites(userId: string | undefined) {
    const [favorites, setFavorites] = useState<FavoriteBook[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userId) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        setLoading(true);

        favoriteService
            .apiFavoritesGet({
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((data) =>
                setFavorites(
                    data.map((p) => ({
                        id: p.id ?? 0,
                        productName: p.productName ?? null,
                    }))
                )
            )
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [userId]);

    return { favorites, loading };
}