"use client";

interface Tab {
    key: string;
    label: string;
    count: number;
}

interface Props {
    tabs: Tab[];
    activeTab: string;
    onChange: (key: string) => void;
}

export default function BlockTabsBlockedUsers({
    tabs,
    activeTab,
    onChange,
}: Props) {
    return (
        <div className="relative w-[1080px] max-w-full h-[70px] rounded-1xl overflow-hidden flex items-center">
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none admin-parchment-bg"
                style={{
                    backgroundImage:
                        "url('/images/blockedUsersPageAdmin/Rectangle 56.png')",
                    backgroundSize: "100% 100%",
                }}
            />
            <div className="relative z-10 flex items-center gap-3 p-1 -mt-1 justify-center px-4 ml-0 overflow-x-auto">
                {tabs.map((tab) => {
                    const active = tab.key === activeTab;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => onChange(tab.key)}
                            className={`whitespace-nowrap px-4 py-2 rounded-[9px] text-[15px] font-medium transition ${
                                active
                                    ? "bg-[var(--color-green)] text-[var(--color-cream)]"
                                    : "text-[var(--foreground-primary)] hover:bg-[color-mix(in_srgb,var(--color-green)_22%,var(--background-elevated))]"
                            }`}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
