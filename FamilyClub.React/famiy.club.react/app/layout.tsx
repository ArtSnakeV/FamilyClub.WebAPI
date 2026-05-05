import { categoriesService } from "@/lib/api/services";
import type { Metadata } from "next";
import "../styles/globals.css";
import Link from "next/link";
import UpNavigation from "./layout/header/UpNavigation";
import Footer from "@/app/layout/footer/Footer";
import { Source_Sans_3, Roboto_Mono } from 'next/font/google';
import "flag-icons/css/flag-icons.min.css";
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
    <html lang="en">
      <body className="antialiased bg-background text-foreground font-sans">
        <header className="h-[75px] bg-[#F5F3EE] shadow-sm">
          <div className="h-659px">
            <UpNavigation />
          </div>
      

          {/* <Link href='/categories/all' className="text-primary-action hover:underline">Categories</Link> */}
        </header>

        <main className="p-6 max-w-7xl mx-auto min-h-screen">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}

