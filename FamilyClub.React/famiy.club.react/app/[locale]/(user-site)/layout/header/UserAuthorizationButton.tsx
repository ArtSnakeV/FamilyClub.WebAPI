"use client";

import { useState } from "react";
import { useTranslations } from "@/lib/i18n/LocaleProvider";
import { useTheme } from "@/lib/theme/ThemeProvider";

const LIGHT_SHADOW = "0px 0px 15px 0px #242424CC";
const NIGHT_SHADOW = "0px 0px 16px 0px rgba(245, 243, 238, 0.65)";

export default function UserAuthorizationButton() {
  const t = useTranslations();
  const { theme } = useTheme();
  const isNight = theme === "ink-night";
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex h-[40px] w-[110px] items-center justify-center rounded-full transition-all duration-300"
      style={{
        backgroundColor: !isNight && hovered ? "var(--color-white)" : undefined,
        boxShadow: hovered
          ? isNight
            ? NIGHT_SHADOW
            : LIGHT_SHADOW
          : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        className="relative h-[40px] w-[110px] text-center text-[14px] font-normal leading-[150%] tracking-[-0.011em] text-[var(--foreground-primary)]"
      >
        {t("header.signIn")}
      </button>
    </div>
  );
}
