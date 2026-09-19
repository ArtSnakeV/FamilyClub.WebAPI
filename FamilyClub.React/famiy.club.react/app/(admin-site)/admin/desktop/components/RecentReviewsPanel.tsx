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
        className="w-10 h-10 rounded-full object-cover shrink-0 bg-[color-mix(in_srgb,var(--foreground-primary)_10%,transparent)]"
      />
    );
  }

  return (
    <div
      className="w-10 h-10 rounded-full shrink-0 bg-[color-mix(in_srgb,var(--foreground-primary)_10%,transparent)] flex items-center justify-center text-xs font-semibold text-[var(--color-muted-fg)]"
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
    <div className="flex flex-col gap-4 px-5 py-5 bg-[var(--background-elevated)] text-[var(--foreground-primary)] rounded-[10px] shadow-[var(--shadow-panel)] min-h-[280px]">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-bold text-[var(--foreground-primary)]">
          Відгуки
        </h3>
        {href && (
          <Link
            href={href}
            className="text-sm text-[var(--color-green)] hover:underline shrink-0"
          >
            Переглянути всі
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-[var(--color-green)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : recent.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-12 text-sm text-[var(--color-muted-fg)]">
          Немає відгуків
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)]">
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
                    <p className="text-sm font-semibold text-[var(--foreground-primary)] truncate">
                      {getMemberDisplayName(member)}
                    </p>
                    <span className="text-xs text-[var(--color-muted-fg)] whitespace-nowrap shrink-0">
                      {formatRelativeTimeUk(review.createdAt)}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--color-muted-fg)] mt-1 truncate">
                    <span>Товар: </span>
                    {productName}
                  </p>

                  {review.comment && (
                    <p className="text-sm text-[var(--foreground-primary)] mt-1 line-clamp-2">
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
