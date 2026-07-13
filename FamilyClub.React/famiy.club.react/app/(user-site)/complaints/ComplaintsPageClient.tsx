"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCurrentUser } from "@/app/(user-site)/userProfile/hooks/useCurrentUser";
import { getAuthUserId } from "@/lib/auth/tokenStorage";
import { useComplaintForm } from "./hooks/useComplaintForm";
import { useComplaintImages } from "./hooks/useComplaintImages";
import { useOrderContext } from "./hooks/useOrderContext";
import { useSubmitComplaint } from "./hooks/useSubmitComplaint";
import ComplaintPageHeader from "./components/ComplaintPageHeader";
import PublisherBanner from "./components/PublisherBanner";
import OrderSummaryAccordion from "./components/OrderSummaryAccordion";
import ComplaintReasonSection from "./components/ComplaintReasonSection";
import ComplaintPhotoUpload from "./components/ComplaintPhotoUpload";
import styles from "./complaints.module.css";

export default function ComplaintsPageClient() {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get("orderId");
  const orderId = orderIdParam ? Number(orderIdParam) : null;

  const { user, loading: userLoading } = useCurrentUser();
  const { data: orderContext, loading: orderLoading, error: orderError } =
    useOrderContext(orderId);

  const form = useComplaintForm(user?.email ?? "");
  const images = useComplaintImages();
  const { submit, submitting, error: submitError, success } = useSubmitComplaint();

  useEffect(() => {
    if (user?.email) form.setEmail(user.email);
  }, [user?.email]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.isValid || !form.reason) return;

    const clubMemberId =
      user?.id ??
      (typeof window !== "undefined" ? getAuthUserId() : null);

    if (!clubMemberId) {
      alert("Увійдіть у систему, щоб подати скаргу.");
      return;
    }

    await submit({
      reason: form.reason,
      description: form.description,
      clubMemberId,
      images,
    });
  };

  const publisherLabel = orderContext?.publisher?.publisherName
    ? `Видавництво «${orderContext.publisher.publisherName}»`
    : undefined;

  return (
    <div
      className={styles.page}
      style={{
        backgroundImage: "url('/images/userProfile/Rectangle 326.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-[720px] mx-auto px-4 sm:px-6">
        <div
          className={styles.board}
          style={{
            backgroundImage: "url('/images/addProducts/Rectangle 312.svg')",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <ComplaintPageHeader />

          {/* <PublisherBanner publisherName={publisherLabel} /> */}

          {orderLoading && orderId && (
            <div className={styles.loading}>Завантаження замовлення...</div>
          )}

          {orderError && (
            <div className={styles.card}>
              <p className={styles.errorMsg}>{orderError}</p>
            </div>
          )}

          {orderContext && !orderLoading && (
            <OrderSummaryAccordion context={orderContext} />
          )}

          <form onSubmit={handleSubmit}>
            <ComplaintReasonSection
              value={form.reason}
              onChange={form.setReason}
            />

            <div className={styles.card}>
              <div className={styles.sectionLabel}>
                Додайте опис<span className={styles.required}> *</span>
              </div>
              <textarea
                className={styles.textarea}
                value={form.description}
                onChange={(e) => form.setDescription(e.target.value)}
                placeholder="Опишіть проблему детально..."
                maxLength={form.maxText}
                required
              />
              <div className={styles.charCount}>
                {form.description.length} / {form.maxText} символів
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
                Email для зв&apos;язку<span className={styles.required}> *</span>
              </div>
              <input
                type="email"
                className={styles.emailInput}
                value={form.email}
                onChange={(e) => form.setEmail(e.target.value)}
                placeholder="Мій email"
                required
                disabled={userLoading}
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!form.isValid || submitting || userLoading}
            >
              {submitting ? "Надсилання..." : "Відправити"}
            </button>

            {submitError && <p className={styles.errorMsg}>{submitError}</p>}
          </form>
        </div>
      </div>

      {success && (
        <div className={styles.successOverlay}>
          <div className={styles.successCard}>
            <span className={styles.successIcon}>✓</span>
            <h2 className={styles.successTitle}>Скаргу надіслано!</h2>
            <p className={styles.successText}>
              Дякуємо. Ми розглянемо ваше звернення найближчим часом.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
