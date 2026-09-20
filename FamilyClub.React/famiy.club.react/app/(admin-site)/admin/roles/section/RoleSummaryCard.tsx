"use client";

import Image from "next/image";
import { useTheme } from "@/lib/theme/ThemeProvider";

interface RoleSummaryCardProps {
    icon: string;
    title: string;
    value: string | number;
    subtitle: string;
    selected?: boolean;
    onClick?: () => void;
}

export default function RoleSummaryCard({
    icon,
    title,
    value,
    subtitle,
    selected = false,
    onClick,
}: RoleSummaryCardProps) {
    const { theme } = useTheme();
    const isNight = theme === "ink-night";

    return (
        <button
            type="button"
            onClick={onClick}
            className={`relative w-[240px] min-w-[220px] max-w-full min-h-[170px] z-10 flex flex-row items-center px-6 gap-4 text-left overflow-hidden transition ${
                selected ? "scale-[1.02]" : "hover:scale-[1.01]"
            }`}
        >
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
                    width={64}
                    height={64}
                    style={isNight ? { filter: "brightness(0) invert(0.88)" } : undefined}
                />
            </div>
            <div className="relative z-10 flex flex-col min-w-0 flex-1 text-[var(--foreground-primary)]">
                <span className="font-['Source_Sans_Pro'] font-semibold text-[18px] leading-[140%] truncate">
                    {title}
                </span>
                <span className="font-['Source_Sans_Pro'] font-semibold text-[34px] leading-[140%]">
                    {value}
                </span>
                <span className="text-[12px] text-[var(--color-green)] line-clamp-2">
                    {subtitle}
                </span>
            </div>
        </button>
    );
}
