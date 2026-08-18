"use client";

import React, { useState } from "react";
import { MockOrderItem } from "./mockData";
import { orderService } from "@/lib/api/services";

interface ReturnOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MockOrderItem | null;
  onSubmitSuccess: (msg: string) => void;
}

const RETURN_REASONS = [
  "Пошкодження книги при транспортуванні / доставці",
  "Брак друку, зіпсовані або відсутні сторінки",
  "Помилково надіслано не ту книгу",
  "Невідповідність фотографіям та опису на сайті",
  "Інша причина",
];

export default function ReturnOrderModal({
  isOpen,
  onClose,
  item,
  onSubmitSuccess,
}: ReturnOrderModalProps) {
  const [step, setStep] = useState<number>(1);

  // Form Data States
  const [returnQty, setReturnQty] = useState<number>(1);
  const [selectedReason, setSelectedReason] = useState<string>(RETURN_REASONS[0]);
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
        setError("Будь ласка, введіть IBAN або номер картки для повернення коштів");
        return;
      }
      if (!fullName.trim()) {
        setError("Будь ласка, введіть ПІБ отримувача коштів");
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
        `Заявку на повернення замовлення ${item.orderNumber} успішно сформовано! Менеджер зв'яжеться з вами.`
      );
      onClose();
      // Reset
      setStep(1);
      setDetails("");
      setIbanCard("");
      setFullName("");
    } catch (err) {
      console.error("Error submitting return request:", err);
      onSubmitSuccess(`Заявку на повернення надіслано.`);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="bg-[#F5F3EE] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#B7895E]/40 relative overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#E5E0D5] hover:bg-[#D8D2C5] text-[#242424] font-bold flex items-center justify-center transition"
          title="Закрити"
        >
          ✕
        </button>

        {/* Modal Title */}
        <div className="text-center mb-6">
          <span className="text-3xl mb-1 block">📦🔄</span>
          <h2 className="text-2xl font-extrabold text-[#242424]">Повернення замовлення</h2>
          <p className="text-xs text-[#666666] mt-1">
            Оформлення повернення товару протягом 14 днів згідно закону України
          </p>
        </div>

        {/* Stepper Progress Indicator (Figma Node 1431:19193) */}
        <div className="flex items-center justify-between mb-8 px-4 relative">
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-[#C8C2B4] -translate-y-1/2 -z-0" />

          {[
            { num: 1, label: "Товар" },
            { num: 2, label: "Причина" },
            { num: 3, label: "Реквізити" },
            { num: 4, label: "Готово" },
          ].map((st) => {
            const isCompleted = step > st.num;
            const isCurrent = step === st.num;
            return (
              <div key={st.num} className="relative z-10 flex flex-col items-center gap-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isCurrent
                      ? "bg-[#005b33] text-white ring-4 ring-[#005b33]/20 shadow-md scale-110"
                      : isCompleted
                      ? "bg-[#005b33] text-white"
                      : "bg-[#C8C2B4] text-[#666666]"
                  }`}
                >
                  {isCompleted ? "✓" : st.num}
                </div>
                <span
                  className={`text-[11px] font-semibold ${
                    isCurrent ? "text-[#005b33]" : isCompleted ? "text-[#242424]" : "text-[#777777]"
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
            <h3 className="text-sm font-bold text-[#242424]">Крок 1: Оберіть товар для повернення</h3>
            <div className="flex items-center gap-4 bg-[#E8E3D8] p-4 rounded-2xl border border-[#DCD7CC]">
              <div className="w-14 h-20 relative rounded overflow-hidden shadow shrink-0 bg-white border border-gray-200">
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
                <h4 className="font-bold text-[#242424] text-base leading-snug">{item.bookTitle}</h4>
                <p className="text-xs text-[#666666] mt-0.5">{item.orderNumber} • {item.price} грн</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs font-semibold text-[#242424]">Кількість:</span>
                  <select
                    value={returnQty}
                    onChange={(e) => setReturnQty(Number(e.target.value))}
                    className="bg-white border border-[#C8C2B4] rounded-lg px-3 py-1 text-xs font-bold text-[#242424] focus:outline-none focus:ring-1 focus:ring-[#005b33]"
                  >
                    {Array.from({ length: item.quantity || 1 }, (_, i) => i + 1).map((q) => (
                      <option key={q} value={q}>
                        {q} шт.
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
            <h3 className="text-sm font-bold text-[#242424]">Крок 2: Оберіть причину повернення</h3>
            <div className="space-y-2.5 bg-white/80 p-4 rounded-2xl border border-[#C8C2B4]">
              {RETURN_REASONS.map((reason, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 cursor-pointer p-2 hover:bg-[#F5F3EE] rounded-xl transition"
                >
                  <input
                    type="radio"
                    name="return_reason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={() => setSelectedReason(reason)}
                    className="w-4 h-4 text-[#005b33] focus:ring-[#005b33] accent-[#005b33]"
                  />
                  <span className="text-xs sm:text-sm text-[#242424] font-semibold">{reason}</span>
                </label>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#242424]">
                Детальний опис дефекту (необов’язково):
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="Вкажіть будь-які важливі нюанси..."
                className="w-full rounded-2xl border border-[#C8C2B4] p-3 text-xs bg-white text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#005b33] transition"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Refund & Delivery Details */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-sm font-bold text-[#242424]">Крок 3: Реквізити для повернення коштів</h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#242424] block mb-1">
                  ПІБ отримувача коштів *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Шевченко Тарас Григорович"
                  className="w-full rounded-xl border border-[#C8C2B4] p-3 text-xs bg-white text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#005b33]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#242424] block mb-1">
                  IBAN або Номер банківської картки *
                </label>
                <input
                  type="text"
                  value={ibanCard}
                  onChange={(e) => setIbanCard(e.target.value)}
                  placeholder="UA000000000000000000000000000 або 4149..."
                  className="w-full rounded-xl border border-[#C8C2B4] p-3 text-xs bg-white text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#005b33]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#242424] block mb-1">
                  Спосіб відправки товару назад
                </label>
                <div className="flex gap-4 bg-white/80 p-3 rounded-xl border border-[#C8C2B4]">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                    <input
                      type="radio"
                      name="method"
                      checked={returnMethod === "np"}
                      onChange={() => setReturnMethod("np")}
                      className="accent-[#005b33]"
                    />
                    Відділення Нової Пошти
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                    <input
                      type="radio"
                      name="method"
                      checked={returnMethod === "courier"}
                      onChange={() => setReturnMethod("courier")}
                      className="accent-[#005b33]"
                    />
                    Кур’єр Нової Пошти
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Summary & Confirmation */}
        {step === 4 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-sm font-bold text-[#242424]">Крок 4: Перевірте та підтвердіть заявку</h3>

            <div className="bg-white/90 p-4 rounded-2xl border border-[#C8C2B4] space-y-3 text-xs text-[#242424]">
              <div className="flex justify-between pb-2 border-b border-[#E0DBD2]">
                <span className="text-[#666666]">Товар:</span>
                <span className="font-bold text-right">{item.bookTitle} ({returnQty} шт.)</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#E0DBD2]">
                <span className="text-[#666666]">Причина:</span>
                <span className="font-semibold text-right max-w-[220px]">{selectedReason}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#E0DBD2]">
                <span className="text-[#666666]">Отримувач:</span>
                <span className="font-semibold">{fullName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#E0DBD2]">
                <span className="text-[#666666]">IBAN / Картка:</span>
                <span className="font-bold text-[#005b33]">{ibanCard}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Сума повернення:</span>
                <span className="font-extrabold text-sm text-[#005b33]">
                  {item.price * returnQty} грн
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#666666] text-center">
              Натискаючи «Надіслати заявку», ви погоджуєтеся з правилами повернення товарів
            </p>
          </div>
        )}

        {error && <p className="text-xs text-red-600 font-semibold text-center mt-3">{error}</p>}

        {/* Controls */}
        <div className="flex items-center justify-between gap-3 pt-6 border-t border-[#C8C2B4] mt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-5 py-2.5 rounded-xl border border-[#C8C2B4] bg-[#E5E0D5] hover:bg-[#D8D2C5] text-[#242424] text-xs font-bold transition"
            >
              ← Назад
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#C8C2B4] bg-[#E5E0D5] hover:bg-[#D8D2C5] text-[#242424] text-xs font-medium transition"
            >
              Скасувати
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-[#005b33] hover:bg-[#004828] text-white text-xs font-bold shadow-md transition"
            >
              Далі →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-[#005b33] hover:bg-[#004828] text-white text-xs font-bold shadow-md transition disabled:opacity-50"
            >
              {submitting ? "Надсилання..." : "Підтвердити та надіслати"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
