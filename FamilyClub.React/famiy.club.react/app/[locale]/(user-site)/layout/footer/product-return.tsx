"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 marker:text-[#7E4D1E]">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: ReactNode[] }) {
  return (
    <ol className="list-decimal pl-5 space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-8 first:mt-0">
      <h2
        className="text-[18px] md:text-[20px] font-bold text-[#1F1F1F] mb-3"
        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
      >
        {title}
      </h2>
      <div className="text-[15px] md:text-[16px] leading-relaxed text-[#2A2A2A] space-y-2">
        {children}
      </div>
    </section>
  );
}

/**
 * Сторінка «Повернення товару / Скасування» за макетом Figma (Node 1472:32020).
 */
export default function ProductReturn() {
  const router = useRouter();

  return (
    <section className="relative w-full min-h-screen pt-0 pb-10 md:pb-16 px-2 sm:px-4">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/main_page/main_background.png')",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-[#1a1510]/55 backdrop-blur-[2px]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[900px]">
        <article
          className="relative text-[#242424] px-8 sm:px-12 md:px-16 lg:px-20 pt-10 md:pt-12 pb-12 md:pb-16 shadow-2xl rounded-3xl"
          style={{
            backgroundImage:
              "url('/images/Layout/Footer/long_background1.png')",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <header className="relative flex flex-col items-center justify-center mb-8 md:mb-10">
            <button
              type="button"
              onClick={() => router.back()}
              className="absolute left-0 top-2 w-10 h-10 rounded-full flex items-center justify-center text-[22px] text-[#242424]/70 hover:bg-black/5 transition"
              aria-label="Назад"
            >
              ←
            </button>

            <h1
              className="text-[26px] sm:text-[32px] md:text-[40px] font-bold text-[#1F1F1F] tracking-tight text-center px-10"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Повернення замовлення
            </h1>

            {/* Figma Node 1472:32020 Badge "Як скасувати?" */}
            <div className="mt-3 px-6 py-1.5 rounded-full bg-[#005b33]/10 border border-[#005b33]/30 text-[#005b33] text-sm font-extrabold tracking-wide uppercase">
              Як скасувати?
            </div>
          </header>

          {/* Highlight Card matching Figma 1472:32020 */}
          <div className="bg-[#EBE7DD] border-2 border-[#005b33]/30 p-4 sm:p-5 rounded-2xl mb-8 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#005b33] text-white flex items-center justify-center font-bold text-xl shrink-0">
              ✓
            </div>
            <p className="text-sm sm:text-base font-bold text-[#242424] leading-snug">
              Повернення можливе протягом 14 днів з моменту отримання замовлення.
            </p>
          </div>

          <div className="text-[15px] md:text-[16px] leading-relaxed text-[#2A2A2A] space-y-3 mb-4">
            <p>
              У Librellis ми прагнемо забезпечити максимальну зручність. Якщо ви бажаєте скасувати замовлення або оформити повернення товарів, ми надали простий онлайн-інструмент у особистому кабінеті.
            </p>
          </div>

          <Section title="1. Скасування або повернення через особистий кабінет">
            <p className="mb-2">
              Ви можете оформити повернення або скасування в декілька кліків:
            </p>
            <ol className="list-decimal pl-5 space-y-2 font-medium">
              <li>
                Перейдіть у розділ{" "}
                <Link href="/orders" className="text-[#005b33] font-bold underline hover:opacity-80">
                  Мої замовлення
                </Link>
                .
              </li>
              <li>Знайдіть відповідне замовлення та натисніть «Детальніше».</li>
              <li>Натисніть кнопку «Повернути товар» або «Написати продавцю».</li>
            </ol>
          </Section>

          <Section title="2. Виявлено брак або пошкодження">
            <BulletList
              items={[
                "Відсутні або переплутані сторінки в книзі",
                "Розмитий або нечитабельний друк",
                "Значні механічні пошкодження, отримані при транспортуванні",
              ]}
            />
          </Section>

          <Section title="3. Умови повернення товарів належної якості">
            <p>
              Обмін або повернення можливі протягом <strong>14 днів</strong> з моменту отримання:
            </p>
            <BulletList
              items={[
                "Збережено товарний вигляд книги (відсутні згини, закладки, сліди читання)",
                "Збережено оригінальну обгортку / пакування",
                "Є документ або розрахунковий номер замовлення",
              ]}
            />
          </Section>

          <Section title="4. Повернення коштів">
            <p>
              Після перевірки повернутого товару на складі кошти зараховуються на вашу банківську картку або IBAN протягом <strong>1–3 робочих днів</strong>.
            </p>
          </Section>

          <Section title="Потрібна допомога?">
            <div className="bg-[#F5F3EE] p-4 rounded-xl border border-[#C8C2B4] mt-2 space-y-1">
              <p className="font-bold text-[#242424]">Служба підтримки Librellis:</p>
              <p className="text-sm">
                Телефон:{" "}
                <a href="tel:08005553535" className="font-bold text-[#005b33] underline">
                  0 (800) 555 35 35
                </a>{" "}
                (безкоштовно)
              </p>
              <p className="text-xs text-[#666666]">Графік: Пн–Пт з 09:00 до 18:00</p>
            </div>
          </Section>
        </article>
      </div>
    </section>
  );
}
