"use client";

import React from "react";
import Link from "next/link";

type MobileBookCardProps = {
  title: string;
  author?: string | null;
  price: string;
  image?: string | null;
  rating?: number | null;
  href?: string;
  formatTags?: Array<"paper" | "ebook" | "audio">;
};

const formatIconMap = {
  paper: {
    bg: "/images/main_page/icons/rec-icon-paper-bg.svg",
    icon: "/images/main_page/icons/rec-icon-paper.svg",
    label: "Паперова",
  },
  ebook: {
    bg: "/images/main_page/icons/rec-icon-ebook-bg.svg",
    icon: "/images/main_page/icons/rec-icon-ebook.svg",
    label: "eBooks",
  },
  audio: {
    bg: "/images/main_page/icons/rec-icon-audio-bg.svg",
    icon: "/images/main_page/icons/rec-icon-audio.svg",
    label: "Аудіо книга",
  },
};

export default function MobileBookCard({
  title,
  author,
  price,
  image,
  href,
  formatTags,
}: MobileBookCardProps) {
  const activeFormatTags = formatTags?.length ? formatTags : [];

  const cardContent = (
    <div className="relative h-[258px] w-[186px] shrink-0 block overflow-hidden rounded-bl-[20px] rounded-br-[20px] shadow-[0px_8px_15px_rgba(36,36,36,0.25)] bg-[#f5f3ee] transition-transform duration-300 active:scale-[0.98]">
      {/* Background Gradient overlay matching Figma Node 2190:2466 */}
      <div
        className="absolute inset-0 rounded-bl-[20px] rounded-br-[20px] pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(245, 243, 238, 0.3) 89.6%, rgba(0, 0, 0, 0.15) 100%), linear-gradient(90deg, rgb(245, 243, 238) 0%, rgb(245, 243, 238) 100%)",
        }}
      />

      {/* Top Left Format Tags (Figma Node 2190:2659) */}
      {activeFormatTags.length > 0 && (
        <div className="absolute left-0 top-[12px] z-20 flex flex-col gap-1">
          {activeFormatTags.map((tag) => {
            const item = formatIconMap[tag];
            return (
              <div key={tag} className="relative h-[26px] w-[28px] group">
                <img
                  alt={item.label}
                  className="absolute inset-0 h-full w-full object-fill"
                  src={item.bg}
                />
                <img
                  alt=""
                  className="absolute left-[5px] top-[4px] h-[16px] w-[16px] object-contain"
                  src={item.icon}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Top Right Favorite Button (Figma Node 2190:2717) */}
      <button
        type="button"
        aria-label="Додати в улюблене"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="absolute right-[10px] top-[12px] z-20 h-[34px] w-[34px] flex items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)] transition-colors"
      >
        <img
          alt="Улюблене"
          className="h-[22px] w-[22px] object-contain"
          src="/images/main_page/icons/rec-icon-favorite.svg"
        />
      </button>

      {/* Book Cover Image Container (top: 18px, height: 128px => ends exactly at y=146px) */}
      <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[96px] h-[128px] z-10 flex items-center justify-center pointer-events-none">
        {image ? (
          <img
            alt={title}
            className="max-h-full max-w-full object-contain drop-shadow-[0px_4px_8px_rgba(0,0,0,0.3)]"
            src={image}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 text-center p-1 bg-white/80 rounded-[4px] w-full h-full shadow-sm border border-gray-200">
            <span className="text-xl">📖</span>
            <span className="text-[8px] font-serif">Немає фото</span>
          </div>
        )}
      </div>

      {/* Title Container (top: 154px, height: 38px => 8px gap below book cover, zero overlap) */}
      <div className="absolute top-[154px] left-[10px] right-[10px] z-10 h-[38px] flex items-center justify-center">
        <p className="font-serif text-[15px] font-medium leading-snug text-[#242424] text-center line-clamp-2 overflow-hidden text-ellipsis">
          {title}
        </p>
      </div>

      {/* Author & Price Container (bottom: 10px) */}
      <div className="absolute bottom-[10px] left-[12px] right-[12px] z-10 flex items-end justify-between">
        <div className="flex flex-col justify-end max-w-[115px] overflow-hidden">
          {author ? (
            <p className="text-[13px] text-[rgba(36,36,36,0.7)] leading-tight truncate block">
              {author}
            </p>
          ) : (
            <div className="h-[15px]" />
          )}
          <p className="text-[16px] font-bold text-[#242424] leading-tight mt-0.5 truncate block">
            {price}
          </p>
        </div>

        {/* Shopping Basket Button (Figma Node 2784:6220) */}
        <button
          type="button"
          aria-label="Додати в кошик"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="h-[34px] w-[34px] flex items-center justify-center rounded-full bg-[#005B33]/10 hover:bg-[#005B33]/20 transition-colors shrink-0 ml-1"
        >
          <img
            alt="Кошик"
            className="h-[20px] w-[20px] object-contain"
            src="/images/main_page/icons/rec-icon-basket.svg"
          />
        </button>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block shrink-0">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
