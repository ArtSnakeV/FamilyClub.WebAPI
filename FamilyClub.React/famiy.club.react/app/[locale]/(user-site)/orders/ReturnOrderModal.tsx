"use client";

import React, { useState } from "react";
import { MockOrderItem } from "./mockData";
import { orderService } from "@/lib/api/services";
import { useTranslations } from "@/lib/i18n/LocaleProvider";

interface ReturnOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MockOrderItem | null;
  onSubmitSuccess: (msg: string) => void;
}

const RETURN_REASON_KEYS = ["damage", "printDefect", "wrongBook", "mismatch", "other"] as const;
type ReturnReasonKey = (typeof RETURN_REASON_KEYS)[number];

export default function ReturnOrderModal({
  isOpen,
  onClose,
  item,
  onSubmitSuccess,
}: ReturnOrderModalProps) {
  const t = useTranslations();
  const [step, setStep] = useState<number>(1);

  // Form Data States
  const [returnQty, setReturnQty] = useState<number>(1);
  const [selectedReason, setSelectedReason] = useState<ReturnReasonKey>("damage");
  const [details, setDetails] = useState<string>("");
  const [returnMethod, setReturnMethod] = useState<"np" | "courier">("np");
  const [ibanCard, setIbanCard] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !item) return null;

  const handleNextStep = () => {
    setError(null);
    if (step === 3) {
      if (!ibanCard.trim()) {
        setError(t("orders.returnModal.errIban"));
        return;
      }
      if (!fullName.trim()) {
        setError(t("orders.returnModal.errFullName"));
        return;
      }
    }
    setStep((prev) => Math.min(4, prev + 1));
  };

  const handlePrevStep = () => {
    setError(null);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (item.dbOrderId) {
        await orderService
          .apiOrdersIdPut({
            id: item.dbOrderId,
            orderDTO: {
              id: item.dbOrderId,
              status: "ReturnRequested",
            },
          })
          .catch((err) => {
            console.warn("Return Order API warning, local fallback", err);
          });
      }

      onSubmitSuccess(
        t("orders.returnModal.successWithNumber").replace("{orderNumber}", item.orderNumber)
      );
      onClose();
      // Reset
      setStep(1);
      setDetails("");
      setIbanCard("");
      setFullName("");
    } catch (err) {
      console.error("Error submitting return request:", err);
      onSubmitSuccess(t("orders.returnModal.successFallback"));
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  const stepperSteps = [
    { num: 1, label: t("orders.returnModal.steps.item") },
    { num: 2, label: t("orders.returnModal.steps.reason") },
    { num: 3, label: t("orders.returnModal.steps.details") },
    { num: 4, label: t("orders.returnModal.steps.done") },
  ];

  const reasonLabel = t(`orders.returnModal.reasons.${selectedReason}`);
  const priceLabel = t("cart.price").replace("{value}", String(item.price));
  const refundLabel = t("cart.price").replace("{value}", String(item.price * returnQty));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="bg-[var(--background-elevated)] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[var(--color-border-warm)]/40 relative overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[var(--color-menu-hover)] hover:bg-[var(--color-menu-separator)] text-[var(--foreground-primary)] font-bold flex items-center justify-center transition"
          title={t("orders.returnModal.closeAria")}
        >
          ✕
        </button>

        {/* Modal Title */}
        <div className="text-center mb-6">
          <span className="text-3xl mb-1 block">📦🔄</span>
          <h2 className="text-2xl font-extrabold text-[var(--foreground-primary)]">{t("orders.returnModal.title")}</h2>
          <p className="text-xs text-[var(--color-muted-fg)] mt-1">
            {t("orders.returnModal.subtitle")}
          </p>
        </div>

        {/* Stepper Progress Indicator (Figma Node 1431:19193) */}
        <div className="flex items-center justify-between mb-8 px-4 relative">
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-[var(--color-menu-separator)] -translate-y-1/2 -z-0" />

          {stepperSteps.map((st) => {
            const isCompleted = step > st.num;
            const isCurrent = step === st.num;
            return (
              <div key={st.num} className="relative z-10 flex flex-col items-center gap-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isCurrent
                      ? "bg-[var(--color-green)] text-white ring-4 ring-[var(--color-green)]/20 shadow-md scale-110"
                      : isCompleted
                      ? "bg-[var(--color-green)] text-white"
                      : "bg-[var(--color-menu-separator)] text-[var(--color-muted-fg)]"
                  }`}
                >
                  {isCompleted ? "✓" : st.num}
                </div>
                <span
                  className={`text-[11px] font-semibold ${
                    isCurrent ? "text-[var(--color-green)]" : isCompleted ? "text-[var(--foreground-primary)]" : "text-[var(--color-muted-fg)]"
                  }`}
                >
                  {st.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* STEP 1: Select Item & Quantity */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-sm font-bold text-[var(--foreground-primary)]">{t("orders.returnModal.step1Title")}</h3>
            <div className="flex items-center gap-4 bg-[var(--color-menu-hover)] p-4 rounded-2xl border border-[var(--color-menu-separator)]">
              <div className="w-14 h-20 relative rounded overflow-hidden shadow shrink-0 bg-[var(--background-elevated)] border border-gray-200">
                <img
                  src={item.bookImage || "/images/catalog/hunger_games.png"}
                  alt={item.bookTitle}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/catalog/hunger_games.png";
                  }}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[var(--foreground-primary)] text-base leading-snug">{item.bookTitle}</h4>
                <p className="text-xs text-[var(--color-muted-fg)] mt-0.5">{item.orderNumber} • {priceLabel}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs font-semibold text-[var(--foreground-primary)]">{t("orders.returnModal.quantity")}</span>
                  <select
                    value={returnQty}
                    onChange={(e) => setReturnQty(Number(e.target.value))}
                    className="bg-[var(--background-elevated)] border border-[var(--color-menu-separator)] rounded-lg px-3 py-1 text-xs font-bold text-[var(--foreground-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-green)]"
                  >
                    {Array.from({ length: item.quantity || 1 }, (_, i) => i + 1).map((q) => (
                      <option key={q} value={q}>
                        {t("orders.qty").replace("{count}", String(q))}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Reason Selection */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-sm font-bold text-[var(--foreground-primary)]">{t("orders.returnModal.step2Title")}</h3>
            <div className="space-y-2.5 bg-[var(--background-elevated)]/80 p-4 rounded-2xl border border-[var(--color-menu-separator)]">
              {RETURN_REASON_KEYS.map((reasonKey) => (
                <label
                  key={reasonKey}
                  className="flex items-center gap-3 cursor-pointer p-2 hover:bg-[var(--background-elevated)] rounded-xl transition"
                >
                  <input
                    type="radio"
                    name="return_reason"
                    value={reasonKey}
                    checked={selectedReason === reasonKey}
                    onChange={() => setSelectedReason(reasonKey)}
                    className="w-4 h-4 text-[var(--color-green)] focus:ring-[var(--color-green)] accent-[var(--color-green)]"
                  />
                  <span className="text-xs sm:text-sm text-[var(--foreground-primary)] font-semibold">
                    {t(`orders.returnModal.reasons.${reasonKey}`)}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[var(--foreground-primary)]">
                {t("orders.returnModal.detailsLabel")}
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder={t("orders.returnModal.detailsPlaceholder")}
                className="w-full rounded-2xl border border-[var(--color-menu-separator)] p-3 text-xs bg-[var(--background-elevated)] text-[var(--foreground-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] transition"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Refund & Delivery Details */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-sm font-bold text-[var(--foreground-primary)]">{t("orders.returnModal.step3Title")}</h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[var(--foreground-primary)] block mb-1">
                  {t("orders.returnModal.fullNameLabel")}
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t("orders.returnModal.fullNamePlaceholder")}
                  className="w-full rounded-xl border border-[var(--color-menu-separator)] p-3 text-xs bg-[var(--background-elevated)] text-[var(--foreground-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[var(--foreground-primary)] block mb-1">
                  {t("orders.returnModal.ibanLabel")}
                </label>
                <input
                  type="text"
                  value={ibanCard}
                  onChange={(e) => setIbanCard(e.target.value)}
                  placeholder={t("orders.returnModal.ibanPlaceholder")}
                  className="w-full rounded-xl border border-[var(--color-menu-separator)] p-3 text-xs bg-[var(--background-elevated)] text-[var(--foreground-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[var(--foreground-primary)] block mb-1">
                  {t("orders.returnModal.shipMethodLabel")}
                </label>
                <div className="flex gap-4 bg-[var(--background-elevated)]/80 p-3 rounded-xl border border-[var(--color-menu-separator)]">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                    <input
                      type="radio"
                      name="method"
                      checked={returnMethod === "np"}
                      onChange={() => setReturnMethod("np")}
                      className="accent-[var(--color-green)]"
                    />
                    {t("orders.returnModal.npBranch")}
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                    <input
                      type="radio"
                      name="method"
                      checked={returnMethod === "courier"}
                      onChange={() => setReturnMethod("courier")}
                      className="accent-[var(--color-green)]"
                    />
                    {t("orders.returnModal.npCourier")}
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Summary & Confirmation */}
        {step === 4 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-sm font-bold text-[var(--foreground-primary)]">{t("orders.returnModal.step4Title")}</h3>

            <div className="bg-[var(--background-elevated)]/90 p-4 rounded-2xl border border-[var(--color-menu-separator)] space-y-3 text-xs text-[var(--foreground-primary)]">
              <div className="flex justify-between pb-2 border-b border-[var(--color-menu-separator)]">
                <span className="text-[var(--color-muted-fg)]">{t("orders.returnModal.summaryItem")}</span>
                <span className="font-bold text-right">
                  {item.bookTitle} ({t("orders.qty").replace("{count}", String(returnQty))})
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[var(--color-menu-separator)]">
                <span className="text-[var(--color-muted-fg)]">{t("orders.returnModal.summaryReason")}</span>
                <span className="font-semibold text-right max-w-[220px]">{reasonLabel}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[var(--color-menu-separator)]">
                <span className="text-[var(--color-muted-fg)]">{t("orders.returnModal.summaryRecipient")}</span>
                <span className="font-semibold">{fullName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[var(--color-menu-separator)]">
                <span className="text-[var(--color-muted-fg)]">{t("orders.returnModal.summaryIban")}</span>
                <span className="font-bold text-[var(--color-green)]">{ibanCard}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-muted-fg)]">{t("orders.returnModal.summaryAmount")}</span>
                <span className="font-extrabold text-sm text-[var(--color-green)]">
                  {refundLabel}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[var(--color-muted-fg)] text-center">
              {t("orders.returnModal.agreeNote")}
            </p>
          </div>
        )}

        {error && <p className="text-xs text-red-600 font-semibold text-center mt-3">{error}</p>}

        {/* Controls */}
        <div className="flex items-center justify-between gap-3 pt-6 border-t border-[var(--color-menu-separator)] mt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-5 py-2.5 rounded-xl border border-[var(--color-menu-separator)] bg-[var(--color-menu-hover)] hover:bg-[var(--color-menu-separator)] text-[var(--foreground-primary)] text-xs font-bold transition"
            >
              {t("orders.returnModal.back")}
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[var(--color-menu-separator)] bg-[var(--color-menu-hover)] hover:bg-[var(--color-menu-separator)] text-[var(--foreground-primary)] text-xs font-medium transition"
            >
              {t("orders.returnModal.cancel")}
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-[var(--color-green)] hover:bg-[color-mix(in_srgb,var(--color-green)_85%,black)] text-white text-xs font-bold shadow-md transition"
            >
              {t("orders.returnModal.next")}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-[var(--color-green)] hover:bg-[color-mix(in_srgb,var(--color-green)_85%,black)] text-white text-xs font-bold shadow-md transition disabled:opacity-50"
            >
              {submitting ? t("orders.returnModal.submitting") : t("orders.returnModal.submit")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
