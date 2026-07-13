"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileResetPasswordView from "../MobileResetPasswordView";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Будь ласка, введіть коректну електронну пошту");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStep(2);
    } catch (err) {
      setError("Помилка відправки коду");
    } finally {
      setLoading(false);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length < 5) {
      setError("Будь ласка, введіть 5-значний код");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.push("/login");
    } catch (err) {
      setError("Невірний код");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Mobile View (Figma 2594:4872 & 2146:33048) */}
      <div className="block md:hidden">
        <MobileResetPasswordView />
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex fixed inset-0 z-[100] justify-end">
        <div
          className="absolute inset-0 z-[-1]"
          style={{
            backgroundImage: 'url("images/login register/background.png")',
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
            onClick={() => (step === 2 ? setStep(1) : router.back())}
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

          <div className="flex flex-col items-center w-full max-w-[460px] my-auto">
            <h1 className="font-sans font-semibold text-[64px] text-[#242424] mb-8 tracking-tight">
              LIBRELLIS
            </h1>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-[9px] px-4 py-2.5 text-center text-[#242424] font-medium text-[16px] mb-6 w-full">
                {error}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleStep1Submit} className="flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-2">
                  <label className="text-[24px] font-semibold text-[#242424]">
                    Email
                  </label>
                  <div className="bg-[#F5F3EE] h-[60px] w-full rounded-[9px] px-5 py-3 drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex items-center">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="Введіть свою пошту"
                      className="w-full bg-transparent outline-none text-[18px] text-[#242424] placeholder:text-[#242424]/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="bg-[#005B33] h-[60px] w-full rounded-[9px] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] text-[24px] text-white tracking-tight transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70 mt-2 font-normal"
                >
                  {loading ? "Надсилання..." : "Надіслати код"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleStep2Submit} className="flex flex-col gap-6 w-full items-center">
                <div className="w-full text-center mb-2">
                  <label className="text-[24px] font-semibold text-[#242424]">
                    Введіть код
                  </label>
                </div>

                <div className="bg-[#F5F3EE] h-[60px] w-full rounded-[9px] px-5 py-3 drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex items-center">
                  <input
                    type="text"
                    maxLength={6}
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setError("");
                    }}
                    placeholder="Введіть 5-значний код"
                    className="w-full bg-transparent outline-none text-[22px] text-[#242424] placeholder:text-[#242424]/50 text-center tracking-widest font-semibold"
                  />
                </div>

                <div className="flex flex-col gap-3 w-full mt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#005B33] h-[60px] w-full rounded-[9px] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] text-[24px] text-white tracking-tight transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70 font-normal"
                  >
                    {loading ? "Перевірка..." : "Підтвердити"}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    disabled={loading}
                    className="border-2 border-[#005B33] bg-transparent h-[60px] w-full rounded-[9px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] text-[24px] text-[#005B33] tracking-tight transition-all hover:bg-[#005B33]/10 active:scale-[0.98] disabled:opacity-70 font-normal"
                  >
                    Скасувати
                  </button>
                </div>
              </form>
            )}

            <div className="mt-12 text-center">
              <p className="text-[#242424] text-[18px]">
                Згадали пароль?{" "}
                <Link href="/login" className="text-[#005B33] font-semibold hover:underline">
                  Увійти
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}