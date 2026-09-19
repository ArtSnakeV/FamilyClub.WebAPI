"use client";

import Image from "next/image";
import { useTheme } from "@/lib/theme/ThemeProvider";

interface BlockForUsersInfoProps {
    icon: string;
    title: string;
    value: string | number;
    subtitle: string;
}

export default function BlockedSectionUsersHeader({
    icon,
    title,
    value,
    subtitle,
}: BlockForUsersInfoProps) {
    const { theme } = useTheme();
    const isNight = theme === "ink-night";

    return (
        <div className="w-[368px] max-w-full mt-[10vh] h-auto min-h-[170px] relative z-10 flex flex-row flex-wrap items-center px-10 gap-3 overflow-hidden">
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none admin-parchment-bg"
                style={{
                    backgroundImage: "url('/images/usersPageAdmin/Rectangle 686.png')",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                }}
            />
            <div className="relative z-10 flex-shrink-0">
                <Image
                    src={icon}
                    alt={title}
                    width={80}
                    height={80}
                    style={isNight ? { filter: "brightness(0) invert(0.88)" } : undefined}
                />
            </div>
            <div className="relative z-10 flex flex-col min-w-[170px] max-w-full flex-1 -mt-2 text-[var(--foreground-primary)]">
                <span className="font-['Source_Sans_Pro'] font-semibold text-[17px] leading-[150%] tracking-[-0.011em] truncate">
                    {title}
                </span>
                <span className="font-['Source_Sans_Pro'] font-semibold text-[40px] leading-[150%] tracking-[-0.011em] truncate">
                    {value}
                </span>
                <span className="text-[13px] text-[var(--color-green)] truncate">
                    {subtitle}
                </span>
            </div>
        </div>
    );
}
