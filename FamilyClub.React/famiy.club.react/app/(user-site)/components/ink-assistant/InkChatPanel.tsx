"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type ChatMessage = {
  id: string;
  from: "ink" | "user";
  text: string;
};

type InkChatPanelProps = {
  onClose: () => void;
};

const QUICK_REPLIES: { label: string; reply: string; href?: string }[] = [
  {
    label: "Порекомендувати книгу",
    reply: "Мурр… Підберу історію під настрій. Ходімо до підбору книг.",
    href: "/pick-book",
  },
  {
    label: "Підібрати книгу",
    reply: "Добре! Відкриваю майстер підбору — відповідай на кілька питань.",
    href: "/pick-book",
  },
  {
    label: "Каталог",
    reply: "У каталозі багато полиць. Дивись уважно — і не забудь дзвіночок, якщо загубишся.",
    href: "/products",
  },
  {
    label: "Служба підтримки",
    reply:
      "Люди з підтримки завжди поруч. Переходь на сторінку звернень — там можна написати скаргу чи запитання.",
    href: "/complaints",
  },
  {
    label: "Акції",
    reply: "Люблю знижки майже так само, як сонячні підвіконня. Зазирни в акції!",
    href: "/promotions",
  },
  {
    label: "Оплата й доставка",
    reply: "Про оплату, доставку й терміни все зібрано на окремій сторінці. Зараз проведу тебе.",
    href: "/payment-delivery",
  },
  {
    label: "Хто ти?",
    reply:
      "Я Ink — тихий помічник бібліотеки Librellis. Не говорю багато, але допоможу знайти потрібну книгу.",
  },
];

function matchReply(input: string): string {
  const q = input.toLowerCase().trim();
  if (!q) return "Мур… Напиши щось, або обери підказку нижче.";
  if (/(привіт|вітаю|hello|hi|здраст)/i.test(q)) {
    return "Привіт! Я поруч. Можу порекомендувати книгу, відкрити каталог або зв’язати зі службою підтримки.";
  }
  if (/(рекоменд|порекоменд|що почита)/i.test(q)) {
    return "Натисни «Порекомендувати книгу» — підберемо щось цікаве.";
  }
  if (/(книг|підібр|read)/i.test(q)) {
    return "Для підбору історії натисни «Підібрати книгу» або «Порекомендувати книгу».";
  }
  if (/(підтримк|скарг|допомог|support|контакт|зв.?язат)/i.test(q)) {
    return "Служба підтримки — кнопка «Служба підтримки». Там можна залишити звернення.";
  }
  if (/(акці|знижк|промо|promo)/i.test(q)) {
    return "Актуальні пропозиції — у розділі «Акції».";
  }
  if (/(доставк|оплат|нова пошта|payment|delivery)/i.test(q)) {
    return "Умови оплати й доставки зібрані на сторінці «Оплата й доставка».";
  }
  if (/(каталог|жанр|автор|shop|product)/i.test(q)) {
    return "Каталог відкривається кнопкою нижче. Там можна фільтрувати за жанром, мовою й ціною.";
  }
  if (/(хто ти|що ти|інк|ink|помічник)/i.test(q)) {
    return "Я Ink. Живу в будиночку справа й з’являюсь, коли дзвонить дзвіночок.";
  }
  if (/(дякую|thanks|спасиб)/i.test(q)) {
    return "Завжди радий допомогти. Якщо знову знадобиться — подзвони в дзвіночок.";
  }
  return "Я ще вчуся розуміти складні питання. Спробуй швидкі дії нижче — підтримка, рекомендація книги, акції…";
}

export default function InkChatPanel({ onClose }: InkChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      from: "ink",
      text: "Мурр… Ти подзвонив — я тут. Чим допомогти?",
    },
  ]);
  const [draft, setDraft] = useState("");

  const pushInk = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `ink-${Date.now()}-${prev.length}`, from: "ink", text },
    ]);
  };

  const pushUser = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}-${prev.length}`, from: "user", text },
    ]);
  };

  const handleQuick = (item: (typeof QUICK_REPLIES)[number]) => {
    pushUser(item.label);
    window.setTimeout(() => pushInk(item.reply), 280);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    pushUser(text);
    setDraft("");
    window.setTimeout(() => pushInk(matchReply(text)), 320);
  };

  return (
    <div
      role="dialog"
      aria-label="Діалог з Ink"
      className="ink-panel-in flex w-[300px] flex-col overflow-hidden rounded-[12px] border border-[#005B33]/30 bg-[#F5F3EE] shadow-[0_8px_28px_rgba(36,36,36,0.28)]"
    >
      <div className="flex items-center justify-between bg-[#005B33] px-3 py-2 text-white">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#F5C542]" aria-hidden />
          <p className="font-serif text-sm font-semibold tracking-wide">Ink</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрити діалог з Ink"
          className="rounded px-2 py-0.5 text-lg leading-none text-white/90 transition-colors hover:bg-white/15 hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="flex max-h-[220px] flex-col gap-2 overflow-y-auto px-3 py-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[90%] rounded-[10px] px-2.5 py-1.5 text-[13px] leading-snug ${
              m.from === "ink"
                ? "self-start bg-white text-[#242424] shadow-sm"
                : "self-end bg-[#E8F5EF] text-[#005B33]"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-[#005B33]/15 px-3 py-2">
        {QUICK_REPLIES.map((item) =>
          item.href ? (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => handleQuick(item)}
              className="rounded-full border border-[#005B33]/35 bg-white px-2.5 py-1 text-[11px] font-medium text-[#005B33] transition-colors hover:border-[#005B33] hover:bg-[#E8F5EF]"
            >
              {item.label}
            </Link>
          ) : (
            <button
              key={item.label}
              type="button"
              onClick={() => handleQuick(item)}
              className="rounded-full border border-[#005B33]/35 bg-white px-2.5 py-1 text-[11px] font-medium text-[#005B33] transition-colors hover:border-[#005B33] hover:bg-[#E8F5EF]"
            >
              {item.label}
            </button>
          ),
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-1.5 border-t border-[#005B33]/15 px-2 py-2"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Напиши Ink…"
          aria-label="Повідомлення для Ink"
          className="min-w-0 flex-1 rounded-[8px] border border-gray-300 bg-white px-2.5 py-1.5 text-[13px] text-[#242424] outline-none focus:border-[#005B33]"
        />
        <button
          type="submit"
          className="rounded-[8px] bg-[#005B33] px-3 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#004d2b]"
        >
          Надіслати
        </button>
      </form>
    </div>
  );
}
