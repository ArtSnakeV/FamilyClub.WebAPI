"use client";

import Link from "next/link";
import {
  useLocalizedPath,
  useTranslations,
} from "@/lib/i18n/LocaleProvider";

export default function CommunityPage() {
  const t = useTranslations();
  const lp = useLocalizedPath();

  return (
    <div className="min-h-[70vh] bg-[var(--background-elevated)] flex flex-col items-center justify-center px-4 py-16 text-[var(--foreground-primary)]">
      <div className="max-w-md w-full text-center bg-[var(--background-elevated)]/60 backdrop-blur-md p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[color-mix(in_srgb,var(--foreground-primary)_10%,transparent)]">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[color-mix(in_srgb,var(--color-green)_10%,transparent)] flex items-center justify-center text-[var(--color-green)]">
          <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
          {t("community.title")}
        </h1>
        <p className="text-[var(--color-muted-fg)] text-sm md:text-base mb-8 leading-relaxed">
          {t("community.description")}
        </p>
        <Link
          href={lp("/products")}
          className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[var(--color-green)] text-[var(--color-cream)] font-semibold text-sm transition-all duration-300 hover:bg-[color-mix(in_srgb,var(--color-green)_85%,black)] hover:scale-105 shadow-[0_4px_14px_rgba(0,91,51,0.3)]"
        >
          {t("community.toCatalog")}
        </Link>
      </div>
    </div>
  );
}
