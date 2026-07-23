"use client";

type Metric = {
    title: string;
    value: string;
    delta: string;
    subtitle: string;
    positive?: boolean;
};

type Props = {
    metrics: Metric[];
    isLoading?: boolean;
};

export default function BottomMetricsBar({ metrics, isLoading }: Props) {
    return (
        <div className="rounded-[12px] bg-white px-4 py-5 shadow-[0_0_15px_rgba(0,0,0,0.12)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-0">
                {metrics.map((m, index) => (
                    <div
                        key={m.title}
                        className={`px-4 ${
                            index > 0
                                ? "xl:border-l xl:border-[#E8E4DC]"
                                : ""
                        }`}
                    >
                        <p className="text-[13px] text-[#555]">{m.title}</p>
                        <p className="text-[28px] font-semibold text-[#1F1F1F] leading-tight mt-1">
                            {isLoading ? "…" : m.value}
                        </p>
                        <p
                            className={`text-[12px] mt-1 ${
                                m.positive === false
                                    ? "text-[#981717]"
                                    : "text-[var(--color-green)]"
                            }`}
                        >
                            {isLoading ? "" : m.delta}
                        </p>
                        <p className="text-[12px] text-[#888] mt-0.5">{m.subtitle}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
