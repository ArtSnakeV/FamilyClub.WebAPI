"use client";

import { useTheme } from "@/lib/theme/ThemeProvider";
import { useTranslations } from "@/lib/i18n/LocaleProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations();
  const isNight = theme === "ink-night";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isNight ? t("common.lightTheme") : t("common.darkTheme")}
      title={isNight ? t("common.lightTheme") : t("common.darkTheme")}
      className={`flex h-[40px] w-[40px] items-center justify-center rounded-full transition-all duration-300 ${
        isNight
          ? "bg-[var(--background-elevated)] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.45)] ring-1 ring-[var(--color-border-warm)]"
          : "hover:bg-[var(--color-white)] hover:shadow-[0px_0px_15px_0px_#242424CC]"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="h-[22px] w-[22px]"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke={isNight ? "#EDE8DF" : "#242424"}
          strokeWidth="1.5"
        />
        <path
          d="M12 2 A10 10 0 0 0 12 22 Z"
          fill={isNight ? "#EDE8DF" : "#242424"}
        />
        <path
          d="M12 2 A10 10 0 0 1 12 22 Z"
          fill={isNight ? "#6E553A" : "#E5E0D5"}
        />
      </svg>
    </button>
  );
}
