"use client";

import { useState } from "react";

interface Props {
    onAddManager?: () => void;
    onToggleBlockedFilter?: () => void;
    onExportReport?: () => void;
    isBlockedFilterActive?: boolean;
}

export default function QuickActionsBar({
    onAddManager,
    onToggleBlockedFilter,
    onExportReport,
    isBlockedFilterActive,
}: Props) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="fixed bottom-0 left-10 w-full flex flex-col items-center z-10 pointer-events-none">
            {/* toggle */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="pointer-events-auto relative top-8 -left-[28.6vw] w-10 h-10 mb-1 transition-transform duration-300"
                style={{
                    top: isOpen ? "2rem" : "-1rem",
                    transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
                }}
                aria-label={isOpen ? "Згорнути швидкі дії" : "Розгорнути швидкі дії"}
            >
                <img
                    src="/images/usersPageAdmin/Ellipse 9.png"
                    alt=""
                    className="absolute inset-0 w-full h-full"
                />
                <img
                    src="/images/usersPageAdmin/ChevronDown.png"
                    alt=""
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6"
                />
            </button>

            {/* panel */}
            <div
                className="pointer-events-auto w-full overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
                style={{
                    maxHeight: isOpen ? "500px" : "0px",
                    opacity: isOpen ? 1 : 0,
                }}
            >
                <div
                    className="pointer-events-auto flex flex-wrap items-center gap-6 px-8 py-4 mb-4 mx-auto rounded-2xl"
                    style={{
                        width: "100%",
                        minHeight: "200px",
                        backgroundImage: "url('/images/usersPageAdmin/Rectangle 687.png')",
                        backgroundSize: "100% 100%",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="flex flex-wrap items-center ml-[30vw] gap-10">
                        <span className="font-semibold text-[18px] whitespace-nowrap">
                            Швидкі дії
                        </span>

                        <button
                            type="button"
                            onClick={onAddManager}
                            className="flex items-center gap-2 text-[var(--color-green)] h-[50px] w-[245px] px-4 rounded-[9px] border border-[var(--color-green)]
                            text-[20px]  font-medium hover:bg-gray-50 transition"
                        >
                            <img
                                src="/images/usersPageAdmin/close_24px.png"
                                alt=""
                                className="w-7 h-7 object-contain"
                            />
                            Додати менеджера
                        </button>

                        <button
                            type="button"
                            onClick={onToggleBlockedFilter}
                            className={`flex items-center gap-2 h-[50px] text-[var(--color-green)] w-[302px] px-4 rounded-[9px] border text-[20px] font-medium
                            transition ${isBlockedFilterActive
                                    ? "border-[var(--color-green)] bg-[var(--color-green)]/10 text-[var(--color-green)]"
                                    : "border-[var(--color-green)] hover:bg-gray-50"
                                }`}
                        >
                            <img
                                src="/images/usersPageAdmin/ban-solid-full.png"
                                alt=""
                                className="w-7 h-8 object-contain"
                            />
                            Заблоковані користувачі
                        </button>

                        <button
                            type="button"
                            onClick={onExportReport}
                            className="flex items-center gap-2 h-[50px] w-[200px] px-4 rounded-[9px]
                            bg-[var(--color-green)] text-[var(--color-white)] text-[20px] font-medium
                            hover:opacity-90 transition"
                        >
                            <img
                                src="/images/usersPageAdmin/arrow-up-from-bracket-solid-full.png"
                                alt=""
                                className="w-7 h-7 object-contain"
                            />
                            Експорт звіту
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}