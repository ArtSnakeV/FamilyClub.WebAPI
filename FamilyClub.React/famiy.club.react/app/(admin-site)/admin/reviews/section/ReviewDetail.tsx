"use client";

import { Review } from "../types";
import StarRating from "../ui/StarRating";

interface Props {
  review: Review;
  onToggleApprove: () => void;
  onDelete: () => void;
}

export default function ReviewDetail({
  review,
  onToggleApprove,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 w-full min-w-0 max-w-full overflow-hidden flex flex-col shadow-[0_0_15px_rgba(0,0,0,0.08)]">
      <h3 className="font-semibold mb-4 text-[#1F1F1F]">Деталі відгуку</h3>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 min-w-0">
        <div className="min-w-0">
          <p className="font-semibold text-lg text-[#1F1F1F] break-words">
            {review.productName ?? `Товар #${review.productId}`}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(review.createdAt).toLocaleString("uk-UA")}
          </p>
        </div>
        <div className="sm:text-right flex-shrink-0">
          <p className="text-sm font-medium mb-1">Оцінка</p>
          <StarRating rating={review.rating} />
        </div>
      </div>

      <div className="mt-6 min-w-0">
        <p className="text-sm font-medium mb-2">Текст відгуку</p>
        <p className="text-sm text-gray-700 leading-relaxed break-words whitespace-pre-wrap">
          {review.comment ?? "—"}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full min-w-0">
        <button
          type="button"
          onClick={onDelete}
          className="w-full sm:flex-1 min-w-0 py-2.5 px-3 rounded-lg border border-red-500/70 text-red-600 text-[14px] font-semibold hover:bg-red-50"
        >
          Видалити
        </button>
        <button
          type="button"
          onClick={onToggleApprove}
          className="w-full sm:flex-1 min-w-0 py-2.5 px-3 rounded-lg bg-[#1F5C3D] text-white text-[14px] font-semibold hover:opacity-90"
        >
          {review.approved ? "Зняти з публікації" : "Опублікувати"}
        </button>
      </div>
    </div>
  );
}
