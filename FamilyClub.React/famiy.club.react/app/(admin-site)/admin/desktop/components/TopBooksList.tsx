"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { AuthorDTO, OrderDTO, ProductDto } from "@/lib/api/generated";
import {
  buildTopBooksData,
  formatSalesCount,
} from "../utils/buildTopBooksData";

type Props = {
  orders: OrderDTO[];
  products: ProductDto[];
  authors?: AuthorDTO[];
  isLoading?: boolean;
  href?: string;
  limit?: number;
  className?: string;
};

function RankBadge({ rank }: { rank: number }) {
  return (
    <span className="flex items-center justify-center w-7 h-10 rounded-md bg-[#E8E4DC] text-sm font-semibold text-[#5C4A3A] shrink-0">
      {rank}
    </span>
  );
}

function BookCover({ src, name }: { src: string | null; name: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="w-10 h-14 rounded object-cover shrink-0 bg-[#E8E4DC]"
      />
    );
  }

  return (
    <div
      className="w-10 h-14 rounded shrink-0 bg-[#E8E4DC] flex items-center justify-center text-[10px] font-semibold text-[#888] text-center px-0.5"
      aria-hidden
    >
      ?
    </div>
  );
}

export default function TopBooksList({
  orders,
  products,
  authors = [],
  isLoading = false,
  href = "/admin/books",
  limit = 5,
  className = "",
}: Props) {
  const topBooks = useMemo(
    () => buildTopBooksData(orders, products, authors, limit),
    [orders, products, authors, limit]
  );

  return (
    <div
      className={`flex flex-col gap-4 px-5 py-5 bg-[var(--color-white)] rounded-[10px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.25)] min-h-[280px] ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-bold text-[#242424] leading-snug">
          Топ найпопулярніших книг
        </h3>
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
      ) : topBooks.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-12 text-sm text-[#777]">
          Немає даних про продажі
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-[#E8E4DC]">
          {topBooks.map((book) => (
            <li
              key={book.productId}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
            >
              <RankBadge rank={book.rank} />

              <BookCover src={book.coverSrc} name={book.name} />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#242424] truncate">
                  {book.name}
                </p>
                {book.authorName && (
                  <p className="text-xs text-[#888] mt-0.5 truncate">
                    {book.authorName}
                  </p>
                )}
              </div>

              <span className="text-xs text-[#242424] whitespace-nowrap shrink-0 self-start pt-0.5">
                {formatSalesCount(book.salesCount)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
