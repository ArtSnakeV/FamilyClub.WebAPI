import type { Metadata } from "next";
import "../styles/globals.css";
import { Source_Sans_3, Roboto_Mono } from 'next/font/google';
import UpNavigation from "./layout/header/UpNavigation";
import DropDownList from "./layout/header/dropdownlist/DropDownList";
import Footer from "@/app/layout/footer/Footer";
// import "flag-icons/css/flag-icons.min.css";
const sourceSans = Source_Sans_3({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-sans', // Назва CSS змінної для використання шрифту в стилях
});

const robotoMono = Roboto_Mono({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-mono',
});


export const metadata: Metadata = {
  title: "My App",
  description: "Created with Next.js",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${sourceSans.variable} ${robotoMono.variable}`}>
      <body className="antialiased bg-background text-foreground font-sans">
        <header className="bg-[var(--background-main)] relative z-30 h-[72px] shadow-[0px_0px_15px_0px_#24242499]">
          <div className="max-w-[1220px] mx-auto flex items-center px-4 lg:px-0">
            <UpNavigation />
          </div>
        </header>
        <div className="relative z-10 max-w-[1220px] mx-auto flex gap-2 -mt-[60px] px-4 lg:px-0">
          <DropDownList />
        </div>

        <main className="min-h-[calc(100vh-72px)]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}

