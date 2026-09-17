"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { getProductReturnContent } from "@/lib/i18n/legal";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 marker:text-[var(--color-brown)]">
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
        className="text-[18px] md:text-[20px] font-bold text-[var(--foreground-primary)] mb-3"
        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
      >
        {title}
      </h2>
      <div className="text-[15px] md:text-[16px] leading-relaxed text-[var(--foreground-primary)] space-y-2">
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
  const { locale, lp } = useLocale();
  const content = getProductReturnContent(locale);

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
          className="relative text-[var(--foreground-primary)] px-8 sm:px-12 md:px-16 lg:px-20 pt-10 md:pt-12 pb-12 md:pb-16 shadow-2xl rounded-3xl"
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
              className="absolute left-0 top-2 w-10 h-10 rounded-full flex items-center justify-center text-[22px] text-[var(--color-muted-fg)] hover:bg-black/5 transition"
              aria-label={content.backAria}
            >
              ←
            </button>

            <h1
              className="text-[26px] sm:text-[32px] md:text-[40px] font-bold text-[var(--foreground-primary)] tracking-tight text-center px-10"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {content.title}
            </h1>

            {/* Figma Node 1472:32020 Badge "Як скасувати?" */}
            <div className="mt-3 px-6 py-1.5 rounded-full bg-[color-mix(in_srgb,var(--color-green)_10%,transparent)] border border-[var(--color-green)]/30 text-[var(--color-green)] text-sm font-extrabold tracking-wide uppercase">
              {content.badge}
            </div>
          </header>

          {/* Highlight Card matching Figma 1472:32020 */}
          <div className="bg-[var(--color-menu-hover)] border-2 border-[var(--color-green)]/30 p-4 sm:p-5 rounded-2xl mb-8 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[var(--color-green)] text-white flex items-center justify-center font-bold text-xl shrink-0">
              ✓
            </div>
            <p className="text-sm sm:text-base font-bold text-[var(--foreground-primary)] leading-snug">
              {content.highlight}
            </p>
          </div>

          <div className="text-[15px] md:text-[16px] leading-relaxed text-[var(--foreground-primary)] space-y-3 mb-4">
            <p>{content.intro}</p>
          </div>

          <Section title={content.cancelTitle}>
            <p className="mb-2">{content.cancelIntro}</p>
            <ol className="list-decimal pl-5 space-y-2 font-medium">
              {content.cancelSteps.map((step, index) => (
                <li key={index}>
                  {step.type === "link" ? (
                    <>
                      {step.before}{" "}
                      <Link
                        href={lp(step.href)}
                        className="text-[var(--color-green)] font-bold underline hover:opacity-80"
                      >
                        {step.linkText}
                      </Link>
                      {step.after}
                    </>
                  ) : (
                    step.text
                  )}
                </li>
              ))}
            </ol>
          </Section>

          <Section title={content.defectTitle}>
            <BulletList items={content.defectItems} />
          </Section>

          <Section title={content.qualityTitle}>
            <p>
              {content.qualityIntroBefore}{" "}
              <strong>{content.qualityIntroStrong}</strong>{" "}
              {content.qualityIntroAfter}
            </p>
            <BulletList items={content.qualityItems} />
          </Section>

          <Section title={content.refundTitle}>
            <p>
              {content.refundBefore}{" "}
              <strong>{content.refundStrong}</strong>
              {content.refundAfter}
            </p>
          </Section>

          <Section title={content.helpTitle}>
            <div className="bg-[var(--background-elevated)] p-4 rounded-xl border border-[#C8C2B4] mt-2 space-y-1">
              <p className="font-bold text-[var(--foreground-primary)]">{content.supportTitle}</p>
              <p className="text-sm">
                {content.phoneLabel}{" "}
                <a
                  href={`tel:${content.phoneHref}`}
                  className="font-bold text-[var(--color-green)] underline"
                >
                  {content.phoneDisplay}
                </a>{" "}
                {content.freeNote}
              </p>
              <p className="text-xs text-[var(--color-muted-fg)]">{content.schedule}</p>
            </div>
          </Section>
        </article>
      </div>
    </section>
  );
}
