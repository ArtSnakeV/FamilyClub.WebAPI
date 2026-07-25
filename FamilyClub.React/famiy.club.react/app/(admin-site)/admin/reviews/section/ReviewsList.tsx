"use client";

import { Review } from "../types";
import StatusBadge from "../ui/StatusBadge";
import StarRating from "../ui/StarRating";

interface Props {
  reviews: Review[];
  selectedId?: number;
  onSelect: (r: Review) => void;
}

export default function ReviewsList({ reviews, selectedId, onSelect }: Props) {
  return (
    <div className="bg-white rounded-2xl p-4 w-full min-w-0 max-h-[calc(100vh-220px)] overflow-y-auto flex flex-col gap-3 shadow-[0_0_15px_rgba(0,0,0,0.08)]">
      {reviews.length === 0 ? (
        <p className="text-[14px] text-[#999] py-6 text-center">
          Відгуків не знайдено
        </p>
      ) : (
        reviews.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelect(r)}
            className={`flex flex-col gap-1 p-3 rounded-xl border text-left transition min-w-0 ${
              selectedId === r.id
                ? "border-[#1F5C3D] bg-[#1F5C3D]/5"
                : "border-transparent hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between gap-2 min-w-0">
              <span className="font-medium truncate min-w-0">
                {r.productName ?? `Товар #${r.productId}`}
              </span>
              <StatusBadge approved={r.approved} />
            </div>
            <p className="text-xs text-gray-400">
              {new Date(r.createdAt).toLocaleString("uk-UA")}
            </p>
            <StarRating rating={r.rating} />
            <p className="text-sm text-gray-600 line-clamp-2 break-words">
              {r.comment}
            </p>
          </button>
        ))
      )}
    </div>
  );
}
