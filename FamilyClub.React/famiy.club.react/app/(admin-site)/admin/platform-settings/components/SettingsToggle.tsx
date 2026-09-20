"use client";

type Props = {
    checked: boolean;
    onChange: (next: boolean) => void;
    label?: string;
};

export default function SettingsToggle({ checked, onChange, label }: Props) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={() => onChange(!checked)}
            className={`relative h-7 w-12 rounded-full transition-colors flex-shrink-0 ${
                checked
                    ? "bg-[var(--color-green)]"
                    : "bg-[color-mix(in_srgb,var(--foreground-primary)_22%,var(--background-elevated))]"
            }`}
        >
            <span
                className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-[var(--color-cream)] shadow-[var(--shadow-card)] transition-transform ${
                    checked ? "translate-x-5" : "translate-x-0"
                }`}
            />
        </button>
    );
}
