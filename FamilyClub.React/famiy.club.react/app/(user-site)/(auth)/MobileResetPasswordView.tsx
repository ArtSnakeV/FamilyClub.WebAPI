"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthBrandLogo from "./components/AuthBrandLogo";

export default function MobileResetPasswordView() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [codeSent, setCodeSent] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendCode = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Будь ласка, введіть коректну електронну пошту");
      return;
    }
    setLoadingSend(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setCodeSent(true);
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    } catch {
      setError("Не вдалося надіслати код. Спробуйте ще раз.");
    } finally {
      setLoadingSend(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[index] = cleaned;
    setCode(next);
    setError("");
    if (cleaned && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 5);
    if (!pasted) return;
    const next = ["", "", "", "", ""];
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setCode(next);
    inputRefs.current[Math.min(pasted.length, 4)]?.focus();
  };

  const handleConfirm = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const full = code.join("");
    if (full.length < 5) {
      setError("Будь ласка, введіть 5-значний код");
      return;
    }
    setLoadingConfirm(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.push("/login");
    } catch {
      setError("Невірний або застарілий код");
    } finally {
      setLoadingConfirm(false);
    }
  };

  return (
    <div className="flex md:hidden fixed inset-0 z-[100] bg-[#c7a381] flex-col justify-between items-center py-6 px-5 overflow-y-auto min-h-screen font-sans">
      <div className="w-full flex justify-start pt-2 px-1 max-w-[372px]">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-[40px] h-[40px] rounded-full bg-[#f5f3ee]/50 flex items-center justify-center text-[20px] text-[#242424] hover:bg-[#f5f3ee] transition-colors active:scale-95 shadow-sm"
          aria-label="Назад"
        >
          ←
        </button>
      </div>

      <AuthBrandLogo className="mt-2 mb-4" widthClassName="w-[150px]" />

      <div className="w-full max-w-[372px] flex flex-col gap-4 my-auto">
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-[9px] px-4 py-2.5 text-center text-[#242424] font-medium text-[15px]">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2.5 w-full">
          <label className="text-[20px] font-semibold text-[#242424]">
            Email
          </label>
          <div className="bg-white h-[50px] w-full rounded-[9px] px-5 drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Введіть свою пошту"
              className="w-full bg-transparent outline-none text-[16px] text-[#242424] placeholder:text-[#242424]/50"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleSendCode()}
          disabled={loadingSend || !email.trim()}
          className="bg-[#005b33] h-[50px] w-full rounded-[9px] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] text-[18px] text-white hover:brightness-110 active:scale-[0.98] disabled:opacity-70"
        >
          {loadingSend
            ? "Надсилання..."
            : codeSent
              ? "Надіслати ще раз"
              : "Надіслати код"}
        </button>

        <div className="flex flex-col items-center gap-3 w-full mt-2">
          <label className="text-[20px] font-semibold text-[#242424]">
            Введіть код
          </label>
          <div className="flex items-center justify-between gap-2 w-full max-w-[355px]">
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
                className="bg-white h-[64px] w-full max-w-[55px] rounded-[9px] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] text-center text-[24px] font-semibold text-[#242424] outline-none focus:ring-2 focus:ring-[#005b33]"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full mt-1">
          <button
            type="button"
            onClick={() => handleConfirm()}
            disabled={loadingConfirm}
            className="bg-[#005b33] h-[50px] w-full rounded-[9px] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] text-[18px] text-white hover:brightness-110 active:scale-[0.98] disabled:opacity-70"
          >
            {loadingConfirm ? "Перевірка..." : "Підтвердити"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/login")}
            disabled={loadingConfirm}
            className="border-2 border-[#005b33] bg-transparent h-[50px] w-full rounded-[9px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] text-[18px] text-[#005b33] hover:bg-[#005b33]/10 active:scale-[0.98] disabled:opacity-70"
          >
            Скасувати
          </button>
        </div>
      </div>

      <div className="w-full max-w-[392px] text-center mt-6 mb-4">
        <p className="text-[#242424] text-[16px]">
          Згадали пароль?{" "}
          <Link
            href="/login"
            className="text-[#005b33] font-semibold hover:underline"
          >
            Увійти
          </Link>
        </p>
      </div>
    </div>
  );
}
