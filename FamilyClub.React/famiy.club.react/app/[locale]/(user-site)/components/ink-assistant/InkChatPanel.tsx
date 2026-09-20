"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  useLocalizedPath,
  useTranslations,
  useLocale,
} from "@/lib/i18n/LocaleProvider";
import { apiBasePath } from "@/lib/api/services";

type ChatMessage = {
  id: string;
  from: "ink" | "user";
  text: string;
  books?: { id: number; title: string }[];
};

type QuickReply = {
  id: string;
  label: string;
  reply: string;
  href?: string;
  action?: "play";
};

type InkChatPanelProps = {
  onClose: () => void;
  onPlayGame?: () => void;
};

function matchReply(input: string, t: (key: string) => string): string | null {
  const q = input.toLowerCase().trim();
  if (!q) return t("ink.match.empty");
  if (/(повернення|обмін|return|exchange|refund)/i.test(q)){
    return t("ink.match.returns");
  }
  if (/(замовлення|order|статус|мої замовлення|my orders|tracking)/i.test(q)){
    return t("ink.match.order");
  }
  if(/(аккаунт|профіль|login|account|profile|увійти|sign in|акаунт)/i.test(q)){
    return t("ink.match.account");
  }
  if(/(розробник|developer|developers|розробники)/i.test(q)){
    return t("ink.match.developer");
  }
  if (/(гра|пограт|полюван|лазер|мишк|play|game|laser|mouse)/i.test(q)) {
    return t("ink.match.play");
  }
  if (/(привіт|вітаю|hello|hi|здраст|hey)/i.test(q)) {
    return t("ink.match.hello");
  }
  if (/(рекоменд|порекоменд|що почита|recommend|suggest)/i.test(q)) {
    return t("ink.match.recommend");
  }
  // «книга» сама по собі йде в LLM/пошук; FAQ лише для підбору
  if (/(підібр|що почита)/i.test(q)) {
    return t("ink.match.book");
  }
  if (/(підтримк|скарг|допомог|support|контакт|зв.?язат|help|contact)/i.test(q)) {
    return t("ink.match.support");
  }
  if (/(акці|знижк|промо|promo|deal|discount)/i.test(q)) {
    return t("ink.match.promos");
  }
  if (/(доставк|оплат|нова пошта|payment|delivery)/i.test(q)) {
    return t("ink.match.payment");
  }
  if (/(каталог|жанр|автор|shop|product|catalog)/i.test(q)) {
    return t("ink.match.catalog");
  }
  if (/(хто ти|що ти|інк|ink|помічник|who are you|assistant)/i.test(q)) {
    return t("ink.match.who");
  }
  if (/(дякую|thanks|спасиб|thank)/i.test(q)) {
    return t("ink.match.thanks");
  }
  // return t("ink.match.fallback");
  return null; // Йдемо в LLM
}

