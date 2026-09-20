"use client";

import Image from "next/image";
import { useTheme } from "@/lib/theme/ThemeProvider";

interface Props {
    status: string;
    onChange: (value: string) => void;
}

const selectClass =
    "w-full h-[50px] rounded-[9px] border border-[color-mix(in_srgb,var(--foreground-primary)_28%,transparent)] bg-[var(--background-elevated)] px-4 pr-10 text-[15px] text-[var(--foreground-primary)] outline-none appearance-none cursor-pointer";

export default function StatusFilteredBlockedUsers({
    status,
    onChange,
}: Props) {
    const { theme } = useTheme();
    const isNight = theme === "ink-night";

    return (
        <div className="relative w-[220px] ml-6">
            <label className="block font-source-sans text-[18px] font-semibold leading-[150%] tracking-[-0.011em] text-[var(--foreground-primary)]">
                Статус
            </label>

            <div className="relative">
                <select
                    value={status}
                    onChange={(e) => onChange(e.target.value)}
                    className={selectClass}
                >
                    <option value="all">Всі статуси</option>
                    <option value="temporary">Тимчасово заблоковані</option>
                    <option value="permanent">Заблоковані назавжди</option>
                    <option value="expiring">Закінчуються скоро</option>
                    <option value="active">Активні користувачі</option>
                </select>

                <Image
                    src="/images/blockedUsersPageAdmin/angle-down-solid-full (10) 1.png"
                    alt=""
                    width={20}
                    height={20}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 opacity-70"
                    style={
                        isNight
                            ? { filter: "brightness(0) invert(0.88)" }
                            : undefined
                    }
                />
            </div>
        </div>
    );
}
