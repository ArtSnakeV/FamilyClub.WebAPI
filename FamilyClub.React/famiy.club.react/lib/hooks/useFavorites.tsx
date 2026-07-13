"use client";

import { useCallback, useEffect, useState } from "react";
import { favoriteService } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

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

        const token = getAuthToken();
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
    const toggleFavorite = useCallback(async (productId: number) => {
        const token = getAuthToken();
        if (!token) return;

        const wasAlreadyFav = favorites.some((f) => f.id === productId);

        setFavorites((prev) =>
            wasAlreadyFav
                ? prev.filter((f) => f.id !== productId)
                : [...prev, { id: productId, productName: null, formatIds: [] }]
        );

        try {
            if (wasAlreadyFav) {
                await favoriteService.apiFavoritesProductIdDelete(
                    { productId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                await favoriteService.apiFavoritesProductIdPost(
                    { productId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
        } catch (e) {
            console.error(e);
            setFavorites((prev) =>
                wasAlreadyFav
                    ? [...prev, { id: productId, productName: null, formatIds: [] }]
                    : prev.filter((f) => f.id !== productId)
            );
        }
    }, [favorites]); 

    return { favorites, loadingFavorites, toggleFavorite };
}