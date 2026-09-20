"use client";

import Image from "next/image";
import { useTheme } from "@/lib/theme/ThemeProvider";

interface Props {
  search: string;
  book: string;
  rating: string;
  onSearchChange: (v: string) => void;
  onBookChange: (v: string) => void;
  onRatingChange: (v: string) => void;
  onReset: () => void;
  bookOptions: { id: string; title: string }[];
}

const fieldClass =
  "rounded-lg px-3 py-2 bg-[var(--background-elevated)] text-[var(--foreground-primary)] outline-none border border-[color-mix(in_srgb,var(--foreground-primary)_18%,transparent)] focus:border-[var(--color-green)] placeholder:text-[var(--color-muted-fg)]";

export default function ReviewsFilterBar({
  search,
  book,
  rating,
  onSearchChange,
  onBookChange,
  onRatingChange,
  onReset,
  bookOptions,
}: Props) {
  const { theme } = useTheme();
  const isNight = theme === "ink-night";
  const iconFilter = isNight
    ? { filter: "brightness(0) invert(0.88)" }
    : undefined;

  return (
    <div className="relative rounded-2xl w-[77vw] h-[14vh] p-2 pb-4 flex items-center justify-between overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none admin-parchment-bg"
        style={{
          backgroundImage: "url('/images/reviewsAdmin/Rectangle 712.png')",
          backgroundSize: "100% 100%",
        }}
      />
      <div className="relative z-10 p-2 flex flex-row gap-6 ml-4 items-center">
        <div className="relative">
          <label className="text-[20px] font-medium block mb-1 text-[var(--foreground-primary)]">
            Пошук
          </label>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Пошук по відгукам"
            className={`${fieldClass} w-56 pr-10`}
          />
          <span className="absolute right-2 top-[4.7vh] w-[20px] h-[20px] flex items-center justify-center pointer-events-none">
            <Image
              src="/images/reviewsAdmin/magnifying-glass-solid-full.png"
              alt=""
              width={20}
              height={20}
              className="object-contain opacity-60"
              style={iconFilter}
            />
          </span>
        </div>

        <div>
          <label className="text-[20px] font-medium block mb-1 text-[var(--foreground-primary)]">
            Книги
          </label>
          <select
            value={book}
            onChange={(e) => onBookChange(e.target.value)}
            className={`${fieldClass} w-44`}
          >
            <option value="all">Всі книги</option>
            {bookOptions.map((b) => (
              <option key={b.id} value={b.id}>
                {b.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[20px] font-medium block mb-1 text-[var(--foreground-primary)]">
            Оцінка
          </label>
          <select
            value={rating}
            onChange={(e) => onRatingChange(e.target.value)}
            className={`${fieldClass} w-36`}
          >
            <option value="all">Всі оцінки</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} {r === 1 ? "зірка" : "зірок"}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="relative z-10 p-2 mt-2">
        <button
          type="button"
          onClick={onReset}
          className="mr-6 flex items-center gap-2 text-[16px] text-[var(--color-muted-fg)] hover:text-[var(--color-green)] whitespace-nowrap transition"
        >
          <Image
            src="/images/reviewsAdmin/arrows-rotate-solid-full 1.png"
            alt=""
            width={16}
            height={16}
            className="object-contain opacity-60"
            style={iconFilter}
          />
          Скинути фільтри
        </button>
      </div>
    </div>
  );
}
