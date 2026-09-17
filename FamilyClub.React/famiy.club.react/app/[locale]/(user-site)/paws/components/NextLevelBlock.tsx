"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "@/lib/i18n/LocaleProvider";
import { useTheme } from "@/lib/theme/ThemeProvider";

const LEVEL_MAX = 300;

const GROUP_727_IMAGES = {
  uk: "/images/pawsUser/Group 727-uk.png",
  en: "/images/pawsUser/Group 727-en.png",
} as const;

/** Same daytime asset; night flips parchment → dark without resizing. */
const NIGHT_BG_FILTER = "invert(1) hue-rotate(180deg)";

type Props = {
  paws: number;
};

export default function NextLevelBlock({ paws }: Props) {
  const { locale } = useLocale();
  const t = useTranslations();
  const { theme } = useTheme();
  const isNight = theme === "ink-night";
  const group727Src = GROUP_727_IMAGES[locale];
  const progressPercent = Math.min(100, (paws / LEVEL_MAX) * 100);

  const ink = isNight ? "text-[var(--color-cream)]" : "text-[var(--color-black)]";
  const muted = isNight ? "text-[var(--color-cream)]/75" : "text-black/60";
  const nightFilter = isNight ? { filter: NIGHT_BG_FILTER } : undefined;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Daytime look kept for "next level" in both themes */}
      <div
        className="relative px-5 py-4"
        style={{
          backgroundImage: "url('/images/pawsUser/Rectangle 510.png')",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="flex items-center gap-2 text-[14px] font-semibold mb-3">
          {t("paws.nextLevel")}
          <Image src="/images/userProfile/circle-info-solid-full 1.png" width={15} height={15} alt="" />
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex flex-col items-center shrink-0 w-[60px]">
            <Image src="/images/userProfile/Лапка.png" width={30} height={30} alt="" />
            <span className="text-xs mt-1">{t("paws.level").replace("{n}", "1")}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between text-xs text-black/60 mb-1">
              <span>{t("paws.pawsCount").replace("{count}", String(paws))}</span>
              <span>{t("paws.pawsCount").replace("{count}", String(LEVEL_MAX))}</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#F5F0E7" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${progressPercent}%`, backgroundColor: "#006C45" }}
              />
            </div>
          </div>

          <div className="flex flex-col items-center shrink-0 w-[70px]">
            <Image src="/images/userProfile/Лапка.png" width={30} height={30} alt="" />
            <span className="text-xs mt-1">{t("paws.level").replace("{n}", "2")}</span>
            <span className="text-xs font-semibold whitespace-nowrap">
              {t("paws.bonusPaws").replace("{count}", "100")}
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-row gap-1 items-center -mt-4">
        <button
          type="button"
          className="relative flex-1 flex items-center justify-center w-[340px] h-[142px] p-0 text-left overflow-hidden bg-transparent border-0 cursor-pointer"
        >
          <Image
            src={group727Src}
            width={355}
            height={189}
            alt={t("paws.exchangeAlt")}
            className="object-contain max-h-full w-auto"
            style={nightFilter}
            priority
          />
        </button>

        <button
          type="button"
          className="relative flex-1 flex items-center gap-2 w-[340px] h-[142px] p-2 text-left overflow-hidden border-0 cursor-pointer bg-transparent"
          style={{ width: "340px", height: "142px" }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "url('/images/pawsUser/Rectangle 471.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              ...nightFilter,
            }}
          />
          <Image
            src="/images/userProfile/Tags.png"
            width={50}
            height={50}
            alt=""
            className={`relative z-10 ml-5 ${isNight ? "brightness-0 invert" : ""}`}
          />
          <div className="relative z-10">
            <p className={`font-bold text-[14px] leading-tight ${ink}`}>
              {t("paws.applyToPurchase")}
            </p>
            <p className={`text-xs w-[150px] mt-1.5 leading-snug ${muted}`}>
              {t("paws.applyHint")}
            </p>
          </div>
        </button>
      </div>

      <div
        className={`relative w-[560px] h-[152px] -mt-8 overflow-hidden p-2 sm:p-5 text-[15px] sm:text-[16px] ${ink}`}
        style={{ width: "560px", height: "152px" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/images/pawsUser/Rectangle 471.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            ...nightFilter,
          }}
        />
        <ul className="relative z-10 mt-5 space-y-4 sm:space-y-6 list-disc pl-8">
          <li>{t("paws.ruleCheckout")}</li>
          <li>{t("paws.ruleDeduct")}</li>
        </ul>
      </div>
    </div>
  );
}
