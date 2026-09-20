"use client";

import Link from "next/link";

type Props = {
  href: string;
  ariaLabel: string;
  goToAlt: string;
};

/** Section “more” control — darker wood circle + light chevron in both themes. */
export default function MobileSectionArrow({ href, ariaLabel, goToAlt }: Props) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="relative w-[40px] h-[40px] shrink-0 flex items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-shelf)_82%,#1a1008)] shadow-[0px_2px_8px_rgba(0,0,0,0.4)] transition-transform hover:scale-105 active:scale-95 hover:opacity-90"
    >
      <img
        src="/images/main_page/mobile/arrow-icon.svg"
        alt={goToAlt}
        className="w-[18px] h-[18px] rotate-90 object-contain brightness-0 invert opacity-95"
      />
    </Link>
  );
}
