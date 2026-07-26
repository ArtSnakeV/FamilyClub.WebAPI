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
 * Сторінка «Політика публікації товару» за макетом Figma.
 */
export default function ProductPublicationPolicy() {
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
              className="text-[22px] sm:text-[28px] md:text-[36px] font-bold text-[#1F1F1F] tracking-tight text-center px-10 leading-tight"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Політика публікації товару
            </h1>
          </header>

          <Section title="1. Джерела інформації та точність даних">
            <p>
              Описи книг, анотації, відомості про авторів, видавництва та
              характеристики товарів формуються на основі даних від видавництв,
              правовласників і відкритих джерел. Ми прагнемо до максимальної
              точності, однак:
            </p>
            <BulletList
              items={[
                "Фотографії товарів мають ілюстративний характер і можуть незначною мірою відрізнятися від фактичного вигляду (відтінок обкладинки, папір тощо)",
                "У разі виявлення помилки в описі зв’яжіться з підтримкою — ми оперативно виправимо інформацію",
              ]}
            />
          </Section>

          <Section title="2. Ціноутворення та наявність товарів">
            <BulletList
              items={[
                "Усі ціни на сайті зазначені в гривнях (₴) і включають податки, якщо інше прямо не вказано",
                "Ціна може змінюватися без попереднього повідомлення; актуальною вважається ціна на момент оформлення замовлення",
                "Статуси наявності («В наявності», «Під замовлення», «Немає в наявності») оновлюються динамічно і можуть змінюватися протягом дня",
                "Передзамовлення (pre-order) означає, що товар ще не надійшов на склад; орієнтовні строки вказані в картці товару",
              ]}
            />
          </Section>

          <Section title="3. Авторські права та інтелектуальна власність">
            <BulletList
              items={[
                "Тексти, зображення, логотипи та інші матеріали на Сайті захищені законодавством про інтелектуальну власність",
                "Копіювання, поширення чи комерційне використання матеріалів Сайту без письмової згоди Адміністрації заборонено",
                "Права на опублікований Контент (електронні / аудіокниги) належать відповідним Правовласникам; користувач отримує лише ліцензію на особисте використання згідно з умовами покупки",
              ]}
            />
          </Section>

          <Section title="4. Політика щодо відгуків користувачів">
            <p>
              Ми вітаємо чесні відгуки про книги. Водночас забороняється
              публікувати матеріали, що містять:
            </p>
            <BulletList
              items={[
                "Обсценну лексику, образи, дискримінацію чи розпалювання ворожнечі",
                "Спойлери сюжету без попередження",
                "Рекламу сторонніх товарів, послуг чи сайтів",
                "Персональні дані третіх осіб без їхньої згоди",
                "Завідомо неправдиву інформацію про товар або продавця",
              ]}
            />
            <p className="pt-1">
              Адміністрація залишає за собою право модерувати, редагувати або
              видаляти відгуки, що порушують ці правила, без попередження.
            </p>
          </Section>

          <Section title="5. Законодавчі обмеження та цензура">
            <p>
              Публікація та продаж товарів на Сайті здійснюється з дотриманням
              законодавства України. Ми не розміщуємо контент, заборонений
              чинним законодавством (зокрема матеріали, що пропагують насильство,
              дискримінацію, або інший незаконний контент). Вікові обмеження для
              окремих видань зазначаються в картці товару.
            </p>
          </Section>

          <Section title="6. Зміни в Політиці">
            <p>
              Адміністрація залишає за собою право оновлювати цю Політику в
              будь-який час. Актуальна редакція завжди доступна на цій сторінці.
              Продовження користування Сайтом після публікації змін означає
              вашу згоду з оновленими умовами.
            </p>
          </Section>

          <p className="mt-8 text-[15px] md:text-[16px] leading-relaxed text-[#2A2A2A] border-t border-[#D9D0C3] pt-6">
            Якщо у вас є запитання щодо публікації товарів або цієї Політики,
            напишіть нам на{" "}
            <a
              href="mailto:help@librellis.ua"
              className="underline hover:opacity-70"
            >
              help@librellis.ua
            </a>
            .
          </p>
        </article>
      </div>
    </section>
  );
}
