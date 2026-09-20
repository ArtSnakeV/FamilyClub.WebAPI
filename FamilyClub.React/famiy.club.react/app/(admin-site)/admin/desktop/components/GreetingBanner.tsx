"use client";

import { useCurrentUser } from "@/app/(user-site)/userProfile/hooks/useCurrentUser";
import { useTheme } from "@/lib/theme/ThemeProvider";

const NIGHT_BG_FILTER =
  "invert(1) hue-rotate(180deg) brightness(0.82) contrast(0.88) saturate(0.55)";

export default function GreetingBanner() {
  const { user, loading } = useCurrentUser();
  const { theme } = useTheme();
  const isNight = theme === "ink-night";

  const displayName =
    [user?.name, user?.surname].filter(Boolean).join(" ") ||
    user?.email?.split("@")[0] ||
    "Ink";

  return (
    <div className="relative w-fit h-fit px-8 py-6 overflow-hidden">
      <img
        src="/images/admin_manager/desktop/HeaderCardBackground.png"
        alt=""
        className="absolute inset-0 w-full h-full object-fill pointer-events-none"
        aria-hidden="true"
        style={isNight ? { filter: NIGHT_BG_FILTER } : undefined}
      />

      <div className="relative z-10 whitespace-nowrap">
        <h1 className="text-[32px] font-semibold text-[var(--foreground-primary)]">
          Доброго дня, {loading ? "Завантаження..." : displayName}!
        </h1>
        <p className="text-[16px] text-[var(--color-muted-fg)] mt-1">
          Ось що відбувається на сайті
        </p>
      </div>
    </div>
  );
}