export default function InkChatPanel({ onClose, onPlayGame }: InkChatPanelProps) {
  const t = useTranslations();
  const lp = useLocalizedPath();
  const welcome = t("ink.welcome");
  const { locale } = useLocale();
  const quickReplies = useMemo<QuickReply[]>(
    () => [
      {
        id: "play",
        label: t("ink.quick.playLabel"),
        reply: t("ink.quick.playReply"),
        action: "play",
      },
      {
        id: "recommend",
        label: t("ink.quick.recommendLabel"),
        reply: t("ink.quick.recommendReply"),
        href: lp("/pick-book"),
      },
      {
        id: "pickBook",
        label: t("ink.quick.pickBookLabel"),
        reply: t("ink.quick.pickBookReply"),
        href: lp("/pick-book"),
      },
      {
        id: "catalog",
        label: t("ink.quick.catalogLabel"),
        reply: t("ink.quick.catalogReply"),
        href: lp("/products"),
      },
      {
        id: "support",
        label: t("ink.quick.supportLabel"),
        reply: t("ink.quick.supportReply"),
        href: lp("/complaints"),
      },
      {
        id: "promos",
        label: t("ink.quick.promosLabel"),
        reply: t("ink.quick.promosReply"),
        href: lp("/promotions"),
      },
      {
        id: "payment",
        label: t("ink.quick.paymentLabel"),
        reply: t("ink.quick.paymentReply"),
        href: lp("/payment-delivery"),
      },
      {
        id: "who",
        label: t("ink.quick.whoLabel"),
        reply: t("ink.quick.whoReply"),
      },
    ],
    [lp, t],
  );

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", from: "ink", text: welcome },
  ]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ id: "welcome", from: "ink", text: welcome }]);
  }, [welcome]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const pushInk = (text: string, books?: { id: number; title: string }[]) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `ink-${Date.now()}-${prev.length}`,
        from: "ink",
        text,
        books: books && books.length > 0 ? books : undefined,
      },
    ]);
  };

  const pushUser = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}-${prev.length}`, from: "user", text },
    ]);
  };

  const handleQuick = (item: QuickReply) => {
    if (thinking) return;
    pushUser(item.label);
    window.setTimeout(() => {
      pushInk(item.reply);
      if (item.action === "play") {
        window.setTimeout(() => onPlayGame?.(), 500);
      }
    }, 280);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (thinking) return;
    const text = draft.trim();
    if (!text) return;
    pushUser(text);
    setDraft("");
    const faq = matchReply(text, t);
    if (faq) {
      window.setTimeout(() => pushInk(faq), 320);
      return;
    }

    setThinking(true);
    try {
      const res = await fetch(`${apiBasePath}/api/InkAssistant/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, locale }),
      });
      if (!res.ok) throw new Error("bad status");
      const data = (await res.json()) as {
        reply: string;
        needsSupport: boolean;
        books?: { id: number; title: string }[] | null;
      };
      pushInk(
        data.reply || t("ink.match.fallback"),
        data.books ?? undefined,
      );
    } catch {
      pushInk(t("ink.match.fallback"));
    } finally {
      setThinking(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-label={t("ink.dialogAria")}
      className="ink-panel-in flex w-[300px] flex-col overflow-hidden rounded-[12px] border border-[var(--color-green)]/30 bg-[var(--background-elevated)] shadow-[var(--shadow-panel)]"
    >
      <div className="flex items-center justify-between bg-[var(--color-green)] px-3 py-2 text-[var(--color-cream)]">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#F5C542]" aria-hidden />
          <p className="font-serif text-sm font-semibold tracking-wide text-[var(--color-cream)]">Ink</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("ink.closeAria")}
          className="rounded px-2 py-0.5 text-lg leading-none text-[var(--color-cream)]/90 transition-colors hover:bg-[var(--color-cream)]/15 hover:text-[var(--color-cream)]"
        >
          ×
        </button>
      </div>

      <div
        ref={listRef}
        className="flex max-h-[220px] flex-col gap-2 overflow-y-auto px-3 py-3"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[90%] rounded-[10px] px-2.5 py-1.5 text-[13px] leading-snug ${
              m.from === "ink"
                ? "self-start bg-[var(--background-main)] text-[var(--foreground-primary)] shadow-[var(--shadow-control)]"
                : "self-end bg-[color-mix(in_srgb,var(--color-green)_18%,transparent)] text-[var(--color-green)]"
            }`}
          >
            <p className="whitespace-pre-wrap">{m.text}</p>
            {m.from === "ink" && m.books && m.books.length > 0 ? (
              <div className="mt-2 border-t border-[var(--color-green)]/15 pt-1.5">
                <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-[var(--color-green)]/70">
                  {t("ink.bookLinksLabel")}
                </p>
                <ul className="flex flex-col gap-1">
                  {m.books.map((book) => (
                    <li key={book.id}>
                      <Link
                        href={lp(`/products/${book.id}`)}
                        className="text-[12px] font-medium text-[var(--color-green)] underline decoration-[var(--color-green)]/35 underline-offset-2 transition-colors hover:decoration-[var(--color-green)]"
                      >
                        {book.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ))}
        {thinking ? (
          <div
            className="ink-thinking self-start max-w-[90%] rounded-[10px] bg-[var(--background-main)] px-2.5 py-1.5 text-[13px] leading-snug text-[var(--color-green)]/80 shadow-[var(--shadow-control)]"
            aria-live="polite"
          >
            {t("ink.thinking")}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-[var(--color-green)]/15 px-3 py-2">
        {quickReplies.map((item) =>
          item.href ? (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => {
                if (thinking) {
                  e.preventDefault();
                  return;
                }
                handleQuick(item);
              }}
              aria-disabled={thinking}
              className={`rounded-full border border-[var(--color-green)]/35 bg-[var(--background-main)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-green)] transition-colors hover:border-[var(--color-green)] hover:bg-[color-mix(in_srgb,var(--color-green)_18%,transparent)] ${
                thinking ? "pointer-events-none opacity-50" : ""
              }`}
            >
              {item.label}
            </Link>
          ) : (
            <button
              key={item.id}
              type="button"
              onClick={() => handleQuick(item)}
              disabled={thinking}
              className="rounded-full border border-[var(--color-green)]/35 bg-[var(--background-main)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-green)] transition-colors hover:border-[var(--color-green)] hover:bg-[color-mix(in_srgb,var(--color-green)_18%,transparent)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {item.label}
            </button>
          ),
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-1.5 border-t border-[var(--color-green)]/15 px-2 py-2"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={t("ink.placeholder")}
          aria-label={t("ink.messageAria")}
          disabled={thinking}
          className="min-w-0 flex-1 rounded-[8px] border border-[var(--color-menu-separator)] bg-[var(--background-main)] px-2.5 py-1.5 text-[13px] text-[var(--foreground-primary)] caret-[var(--foreground-primary)] placeholder:text-[var(--color-muted-fg)] outline-none focus:border-[var(--color-green)] disabled:cursor-not-allowed disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={thinking || !draft.trim()}
          className="rounded-[8px] bg-[var(--color-green)] px-3 py-1.5 text-[12px] font-semibold text-[var(--color-cream)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-green)_85%,black)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("ink.send")}
        </button>
      </form>
    </div>
  );
}
