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

export default function BlockTabsBlockedUsers({ tabs, activeTab, onChange }: Props) {
    return (
        <div
            className="w-[1080px] max-w-full h-[70px] rounded-1xl overflow-hidden flex items-center"
            style={{
                backgroundImage: "url('/images/blockedUsersPageAdmin/Rectangle 56.png')",
                backgroundSize: "100% 100%",
            }}
        >
            <div className="flex items-center relative gap-3 p-1 -mt-1 justify-center px-4 ml-0 overflow-x-auto">
                {tabs.map((tab) => {
                    const active = tab.key === activeTab;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => onChange(tab.key)}
                            className={`whitespace-nowrap px-4 py-2 rounded-[9px] text-[15px] font-medium transition ${
                                active ? "bg-[#1F5C3D] text-white" : "text-[#272727] hover:bg-black/5"
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