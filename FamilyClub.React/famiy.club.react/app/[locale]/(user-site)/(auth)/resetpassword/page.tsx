"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthBrandLogo from "../components/AuthBrandLogo";
import MobileResetPasswordView from "../MobileResetPasswordView";
import {
  confirmPasswordReset,
  requestPasswordResetCode,
} from "@/lib/api/passwordReset";
import { useLocalizedPath, useTranslations } from "@/lib/i18n/LocaleProvider";

export default function ResetPasswordPage() {
  const t = useTranslations();
  const lp = useLocalizedPath();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendCode = async () => {
    if (!email || !email.includes("@")) {
      setError(t("auth.invalidEmail"));
      return;
    }
    setLoadingSend(true);
    setError("");
    setInfo("");
    try {
      await requestPasswordResetCode(email.trim());
      setCodeSent(true);
      setInfo(t("auth.codeSentInfo"));
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    } catch (e) {
      setError(e instanceof Error ? e.message : t("auth.sendCodeError"));
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
      setError(t("auth.enterCodeDigits"));
      return;
    }
    if (newPassword.length < 6) {
      setError(t("auth.passwordMinLength"));
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(t("auth.passwordsMismatch"));
      return;
    }
    setLoadingConfirm(true);
    setError("");
    try {
      await confirmPasswordReset({
        email: email.trim(),
        code: full,
        newPassword,
        confirmPassword,
      });
      router.push(lp("/login"));
    } catch (e) {
      setError(e instanceof Error ? e.message : t("auth.invalidCode"));
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
              "linear-gradient(193.17deg, var(--color-wood-gradient-from) 0%, var(--color-wood-gradient-via) 54.33%, var(--color-border-warm) 82.69%, var(--color-wood-gradient-to, var(--color-border-warm)) 100%)",
            borderTopLeftRadius: "150px",
          }}
          className="relative h-screen shadow-[-20px_0_30px_rgba(0,0,0,0.3)] overflow-y-auto flex flex-col items-center px-8 py-12"
        >
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute z-10 w-[44px] h-[44px] rounded-full flex items-center justify-center text-[20px] transition-all hover:bg-[var(--background-elevated)] active:scale-95"
            style={{
              top: "70px",
              left: "65px",
              backgroundColor: "color-mix(in srgb, var(--background-elevated) 50%, transparent)",
              color: "var(--color-black)",
              opacity: 0.5,
            }}
            aria-label={t("auth.backAria")}
          >
            ←
          </button>

          <div className="flex flex-col items-center w-full max-w-[460px] my-auto gap-6">
            <AuthBrandLogo widthClassName="w-[180px]" />

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-[9px] px-4 py-2.5 text-center text-[var(--foreground-primary)] font-medium text-[16px] w-full">
                {error}
              </div>
            )}
            {info && !error && (
              <div className="bg-[color-mix(in_srgb,var(--color-green)_15%,transparent)] border border-[color-mix(in_srgb,var(--color-green)_40%,transparent)] rounded-[9px] px-4 py-2.5 text-center text-[var(--foreground-primary)] font-medium text-[16px] w-full">
                {info}
              </div>
            )}

            <div className="flex flex-col gap-2 w-full">
              <label className="text-[24px] font-semibold text-[var(--foreground-primary)]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder={t("auth.emailOwnPlaceholder")}
                className="bg-[var(--background-elevated)] h-[52px] w-full rounded-[9px] px-5 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] outline-none text-[18px] text-[var(--foreground-primary)] placeholder:text-[var(--color-muted-fg)]"
              />
            </div>

            <button
              type="button"
              onClick={handleSendCode}
              disabled={loadingSend || !email.trim()}
              className="bg-[var(--color-green)] h-[52px] w-full rounded-[9px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] text-[20px] text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70"
            >
              {loadingSend
                ? t("auth.sending")
                : codeSent
                  ? t("auth.sendAgain")
                  : t("auth.sendCode")}
            </button>

            <div className="flex flex-col items-center gap-4 w-full mt-2">
              <label className="text-[24px] font-semibold text-[var(--foreground-primary)]">
                {t("auth.enterCode")}
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
                    className="bg-[var(--background-elevated)] h-[72px] w-full max-w-[64px] rounded-[9px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] text-center text-[28px] font-semibold text-[var(--foreground-primary)] outline-none focus:ring-2 focus:ring-[var(--color-green)]"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-[24px] font-semibold text-[var(--foreground-primary)]">
                {t("auth.newPassword")}
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError("");
                }}
                placeholder={t("auth.minSixChars")}
                className="bg-[var(--background-elevated)] h-[52px] w-full rounded-[9px] px-5 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] outline-none text-[18px] text-[var(--foreground-primary)] placeholder:text-[var(--color-muted-fg)]"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-[24px] font-semibold text-[var(--foreground-primary)]">
                {t("auth.confirmPassword")}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                placeholder={t("auth.repeatPassword")}
                className="bg-[var(--background-elevated)] h-[52px] w-full rounded-[9px] px-5 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] outline-none text-[18px] text-[var(--foreground-primary)] placeholder:text-[var(--color-muted-fg)]"
              />
            </div>

            <div className="flex flex-col gap-3 w-full mt-1">
              <button
                type="button"
                onClick={handleConfirm}
                disabled={loadingConfirm}
                className="bg-[var(--color-green)] h-[52px] w-full rounded-[9px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] text-[20px] text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70"
              >
                {loadingConfirm ? t("auth.saving") : t("auth.changePassword")}
              </button>

              <button
                type="button"
                onClick={() => router.push("/login")}
                disabled={loadingConfirm}
                className="border-2 border-[var(--color-green)] bg-transparent h-[52px] w-full rounded-[9px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] text-[20px] text-[var(--color-green)] transition-all hover:bg-[color-mix(in_srgb,var(--color-green)_10%,transparent)] active:scale-[0.98] disabled:opacity-70"
              >
                {t("auth.cancel")}
              </button>
            </div>

            <p className="text-[var(--foreground-primary)] text-[18px] mt-4 text-center">
              {t("auth.rememberedPassword")}{" "}
              <Link
                href={lp("/login")}
                className="text-[var(--color-green)] font-semibold hover:underline"
              >
                {t("auth.signIn")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
