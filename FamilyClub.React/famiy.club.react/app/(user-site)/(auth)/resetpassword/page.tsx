"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthBrandLogo from "../components/AuthBrandLogo";
import MobileResetPasswordView from "../MobileResetPasswordView";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [codeSent, setCodeSent] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendCode = async () => {
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
      setError("Помилка відправки коду");
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

  const handleConfirm = async () => {
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
      setError("Невірний код");
    } finally {
      setLoadingConfirm(false);
    }
  };

  return (
    <>
      <div className="block md:hidden">
        <MobileResetPasswordView />
      </div>

      <div className="hidden md:flex fixed inset-0 z-[100] justify-end">
        <div
          className="absolute inset-0 z-[-1]"
          style={{
            backgroundImage: 'url("/images/login register/background.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div
          style={{
            width: "50%",
            minWidth: "600px",
            background:
              "linear-gradient(193.17deg, #C7A381 0%, #E0C3A9 54.33%, #B7895E 82.69%, #BF8D5D 100%)",
            borderTopLeftRadius: "150px",
          }}
          className="relative h-screen shadow-[-20px_0_30px_rgba(0,0,0,0.3)] overflow-y-auto flex flex-col items-center px-8 py-12"
        >
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute z-10 w-[44px] h-[44px] rounded-full flex items-center justify-center text-[20px] transition-all hover:bg-[#F5F3EE] active:scale-95"
            style={{
              top: "70px",
              left: "65px",
              backgroundColor: "#F5F3EE80",
              color: "var(--color-black)",
              opacity: 0.5,
            }}
            aria-label="Назад"
          >
            ←
          </button>

          <div className="flex flex-col items-center w-full max-w-[460px] my-auto gap-6">
            <AuthBrandLogo widthClassName="w-[180px]" />

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-[9px] px-4 py-2.5 text-center text-[#242424] font-medium text-[16px] w-full">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2 w-full">
              <label className="text-[24px] font-semibold text-[#242424]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Введіть свою пошту"
                className="bg-white h-[52px] w-full rounded-[9px] px-5 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] outline-none text-[18px] text-[#242424] placeholder:text-[#242424]/50"
              />
            </div>

            <button
              type="button"
              onClick={handleSendCode}
              disabled={loadingSend || !email.trim()}
              className="bg-[#005B33] h-[52px] w-full rounded-[9px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] text-[20px] text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70"
            >
              {loadingSend
                ? "Надсилання..."
                : codeSent
                  ? "Надіслати ще раз"
                  : "Надіслати код"}
            </button>

            <div className="flex flex-col items-center gap-4 w-full mt-2">
              <label className="text-[24px] font-semibold text-[#242424]">
                Введіть код
              </label>
              <div className="flex items-center justify-between gap-3 w-full max-w-[400px]">
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
                    className="bg-white h-[72px] w-full max-w-[64px] rounded-[9px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] text-center text-[28px] font-semibold text-[#242424] outline-none focus:ring-2 focus:ring-[#005b33]"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full mt-1">
              <button
                type="button"
                onClick={handleConfirm}
                disabled={loadingConfirm}
                className="bg-[#005B33] h-[52px] w-full rounded-[9px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] text-[20px] text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70"
              >
                {loadingConfirm ? "Перевірка..." : "Підтвердити"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/login")}
                disabled={loadingConfirm}
                className="border-2 border-[#005B33] bg-transparent h-[52px] w-full rounded-[9px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] text-[20px] text-[#005B33] transition-all hover:bg-[#005B33]/10 active:scale-[0.98] disabled:opacity-70"
              >
                Скасувати
              </button>
            </div>

            <p className="text-[#242424] text-[18px] mt-4 text-center">
              Згадали пароль?{" "}
              <Link
                href="/login"
                className="text-[#005B33] font-semibold hover:underline"
              >
                Увійти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
