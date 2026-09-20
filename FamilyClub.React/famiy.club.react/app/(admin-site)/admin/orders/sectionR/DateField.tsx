"use client";

import { formatDate } from "../utilsR/OrderDisplay";

interface DateFieldProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

export default function DateField({
    placeholder,
    value,
    onChange,
}: DateFieldProps) {
    return (
        <div className="relative flex-1 min-w-0 h-[36px]">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between rounded-[9px] bg-[var(--background-elevated)] px-3 shadow-[var(--shadow-card)] border border-[color-mix(in_srgb,var(--foreground-primary)_18%,transparent)] text-[var(--foreground-primary)]">
                <span
                    className={`text-[13px] truncate ${
                        value
                            ? "text-[var(--foreground-primary)]"
                            : "text-[var(--color-muted-fg)]"
                    }`}
                >
                    {value ? formatDate(value) : placeholder}
                </span>
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="shrink-0"
                >
                    <rect
                        x="1.5"
                        y="2.5"
                        width="11"
                        height="10"
                        rx="1.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />
                    <path d="M1.5 5.5H12.5" stroke="currentColor" strokeWidth="1.2" />
                    <path
                        d="M4 1V3.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M10 1V3.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            <input
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
        </div>
    );
}
