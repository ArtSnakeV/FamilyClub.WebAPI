"use client";

import React from "react";
import Link from "next/link";
import MobileSectionArrow from "./MobileSectionArrow";
import { useLocalizedPath, useTranslations } from "@/lib/i18n/LocaleProvider";

export type GazetteItem = {
  id: string;
  authorName: string;
  authorHandle: string;
  tag: string;
  title: string;
  image?: string | null;
  avatar?: string | null;
  href?: string;
};

type MobileInkSectionProps = {
  items?: GazetteItem[];
};

export default function MobileInkSection({ items }: MobileInkSectionProps) {
  const t = useTranslations();
  const lp = useLocalizedPath();
  const displayItems: GazetteItem[] =
    items && items.length > 0
      ? items
      : [];

  if (displayItems.length === 0) return null;

  return (
    <section className="relative w-full py-4">
      {/* Title "Газета" & Arrow Button (Figma Node 2199:2774 / 2199:2982) */}
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="font-mono text-[32px] sm:text-[36px] font-bold text-[var(--foreground-primary)] leading-none tracking-tight">
          {t("home.mobile.gazette")}
        </h2>
        <MobileSectionArrow
          href={lp("/categories")}
          ariaLabel={t("home.mobile.moreGazette")}
          goToAlt={t("home.mobile.goTo")}
        />
      </div>

      {/* Horizontal Scroll of Gazette Cards (Figma Node 2199:2799) */}
      <div className="flex overflow-x-auto gap-4 px-4 pb-4 pt-1 snap-x snap-mandatory scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {displayItems.map((item) => (
          <Link
            key={item.id}
            href={item.href && !item.href.startsWith("/") ? item.href : lp(item.href || "/categories")}
            className="group relative h-[205px] w-[186px] shrink-0 snap-start rounded-[10px] bg-[var(--background-elevated)] p-3 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.4)] border-[10px] border-[var(--background-elevated)] flex flex-col justify-between transition-transform active:scale-[0.98]"
          >
            {/* Background texture (Figma imgRectangle438) */}
            <div className="absolute inset-0 rounded-[10px] -z-10 overflow-hidden pointer-events-none">
              <div className="absolute bg-[var(--background-elevated)] inset-0" />
              <img
                src="/images/main_page/mobile/gazette-bg.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none admin-parchment-bg-soft"
              />
            </div>

            {/* Top: Avatar, Name, Handle, Tag */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5">
                <div className="w-[35px] h-[35px] rounded-full overflow-hidden shrink-0">
                  <img
                    src={item.avatar || "/images/main_page/mobile/ink-avatar.png"}
                    alt={item.authorName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col leading-none overflow-hidden">
                  <span className="font-sans font-bold text-[16px] text-[var(--foreground-primary)] truncate leading-tight">
                    {item.authorName}
                  </span>
                  <span className="font-sans font-bold text-[14px] text-[var(--color-muted-fg)] truncate">
                    {item.authorHandle}
                  </span>
                </div>
              </div>
              <span className="font-sans font-bold text-[14px] text-[var(--color-muted-fg)] mt-1 block">
                {item.tag}
              </span>
            </div>

            {/* Middle Image (Figma Node 2199:2782) */}
            <div className="h-[79px] w-full rounded-[5px] overflow-hidden my-1 bg-[color-mix(in_srgb,var(--foreground-primary)_6%,transparent)] flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-[var(--color-muted-fg)] text-center p-1 bg-[color-mix(in_srgb,var(--foreground-primary)_8%,var(--background-elevated))] w-full h-full">
                  <span className="text-lg" aria-hidden>
                    📖
                  </span>
                  <span className="text-[8px] font-serif">{t("product.noPhoto")}</span>
                </div>
              )}
            </div>

            {/* Bottom Title / Action Text (Figma Node 2199:2783) */}
            <div className="text-center">
              <span className="font-sans font-bold text-[20px] text-[var(--foreground-primary)] leading-tight block truncate tracking-[-0.22px]">
                {item.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
