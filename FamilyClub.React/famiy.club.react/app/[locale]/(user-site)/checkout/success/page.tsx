"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/lib/hooks/useCart";
import { useLocalizedPath, useTranslations } from "@/lib/i18n/LocaleProvider";
import styles from "../checkout.module.css";

function CheckoutSuccessContent() {
  const t = useTranslations();
  const lp = useLocalizedPath();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const clearedRef = useRef(false);

  const orderId = searchParams.get("orderId") ?? "";

  useEffect(() => {
    if (clearedRef.current) return;
    clearedRef.current = true;
    void clearCart();
  }, [clearCart]);

  const paidText = t("checkout.paidText").replace("{orderId}", orderId || "—");

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.successOverlay}>
        <div className={styles.successCard}>
          <span className={styles.successIcon}>✅</span>
          <h2 className={styles.successTitle}>{t("checkout.paidTitle")}</h2>
          <p className={styles.successText}>{paidText}</p>
          <p className="text-sm text-[var(--color-muted-fg)] mt-2">{t("checkout.paidPendingNote")}</p>
          <div className="flex items-center gap-3 justify-center mt-4 flex-wrap">
            <button
              className={styles.successBtn}
              onClick={() => router.push(lp("/orders"))}
              type="button"
            >
              {t("checkout.myOrders")}
            </button>
            <button
              className="bg-[var(--color-menu-hover)] hover:bg-[var(--color-menu-hover)] text-[var(--foreground-primary)] px-6 py-3 rounded-xl font-medium transition"
              onClick={() => router.push(lp("/"))}
              type="button"
            >
              {t("checkout.goHome")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
