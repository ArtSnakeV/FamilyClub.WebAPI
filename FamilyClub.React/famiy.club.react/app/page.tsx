// import Image from "next/image";
//
//
// export default async function Home() {
// /////////////////////////////////////////////////////
// // Added to test connection between backend and frontend
//   let message = "Loading...";
//   try {
//     const response = await fetch('https://localhost:7069/api/Home', {
//       cache: 'no-store' // This ensures we get fresh data every time
//     });
//
//     if (response.ok) {
//       message = await response.text(); // We use .text() because the API returns a string
//     } else {
//       message = "Error: Backend reached but returned " + response.status;
//     }
//   } catch (error) {
//     console.log("REAL ERROR:", error);
//     message = "Connection Failed: Is the Backend running?";
//   }
// /////////////////////////////////////////////////////
//
//   return (
//     <h1>Our amazing `main_page`.</h1>
//
//   );
// }

import Hero from "@/app/main_page/Hero";
import BookSection from "@/app/main_page/BookSection";
import Features from "@/app/main_page/Features";
import Banner from "@/app/main_page/Banner";
import AboutSection from "@/app/main_page/AboutSection";

export default function Home() {
  return (
      <main className="bg-[#f5f2ee]">
            <Hero />

            <BookSection title="Рекомендації для тебе" />

            <AboutSection />

            <BookSection title="Формат, який зручний саме тобі" />

            <BookSection title="Рекомендації для тебе" />

            <Banner />

            <Features />

              <BookSection title="Роман" />
              <BookSection title="Трилери" />
              <BookSection title="Наукові" />
              <BookSection title="Фантастика" />

              <Banner />

              <BookSection title="Хіти продажу" />
              <BookSection title="Новинки" />
              <BookSection title="Комплекти" />
              <BookSection title="Анонси" />
      </main>
  );
}