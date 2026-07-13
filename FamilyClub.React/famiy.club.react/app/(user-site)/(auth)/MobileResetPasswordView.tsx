"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MobileResetPasswordView() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first input when entering step 2
  useEffect(() => {
    if (step === 2) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  const handleStep1Submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Будь ласка, введіть коректну електронну пошту");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // Simulate API call for sending verification code to email
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStep(2);
    } catch (err) {
      setError("Не вдалося надіслати код. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    // Only allow digits
    const cleaned = value.replace(/\D/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = cleaned;
    setCode(newCode);
    setError("");

    // Advance focus to next input if digit entered
    if (cleaned && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 5);
    if (!pastedData) return;
    const newCode = ["", "", "", "", ""];
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);
    const nextFocusIndex = Math.min(pastedData.length, 4);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  const handleStep2Submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length < 5) {
      setError("Будь ласка, введіть 5-значний код");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // Simulate confirmation and verification
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.push("/login");
    } catch (err) {
      setError("Невірний або застарілий код");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex md:hidden fixed inset-0 z-[100] bg-[#c7a381] flex-col justify-between items-center py-6 px-5 overflow-y-auto min-h-screen font-['Source_Sans_Pro',sans-serif]">
      {/* Back Button */}
      <div className="w-full flex justify-start pt-2 px-1 max-w-[372px]">
        <button
          type="button"
          onClick={() => (step === 2 ? setStep(1) : router.back())}
          className="w-[40px] h-[40px] rounded-full bg-[#f5f3ee]/50 flex items-center justify-center text-[20px] text-[#242424] hover:bg-[#f5f3ee] transition-colors active:scale-95 shadow-sm"
          aria-label="Назад"
        >
          ←
        </button>
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center justify-center mt-2 mb-4 sm:mb-6">
        <img
          src="/images/login register/mobile-logo.png"
          alt="LIBRELLIS"
          className="w-[260px] sm:w-[300px] h-auto object-contain pointer-events-none drop-shadow-[0px_2px_4px_rgba(0,0,0,0.15)]"
        />
      </div>

      {/* Main Form Content */}
      <div className="w-full max-w-[372px] flex flex-col my-auto">
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-[9px] px-4 py-2.5 text-center text-[#242424] font-medium text-[15px] mb-4">
            {error}
          </div>
        )}

        {step === 1 ? (
          /* Step 1: Figma Node 2594:4872 (Email & Send Code) */
          <form onSubmit={handleStep1Submit} className="flex flex-col gap-[15px] w-full">
            <div className="flex flex-col gap-[10px] w-full">
              <label className="text-[20px] font-semibold text-[#242424] leading-normal">
                Email
              </label>
              <div className="bg-[#f5f3ee] h-[50px] w-full rounded-[9px] px-[20px] py-[10px] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Введіть свою почту"
                  className="w-full bg-transparent outline-none text-[16px] text-[#242424] placeholder:text-[#242424]/50 tracking-[-0.176px]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="mt-[6px] bg-[#005b33] h-[50px] w-full rounded-[9px] px-[20px] py-[10px] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex items-center justify-center text-[20px] text-[#f5f3ee] tracking-[-0.22px] transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed font-normal"
            >
              {loading ? "Надсилання..." : "Надіслати код"}
            </button>
          </form>
        ) : (
          /* Step 2: Figma Node 2146:33048 (Verification Code & Confirm/Cancel) */
          <form onSubmit={handleStep2Submit} className="flex flex-col gap-[20px] w-full items-center">
            <div className="w-full text-center mb-1">
              <label className="text-[20px] font-semibold text-[#242424] leading-normal tracking-[-0.22px]">
                Введіть код
              </label>
            </div>

            {/* 5 Code Input Squares */}
            <div className="flex items-center justify-between gap-2 sm:gap-[15px] w-full max-w-[355px]">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={handlePaste}
                  className="bg-[#f5f3ee] h-[70px] sm:h-[80px] w-full max-w-[55px] rounded-[9px] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] text-center text-[26px] sm:text-[28px] font-semibold text-[#242424] outline-none focus:ring-2 focus:ring-[#005b33] transition-shadow"
                />
              ))}
            </div>

            <div className="flex flex-col gap-[12px] w-full mt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#005b33] h-[50px] w-full rounded-[9px] px-[20px] py-[10px] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex items-center justify-center text-[20px] text-[#f5f3ee] tracking-[-0.22px] transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70 font-normal"
              >
                {loading ? "Перевірка..." : "Підтвердити"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/login")}
                disabled={loading}
                className="border-2 border-[#005b33] bg-transparent h-[50px] w-full rounded-[9px] px-[20px] py-[10px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] flex items-center justify-center text-[20px] text-[#005b33] tracking-[-0.22px] transition-all hover:bg-[#005b33]/10 active:scale-[0.98] disabled:opacity-70 font-normal"
              >
                Скасувати
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Bottom Footer Navigation */}
      <div className="w-full max-w-[392px] text-center mt-6 mb-4">
        <p className="text-[#242424] text-[16px] leading-normal font-normal">
          Згадали пароль?{" "}
          <Link href="/login" className="text-[#005b33] font-semibold hover:underline">
            Увійти
          </Link>
        </p>
      </div>
    </div>
  );
}
