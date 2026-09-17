"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "@/lib/i18n/LocaleProvider";

interface OrdersHeaderProps {
  paws?: number;
  discount?: number;
}

export default function OrdersHeader({
  paws = 0,
  discount = 0,
}: OrdersHeaderProps) {
  const router = useRouter();
  const t = useTranslations();

  return (
    <div className="flex items-center justify-between w-full mb-8 pt-4 flex-wrap gap-4">
      {/* Left Group: Back Button & Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="w-[40px] h-[40px] rounded-full bg-[var(--color-menu-hover)] hover:bg-[var(--color-menu-hover)] transition flex items-center justify-center text-[var(--foreground-primary)] shadow-sm shrink-0"
          title={t("orders.backAria")}
        >
          <span className="text-xl font-bold">←</span>
        </button>
        <h1 className="text-[28px] sm:text-[32px] md:text-[38px] font-bold text-[var(--foreground-primary)] tracking-wide font-sans">
          {t("orders.title")}
        </h1>
      </div>

      {/* Right Group: Balance & Discount Widget */}
      <div className="flex items-center gap-3 bg-[#ECE8DE] px-4 py-2 rounded-full border border-[var(--color-menu-separator)] shadow-sm">
        <div className="flex items-center gap-1.5 border-r border-[var(--color-menu-separator)] pr-3">
          <span className="text-lg">🐾</span>
          <div className="flex flex-col text-[11px] leading-tight text-[var(--color-muted-fg)]">
            <span>{t("orders.pawsLabel")}</span>
            <span className="font-bold text-[var(--foreground-primary)] text-[13px]">{paws}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col text-[11px] leading-tight text-[var(--color-muted-fg)]">
            <span>{t("orders.discountLabel")}</span>
            <span className="font-bold text-[var(--foreground-primary)] text-[13px]">
              {t("orders.discountAmount").replace("{value}", String(discount))}
            </span>
          </div>
          <div className="w-[26px] h-[20px] bg-[#D4A373] rounded flex items-center justify-center text-white text-[10px] font-bold shadow-inner">
            💳
          </div>
        </div>
      </div>
    </div>
  );
}
