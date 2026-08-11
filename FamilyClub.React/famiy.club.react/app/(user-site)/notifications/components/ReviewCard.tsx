"use client";

type ReviewCardProps = {
    reviewerName: string;
    reviewerAvatarSrc?: string;
    time: string;
    text: string;
    coverSrc?: string;
    bookTitle?: string;
    actionLabel?: string;
    onAction?: () => void;
    liked?: boolean;
    onLike?: () => void;
};

export default function ReviewCard({
    reviewerName,
    reviewerAvatarSrc,
    time,
    text,
    coverSrc,
    bookTitle,
    actionLabel = "переглянути відгук",
    onAction,
    liked = false,
    onLike,
}: ReviewCardProps) {
    return (
        <div className="w-[500px] rounded-2xl bg-[var(--color-white)] shadow-[0_0_20px_rgba(80,137,190,0.6)] p-4 flex items-start gap-4">
            {reviewerAvatarSrc ? (
                <img
                    src={reviewerAvatarSrc}
                    alt={reviewerName}
                    className="w-25 h-25 rounded-full object-cover shrink-0"
                />
            ) : (
                <div className="w-25 h-25 rounded-full bg-black/10 flex items-center justify-center text-2xl font-semibold text-black/50 shrink-0">
                    {reviewerName?.[0]?.toUpperCase() ?? "👤"}
                </div>
            )}

            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-lg text-black truncate">{reviewerName}</h3>
                    <span className="text-xs text-black/50 shrink-0 mt-1">{time}</span>
                </div>

                <p className="text-sm text-black/70 mt-1 line-clamp-3">{text}</p>

                <div className="flex items-center justify-between mt-3">
                    {actionLabel && (
                        <button
                            onClick={onAction}
                            className="text-sm font-medium text-[#1e5631] hover:underline"
                        >
                            {actionLabel}
                        </button>
                    )}
                </div>
            </div>

            {coverSrc && (
                <img
                    src={coverSrc}
                    alt={bookTitle ?? ""}
                    className="w-[70px] h-[95px] object-cover rounded-lg shrink-0"
                />
            )}
        </div>
    );
}