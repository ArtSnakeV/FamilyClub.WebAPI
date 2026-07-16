"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/api/services";
import { setAuthSession } from "@/lib/auth/tokenStorage";

export default function MobileAuthView() {
  const router = useRouter();
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.login || !formData.password) {
      setError("Будь ласка, заповніть всі поля");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await authService.apiAuthClubMemberLoginPost({
        loginClubMemberDto: {
          username: formData.login,
          password: formData.password,
          rememberMe: true,
        },
      });

      if (response && response.token) {
        setAuthSession(response.token, response.clubMember?.id ?? undefined, true);
        window.dispatchEvent(new Event("auth-change"));
      }
      router.push("/");
    } catch (err) {
      setError("Невірний логін або пароль");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex md:hidden fixed inset-0 z-[100] bg-[#c7a381] flex-col justify-between items-center py-6 px-5 overflow-y-auto min-h-screen font-['Source_Sans_Pro',sans-serif]">
      {/* Back Button */}
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

      {/* Logo */}
      <div className="flex flex-col items-center justify-center mt-2 mb-6">
        <img
          src="/images/login register/mobile-logo.png"
          alt="LIBRELLIS"
          className="w-[280px] sm:w-[320px] h-auto object-contain pointer-events-none drop-shadow-[0px_2px_4px_rgba(0,0,0,0.15)]"
        />
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleLogin}
        className="w-full max-w-[372px] flex flex-col gap-[15px] my-auto"
      >
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-[9px] px-4 py-2.5 text-center text-[#242424] font-medium text-[15px]">
            {error}
          </div>
        )}

        {/* Login Input */}
        <div className="flex flex-col gap-[10px] w-full">
          <label className="text-[20px] font-semibold text-[#242424] leading-normal">
            Логін
          </label>
          <div className="bg-[#f5f3ee] h-[50px] w-full rounded-[9px] px-[20px] py-[10px] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex items-center">
            <input
              type="text"
              value={formData.login}
              onChange={(e) =>
                setFormData({ ...formData, login: e.target.value })
              }
              placeholder="Введіть логін"
              className="w-full bg-transparent outline-none text-[16px] text-[#242424] placeholder:text-[#242424]/50 tracking-[-0.176px]"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-[10px] w-full mt-[2px]">
          <div className="flex items-end justify-between w-full">
            <label className="text-[20px] font-semibold text-[#242424] leading-normal">
              Пароль
            </label>
            <Link
              href="/resetpassword"
              className="text-[14px] text-[#242424] hover:underline transition-all font-normal"
            >
              Забули пароль?
            </Link>
          </div>
          <div className="bg-[#f5f3ee] h-[50px] w-full rounded-[9px] px-[20px] py-[10px] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex items-center justify-between gap-2">
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Введіть пароль"
              className="w-full bg-transparent outline-none text-[16px] text-[#242424] placeholder:text-[#242424]/50 tracking-[-0.176px]"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="flex-shrink-0 w-[30px] h-[30px] flex items-center justify-center transition-opacity"
              aria-label="Показати або приховати пароль"
            >
              <img
                src={
                  isPasswordVisible
                    ? isHovered
                      ? "/images/login register/eye-closed-hover.svg"
                      : "/images/login register/eye-closed-default.svg"
                    : isHovered
                      ? "/images/login register/eye-open-hover.svg"
                      : "/images/login register/eye-open-default.svg"
                }
                alt="Toggle Password"
                className="w-[24px] h-[24px] object-contain"
              />
            </button>
          </div>
        </div>

        {/* Submit Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-[4px] bg-[#005b33] h-[50px] w-full rounded-[9px] px-[20px] py-[10px] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex items-center justify-center text-[24px] text-white tracking-[-0.264px] transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed font-normal"
        >
          {loading ? "Завантаження..." : "Увійти"}
        </button>

        {/* Divider "або" */}
        <div className="flex items-center justify-between gap-4 w-full my-[6px]">
          <div className="flex-1 h-[1px] bg-[#242424]" />
          <span className="text-[20px] text-[#242424] tracking-[-0.22px] font-normal">
            або
          </span>
          <div className="flex-1 h-[1px] bg-[#242424]" />
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={() => {
            /* Google Login Handler */
          }}
          className="bg-[#f5f3ee] h-[50px] sm:h-[54px] w-full rounded-[9px] px-[20px] py-[10px] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex items-center justify-center gap-[15px] transition-all hover:brightness-95 active:scale-[0.98]"
        >
          <img
            src="/images/Layout/Footer/GoogleBrandIcon.svg"
            alt="Google"
            className="w-[34px] h-[34px] object-contain flex-shrink-0"
          />
          <span className="text-[20px] text-[#242424] tracking-[-0.22px] font-normal whitespace-nowrap">
            Продовжити через Google
          </span>
        </button>
      </form>

      {/* Bottom Text from Figma 2146:32621 + Mobile Register Link */}
      <div className="w-full max-w-[392px] text-center mt-6 mb-4 flex flex-col gap-2">
        <p className="text-[#242424] text-[15px] leading-normal font-normal">
          Немає акаунту?{" "}
          <Link
            href="/register"
            className="text-[#005b33] font-semibold hover:underline"
          >
            Зареєструватися
          </Link>
        </p>
      </div>
    </div>
  );
}
