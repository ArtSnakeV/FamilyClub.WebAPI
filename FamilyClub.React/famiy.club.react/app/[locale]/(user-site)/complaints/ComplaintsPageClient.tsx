"use client";

import { alertWarning } from "@/lib/ui/sweetAlert";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCurrentUser } from "@/app/(user-site)/userProfile/hooks/useCurrentUser";
import { getAuthUserId } from "@/lib/auth/tokenStorage";
import { useTranslations } from "@/lib/i18n/LocaleProvider";
import { useComplaintForm } from "./hooks/useComplaintForm";
import { useComplaintImages } from "./hooks/useComplaintImages";
import { useOrderContext } from "./hooks/useOrderContext";
import { useSubmitComplaint } from "./hooks/useSubmitComplaint";
import ComplaintPageHeader from "./components/ComplaintPageHeader";
import OrderSummaryAccordion from "./components/OrderSummaryAccordion";
import ComplaintReasonSection from "./components/ComplaintReasonSection";
import ComplaintPhotoUpload from "./components/ComplaintPhotoUpload";
import styles from "./complaints.module.css";

export default function ComplaintsPageClient() {
  const router = useRouter();
  const t = useTranslations();
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get("orderId");
  const orderId = orderIdParam ? Number(orderIdParam) : null;

  // Step state: null = asking initial question, "no" = show seller info card (1387:14884), "yes" = show complaint form (1401:15264)
  const [contactedSellerStep, setContactedSellerStep] = useState<"ask" | "no" | "yes">("ask");

  const { user, loading: userLoading } = useCurrentUser();
  const { data: orderContext, loading: orderLoading, error: orderError } =
    useOrderContext(orderId);

  const form = useComplaintForm(user?.email ?? "");
  const images = useComplaintImages();
  const { submit, submitting, error: submitError, success } = useSubmitComplaint();

  useEffect(() => {
    if (user?.email) form.setEmail(user.email);
  }, [user?.email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.isValid || !form.reason) return;

    const clubMemberId =
      user?.id ?? (typeof window !== "undefined" ? getAuthUserId() : null);

    if (!clubMemberId) {
      await alertWarning(t("complaints.loginRequired"));
      return;
    }

    await submit({
      reason: form.reason,
      description: form.description,
      clubMemberId,
      images,
    });
  };

  const publisherName =
    orderContext?.publisher?.publisherName || t("complaints.defaultPublisher");

  return (
    <div className={`${styles.page} relative overflow-hidden`}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none admin-parchment-bg"
        style={{
          backgroundImage: "url('/images/userProfile/Rectangle 326.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="relative z-10 max-w-[720px] mx-auto px-4 sm:px-6 pt-[160px] md:pt-[210px] pb-12">
        <div className={`${styles.board} relative overflow-hidden`}>
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none admin-parchment-bg"
            style={{
              backgroundImage: "url('/images/addProducts/Rectangle 312.svg')",
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          />
          <div className="relative z-10">
          <ComplaintPageHeader />

          {orderLoading && orderId && (
            <div className={styles.loading}>{t("complaints.loadingOrder")}</div>
          )}

          {orderError && (
            <div className={styles.card}>
              <p className={styles.errorMsg}>{orderError}</p>
            </div>
          )}

          {orderContext && !orderLoading && (
            <OrderSummaryAccordion context={orderContext} />
          )}

          {contactedSellerStep === "ask" && (
            <div className="bg-[var(--background-elevated)]/80 p-6 rounded-3xl border border-[var(--color-menu-separator)] space-y-5 my-6 text-center shadow-sm">
              <span className="text-4xl block">💬🤝</span>
              <h2 className="text-xl font-bold text-[var(--foreground-primary)]">
                {t("complaints.askTitle")}
              </h2>
              <p className="text-xs text-[var(--color-muted-fg)]">{t("complaints.askHint")}</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setContactedSellerStep("no")}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[var(--color-menu-hover)] hover:bg-[var(--color-menu-separator)] border border-[var(--color-menu-separator)] text-[var(--foreground-primary)] font-bold text-sm transition"
                >
                  {t("complaints.askNo")}
                </button>

                <button
                  type="button"
                  onClick={() => setContactedSellerStep("yes")}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[var(--color-green)] hover:bg-[color-mix(in_srgb,var(--color-green)_85%,black)] text-white font-bold text-sm transition shadow-sm"
                >
                  {t("complaints.askYes")}
                </button>
              </div>
            </div>
          )}

          {contactedSellerStep === "no" && (
            <div className="bg-[var(--background-elevated)] p-6 sm:p-8 rounded-3xl border border-[var(--color-menu-separator)] space-y-6 my-6 shadow-sm">
              <div className="text-center">
                <span className="text-3xl block mb-2">📞🏢</span>
                <h2 className="text-2xl font-extrabold text-[var(--foreground-primary)]">
                  {t("complaints.contactSellerTitle")}
                </h2>
                <p className="text-xs text-[var(--color-muted-fg)] mt-2 max-w-md mx-auto leading-relaxed">
                  {t("complaints.contactSellerHint")}
                </p>
              </div>

              <div className="bg-[var(--background-elevated)] p-5 rounded-2xl border border-[var(--color-menu-separator)] space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[var(--color-green)] text-white flex items-center justify-center font-bold text-xl shadow-xs">
                    К
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--foreground-primary)] text-lg">{publisherName}</h3>
                    <span className="bg-[color-mix(in_srgb,var(--color-green)_10%,transparent)] text-[var(--color-green)] text-xs font-bold px-2.5 py-0.5 rounded-full inline-block mt-1">
                      {t("complaints.positiveReviews").replace("{percent}", "98")}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--color-menu-separator)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[var(--color-muted-fg)] block">
                      {t("complaints.managerPhone")}
                    </span>
                    <a
                      href="tel:+380935050819"
                      className="text-sm font-extrabold text-[var(--color-green)] hover:underline"
                    >
                      +380(93) 505-08-19
                    </a>
                  </div>

                  <a
                    href="tel:+380935050819"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[var(--color-green)] hover:bg-[color-mix(in_srgb,var(--color-green)_85%,black)] text-white text-xs font-bold text-center transition shadow-xs"
                  >
                    {t("complaints.callChat")}
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[var(--color-menu-separator)]">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="text-xs font-bold text-[var(--color-muted-fg)] hover:text-[var(--foreground-primary)]"
                >
                  {t("complaints.goBack")}
                </button>

                <button
                  type="button"
                  onClick={() => setContactedSellerStep("yes")}
                  className="px-5 py-2.5 rounded-xl bg-[var(--color-menu-hover)] hover:bg-[var(--color-menu-separator)] border border-[var(--color-menu-separator)] text-[var(--foreground-primary)] text-xs font-bold transition"
                >
                  {t("complaints.fileAnyway")}
                </button>
              </div>
            </div>
          )}

          {contactedSellerStep === "yes" && (
            <form onSubmit={handleSubmit} className="animate-fade-in">
              <ComplaintReasonSection
                value={form.reason}
                onChange={form.setReason}
              />

              <div className={styles.card}>
                <div className={styles.sectionLabel}>
                  {t("complaints.descriptionTitle")}
                  <span className={styles.required}> *</span>
                </div>
                <textarea
                  className={styles.textarea}
                  value={form.description}
                  onChange={(e) => form.setDescription(e.target.value)}
                  placeholder={t("complaints.descriptionPlaceholder")}
                  maxLength={form.maxText}
                  required
                />
                <div className={styles.charCount}>
                  {t("complaints.charCount")
                    .replace("{count}", String(form.description.length))
                    .replace("{max}", String(form.maxText))}
                </div>
              </div>

              <ComplaintPhotoUpload
                images={images.images}
                canAddMore={images.canAddMore}
                maxImages={images.maxImages}
                onAdd={images.addImage}
                onRemove={images.removeImage}
              />

              <div className={styles.card}>
                <div className={styles.sectionLabel}>
                  {t("complaints.emailTitle")}
                  <span className={styles.required}> *</span>
                </div>
                <input
                  type="email"
                  className={styles.emailInput}
                  value={form.email}
                  onChange={(e) => form.setEmail(e.target.value)}
                  placeholder={t("complaints.emailPlaceholder")}
                  required
                  disabled={userLoading}
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={!form.isValid || submitting || userLoading}
              >
                {submitting ? t("complaints.submitting") : t("complaints.submit")}
              </button>

              {submitError && <p className={styles.errorMsg}>{submitError}</p>}
              {images.sizeError && (
                <p className={styles.errorMsg}>{images.sizeError}</p>
              )}
            </form>
          )}
          </div>
        </div>
      </div>

      {success && (
        <div className={styles.successOverlay}>
          <div className={styles.successCard}>
            <span className={styles.successIcon}>✓</span>
            <h2 className={styles.successTitle}>{t("complaints.successTitle")}</h2>
            <p className={styles.successText}>{t("complaints.successText")}</p>
          </div>
        </div>
      )}
    </div>
  );
}
