"use client";

import { useCallback, useEffect, useState } from "react";
import type { NotificationDTO } from "@/lib/api/generated/models";
import { notificationService } from "@/lib/api/services";


export default function useNotifications(clubMemberId?: string) {
    const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
    const [loadingNotifications, setLoadingNotifications] = useState(true);

    const fetchNotifications = useCallback(async () => {
        setLoadingNotifications(true);
        try {
            const data = await notificationService.apiNotificationsGet();
            const filtered = clubMemberId
                ? data.filter((n) => n.clubMemberId === clubMemberId)
                : data;
            setNotifications(filtered);
        } catch (err) {
            console.error("useNotifications failed:", err);
        } finally {
            setLoadingNotifications(false);
        }
    }, [clubMemberId]);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const markAllAsRead = useCallback(async () => {
        const unread = notifications.filter((n) => !n.isRead);
        if (unread.length === 0) return;

        // оптимістично позначаємо все прочитаним
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));

        try {
            await Promise.all(
                unread.map((n) =>
                    notificationService.apiNotificationsIdPut({
                        id: n.id as unknown as number,
                        notificationDTO: { ...n, isRead: true },
                    })
                )
            );
            window.dispatchEvent(new Event("notifications-updated"));
        } catch (err) {
            console.error("markAllAsRead failed:", err);
            // якщо щось не вдалось — синхронізуємось з бекендом заново
            fetchNotifications();
        }
    }, [notifications, fetchNotifications]);

    return { notifications, loadingNotifications, refetch: fetchNotifications, markAllAsRead };
}