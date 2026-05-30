import React from 'react';
import type { Metadata } from "next";
import "../../styles/globals.css";
import { Source_Sans_3, Roboto_Mono } from 'next/font/google';
import UpNavigation from "../(user-site)/layout/header/UpNavigation";
import Image from 'next/image';
import Link from 'next/link';
const sourceSans = Source_Sans_3({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-sans', // Назва CSS змінної для використання шрифту в стилях
});

const robotoMono = Roboto_Mono({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-mono',
});



export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${sourceSans.variable} ${robotoMono.variable}`} >
      <body>
        <header className="bg-[var(--background-main)] overflow-x-0 relative z-30 h-[72px] shadow-[0px_0px_15px_0px_#24242499]">
          <div className="max-w-[1220px] mx-auto flex items-center px-4 lg:px-0">
            <UpNavigation />
          </div>
        </header>

        {/* LEFT PART (Fixed Sidebar) */}
        <aside
          className="fixed left-0 top-0 bottom-0 z-10 select-none pointer-events-auto"
          style={{
            width: '369px',
            backgroundColor: '#C7A381',
            opacity: 1,
            transform: 'rotate(0deg)',
          }}
        >
          {/* Our sidebar navigator */}
          <div
            className="absolute"
            style={{
              width: "315px",
              minHeight: "950px",
              height: "max-content",
              top: "101.76px",
              left: "49.71px",
              // background: "#F5F3EE",
              border: "15px solid transparent",
              opacity: 1,
              backgroundImage: "url('/images/admin_manager_layout/sidebar_bg.png')",
              // backgroundSize: "cover",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
    flexDirection: "row",
    gap: "10px", //
            }}
          >
            {/* Content of sidebar */}
            <div className="flex items-center gap-4">
              {/*First row*/}
              <div
                className="fixed flex items-center"
                style={{
                  width: "294px",
                  height: "60px",
                  top: "140.76px",
                  left: "69.71px",
                  paddingLeft: "25px",
                  paddingRight: "25px",
                  gap: "25px",
                  opacity: 1,
                }}
              >
                {/* LEFT PART — IMAGE */}
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundImage: "url('/images/admin_manager_layout/cat_circle.svg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    boxShadow: "0px 0px 10px 0px #24242400",
                  }}
                ></div>
                {/* RIGHT PART — TEXT */}
                <div className="flex flex-col justify-center">
                  {/* FIRST LINE */}
                  <div
                    style={{
                      width: "106px",
                      height: "36px",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: "24px",
                      lineHeight: "150%",
                      letterSpacing: "-1.1%",
                      background: "bg-[var(--background-main)]",
                      color: "text-foreground",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Ink & Echo
                  </div>
                  {/* SECOND LINE */}
                  <div
                    style={{
                      width: "106px",
                      height: "24px",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "150%",
                      letterSpacing: "-1.1%",
                      background: "bg-[var(--background-main)]",
                      color: "var(--font-sans)",
                      display: "flex",
                      alignItems: "center",
                      opacity: "0.5",
                    }}
                  >
                    Адміністратор
                  </div>
                </div>
              </div>

              {/*List of items in sidebar*/}
              <div className="absolute w-[260px] h-[625px] top-[104.76px]  left-[23.71px] gap-[25px] flex flex-col opacity-100">
                {/* Desktop */}
                <Link href="#" className="flex items-center  w-[260px] h-[40px] px-1 rounded-md">
                  {/* Left Part: Image Container */}
                  <div className="relative w-[32px] h-[32px] flex-shrink-0">
                    <Image
                      src="/images/admin_manager_layout/desktop.svg"
                      alt="Desktop icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Right Part: Text */}
                  <span className="ml-[24px] w-[200px] h-[26px] font-sans font-semibold text-[16px] leading-[150%] tracking-[-1.1%] text-var(--font-sans) flex items-center">
                    Робочий стіл
                  </span>
                </Link>
                {/* Managers */}
                <Link href="#" className="flex items-center w-[260px] h-[40px] px-1 rounded-md">
                  {/* Left Part: Image Container */}
                  <div className="relative w-[32px] h-[32px] flex-shrink-0">
                    <Image
                      src="/images/admin_manager_layout/managers.svg"
                      alt="Managers icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Right Part: Text */}
                  <span className="ml-[24px] w-[200px] h-[26px] font-sans font-semibold text-[16px] leading-[150%] tracking-[-1.1%] text-var(--font-sans) flex items-center">
                    Менеджери
                  </span>
                </Link>
                {/* Users */}
                <Link href="#" className="flex items-center w-[260px] h-[40px] px-1 rounded-md">
                  {/* Left Part: Image Container */}
                  <div className="relative w-[32px] h-[32px] flex-shrink-0">
                    <Image
                      src="/images/admin_manager_layout/users.svg"
                      alt="Users icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Right Part: Text */}
                  <span className="ml-[24px] w-[200px] h-[26px] font-sans font-semibold text-[16px] leading-[150%] tracking-[-1.1%] text-var(--font-sans) flex items-center">
                    Користувачі
                  </span>
                </Link>
                {/* Roles and access */}
                <Link href="#" className="flex items-center w-[260px] h-[40px] px-1 rounded-md">
                  {/* Left Part: Image Container */}
                  <div className="relative w-[32px] h-[32px] flex-shrink-0">
                    <Image
                      src="/images/admin_manager_layout/roles.svg"
                      alt="Roles icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Right Part: Text */}
                  <span className="ml-[24px] w-[200px] h-[26px] font-sans font-semibold text-[16px] leading-[150%] tracking-[-1.1%] text-var(--font-sans) flex items-center">
                    Ролі та доступи
                  </span>
                </Link>
                {/* Analitics */}
                <Link href="#" className="flex items-center w-[260px] h-[40px] px-1 rounded-md">
                  {/* Left Part: Image Container */}
                  <div className="relative w-[32px] h-[32px] flex-shrink-0">
                    <Image
                      src="/images/admin_manager_layout/analitics.svg"
                      alt="Analitics icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Right Part: Text */}
                  <span className="ml-[24px] w-[200px] h-[26px] font-sans font-semibold text-[16px] leading-[150%] tracking-[-1.1%] text-var(--font-sans) flex items-center">
                    Аналітика
                  </span>
                </Link>
                {/* System and safety */}
                <Link href="#" className="flex items-center w-[260px] h-[40px] px-1 rounded-md">
                  {/* Left Part: Image Container */}
                  <div className="relative w-[32px] h-[32px] flex-shrink-0">
                    <Image
                      src="/images/admin_manager_layout/system_and_safety.svg"
                      alt="System_and_safety icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Right Part: Text */}
                  <span className="ml-[24px] w-[200px] h-[26px] font-sans font-semibold text-[16px] leading-[150%] tracking-[-1.1%] text-var(--font-sans) flex items-center">
                    Система і безпека
                  </span>
                </Link>
                {/* Platform complaints */}
                <Link href="#" className="flex items-center w-[260px] h-[40px] px-1 rounded-md">
                  {/* Left Part: Image Container */}
                  <div className="relative w-[32px] h-[32px] flex-shrink-0">
                    <Image
                      src="/images/admin_manager_layout/platform_complaints.svg"
                      alt="Users icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Right Part: Text */}
                  <span className="ml-[24px] w-[200px] h-[26px] font-sans font-semibold text-[16px] leading-[150%] tracking-[-1.1%] text-var(--font-sans) flex items-center">
                    Скарги платформи
                  </span>
                </Link>
                {/* {Platform settings */}
                <Link href="#" className="flex items-center w-[260px] h-[40px] px-1 rounded-md">
                  {/* Left Part: Image Container */}
                  <div className="relative w-[32px] h-[32px] flex-shrink-0">
                    <Image
                      src="/images/admin_manager_layout/platform_settings.svg"
                      alt="Platform settings icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Right Part: Text */}
                  <span className="ml-[24px] w-[200px] h-[26px] font-sans font-semibold text-[16px] leading-[150%] tracking-[-1.1%] text-var(--font-sans) flex items-center">
                    Налаштування платформи
                  </span>
                </Link>
                {/* Log */}
                <Link href="#" className="flex items-center w-[260px] h-[40px] px-1 rounded-md">
                  {/* Left Part: Image Container */}
                  <div className="relative w-[32px] h-[32px] flex-shrink-0">
                    <Image
                      src="/images/admin_manager_layout/actions_log.svg"
                      alt="Actions_log icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Right Part: Text */}
                  <span className="ml-[24px] w-[200px] h-[26px] font-sans font-semibold text-[16px] leading-[150%] tracking-[-1.1%] text-var(--font-sans) flex items-center">
                    Журнал дій
                  </span>
                </Link>
                {/* My settings */}
                <Link href="#" className="flex items-center w-[260px] h-[40px] px-1 rounded-md">
                  {/* Left Part: Image Container */}
                  <div className="relative w-[32px] h-[32px] flex-shrink-0">
                    <Image
                      src="/images/admin_manager_layout/my_settings.svg"
                      alt="My_settings icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Right Part: Text */}
                  <span className="ml-[24px] w-[200px] h-[26px] font-semibold text-[16px] leading-[150%] tracking-[-1.1%] text-var(--font-sans) flex items-center">
                    Мої налаштування
                  </span>
                </Link>
                {/* Books */}
                <Link href="#" className="flex items-center w-[260px] h-[40px] px-1 rounded-md">
                  {/* Left Part: Image Container */}
                  <div className="relative w-[32px] h-[32px] flex-shrink-0">
                    <Image
                      src="/images/admin_manager_layout/books.svg"
                      alt="Books icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Right Part: Text */}
                  <span className="ml-[24px] w-[200px] h-[26px] font-semibold text-[16px] leading-[150%] tracking-[-1.1%] text-var(--font-sans) flex items-center">
                    Книги
                  </span>
                </Link>
                {/* Orders */}
                <Link href="#" className="flex items-center w-[260px] h-[40px] px-1 rounded-md">
                  {/* Left Part: Image Container */}
                  <div className="relative w-[32px] h-[32px] flex-shrink-0">
                    <Image
                      src="/images/admin_manager_layout/orders.svg"
                      alt="Orders icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Right Part: Text */}
                  <span className="ml-[24px] w-[200px] h-[26px] font-semibold text-[16px] leading-[150%] tracking-[-1.1%] text-var(--font-sans) flex items-center">
                    Замовлення
                  </span>
                </Link>
                {/* Rewiews */}
                <Link href="#" className="flex items-center w-[260px] h-[40px] px-1 rounded-md">
                  {/* Left Part: Image Container */}
                  <div className="relative w-[32px] h-[32px] flex-shrink-0">
                    <Image
                      src="/images/admin_manager_layout/reviews.svg"
                      alt="Rewiews icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Right Part: Text */}
                  <span className="ml-[24px] w-[200px] h-[26px] font-semibold text-[16px] leading-[150%] tracking-[-1.1%] text-var(--font-sans) flex items-center">
                    Відгуки
                  </span>
                </Link>
                {/* Newspaper */}
                <Link href="#" className="flex items-center w-[260px] h-[40px] px-1 rounded-md">
                  {/* Left Part: Image Container */}
                  <div className="relative w-[32px] h-[32px] flex-shrink-0">
                    <Image
                      src="/images/admin_manager_layout/books.svg"
                      alt="Newspaper icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Right Part: Text */}
                  <span className="ml-[24px] w-[200px] h-[26px] font-semibold text-[16px] leading-[150%] tracking-[-1.1%] text-var(--font-sans) flex items-center">
                    Газета
                  </span>
                </Link>

              </div>
            </div>
          </div>
        </aside>





        {/* RIGHT PART (Main Content Area) */}
        <main
          className="flex-1 min-h-screen overflow-y-auto overflow-x-hidden flex flex-col"
          style={{
            marginLeft: '369px', // Pushes content to the right of the fixed sidebar
            backgroundColor: '#DBD7CD',
            border: '10px solid transparent', // Creates the 10px border space
            boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.50)', // #00000080 in RGBA
          }}
        >
          {/* Inner container to hold our actual page views */}
          <div className="w-full flex-1 p-6">
            {children}
          </div>
        </main>

        {/* <footer></footer> */}
      </body>
    </html>
  );
}

