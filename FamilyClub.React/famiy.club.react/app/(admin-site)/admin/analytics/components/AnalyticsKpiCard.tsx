"use client";

import { useTheme } from "@/lib/theme/ThemeProvider";

type Props = {
    title: string;
    value: string;
    delta: string;
    deltaPositive?: boolean;
    icon: string;
    isLoading?: boolean;
};

export default function AnalyticsKpiCard({
    title,
    value,
    delta,
    deltaPositive = true,
    icon,
    isLoading,
}: Props) {
    const { theme } = useTheme();
    const isNight = theme === "ink-night";
    const bgImageUrl = "/images/admin_manager/desktop/cut_edge_rectangle.png";

    return (
        <div className="group relative flex items-center gap-3 px-5 py-4 pr-6 overflow-hidden select-none w-full min-h-[110px]">
            <div
                aria-hidden
                className="absolute inset-0 z-0 pointer-events-none admin-parchment-bg bg-no-repeat bg-center bg-[length:100%_100%]"
                style={{ backgroundImage: `url('${bgImageUrl}')` }}
            />
            <div
                style={{
                    maskImage: `url('${bgImageUrl}')`,
                    WebkitMaskImage: `url('${bgImageUrl}')`,
                    maskSize: "100% 100%",
                    WebkitMaskSize: "100% 100%",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                }}
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none ${
                    isNight
                        ? "bg-[color-mix(in_srgb,var(--color-green)_28%,transparent)]"
                        : "bg-[#E3FEE5] mix-blend-multiply"
                }`}
            />
            <div className="relative z-20 flex-shrink-0 w-12 h-12 flex items-center justify-center">
                <img
                    src={icon}
                    className="max-w-full max-h-full object-contain"
                    alt=""
                    style={isNight ? { filter: "brightness(0) invert(0.88)" } : undefined}
                />
            </div>
            <div className="relative z-20 min-w-0 flex-1 text-[var(--foreground-primary)]">
                <p className="text-sm text-[var(--color-muted-fg)] truncate">{title}</p>
                <p className="text-2xl font-semibold tracking-tight">
                    {isLoading ? "…" : value}
                </p>
                <p
                    className={`text-xs leading-snug break-words ${
                        deltaPositive ? "text-[var(--color-green)]" : "text-[#981717]"
                    }`}
                >
                    {isLoading ? "Оновлення..." : delta}
                </p>
            </div>
        </div>
    );
}
