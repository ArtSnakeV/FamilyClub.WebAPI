"use client";

import { useEffect, useState } from "react";
import { favoriteService } from "@/lib/api/services";

export type FavoriteBook = {
    id: number;
    productName: string | null;
    formatIds: number[];
};

export function useFavorites(userId: string | undefined) {
    const [favorites, setFavorites] = useState<FavoriteBook[]>([]);
    const [loadingFavorites, setLoadingFavorites] = useState(false);

    useEffect(() => {
        if (!userId) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        setLoadingFavorites(true);

        favoriteService
            .apiFavoritesGet({
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((data) =>
                setFavorites(
                    data.map((p) => ({
                        id: p.id ?? 0,
                        productName: p.productName ?? null,
                        formatIds: p.formatIds ?? [], 
                    }))
                )
            )
            .catch(console.error)
            .finally(() => setLoadingFavorites(false));
    }, [userId]);

    return { favorites, loadingFavorites };
}