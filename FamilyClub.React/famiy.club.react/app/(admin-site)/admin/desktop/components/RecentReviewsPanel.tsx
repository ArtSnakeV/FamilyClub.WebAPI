"use client";

import Link from "next/link";
import { useMemo } from "react";
import type {
  ClubMemberReadDto,
  ProductDto,
  ReviewDto,
} from "@/lib/api/generated";
import { formatRelativeTimeUk } from "../utils/formatRelativeTime";
import {
  buildMemberMap,
  getMemberAvatarSrc,
  getMemberDisplayName,
  getProductName,
  sortReviewsByNewest,
} from "../utils/reviewDisplayUtils";

type Props = {
  reviews: ReviewDto[];
  products?: ProductDto[];
  members?: ClubMemberReadDto[];
  isLoading?: boolean;
  href?: string;
  limit?: number;
};

function Avatar({ member }: { member?: ClubMemberReadDto | null }) {
  const src = getMemberAvatarSrc(member);
  const name = getMemberDisplayName(member);
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  if (src) {
    return (
      <img
        src={src}
        alt=""
        className="w-10 h-10 rounded-full object-cover shrink-0 bg-[#E8E4DC]"
      />
    );
  }

  return (
    <div
      className="w-10 h-10 rounded-full shrink-0 bg-[#E8E4DC] flex items-center justify-center text-xs font-semibold text-[#555]"
      aria-hidden
    >
      {initials || "?"}
    </div>
  );
}

export default function RecentReviewsPanel({
  reviews,
  products = [],
  members = [],
  isLoading = false,
  href = "/admin/reviews",
  limit = 5,
}: Props) {
  const memberMap = useMemo(() => buildMemberMap(members), [members]);

  const recent = useMemo(
    () => sortReviewsByNewest(reviews, limit),
    [reviews, limit]
  );

  return (
    <div className="flex flex-col gap-4 px-5 py-5 bg-[var(--color-white)] rounded-[10px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.25)] min-h-[280px]">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-bold text-[#242424]">Відгуки</h3>
        {href && (
          <Link
            href={href}
            className="text-sm text-[#005b33] hover:underline shrink-0"
          >
            Переглянути всі
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-[#005b33] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : recent.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-12 text-sm text-[#777]">
          Немає відгуків
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-[#E8E4DC]">
          {recent.map((review) => {
            const member = review.userId
              ? memberMap.get(review.userId)
              : undefined;
            const productName = getProductName(review.productId, products);

            return (
              <li
                key={review.id}
                className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
              >
                <Avatar member={member} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-[#242424] truncate">
                      {getMemberDisplayName(member)}
                    </p>
                    <span className="text-xs text-[#888] whitespace-nowrap shrink-0">
                      {formatRelativeTimeUk(review.createdAt)}
                    </span>
                  </div>

                  <p className="text-xs text-[#666] mt-1 truncate">
                    <span className="text-[#888]">Товар: </span>
                    {productName}
                  </p>

                  {review.comment && (
                    <p className="text-sm text-[#242424] mt-1 line-clamp-2">
                      {review.comment}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
