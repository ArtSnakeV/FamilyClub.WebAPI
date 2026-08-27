"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

type CarrierBlockProps = {
  name: string;
  accent: string;
  children: ReactNode;
};

function CarrierBlock({ name, accent, children }: CarrierBlockProps) {
  return (
    <div className="mt-8 first:mt-6">
      <div className="flex items-center gap-3 mb-3">
        <span
          className="inline-block h-8 w-1.5 rounded-full shrink-0"
          style={{ backgroundColor: accent }}
          aria-hidden
        />
        <h3
          className="text-[22px] md:text-[26px] font-bold tracking-tight"
          style={{ color: accent, fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          {name}
        </h3>
      </div>
      <div className="pl-0 md:pl-4 text-[15px] md:text-[16px] leading-relaxed text-[#2A2A2A]">
        {children}
      </div>
    </div>
  );
}

function SubTitle({ children }: { children: ReactNode }) {
  return (
    <p className="font-semibold text-[#1F1F1F] mt-4 mb-2 text-[16px] md:text-[17px]">
      {children}
    </p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 marker:text-[#7E4D1E]">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/**
 * Сторінка «Оплата і доставка» за макетом Figma.
 * Текст на довгому «паперовому» фоні з рваними краями.
 */
export default function PaymentDelivery() {
  const router = useRouter();

  return (
    <section className="relative w-full min-h-screen pt-0 pb-10 md:pb-16 px-2 sm:px-4">
      {/* Blurred interior background */}
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
        {/* Torn paper sheet from long_background.png */}
        <article
          className="relative text-[#242424] px-8 sm:px-12 md:px-16 lg:px-20 pt-10 md:pt-12 pb-12 md:pb-16"
          style={{
            backgroundImage:
              "url('/images/Layout/Footer/long_background.png')",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* ——— Доставка ——— */}
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
              className="text-[36px] md:text-[48px] font-bold text-[#1F1F1F] tracking-tight text-center px-10"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Доставка
            </h1>
          </header>

          <div className="space-y-4 text-[15px] md:text-[16px] leading-relaxed text-[#2A2A2A]">
            <p>
              Ми відправляємо замовлення зі складів в Україні. Після оформлення
              замовлення комплектація зазвичай триває до 1–2 робочих днів (у
              періоди розпродажів — до 3 робочих днів).
            </p>
            <p>
              Вартість і строки залежать від обраного перевізника, ваги посилки
              та населеного пункту отримувача. Точну суму доставки ви бачите на
              етапі оформлення замовлення.
            </p>
          </div>

          <CarrierBlock name="Нова Пошта" accent="#ED1C24">
            <SubTitle>Відділення</SubTitle>
            <BulletList
              items={[
                "Вартість — від 70 грн (залежить від габаритів і тарифу перевізника)",
                "Безкоштовна доставка при сумі замовлення від 2000 грн",
                "Строк доставки — зазвичай 1–2 дні",
                "Зберігання у відділенні — до 5 днів (далі — за тарифами НП)",
              ]}
            />
            <SubTitle>Поштомати</SubTitle>
            <BulletList
              items={[
                "Вартість — від 50 грн",
                "Безкоштовна доставка при сумі замовлення від 2000 грн",
                "Строк доставки — зазвичай 1–2 дні",
                "Зручне отримання цілодобово в межах графіку поштомату",
              ]}
            />
          </CarrierBlock>

          <CarrierBlock name="Укрпошта" accent="#FFCC00">
            <SubTitle>Експрес</SubTitle>
            <BulletList
              items={[
                "Вартість — від 40 грн",
                "Строк доставки — зазвичай 1–2 дні",
                "Доставка у відділення Укрпошти по всій Україні",
              ]}
            />
            <SubTitle>Стандарт</SubTitle>
            <BulletList
              items={[
                "Вартість — від 35 грн",
                "Строк доставки — зазвичай 3–6 днів",
                "Економний варіант для невеликих відправлень",
              ]}
            />
          </CarrierBlock>

          <CarrierBlock name="Meest" accent="#0057A8">
            <BulletList
              items={[
                "Доставка у відділення — від 35 грн",
                "Строк доставки — зазвичай 3–5 днів",
                "Відстеження посилки за номером ТТН у кабінеті Meest",
              ]}
            />
          </CarrierBlock>

          <CarrierBlock name="Nova Post (міжнародна)" accent="#ED1C24">
            <p className="mb-2">
              Доставка за кордон (Польща, Німеччина, Чехія, Італія, Іспанія,
              Франція та інші країни присутності Nova Post):
            </p>
            <BulletList
              items={[
                "Вартість — від 250 грн (залежить від ваги, країни та тарифу)",
                "Строки — зазвичай від 3–10 робочих днів",
                "Оформлення за паспортними / митними даними отримувача",
                "Детальний розрахунок — під час оформлення замовлення",
              ]}
            />
          </CarrierBlock>

          <p className="mt-8 text-[14px] md:text-[15px] text-[#555] leading-relaxed border-t border-[#D9D0C3] pt-5">
            Після відправлення ви отримаєте номер ТТН на email / у кабінеті
            замовлень. Затримки можливі через форс-мажор перевізника або
            митне оформлення (для міжнародних відправлень).
          </p>

          {/* ——— Оплата ——— */}
          <header className="text-center mt-14 md:mt-16 mb-8 md:mb-10">
            <h2
              className="text-[36px] md:text-[48px] font-bold text-[#1F1F1F] tracking-tight"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              Оплата
            </h2>
          </header>

          <div className="space-y-6 text-[15px] md:text-[16px] leading-relaxed text-[#2A2A2A]">
            <div>
              <h3 className="font-semibold text-[18px] md:text-[19px] text-[#1F1F1F] mb-2">
                1. Оплата карткою на сайті
              </h3>
              <BulletList
                items={[
                  "Онлайн-оплата банківською карткою через захищений платіжний шлюз",
                  "Підтримуються картки Visa / Mastercard українських банків",
                  "Після успішної оплати замовлення одразу переходить у комплектацію",
                ]}
              />
            </div>

            <div>
              <h3 className="font-semibold text-[18px] md:text-[19px] text-[#1F1F1F] mb-2">
                2. Накладений платіж (оплата при отриманні)
              </h3>
              <BulletList
                items={[
                  "Доступний для доставки Новою Поштою у відділення / поштомат",
                  "Комісія перевізника за післяплату — орієнтовно 2% + 20 грн (за тарифами НП)",
                  "Оплата готівкою або карткою у відділенні при видачі посилки",
                ]}
              />
            </div>

            <div>
              <h3 className="font-semibold text-[18px] md:text-[19px] text-[#1F1F1F] mb-2">
                3. Оплата частинами
              </h3>
              <SubTitle>ПриватБанк</SubTitle>
              <BulletList
                items={[
                  "Потрібна картка ПриватБанку з доступним кредитним лімітом",
                  "Кількість платежів обирається в кошику під час оформлення",
                  "Рішення банку відображається одразу в процесі оплати",
                ]}
              />
              <SubTitle>Monobank</SubTitle>
              <BulletList
                items={[
                  "Доступно для клієнтів Monobank з активною «Покупкою частинами»",
                  "Умови (кількість платежів / ліміт) визначає банк",
                  "Підтвердження відбувається в застосунку Monobank",
                ]}
              />
            </div>

            <div>
              <h3 className="font-semibold text-[18px] md:text-[19px] text-[#1F1F1F] mb-2">
                4. Оплата для юридичних осіб
              </h3>
              <BulletList
                items={[
                  "Оплата на розрахунковий рахунок за рахунком-фактурою",
                  "Для оформлення потрібні реквізити компанії (ЄДРПОУ, ІПН тощо)",
                  "Відправлення після надходження коштів на рахунок",
                ]}
              />
            </div>

            <div className="border-t border-[#D9D0C3] pt-6">
              <h3 className="font-semibold text-[18px] md:text-[19px] text-[#1F1F1F] mb-2">
                Повернення та обмін
              </h3>
              <p className="mb-2">
                Відповідно до Закону України «Про захист прав споживачів» ви
                можете повернути товар належної якості протягом 14 днів з
                моменту отримання, якщо:
              </p>
              <BulletList
                items={[
                  "Товар не був у використанні та збережено товарний вигляд",
                  "Збережено оригінальне пакування та комплектацію",
                  "Є документ, що підтверджує покупку",
                ]}
              />
              <p className="mt-3 text-[14px] text-[#555]">
                Детальні умови — у розділі «Повернення товару». З питань оплати
                та доставки пишіть на support-адресу з футера сайту.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
