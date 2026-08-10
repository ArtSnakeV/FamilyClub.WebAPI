"use client";

import { useEffect, useMemo, useState } from "react";
import LeftBlock from "./components/LeftBlock";
import NotificationCard from "./components/NotificationCard";
import NotificationThreadCard from "./components/NotificationThreadCard";
import NotificationThread from "./components/NotificationThread";
import useReviews from "../../(admin-site)/admin/reviews/hooks/useReviews";
import useNotifications from "./hooks/useNotifications";
import { useCurrentUser } from "../userProfile/hooks/useCurrentUser";
import Image from "next/image";

const TABS = [
    { label: "Усі" },
    { label: "Відгуки" },
    { label: "Повідомлення" },
];

function formatDate(date?: Date) {
    if (!date) return "";
    return new Date(date).toLocaleString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function NotificationsPage() {
    const [activeTab, setActiveTab] = useState("Усі");
    const [threadOpen, setThreadOpen] = useState(false);

    const { user } = useCurrentUser();
    const { reviews, loadingReviews } = useReviews();
    const { notifications, loadingNotifications, markAllAsRead } = useNotifications(user?.id);

    useEffect(() => {
        document.body.style.backgroundImage = "url('/images/authorsUserPage/Rectangle 326.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";

        return () => {
            document.body.style.backgroundImage = "";
            document.body.style.backgroundSize = "";
            document.body.style.backgroundAttachment = "";
            document.body.style.backgroundPosition = "";
            document.body.style.backgroundRepeat = "";
        };
    }, []);

    const isLoading = loadingReviews || loadingNotifications;

    const reviewItems = useMemo(
        () =>
            reviews.map((r: any, i: number) => ({
                key: `review-${r.id ?? i}`,
                title: r.bookTitle ?? r.title ?? "Відгук",
                time: r.createdAt ?? r.date ?? "",
                text: r.text ?? r.content ?? "",
                avatarSrc: r.userAvatar ?? undefined,
                coverSrc: r.bookCover ?? undefined,
                actionLabel: "переглянути відгук",
            })),
        [reviews]
    );

    const avatarSrc = user?.avatarData
        ? user.avatarData.startsWith("data:")
            ? user.avatarData
            : `data:image/jpeg;base64,${user.avatarData}`
        : undefined;

    const avatarFallback = !avatarSrc ? (user?.name?.[0] ?? "👤") : undefined;

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    // останнє за часом повідомлення для прев'ю на картці
    const lastNotification = useMemo(() => {
        if (notifications.length === 0) return null;
        return [...notifications].sort(
            (a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
        )[0];
    }, [notifications]);

    const handleOpenThread = () => {
        setThreadOpen(true);
        markAllAsRead();
    };

    const visibleItems = useMemo(() => {
        if (activeTab === "Відгуки") return reviewItems;
        if (activeTab === "Повідомлення") return [];
        return reviewItems;
    }, [activeTab, reviewItems]);

    const showThreadCard =
        (activeTab === "Усі" || activeTab === "Повідомлення") && notifications.length > 0;

    return (
        <div className="relative h-[800px] w-[1700px] ml-0 flex flex-col">
            <Image
                src="/images/notifications/Rectangle 419.png"
                alt=""
                fill
                className="object-cover object-right pointer-events-none"
            />

            <div className="relative flex gap-8 mt-52">
                <div className="w-[310px] shrink-0 flex flex-col gap-3 -ml-8">
                    {TABS.map((tab) => (
                        <LeftBlock
                            key={tab.label}
                            label={tab.label}
                            active={activeTab === tab.label}
                            onClick={() => setActiveTab(tab.label)}
                        />
                    ))}
                </div>

                <div className="flex-1 flex flex-row items-center justify-center gap-4">
                    {isLoading ? (
                        <div className="text-center py-8 text-black/60">
                            Завантаження...
                        </div>
                    ) : (
                        <>
                            {showThreadCard && lastNotification && (
                                <NotificationThreadCard
                                    avatarSrc={avatarSrc}
                                    avatarFallback={avatarFallback}
                                    lastMessageText={lastNotification.text ?? ""}
                                    lastMessageTime={formatDate(lastNotification.createdAt)}
                                    unreadCount={unreadCount}
                                    onClick={handleOpenThread}
                                />
                            )}

                            {visibleItems.map(({ key, ...item }) => (
                                <NotificationCard key={key} {...item} />
                            ))}

                            {!showThreadCard && visibleItems.length === 0 && (
                                <div className="text-center py-8 text-black/60">
                                    Тут поки що порожньо
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <NotificationThread
                open={threadOpen}
                onClose={() => setThreadOpen(false)}
                messages={notifications}
                avatarSrc={avatarSrc}
                avatarFallback={avatarFallback}
                formatDate={formatDate}
            />
        </div>
    );
}