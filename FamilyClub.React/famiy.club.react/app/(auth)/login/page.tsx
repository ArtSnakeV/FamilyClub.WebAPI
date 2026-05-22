"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authService } from "@/lib/api/services";


export default function AuthorizationPage() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Creating form
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // For password `eye` images
  const [isHovered, setIsHovered] = useState(false);

  const handleLogin = async () => {
    if (!formData.login || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await authService.apiAuthClubMemberLoginPost({
        loginClubMemberDto: {
          username: formData.login,
          password: formData.password
        }
      });

      // If we succeed
      console.log("Login successful:", response);
      router.push("/"); // Redirect to dashboard or home page after login
    } catch (err) {
      setError("Invalid login or password");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (

    // <div className="fixed inset-0 z-[100] flex justify-end backdrop-blur-sm">
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* LEFT SIDE: Background Image */}
      <div
        className="absolute inset-0 z-[-1]" // flex-grow takes remaining space
        style={{
          backgroundImage: 'url("images/login register/background.png")', // Replace with your path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Right Panel:
        - Width: Fits 50% of the screen, minimum 400px.
        - Background: Exact Figma linear gradient.
        - Shadow: Custom hex with 80 (50% opacity).
      */}
      {/* <div
        style={{
          width: '50%',
          minWidth: '600px', // Fallback for small screens
          background: 'linear-gradient(193.17deg, #C7A381 0%, #E0C3A9 54.33%, #B7895E 82.69%, #BF8D5D 100%)'
        }}
        className="relative h-full shadow-[0px_0px_30px_0px_#24242480] rounded-tl-[150px]"
      > */}
      <div
        style={{
          width: '50%',
          minWidth: '600px',
          background: 'linear-gradient(193.17deg, #C7A381 0%, #E0C3A9 54.33%, #B7895E 82.69%, #BF8D5D 100%)'
        }}
        className="relative h-screen shadow-[-20px_0_30px_rgba(0,0,0,0.3)] rounded-tl-[150px]"
      >
        {/* Back Button:
          - Top: 70px
          - Left: 65px (Calculated from Figma 668px - Panel Start 603px)
        */}
        <button
          onClick={() => router.back()}
          className="absolute w-[50px] h-[50px] rounded-full flex items-center justify-center text-[24px] transition-all hover:bg-[#F5F3EE] active:scale-95"
          style={{
            top: '70px',
            left: '65px',
            backgroundColor: '#F5F3EE80',
            color: 'var(--color-black)',
            opacity: 0.5,
          }}
        >
          ←
        </button>
        {/* Main Content Area Container */}
        <div
          style={{
            position: 'absolute',
            top: '125px', // Start exactly where Libria starts -30px to account for the gap
            left: '50%',
            transform: 'translateX(-50%)',
            width: '505px',
          }}
          className="flex flex-col items-center"
        >

          {/* 1. Libria Name Block */}
          <h1
            style={{
              width: '233px',
              height: '144px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '96px',
              lineHeight: '150%',
              letterSpacing: '-0.011em',
              color: 'var(--color-black)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Libria
          </h1>

          {/* 2. Login Block 
      - Positioned directly below Libria
      - Centered horizontally in the same middle-axis as Libria
  */}
          <div
            style={{
              width: '505px',
              height: '521px',
              display: 'flex',
              flexDirection: 'column',
              gap: '30px', // Exact gap from Figma
              marginTop: '0px', // Since 185 + 144 = 329, they touch exactly at the 329px mark
            }}
            className="items-center" // Ensures internal elements are also centered
          >
            {/* Login Input Group (Label + Input) */}
            <div
              style={{
                width: '505px',
                height: '111px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px', // Figma gap between label and input
              }}
            >
              {/* Label: Логін */}
              <label
                style={{
                  width: '505px',
                  height: '40px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '32px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: 'var(--color-black)',
                  display: 'flex',
                  alignItems: 'center', // vertical-align: middle
                }}
              >
                Логін
              </label>

              {/* Input Field */}
              <input
                type="text"
                value={formData.login}
                onChange={(e) => setFormData({ ...formData, login: e.target.value })} // entering our login into state
                placeholder="Введіть логін"
                className="outline-none transition-shadow focus:shadow-md"
                style={{
                  width: '505px',
                  height: '56px',
                  borderRadius: '9px',
                  padding: '10px 20px', // padding top/bottom 10, left/right 20
                  backgroundColor: '#F5F3EE',
                  boxShadow: '0px 0px 10px 0px #00000040',

                  // Text inside input specs while no value entered
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 400,
                  fontSize: '24px',
                  lineHeight: '150%',
                  letterSpacing: '-0.011em', // -1.1%
                  color: 'var(--color-black)', // Actual typed text color
                }}
              />

              {/* CSS to target the placeholder specifically for that 50% opacity */}
              <style jsx>{`
                input::placeholder {
                  color: #24242480;
                  opacity: 1; /* Browser default override */
                }
              `}</style>
            </div>
            <div
              style={{
                width: '505px',
                height: '111px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
              }}
            >
              {/* Label Row */}
              <div className="flex justify-between items-center w-full">
                <label style={{ fontSize: '32px', fontWeight: 600, color: 'var(--color-black)' }}>
                  Пароль
                </label>
                <Link href="/forgot-password" style={{ fontSize: '24px', color: 'var(--color-black)', cursor: 'pointer' }}>
                  Забули пароль?
                </Link>
              </div>

              {/* Input Wrapper */}
              <div className="relative" style={{ width: '505px', height: '56px' }}>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Введіть пароль"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="outline-none"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '9px',
                    padding: '10px 60px 10px 20px', // Extra right padding (60px) so text doesn't hit the eye
                    backgroundColor: '#F5F3EE',
                    boxShadow: '0px 0px 10px 0px #00000040',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '24px',
                    color: 'var(--color-black)',
                  }}
                />

                {/* Eye Button Container */}
                <button
                  type="button"
                  disabled={loading}
                  className="absolute flex items-center justify-center transition-opacity"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={togglePasswordVisibility}
                  style={{
                    top: '50%',
                    right: '15px',
                    transform: 'translateY(-50%)',
                    width: '30px',
                    height: '30px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={
                      isPasswordVisible
                        ? (isHovered ? "/images/login register/eye-closed-hover.svg" : "/images/login register/eye-closed-default.svg")
                        : (isHovered ? "/images/login register/eye-open-hover.svg" : "/images/login register/eye-open-default.svg")
                    }
                    alt="Toggle Password Visibility"
                    style={{
                      width: '27px',
                      height: '27px',
                      objectFit: 'contain',
                    }}
                  />
                  {loading ? "..." : ""}
                </button>
              </div>
              <style jsx>{`
              input::placeholder {
                color: var(--color-black);
                opacity: 0.5;
              }
            `}</style>

            </div>
            <button
              type="submit"
              onClick={handleLogin}
              style={{
                width: '505px',
                height: '56px',
                borderRadius: '57px',
                padding: '10px 20px',
                gap: '15px',
                backgroundColor: 'var(--color-green)',
                boxShadow: '0px 0px 10px 0px #00000040',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              className="hover:brightness-110 active:scale-[0.98]"
            >
              <span
                style={{
                  width: '67px',
                  height: '36px',
                  fontFamily: 'var(--font-geist-sans)',
                  fontWeight: 400,
                  fontSize: '24px',
                  lineHeight: '150%',
                  letterSpacing: '-0.011em', // -1.1%
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Увійти
              </span>
            </button>

            {/* 3. Divider: Line - or - Line */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '505px',
                height: '36px',
                padding: '13px 0',
                gap: '25px', // Gap between lines and text
              }}
            >
              {/* Left Line */}
              <div
                style={{
                  flex: 1, // Let it fill the space based on the container width
                  height: '0px',
                  borderTop: '1px solid #242424',
                  opacity: 1,
                }}
              />

              {/* Text "or" */}
              <span
                style={{
                  fontFamily: 'var(--font-geist-sans)',
                  fontWeight: 400,
                  fontSize: '24px',
                  lineHeight: '150%',
                  letterSpacing: '-0.011em',
                  color: '#242424',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                або
              </span>

              {/* Right Line */}
              <div
                style={{
                  flex: 1,
                  height: '0px',
                  borderTop: '1px solid #242424',
                  opacity: 1,
                }}
              />
            </div>


            {/* 4. Google Login Button */}
            <button
              type="button"
              onClick={() => { /* Handle Google Login */ }}
              style={{
                width: '505px',
                height: '56px',
                backgroundColor: '#F5F3EE',
                borderRadius: '9px',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px',
                boxShadow: '0px 0px 10px 0px #00000040',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              className="hover:brightness-95 active:scale-[0.98]"
            >
              {/* Left Side Symbol "G" */}
              <div
                style={{
                  width: '25.92px',
                  height: '26.35px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {/* Google brand icon */}
                <img
                  src="/images/Layout/Footer/GoogleBrandIcon.svg"
                  alt="Google"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>

              {/* Right Side Text */}
              <span
                style={{
                  width: '270px',
                  height: '36px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 400,
                  fontSize: '24px',
                  lineHeight: '150%',
                  letterSpacing: '-0.011em',
                  color: '#242424',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                Продовжити через Google
              </span>
            </button>

            {/* 5. Registration Link */}
            <span
              style={{
                width: '346px',
                height: '36px',
                marginTop: '30px', // Matches the gap between other elements
                // display: 'flex',
                // gap: '8px', // Gap between text and link
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-sans)',
                fontWeight: 450,
                fontSize: '24px',
                lineHeight: '150%',
                letterSpacing: '-0.011em',
                color: '#242424',
                display: 'inline-flex',
                whiteSpace: 'nowrap',
                gap: '8px',
              }}
            >
              Немає акаунту? {' '}
              <Link
                href="/register"
                style={{
                  color: 'var(--color-brand-green)',
                  textDecoration: 'none',
                  fontWeight: 500 // Optional: slightly bolder to make it look like a link
                }}
                className="hover:underline"
              >
                Зареєструватися.
              </Link>
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}