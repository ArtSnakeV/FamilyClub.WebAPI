"use client";

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
    const bgImageUrl = "/images/admin_manager/desktop/cut_edge_rectangle.png";

    return (
        <div className="group relative flex items-center gap-3 px-5 py-4 pr-6 overflow-hidden select-none w-full min-h-[110px]">
            <div
                style={{ backgroundImage: `url('${bgImageUrl}')` }}
                className="absolute inset-0 bg-no-repeat bg-center bg-[length:100%_100%] z-0"
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
                className="absolute inset-0 bg-[#E3FEE5] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-multiply pointer-events-none"
            />
            <div className="relative z-20 flex-shrink-0 w-12 h-12 flex items-center justify-center">
                <img src={icon} className="max-w-full max-h-full object-contain" alt="" />
            </div>
            <div className="relative z-20 min-w-0 flex-1">
                <p className="text-sm text-[#2F2F2F] truncate">{title}</p>
                <p className="text-2xl font-semibold tracking-tight text-[#1F1F1F]">
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
