"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, localeLabels, locales } from "@/lib/i18n/config";
import {
  getLocaleFromPathname,
  switchLocalePath,
} from "@/lib/i18n/localized-path";
import { useTheme } from "@/lib/theme/ThemeProvider";

const LIGHT_HOVER_SHADOW = "0px 0px 15px 0px #242424CC";
const NIGHT_HOVER_SHADOW = "0px 0px 16px 0px rgba(245, 243, 238, 0.65)";

export default function UaCircle() {
  const pathname = usePathname() ?? "/";
  const { theme } = useTheme();
  const isNight = theme === "ink-night";
  const isAdmin =
    pathname === "/admin" || pathname.startsWith("/admin/");
  const activeLocale = isAdmin
    ? defaultLocale
    : getLocaleFromPathname(pathname) ?? defaultLocale;
  const hoverShadow = isNight ? NIGHT_HOVER_SHADOW : LIGHT_HOVER_SHADOW;

  return (
    <div className="flex items-center justify-center gap-1">
      {locales.map((locale) => {
        const isActive = activeLocale === locale;
        const href = switchLocalePath(pathname, locale);
        const canSwitch = !isAdmin && href !== pathname;

        return (
          <Link
            key={locale}
            href={href}
            aria-label={localeLabels[locale]}
            aria-disabled={!canSwitch && !isActive}
            tabIndex={!canSwitch && !isActive ? -1 : undefined}
            onClick={(event) => {
              if (!canSwitch && !isActive) {
                event.preventDefault();
              }
            }}
            className={`flex h-[40px] w-[40px] items-center justify-center rounded-full text-[13px] font-semibold leading-none tracking-wide transition-all duration-300 ${
              isActive
                ? isNight
                  ? "text-[var(--color-green)]"
                  : "bg-[var(--color-white)] text-[var(--color-green)]"
                : canSwitch
                  ? isNight
                    ? "text-[var(--foreground-primary)]/70"
                    : "text-[var(--foreground-primary)]/70 hover:bg-[var(--color-white)]"
                  : "cursor-default text-[var(--foreground-primary)]/40"
            }`}
            style={isActive ? { boxShadow: hoverShadow } : undefined}
            onMouseEnter={(event) => {
              if (!canSwitch || isActive) return;
              event.currentTarget.style.boxShadow = hoverShadow;
            }}
            onMouseLeave={(event) => {
              if (isActive) return;
              event.currentTarget.style.boxShadow = "";
            }}
          >
            <span className="text-[13px] font-semibold leading-none">
              {localeLabels[locale]}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
