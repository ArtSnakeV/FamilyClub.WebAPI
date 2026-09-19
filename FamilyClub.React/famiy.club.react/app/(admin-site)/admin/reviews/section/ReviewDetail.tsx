"use client";

import { showConfirm } from "@/lib/ui/sweetAlert";
import { getReviewProductCoverUrl } from "@/lib/reviews/reviewCoverUrl";
import { Review } from "../types";
import StarRating from "../ui/StarRating";

interface Props {
  review: Review;
  onToggleApprove: () => void;
  onDelete: () => void;
  getImageSrc?: (review: Review) => string | null;
}

export default function ReviewDetail({
  review,
  onToggleApprove,
  onDelete,
  getImageSrc,
}: Props) {
  const mainImage = getImageSrc ? getImageSrc(review) : null;
  const productName = review.productName ?? `Товар #${review.productId}`;

  return (
    <div className="relative w-[640px] h-[740px] p-10 flex flex-col justify-between shrink-0 select-none box-border overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none admin-parchment-bg"
        style={{
          backgroundImage: "url('/images/reviewsAdmin/Rectangle 676.png')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 flex flex-col gap-5 overflow-y-auto pr-1">
        <h3 className="font-bold text-[20px] text-[var(--foreground-primary)]">
          Деталі відгуку
        </h3>

        <div className="flex gap-4 items-start">
          <div className="w-[100px] h-[140px] shrink-0 bg-[color-mix(in_srgb,var(--foreground-primary)_10%,var(--background-elevated))] rounded-md overflow-hidden shadow-[var(--shadow-card)]">
            {mainImage ? (
              <img
                src={mainImage}
                alt={productName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-[var(--color-muted-fg)] p-2 text-center">
                {productName}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between h-[140px] flex-1 min-w-0">
            <div>
              <h2
                className="font-bold text-lg text-[var(--foreground-primary)] leading-tight line-clamp-2"
                title={productName}
              >
                {productName}
              </h2>
              <p className="text-sm text-[var(--color-muted-fg)] font-medium mt-1 truncate">
                {review.authors}
              </p>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm font-medium text-[var(--foreground-primary)] truncate max-w-[120px]">
                  {review.userName ?? "Анонім"}
                </p>
                <p className="text-xs text-[var(--color-muted-fg)] mt-0.5">
                  {new Date(review.createdAt).toLocaleString("uk-UA", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="flex flex-col items-start gap-1">
                <span className="text-xs font-semibold text-[var(--foreground-primary)]">
                  Оцінка
                </span>
                <StarRating rating={review.rating} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <h4 className="font-semibold text-sm text-[var(--foreground-primary)]">
            Текст відгуку
          </h4>
          <p className="text-xs text-[var(--foreground-primary)] leading-relaxed break-words">
            {review.comment ?? "Текст відсутній"}
          </p>
        </div>

        <div className="mt-6">
          {(() => {
            const coverUrl = getReviewProductCoverUrl(review);
            if (!coverUrl) return null;

            return (
              <div className="flex flex-col gap-1.5">
                <h4 className="font-semibold text-sm text-[var(--foreground-primary)]">
                  Обкладинка книги
                </h4>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  <div className="w-[80px] h-[80px] shrink-0 rounded-md overflow-hidden bg-[color-mix(in_srgb,var(--foreground-primary)_10%,var(--background-elevated))] border border-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)]">
                    <img
                      src={coverUrl}
                      alt={review.productName ?? "Обкладинка"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-3 pt-3 shrink-0">
        <div className="text-[11px] text-[var(--color-muted-fg)] flex items-center gap-2">
          <span>IP адреса: 192.168.1.45</span>
          <span>|</span>
          <span>Пристрій: Windows/Chrome</span>
        </div>

        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={onToggleApprove}
            className={`flex-1 h-[40px] rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
              review.approved
                ? "bg-amber-600 hover:bg-amber-700 text-[var(--color-cream)]"
                : "bg-[var(--color-green)] hover:opacity-90 text-[var(--color-cream)]"
            }`}
          >
            {review.approved ? "Зняти з публікації" : "Погодити"}
          </button>

          <button
            type="button"
            onClick={async () => {
              if (
                await showConfirm(
                  "Видалити цей відгук назавжди? Дію не можна скасувати."
                )
              ) {
                onDelete();
              }
            }}
            className="flex-1 h-[40px] rounded-lg font-medium text-sm border border-red-600 text-red-600 hover:bg-[color-mix(in_srgb,#dc2626_12%,var(--background-elevated))] flex items-center justify-center gap-2 transition-colors bg-transparent"
          >
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
}
