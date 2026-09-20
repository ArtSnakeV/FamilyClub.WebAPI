"use client";

import Image from "next/image";
import { useTheme } from "@/lib/theme/ThemeProvider";
import { RoleDisplayInfo } from "../data/rolesData";

interface RoleDetailsPanelProps {
    role: RoleDisplayInfo;
    count: number;
    capabilities: string[];
    onSave: () => void;
    canEdit?: boolean;
    embedded?: boolean;
}

export default function RoleDetailsPanel({
    role,
    count,
    capabilities,
    onSave,
    canEdit = true,
    embedded = false,
}: RoleDetailsPanelProps) {
    const { theme } = useTheme();
    const isNight = theme === "ink-night";

    const content = (
        <>
            <div className="flex items-center gap-3">
                <Image
                    src={role.icon}
                    alt={role.title}
                    width={64}
                    height={64}
                    style={isNight ? { filter: "brightness(0) invert(0.88)" } : undefined}
                />
                <div>
                    <h3 className="font-semibold text-[20px] text-[var(--foreground-primary)]">
                        {role.title}
                    </h3>
                    <p className="text-[30px] font-semibold leading-none text-[var(--foreground-primary)]">
                        {count.toLocaleString("uk-UA")}
                    </p>
                </div>
            </div>

            <div>
                <p className="mb-1.5 font-semibold text-[15px] text-[var(--foreground-primary)]">
                    Опис
                </p>
                <p className="text-[13px] leading-relaxed text-[var(--color-muted-fg)]">
                    {role.description}
                </p>
            </div>

            <div className="flex-1 min-h-0">
                <p className="mb-2 font-semibold text-[15px] text-[var(--foreground-primary)]">
                    Основні можливості
                </p>
                {capabilities.length > 0 ? (
                    <ul className="space-y-1.5">
                        {capabilities.map((item) => (
                            <li
                                key={item}
                                className="flex items-start gap-2 text-[13px] text-[var(--foreground-primary)]"
                            >
                                <span
                                    className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-green)]"
                                >
                                    <svg
                                        width="10"
                                        height="10"
                                        viewBox="0 0 10 10"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M1.5 5.2L3.8 7.5L8.5 2.5"
                                            stroke="var(--color-cream)"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-[13px] text-[var(--color-muted-fg)]">
                        Для цієї ролі поки не обрано жодної функції доступу.
                    </p>
                )}
            </div>

            {canEdit ? (
                <button
                    type="button"
                    onClick={onSave}
                    className="mt-auto w-full rounded-xl bg-[var(--color-green)] px-4 py-3 text-[15px] font-semibold text-[var(--color-cream)] transition hover:opacity-90"
                >
                    Зберегти зміни доступів
                </button>
            ) : (
                <p className="mt-auto text-[12px] text-[var(--color-muted-fg)] text-center">
                    Змінювати матрицю може лише роль Admin.
                </p>
            )}
        </>
    );

    if (embedded) {
        return (
            <div className="w-full h-full min-h-[560px] px-5 py-5 flex flex-col gap-4">
                {content}
            </div>
        );
    }

    return (
        <div className="relative w-[300px] min-w-[300px] min-h-[560px] rounded-2xl overflow-hidden">
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none admin-parchment-bg"
                style={{
                    backgroundImage: "url('/images/usersPageAdmin/Rectangle 795.png')",
                    backgroundSize: "100% 100%",
                }}
            />
            <div className="relative z-10 px-5 py-5 flex flex-col gap-4 min-h-[560px]">
                {content}
            </div>
        </div>
    );
}
