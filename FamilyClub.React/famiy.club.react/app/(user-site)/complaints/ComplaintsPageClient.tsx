"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCurrentUser } from "@/app/(user-site)/userProfile/hooks/useCurrentUser";
import { getAuthUserId } from "@/lib/auth/tokenStorage";
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

  const publisherName =
    orderContext?.publisher?.publisherName || "Видавництво «Книгарня»";

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
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 pt-[160px] md:pt-[210px] pb-12">
        <div
          className={styles.board}
          style={{
            backgroundImage: "url('/images/addProducts/Rectangle 312.svg')",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <ComplaintPageHeader />

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

          {/* STEP 1: INITIAL QUESTION: "Чи зверталися ви до продавця?" */}
          {contactedSellerStep === "ask" && (
            <div className="bg-white/80 p-6 rounded-3xl border border-[#C8C2B4] space-y-5 my-6 text-center shadow-sm">
              <span className="text-4xl block">💬🤝</span>
              <h2 className="text-xl font-bold text-[#242424]">
                Чи зверталися ви до продавця перед подачею скарги?
              </h2>
              <p className="text-xs text-[#555555]">
                Звернення напряму до видавництва або продавця зазвичай вирішує 95% питань у найкоротші терміни.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setContactedSellerStep("no")}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#E5E0D5] hover:bg-[#D8D2C5] border border-[#C8C2B4] text-[#242424] font-bold text-sm transition"
                >
                  Ні, не звертався(лась)
                </button>

                <button
                  type="button"
                  onClick={() => setContactedSellerStep("yes")}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#005b33] hover:bg-[#004828] text-white font-bold text-sm transition shadow-sm"
                >
                  Так, проблему не вирішено
                </button>
              </div>
            </div>
          )}

          {/* STEP 2A: "Слід звернутися до продавця" (Figma Node 1387:14884) */}
          {contactedSellerStep === "no" && (
            <div className="bg-[#F5F3EE] p-6 sm:p-8 rounded-3xl border border-[#C8C2B4] space-y-6 my-6 shadow-sm">
              <div className="text-center">
                <span className="text-3xl block mb-2">📞🏢</span>
                <h2 className="text-2xl font-extrabold text-[#242424]">
                  Слід звернутися до продавця
                </h2>
                <p className="text-xs text-[#555555] mt-2 max-w-md mx-auto leading-relaxed">
                  Це дозволить швидше розв&apos;язати проблему. Якщо ж не вдасться, можна подати скаргу адміністрації.
                </p>
              </div>

              {/* Publisher Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#D5CFCE] space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#005b33] text-white flex items-center justify-center font-bold text-xl shadow-xs">
                    К
                  </div>
                  <div>
                    <h3 className="font-bold text-[#242424] text-lg">{publisherName}</h3>
                    <span className="bg-[#005b33]/10 text-[#005b33] text-xs font-bold px-2.5 py-0.5 rounded-full inline-block mt-1">
                      ⭐ 98% позитивних відгуків
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EBE7DD] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[#666666] block">Телефон менеджера:</span>
                    <a
                      href="tel:+380935050819"
                      className="text-sm font-extrabold text-[#005b33] hover:underline"
                    >
                      +380(93) 505-08-19
                    </a>
                  </div>

                  <a
                    href="tel:+380935050819"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#005b33] hover:bg-[#004828] text-white text-xs font-bold text-center transition shadow-xs"
                  >
                    💬 Зателефонувати / Чат
                  </a>
                </div>
              </div>

              {/* Alternative action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#C8C2B4]">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="text-xs font-bold text-[#555555] hover:text-[#242424]"
                >
                  ← Повернутися назад
                </button>

                <button
                  type="button"
                  onClick={() => setContactedSellerStep("yes")}
                  className="px-5 py-2.5 rounded-xl bg-[#E5E0D5] hover:bg-[#D8D2C5] border border-[#C8C2B4] text-[#242424] text-xs font-bold transition"
                >
                  Все одно подати скаргу →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2B: Full Complaint Form (Figma Node 1401:15264) */}
          {contactedSellerStep === "yes" && (
            <form onSubmit={handleSubmit} className="animate-fade-in">
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
          )}
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
