"use client";

import { useCallback, useEffect, useState } from "react";
import { notificationService } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

export function useUnreadNotificationsCount(clubMemberId?: string) {
    const [count, setCount] = useState(0);

    const fetchCount = useCallback(async () => {
        if (!clubMemberId) {
            setCount(0);
            return;
        }
        const token = getAuthToken();
        if (!token) {
            setCount(0);
            return;
        }
        try {
            const data = await notificationService.apiNotificationsUnreadCountClubMemberIdGet(
                { clubMemberId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCount(data);
        } catch (err) {
            console.error("useUnreadNotificationsCount failed:", err);
        }
    }, [clubMemberId]);

    useEffect(() => {
        fetchCount();

        const handler = () => fetchCount();
        window.addEventListener("notifications-updated", handler);
        return () => window.removeEventListener("notifications-updated", handler);
    }, [fetchCount]);

    return count;
}