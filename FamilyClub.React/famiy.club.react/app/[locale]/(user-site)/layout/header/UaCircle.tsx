"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, localeLabels, locales } from "@/lib/i18n/config";
import {
  getLocaleFromPathname,
  switchLocalePath,
} from "@/lib/i18n/localized-path";

export default function UaCircle() {
  const pathname = usePathname() ?? "/";
  const isAdmin =
    pathname === "/admin" || pathname.startsWith("/admin/");
  const activeLocale = isAdmin
    ? defaultLocale
    : getLocaleFromPathname(pathname) ?? defaultLocale;

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
                ? "bg-[var(--color-white)] text-[var(--color-green)] shadow-[0px_0px_15px_0px_#242424CC]"
                : canSwitch
                  ? "text-[var(--foreground-primary)]/70 hover:bg-[var(--color-white)] hover:shadow-[0px_0px_15px_0px_#242424CC]"
                  : "cursor-default text-[var(--foreground-primary)]/40"
            }`}
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
