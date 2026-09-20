"use client";

import { useState } from "react";
import { useTheme } from "@/lib/theme/ThemeProvider";
import { useTranslations } from "@/lib/i18n/LocaleProvider";

const LIGHT_HOVER_SHADOW = "0px 0px 15px 0px #242424CC";
const NIGHT_HOVER_SHADOW = "0px 0px 16px 0px rgba(245, 243, 238, 0.65)";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations();
  const isNight = theme === "ink-night";
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={isNight ? t("common.lightTheme") : t("common.darkTheme")}
      title={isNight ? t("common.lightTheme") : t("common.darkTheme")}
      className="header-theme-toggle flex h-[40px] w-[40px] items-center justify-center rounded-full transition-all duration-300"
      style={{
        backgroundColor: !isNight && hovered ? "var(--color-white)" : undefined,
        boxShadow: hovered
          ? isNight
            ? NIGHT_HOVER_SHADOW
            : LIGHT_HOVER_SHADOW
          : undefined,
        color: isNight ? "#EDE8DF" : "#242424",
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="h-[22px] w-[22px]">
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M12 2 A10 10 0 0 0 12 22 Z" fill="currentColor" />
        <path
          d="M12 2 A10 10 0 0 1 12 22 Z"
          fill={isNight ? "#6E553A" : "#E5E0D5"}
        />
      </svg>
    </button>
  );
}
