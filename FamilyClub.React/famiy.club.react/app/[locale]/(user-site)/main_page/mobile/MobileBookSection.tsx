"use client";

import React from "react";
import MobileBookCard from "./MobileBookCard";
import MobileSectionArrow from "./MobileSectionArrow";
import { useLocalizedPath, useTranslations } from "@/lib/i18n/LocaleProvider";

type Book = {
  title: string;
  author?: string | null;
  price: string;
  image?: string | null;
  rating?: number | null;
  href?: string;
  formatTags?: Array<"paper" | "ebook" | "audio">;
};

type MobileBookSectionProps = {
  title?: string;
  books: Book[];
  showShelf?: boolean;
  href?: string;
};

export default function MobileBookSection({
  title,
  books,
  showShelf = false,
  href = "/categories",
}: MobileBookSectionProps) {
  const t = useTranslations();
  const lp = useLocalizedPath();

  if (!books || books.length === 0) return null;

  return (
    <section className="relative w-full py-2">
      {title && (
        <div className="flex items-center justify-between px-4 mb-2">
          <h2 className="font-mono text-[32px] sm:text-[36px] font-bold text-[var(--foreground-primary)] leading-none tracking-tight">
            {title}
          </h2>
          <MobileSectionArrow
            href={lp(href)}
            ariaLabel={t("home.mobile.moreSection").replace("{title}", title)}
            goToAlt={t("home.mobile.goTo")}
          />
        </div>
      )}

      {showShelf && (
        <div className="relative z-20 h-[40px] w-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-[var(--color-shelf)] mb-4">
          <img
            src="/images/catalog/shelf_tex1.png"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-50 pointer-events-none"
            alt=""
          />
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.27)] pointer-events-none" />
          <div className="absolute left-0 right-0 bottom-0 h-[20px]">
            <img
              src="/images/catalog/shelf_tex2.png"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply pointer-events-none"
              alt=""
            />
            <img
              src="/images/catalog/shelf_tex3.png"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              alt=""
            />
          </div>
        </div>
      )}

      <div className="flex overflow-x-auto gap-4 px-4 pb-4 pt-1 snap-x snap-mandatory scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {books.map((book, idx) => (
          <div key={`${book.title}-${idx}`} className="snap-start shrink-0">
            <MobileBookCard {...book} />
          </div>
        ))}
      </div>
    </section>
  );
}
