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
        <div className="bg-white rounded-2xl p-4 w-[420px] flex flex-col gap-3">
            {reviews.map((r) => (
                <button
                    key={r.id}
                    type="button"
                    onClick={() => onSelect(r)}
                    className={`flex flex-col gap-1 p-3 rounded-xl border text-left transition ${
                        selectedId === r.id
                            ? "border-[#1F5C3D] bg-[#1F5C3D]/5"
                            : "border-transparent hover:bg-gray-50"
                    }`}
                >
                    <div className="flex items-center justify-between gap-2">
                        <span className="font-medium truncate">
                            {r.productName ?? `Товар #${r.productId}`}
                        </span>
                        <StatusBadge approved={r.approved} />
                    </div>
                    <p className="text-xs text-gray-400">
                        {new Date(r.createdAt).toLocaleString("uk-UA")}
                    </p>
                    <StarRating rating={r.rating} />
                    <p className="text-sm text-gray-600 line-clamp-2">{r.comment}</p>
                </button>
            ))}
        </div>
    );
}