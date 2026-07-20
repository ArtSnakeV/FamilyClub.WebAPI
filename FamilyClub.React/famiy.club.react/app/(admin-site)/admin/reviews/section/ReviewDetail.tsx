"use client";

import { Review } from "../types";
import StarRating from "../ui/StarRating";

interface Props {
    review: Review;
    onToggleApprove: () => void;
    onDelete: () => void;
}

export default function ReviewDetail({ review, onToggleApprove, onDelete }: Props) {
    return (
        <div className="bg-white rounded-2xl p-6 flex-1">
            <h3 className="font-semibold mb-4">Деталі відгуку</h3>

            <div className="flex justify-between items-start">
                <div>
                    <p className="font-semibold text-lg">
                        {review.productName ?? `Товар #${review.productId}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        {new Date(review.createdAt).toLocaleString("uk-UA")}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium mb-1">Оцінка</p>
                    <StarRating rating={review.rating} />
                </div>
            </div>

            <div className="mt-6">
                <p className="text-sm font-medium mb-2">Текст відгуку</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                    {review.comment ?? "—"}
                </p>
            </div>

            <div className="flex gap-3 mt-6">
                <button
                    type="button"
                    onClick={onDelete}
                    className="flex-1 py-2 rounded-lg border text-red-600"
                >
                    Видалити
                </button>
                <button
                    type="button"
                    onClick={onToggleApprove}
                    className="flex-1 py-2 rounded-lg bg-[#1F5C3D] text-white"
                >
                    {review.approved ? "Зняти з публікації" : "Опублікувати"}
                </button>
            </div>
        </div>
    );
}