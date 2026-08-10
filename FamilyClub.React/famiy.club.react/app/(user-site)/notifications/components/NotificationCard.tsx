"use client";

import Image from "next/image";

type Thumbnail = { src: string; alt?: string };

type NotificationCardProps = {
    avatarSrc?: string;
    avatarFallback?: string;
    title: string;
    time: string;
    text?: string;
    actionLabel?: string;
    onAction?: () => void;
    coverSrc?: string;
    thumbnails?: Thumbnail[]; // для блоків типу "В дорозі"
    author?: string;
    variant?: "default" | "highlight";
    onLike?: () => void;
    onCart?: () => void;
};

export default function NotificationCard({
    avatarSrc,
    avatarFallback,
    title,
    time,
    text,
    actionLabel = "переглянути",
    onAction,
    coverSrc,
    thumbnails,
    author,
    variant = "default",
    onLike,
    onCart,
}: NotificationCardProps) {
    return (
        <div
            className={`w-[500px] h-[190px] p-5`}
            style={{
                backgroundImage: "url('/images/notifications/Rectangle 431.png')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                        {avatarSrc ? (
                            <Image src={avatarSrc} alt={title} width={40} height={40} className="rounded-full object-cover shrink-0" />
                        ) : avatarFallback ? (
                            <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-lg shrink-0">
                                {avatarFallback}
                            </div>
                        ) : null}
                        <h3 className="font-bold text-lg truncate">{title}</h3>
                    </div>
                    <span className="text-xs text-black/50 shrink-0">{time}</span>
                </div>

                {text && <p className="text-sm text-black/70 mb-3 line-clamp-2">{text}</p>}

                {thumbnails && thumbnails.length > 0 && (
                    <div className="flex gap-2 mb-3">
                        {thumbnails.map((t, i) => (
                            <Image key={i} src={t.src} alt={t.alt ?? ""} width={50} height={70} className="rounded object-cover" />
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    {actionLabel && (
                        <button onClick={onAction} className="text-sm font-medium text-[var(--color-green,#1e5631)] hover:underline">
                            {actionLabel}
                        </button>
                    )}
                    <div className="flex items-center gap-3">
                        {onLike && (
                            <button onClick={onLike} aria-label="like">♡</button>
                        )}
                        {onCart && (
                            <button onClick={onCart} aria-label="cart">🧺</button>
                        )}
                    </div>
                </div>

                {author && <p className="text-xs text-black/50 mt-2">{author}</p>}
            </div>

            {coverSrc && (
                <Image src={coverSrc} alt={title} width={90} height={120} className="rounded object-cover shrink-0" />
            )}
        </div>
    );
}