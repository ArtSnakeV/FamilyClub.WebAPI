"use client";

import type { PawsHistoryItem as PawsHistoryItemType } from "../hooks/usePaws";
import PawsHistoryItem from "../ui/PawsHistoryItem";
import Link from "next/link";
import { useLocalizedPath, useTranslations } from "@/lib/i18n/LocaleProvider";
import { useTheme } from "@/lib/theme/ThemeProvider";

const NIGHT_BG_FILTER = "invert(1) hue-rotate(180deg)";

type Props = {
  history: PawsHistoryItemType[];
};

export default function PawsHistoryBlock({ history }: Props) {
  const t = useTranslations();
  const lp = useLocalizedPath();
  const { theme } = useTheme();
  const isNight = theme === "ink-night";

  return (
    <div
      className="relative w-[450px] h-[520px] -mt-4 -ml-6 overflow-hidden p-2 sm:p-5 text-[15px] sm:text-[16px]"
      style={{ width: "450px", height: "520px" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/pawsUser/Rectangle 513.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          ...(isNight ? { filter: NIGHT_BG_FILTER } : {}),
        }}
      />
      <div
        className="-ml-2 mt-4 text-[32px] relative z-10 flex items-center justify-left px-6 bg-cover bg-center
                 w-[300px] h-[66px] text-[var(--color-cream)]"
        style={{
          backgroundImage: "url('/images/pawsUser/Rectangle 477.png')",
          width: "300px",
          height: "66px",
        }}
      >
        {t("paws.historyTitle")}
      </div>
      {/* No `relative` here — Link is positioned against the outer 520px panel */}
      <div className="z-10 flex flex-col w-[320px] ml-10 items-center justify-center">
        <ul className={`divide-y ${isNight ? "divide-[var(--color-cream)]/20" : "divide-black/18"}`}>
          {history.map((item) => (
            <PawsHistoryItem key={item.id} item={item} night={isNight} />
          ))}
        </ul>
      </div>
      <Link
        href={lp("/paws/history")}
        className="absolute z-10 bottom-8 left-10 w-[320px] h-[50px] items-center justify-center flex py-3 rounded-[9px] text-[var(--color-cream)] text-[20px] font-semibold"
        style={{ backgroundColor: "var(--color-green)" }}
      >
        {t("paws.showFullHistory")}
      </Link>
    </div>
  );
}
