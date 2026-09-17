"use client";

import { useTranslations } from "@/lib/i18n/LocaleProvider";

export default function UserAuthorizationButton() {
  const t = useTranslations();

  return (
    <div className="group flex items-center justify-center">
      <div
        className="flex h-[40px] w-[110px] items-center justify-center rounded-full transition-all duration-300 group-hover:bg-[var(--color-white)] group-hover:shadow-[0px_0px_15px_0px_#242424CC]"
      >
        <button
          type="button"
          className="relative h-[40px] w-[110px] text-center text-[14px] font-normal leading-[150%] tracking-[-0.011em] text-[var(--foreground-primary)]"
        >
          {t("header.signIn")}
        </button>
      </div>
    </div>
  );
}
