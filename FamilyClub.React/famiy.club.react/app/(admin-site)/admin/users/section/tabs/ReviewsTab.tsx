"use client";

import { UserInfo } from "../../hooks/useAllUsersInfo";
import { useUserReviews } from "../../hooks/useUserReviews";

interface Props {
    user: UserInfo;
}

const borderSubtle =
    "border-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)]";

function StarRating({ rating }: { rating: number }) {
    return (
        <span className="text-[var(--color-green)] text-sm whitespace-nowrap">
            {"★".repeat(Math.round(rating))}
            {"☆".repeat(5 - Math.round(rating))}
        </span>
    );
}

export default function ReviewsTab({ user }: Props) {
    const { reviews, loading } = useUserReviews(user.id);

    if (loading) {
        return (
            <p className="text-sm text-[var(--color-muted-fg)]">Завантаження...</p>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-[var(--foreground-primary)] font-semibold text-[18px]">
                    Відгуків поки немає
                </p>
                <p className="text-sm text-[var(--color-muted-fg)] mt-1">
                    Тут з'являться всі відгуки, залишені користувачем
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 max-w-full">
            {reviews.map((review) => (
                <div
                    key={review.id}
                    className={`rounded-[9px] border ${borderSubtle} bg-[var(--background-elevated)] p-4 flex flex-col gap-2 max-w-full`}
                >
                    <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1">
                        <span className="font-semibold text-[16px] text-[var(--foreground-primary)] truncate">
                            {review.productName ?? `Товар #${review.productName}`}
                        </span>
                        <StarRating rating={review.rating} />
                    </div>

                    {review.comment && (
                        <p className="text-sm text-[var(--foreground-primary)]">
                            {review.comment}
                        </p>
                    )}

                    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
                        <span className="text-[var(--color-muted-fg)] whitespace-nowrap">
                            {new Date(review.createdAt).toLocaleDateString("uk-UA", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </span>
                        <span
                            className={`text-sm font-medium whitespace-nowrap ${
                                review.approved
                                    ? "text-[var(--color-green)]"
                                    : "text-[var(--color-muted-fg)]"
                            }`}
                        >
                            {review.approved ? "Опубліковано" : "На модерації"}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
