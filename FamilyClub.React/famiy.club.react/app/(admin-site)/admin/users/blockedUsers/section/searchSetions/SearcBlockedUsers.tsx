"use client";

import Image from "next/image";
import { useTheme } from "@/lib/theme/ThemeProvider";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const fieldClass =
    "w-full pl-4 pr-10 h-[50px] bg-[var(--background-elevated)] rounded-[9px] text-[15px] px-2 text-[var(--foreground-primary)] outline-none border border-[color-mix(in_srgb,var(--foreground-primary)_18%,transparent)] placeholder:text-[var(--color-muted-fg)]";

export default function SearchBlockedUsers({ value, onChange }: Props) {
    const { theme } = useTheme();
    const isNight = theme === "ink-night";

    return (
        <div className="relative w-[480px] max-w-[calc(100%-46px)] ml-[46px]">
            <label className="font-source-sans text-[18px] font-semibold leading-[150%] tracking-[-0.011em] text-[var(--foreground-primary)] mb-2">
                Пошук
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder="Пошук за ім'ям, email, ID"
                className={fieldClass}
            />
            <button
                onClick={(e) => e.stopPropagation()}
                className="absolute right-2 top-1/2 -translate-y-[8%] w-[30px] h-[30px] flex items-center justify-center"
            >
                <Image
                    src="/images/header/zoom_out_24px.png"
                    alt="search"
                    width={22}
                    height={22}
                    className="object-contain"
                    style={
                        isNight
                            ? { filter: "brightness(0) invert(0.88)" }
                            : undefined
                    }
                    priority
                />
            </button>
        </div>
    );
}
