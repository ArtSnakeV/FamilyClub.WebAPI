"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

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
 * Сторінка «Повернення товару» за макетом Figma.
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
          className="relative text-[#242424] px-8 sm:px-12 md:px-16 lg:px-20 pt-10 md:pt-12 pb-12 md:pb-16"
          style={{
            backgroundImage:
              "url('/images/Layout/Footer/long_background1.png')",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <header className="relative flex items-center justify-center mb-8 md:mb-10 min-h-[48px]">
            <button
              type="button"
              onClick={() => router.back()}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-[22px] text-[#242424]/70 hover:bg-black/5 transition"
              aria-label="Назад"
            >
              ←
            </button>
            <h1
              className="text-[26px] sm:text-[32px] md:text-[40px] font-bold text-[#1F1F1F] tracking-tight text-center px-10"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Повернення товару
            </h1>
          </header>

          <div className="text-[15px] md:text-[16px] leading-relaxed text-[#2A2A2A] space-y-3 mb-2">
            <p>
              У Librellis ми хочемо, щоб кожна книга приносила радість. Якщо
              щось пішло не так — ми завжди на вашому боці. Повернення товарів
              регулюється законодавством України (постанова КМУ № 172), згідно з
              яким друкована продукція належної якості зазвичай не підлягає
              поверненню. Проте ми йдемо назустріч і приймаємо книги у таких
              випадках:
            </p>
          </div>

          <Section title="1. Виявлено типографський брак або пошкодження">
            <BulletList
              items={[
                "Відсутні або переплутані сторінки",
                "Розмитий / нечитабельний текст або друк",
                "Значні механічні пошкодження, отримані під час транспортування",
              ]}
            />
          </Section>

          <Section title="2. Помилка магазину">
            <BulletList
              items={["Вам надіслали не ту книгу, яку ви замовляли"]}
            />
          </Section>

          <Section title="3. Книга належної якості (ви передумали або помилилися з вибором)">
            <p>
              Обмін або повернення можливі протягом{" "}
              <strong>14 днів</strong> з моменту отримання, якщо книга не була
              у використанні:
            </p>
            <BulletList
              items={[
                "Немає згинів, закладок, слідів читання чи плям",
                "Збережено оригінальну обгортку / пакування (за наявності)",
                "Є документ, що підтверджує покупку",
              ]}
            />
          </Section>

          <Section title="Покрокова інструкція: Як оформити повернення?">
            <NumberedList
              items={[
                <>Зробіть фото браку / пошкодження або помилково надісланої книги.</>,
                <>
                  Зв&apos;яжіться з підтримкою у Viber / Telegram за номером{" "}
                  <a
                    href="tel:08005553535"
                    className="underline hover:opacity-70"
                  >
                    0 (800) 555 35 35
                  </a>{" "}
                  або напишіть на{" "}
                  <a
                    href="mailto:help@librellis.com"
                    className="underline hover:opacity-70"
                  >
                    help@librellis.com
                  </a>
                  , вказавши номер замовлення.
                </>,
                <>
                  Надішліть книгу назад через Нову Пошту або Укрпошту (реквізити
                  для відправки надасть менеджер).
                </>,
              ]}
            />
          </Section>

          <Section title="Хто оплачує доставку?">
            <BulletList
              items={[
                "Брак або помилка магазину — доставку повернення оплачує Librellis",
                "Книга належної якості (передумали) — вартість зворотної доставки сплачує покупець",
              ]}
            />
          </Section>

          <Section title="Як і коли повернуться кошти?">
            <p>
              Після того як склад отримає та перевірить книгу, кошти
              повертаються на банківську картку або IBAN протягом{" "}
              <strong>1–3 робочих днів</strong>.
            </p>
          </Section>

          <Section title="Залишилися питання?">
            <p>
              Телефон підтримки:{" "}
              <a href="tel:08005553535" className="underline hover:opacity-70">
                0 (800) 555 35 35
              </a>
            </p>
            <p>Графік роботи: Пн–Пт, 09:00–18:00</p>
            <p className="text-[14px] text-[#555] pt-1">
              Порада: перевіряйте посилку у відділенні перевізника до того, як
              підпишете отримання — так швидше вирішити питання з пошкодженням
              під час транспортування.
            </p>
          </Section>
        </article>
      </div>
    </section>
  );
}
