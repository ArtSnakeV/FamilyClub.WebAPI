"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    onAddManager?: () => void;
    onExportReport?: () => void;
}

export default function QuickActionsBar({
    onAddManager,
    onExportReport,
}: Props) {
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();

    return (
        <div className="fixed bottom-0 left-10 w-full flex flex-col items-center z-30 pointer-events-none">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="pointer-events-auto relative z-40 -left-[28.6vw] w-10 h-10 mb-1 transition-transform duration-300"
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

            <div
                className={`w-full overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                    isOpen ? "pointer-events-auto" : "pointer-events-none"
                }`}
                style={{
                    maxHeight: isOpen ? "500px" : "0px",
                    opacity: isOpen ? 1 : 0,
                }}
                aria-hidden={!isOpen}
            >
                <div
                    className="relative flex flex-wrap items-center gap-6 px-8 py-4 mb-4 mx-auto rounded-2xl overflow-hidden text-[var(--foreground-primary)]"
                    style={{
                        width: "100%",
                        minHeight: "200px",
                    }}
                >
                    <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none admin-parchment-bg"
                        style={{
                            backgroundImage:
                                "url('/images/usersPageAdmin/Rectangle 687.png')",
                            backgroundSize: "100% 100%",
                            backgroundPosition: "center",
                        }}
                    />
                    <div className="relative z-10 flex flex-wrap items-center ml-[30vw] gap-10">
                        <span className="font-semibold text-[18px] whitespace-nowrap">
                            Швидкі дії
                        </span>

                        <button
                            type="button"
                            onClick={onAddManager}
                            className="flex items-center gap-2 text-[var(--color-green)] h-[50px] w-[302px] px-4 rounded-[9px] border border-[var(--color-green)]
                            text-[20px] font-medium hover:bg-[var(--color-menu-hover)] transition"
                        >
                            <img
                                src="/images/usersPageAdmin/close_24px.png"
                                alt=""
                                className="w-7 h-7 object-contain"
                            />
                            Додати користувача
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push("/admin/users/blockedUsers")}
                            className="flex items-center gap-2 h-[50px] text-[var(--color-green)] w-[302px] px-4 rounded-[9px] border border-[var(--color-green)] text-[20px] font-medium hover:bg-[var(--color-menu-hover)] transition"
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
                            bg-[var(--color-green)] text-[var(--color-cream)] text-[20px] font-medium
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
