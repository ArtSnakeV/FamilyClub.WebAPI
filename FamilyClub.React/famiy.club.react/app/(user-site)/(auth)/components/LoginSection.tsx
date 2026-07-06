"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authService } from "@/lib/api/services";
import { setAuthSession } from "@/lib/auth/tokenStorage";

type LoginSectionProps = {
  onGoToRegister: () => void;
};

const CONTENT_WIDTH = 460;
const INPUT_HEIGHT = 48;

export default function LoginSection({ onGoToRegister }: LoginSectionProps) {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleLogin = async () => {
    if (!formData.login || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await authService.apiAuthClubMemberLoginPost({
        loginClubMemberDto: {
          username: formData.login,
          password: formData.password,
          rememberMe: keepSignedIn,
        },
      });

      if (response.token) {
        setAuthSession(response.token, response.clubMember?.id ?? undefined, keepSignedIn);
        window.dispatchEvent(new Event("auth-change"));
      }
      router.push("/");
    } catch {
      setError("Invalid login or password");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <div style={{ width: CONTENT_WIDTH }} className="flex flex-col items-center">
      <h1
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: "72px",
          lineHeight: "120%",
          letterSpacing: "-0.011em",
          color: "var(--color-black)",
          margin: "0 0 8px",
        }}
      >
        Libria
      </h1>

      <div
        style={{
          width: CONTENT_WIDTH,
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
        className="items-center"
      >
        <div
          style={{
            width: CONTENT_WIDTH,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <label
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "26px",
              lineHeight: "100%",
              color: "var(--color-black)",
            }}
          >
            Логін
          </label>
          <input
            type="text"
            value={formData.login}
            onChange={(e) => setFormData({ ...formData, login: e.target.value })}
            placeholder="Введіть логін"
            className="outline-none transition-shadow focus:shadow-md login-input"
            style={{
              width: CONTENT_WIDTH,
              height: INPUT_HEIGHT,
              borderRadius: "9px",
              padding: "8px 16px",
              backgroundColor: "#F5F3EE",
              boxShadow: "0px 0px 10px 0px #00000040",
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "20px",
              lineHeight: "150%",
              letterSpacing: "-0.011em",
              color: "var(--color-black)",
            }}
          />
        </div>

        <div
          style={{
            width: CONTENT_WIDTH,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div className="flex justify-between items-center w-full gap-2">
            <label
              style={{
                fontSize: "26px",
                fontWeight: 600,
                color: "var(--color-black)",
              }}
            >
              Пароль
            </label>
            <Link
              href="/forgot-password"
              style={{
                fontSize: "18px",
                color: "var(--color-black)",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Забули пароль?
            </Link>
          </div>

          <div className="relative" style={{ width: CONTENT_WIDTH, height: INPUT_HEIGHT }}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Введіть пароль"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="outline-none login-input"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "9px",
                padding: "8px 52px 8px 16px",
                backgroundColor: "#F5F3EE",
                boxShadow: "0px 0px 10px 0px #00000040",
                fontFamily: "var(--font-sans)",
                fontSize: "20px",
                color: "var(--color-black)",
              }}
            />
            <button
              type="button"
              disabled={loading}
              className="absolute flex items-center justify-center transition-opacity"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={togglePasswordVisibility}
              style={{
                top: "50%",
                right: "12px",
                transform: "translateY(-50%)",
                width: "28px",
                height: "28px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
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
                alt="Toggle Password Visibility"
                style={{ width: "24px", height: "24px", objectFit: "contain" }}
              />
            </button>
          </div>
        </div>

        <div
          style={{
            width: CONTENT_WIDTH,
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div
            onClick={() => setKeepSignedIn(!keepSignedIn)}
            role="checkbox"
            aria-checked={keepSignedIn}
            style={{
              width: "30px",
              height: "30px",
              position: "relative",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                border: "3px solid #242424",
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >
              {keepSignedIn && (
                <div
                  style={{
                    position: "absolute",
                    width: "10px",
                    height: "20px",
                    border: "solid #242424",
                    borderWidth: "0 3.5px 3.5px 0",
                    transform: "rotate(45deg)",
                    top: "0px",
                    left: "14px",
                    animation: "tickPop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  }}
                />
              )}
            </div>
          </div>
          <span
            onClick={() => setKeepSignedIn(!keepSignedIn)}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "150%",
              letterSpacing: "-0.011em",
              color: "#242424",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            Запам&apos;ятати мене
            {/* (14 днів) */}
          </span>
        </div>

        {error && (
          <p style={{ color: "#8b0000", fontSize: "16px", width: CONTENT_WIDTH, margin: 0 }}>
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleLogin}
          style={{
            width: CONTENT_WIDTH,
            height: INPUT_HEIGHT,
            borderRadius: "57px",
            backgroundColor: "var(--color-green)",
            boxShadow: "0px 0px 10px 0px #00000040",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          className="hover:brightness-110 active:scale-[0.98]"
        >
          <span
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 400,
              fontSize: "20px",
              lineHeight: "150%",
              letterSpacing: "-0.011em",
              color: "#FFFFFF",
            }}
          >
            {loading ? "..." : "Увійти"}
          </span>
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: CONTENT_WIDTH,
            padding: "8px 0",
            gap: "20px",
          }}
        >
          <div style={{ flex: 1, borderTop: "1px solid #242424" }} />
          <span
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "150%",
              color: "#242424",
              whiteSpace: "nowrap",
            }}
          >
            або
          </span>
          <div style={{ flex: 1, borderTop: "1px solid #242424" }} />
        </div>

        <button
          type="button"
          style={{
            width: CONTENT_WIDTH,
            height: INPUT_HEIGHT,
            backgroundColor: "#F5F3EE",
            borderRadius: "9px",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            boxShadow: "0px 0px 10px 0px #00000040",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          className="hover:brightness-95 active:scale-[0.98]"
        >
          <img
            src="/images/Layout/Footer/GoogleBrandIcon.svg"
            alt="Google"
            style={{ width: "22px", height: "22px", objectFit: "contain" }}
          />
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "20px",
              lineHeight: "150%",
              letterSpacing: "-0.011em",
              color: "#242424",
            }}
          >
            Продовжити через Google
          </span>
        </button>

        <span
          style={{
            marginTop: "8px",
            fontFamily: "var(--font-sans)",
            fontWeight: 450,
            fontSize: "18px",
            lineHeight: "150%",
            letterSpacing: "-0.011em",
            color: "#242424",
            display: "inline-flex",
            whiteSpace: "nowrap",
            gap: "6px",
          }}
        >
          Немає акаунту?{" "}
          <button
            type="button"
            onClick={onGoToRegister}
            style={{
              color: "var(--color-brand-green)",
              fontWeight: 500,
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "inherit",
              lineHeight: "inherit",
            }}
            className="hover:underline"
          >
            Зареєструватися.
          </button>
        </span>
      </div>

      <style jsx>{`
        .login-input::placeholder {
          color: #24242480;
          opacity: 1;
        }
        @keyframes tickPop {
          from {
            opacity: 0;
            transform: rotate(45deg) scale(0.5);
          }
          to {
            opacity: 1;
            transform: rotate(45deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
