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
        className="text-[20px] md:text-[22px] font-bold text-[#1F1F1F] mb-3"
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
 * Сторінка «Захист персональних даних» за макетом Figma.
 * Текст на long_background1.png.
 */
export default function PersonalDataProtection() {
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
              Захист персональних даних
            </h1>
          </header>

          <Section title="1. Хто ми?">
            <p>
              <strong>ТОВ «Librellis»</strong> (ЄДРПОУ 12345678)
            </p>
            <p>Юридична адреса: 01001, Львів 79000, а/с 64</p>
            <p>Фактична адреса: м. Львів, вул. Книжкова, 10</p>
            <p>
              Контакт:{" "}
              <a
                href="mailto:LibrellisSupport@proton.me"
                className="underline hover:opacity-70"
              >
                LibrellisSupport@proton.me
              </a>
              ,{" "}
              <a href="tel:08005553535" className="underline hover:opacity-70">
                0 (800) 555 35 35
              </a>{" "}
              (служба підтримки)
            </p>
          </Section>

          <Section title="2. Які дані ми збираємо?">
            <p className="font-semibold text-[#1F1F1F]">При замовленні:</p>
            <BulletList
              items={[
                "ПІБ, номер телефону, e-mail",
                "Адреса доставки (відділення / поштомат / кур’єр)",
              ]}
            />
            <p className="font-semibold text-[#1F1F1F] pt-2">
              Особистий кабінет:
            </p>
            <BulletList
              items={[
                "Логін, пароль (зберігається у зашифрованому вигляді)",
                "Історія покупок, wishlist / обране",
              ]}
            />
            <p className="font-semibold text-[#1F1F1F] pt-2">Автоматично:</p>
            <BulletList
              items={[
                "IP-адреса, файли cookies",
                "Дані пристрою та браузера",
              ]}
            />
          </Section>

          <Section title="3. Мета збору даних">
            <BulletList
              items={[
                "Виконання та доставка замовлень",
                "Комунікація про статус замовлення та ТТН",
                "Маркетинг (за вашою згодою): розсилки про новинки та акції",
                "Покращення сервісу та аналіз популярності жанрів",
              ]}
            />
          </Section>

          <Section title="4. Передача даних третім особам">
            <BulletList
              items={[
                "Служби доставки (Нова Пошта, Укрпошта тощо) — лише ПІБ, телефон та адреса доставки",
                "Платіжні системи (WayForPay, LiqPay) — для проведення оплати",
                "Сервіси автоматизації (CRM, email-розсилки) — для обслуговування клієнтів",
              ]}
            />
            <p className="pt-2 text-[14px] text-[#555]">
              Ми не продаємо персональні дані третім особам і передаємо їх лише в
              обсязі, необхідному для виконання договору чи вимог закону.
            </p>
          </Section>

          <Section title="5. Термін зберігання даних">
            <BulletList
              items={[
                "Протягом існування вашого профілю на платформі",
                "До 3 років після останньої операції — для бухгалтерської та податкової звітності (згідно із законодавством України)",
              ]}
            />
          </Section>

          <Section title="6. Ваші права">
            <BulletList
              items={[
                "Право доступу до ваших даних та їх перевірки",
                "Право вимагати виправлення помилок",
                "Право на «забуття»: видалення профілю та пов’язаних даних (окрім випадків, коли зберігання вимагає закон)",
              ]}
            />
            <p className="pt-3 text-[14px] text-[#555]">
              Щоб скористатися правами, напишіть на{" "}
              <a
                href="mailto:LibrellisSupport@proton.me"
                className="underline hover:opacity-70"
              >
                LibrellisSupport@proton.me
              </a>{" "}
              або зверніться до служби підтримки.
            </p>
          </Section>
        </article>
      </div>
    </section>
  );
}
