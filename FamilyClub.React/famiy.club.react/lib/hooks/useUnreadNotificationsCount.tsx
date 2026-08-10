"use client";

import { useCallback, useEffect, useState } from "react";
import { notificationService } from "@/lib/api/services";

export function useUnreadNotificationsCount(clubMemberId?: string) {
    const [count, setCount] = useState(0);

    const fetchCount = useCallback(async () => {
        if (!clubMemberId) {
            setCount(0);
            return;
        }
        try {
            const data = await notificationService.apiNotificationsUnreadCountClubMemberIdGet({
                clubMemberId,
            });
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