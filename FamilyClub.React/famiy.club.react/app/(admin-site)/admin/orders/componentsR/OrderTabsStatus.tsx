"use client";

interface Tab<T extends string> {
    key: T;
    label: string;
    count: number;
}

interface OrderTabsStatusProps<T extends string> {
    tabs: Tab<T>[];
    activeTab: string;
    onChange: (key: T) => void;
}

export default function OrderTabsStatus<T extends string>({
    tabs,
    activeTab,
    onChange,
}: OrderTabsStatusProps<T>) {
    return (
        <div className="relative w-[1300px] max-w-full h-[73px] mt-[8vh] overflow-hidden flex items-center flex-row justify-left gap-2">
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none admin-parchment-bg"
                style={{
                    backgroundImage:
                        "url('/images/blockedUsersPageAdmin/Rectangle 56.png')",
                    backgroundSize: "100% 100%",
                }}
            />
            {tabs.map((tab) => {
                const isActive = activeTab === tab.key;

                return (
                    <div key={tab.key} className="relative z-10 flex -mt-2 ml-4">
                        <button
                            onClick={() => onChange(tab.key)}
                            className={`flex items-center gap-2 rounded-[9px] px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                                isActive
                                    ? "bg-[var(--color-green)] text-[var(--color-cream)]"
                                    : "bg-transparent text-[var(--foreground-primary)] hover:bg-[color-mix(in_srgb,var(--color-green)_22%,var(--background-elevated))]"
                            }`}
                        >
                            <span>{tab.label}</span>
                            <span
                                className={`flex items-center justify-center min-w-[28px] h-[22px] px-1.5 rounded-[48px] text-[15px] font-semibold ${
                                    isActive
                                        ? "bg-[var(--color-cream)] text-[var(--color-green)]"
                                        : "bg-[color-mix(in_srgb,var(--foreground-primary)_22%,var(--background-elevated))] text-[var(--foreground-primary)]"
                                }`}
                            >
                                {tab.count}
                            </span>
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
