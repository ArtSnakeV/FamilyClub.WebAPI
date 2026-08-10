"use client";

type NotificationThreadCardProps = {
    avatarSrc?: string;
    avatarFallback?: string;
    lastMessageText: string;
    lastMessageTime: string;
    unreadCount: number;
    onClick: () => void;
};

export default function NotificationThreadCard({
    avatarSrc,
    avatarFallback,
    lastMessageText,
    lastMessageTime,
    unreadCount,
    onClick,
}: NotificationThreadCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-[500px] h-[190px] p-5 text-left"
            style={{
                backgroundImage: "url('/images/notifications/Rectangle 431.png')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="relative shrink-0">
                        {avatarSrc ? (
                            <img
                                src={avatarSrc}
                                alt="Повідомлення"
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-lg">
                                {avatarFallback ?? "👤"}
                            </div>
                        )}
                        {unreadCount > 0 && (
                            <span
                                className="
                                    absolute -top-1 -right-1
                                    bg-red-500 text-white text-[11px]
                                    min-w-[18px] h-[18px]
                                    rounded-full
                                    flex items-center justify-center
                                    px-1
                                "
                            >
                                {unreadCount}
                            </span>
                        )}
                    </div>
                    <h3 className="font-bold text-lg truncate">Повідомлення</h3>
                </div>
                <span className="text-xs text-black/50 shrink-0">{lastMessageTime}</span>
            </div>

            <p className="text-sm text-black/70 mb-3 line-clamp-2">{lastMessageText}</p>

            <span className="text-sm cursor-pointer font-medium text-[var(--color-green,#1e5631)]">
                переглянути
            </span>
        </button>
    );
}