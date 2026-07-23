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
        <div className="w-[1200px] max-w-full h-[73px] mt-[8vh] overflow-hidden flex items-center flex-row justify-left gap-2"
            style={{
                backgroundImage: "url('/images/blockedUsersPageAdmin/Rectangle 56.png')",
                backgroundSize: "100% 100%",
            }}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.key;

                return (
                    <div className="flex -mt-2 ml-4">
                        <button
                            key={tab.key}
                            onClick={() => onChange(tab.key)}
                            className={`flex items-center gap-2 rounded-[9px] px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${isActive
                                ? "bg-[#1E5631] text-white"
                                : "bg-transparent text-[#3A3A3A] hover:bg-black/5"
                                }`}
                        >
                            <span>{tab.label}</span>
                            <span
                                className={`flex items-center justify-center min-w-[28px] h-[22px] px-1.5 rounded-[48px] text-[15px] font-semibold ${isActive
                                    ? "bg-[var(--color-white)] text-[var(--color-black)]"
                                    : "bg-[#696969] text-[var(--color-white)]"
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