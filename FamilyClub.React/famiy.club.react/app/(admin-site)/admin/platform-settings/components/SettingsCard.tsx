"use client";

type Props = {
    title: string;
    children: React.ReactNode;
    onCancel?: () => void;
    onSave?: () => void;
    onReset?: () => void;
    saving?: boolean;
    cancelLabel?: string;
    saveLabel?: string;
};

export default function SettingsCard({
    title,
    children,
    onCancel,
    onSave,
    onReset,
    saving,
    cancelLabel = "Скасувати",
    saveLabel = "Зберегти зміни",
}: Props) {
    return (
        <div className="rounded-[12px] bg-[var(--background-elevated)] px-5 py-5 shadow-[var(--shadow-card)] border border-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)] flex flex-col gap-4 h-full">
            <h2 className="text-[18px] font-bold text-[var(--foreground-primary)]">
                {title}
            </h2>
            <div className="flex-1 flex flex-col gap-4">{children}</div>
            {(onCancel || onSave || onReset) && (
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    {onReset ? (
                        <button
                            type="button"
                            onClick={onReset}
                            disabled={saving}
                            className="rounded-[9px] border border-[color-mix(in_srgb,var(--foreground-primary)_28%,transparent)] bg-[var(--background-elevated)] px-5 py-2.5 text-[14px] font-semibold text-[var(--foreground-primary)] hover:bg-[color-mix(in_srgb,var(--foreground-primary)_8%,var(--background-elevated))] disabled:opacity-60 transition"
                        >
                            Скинути
                        </button>
                    ) : onCancel ? (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={saving}
                            className="rounded-[9px] border border-[var(--color-green)] bg-transparent px-5 py-2.5 text-[14px] font-semibold text-[var(--color-green)] hover:bg-[color-mix(in_srgb,var(--color-green)_22%,var(--background-elevated))] disabled:opacity-60 transition"
                        >
                            {cancelLabel}
                        </button>
                    ) : (
                        <span />
                    )}
                    {onSave && (
                        <button
                            type="button"
                            onClick={onSave}
                            disabled={saving}
                            className="rounded-[9px] bg-[var(--color-green)] px-5 py-2.5 text-[14px] font-semibold text-[var(--color-cream)] hover:opacity-90 disabled:opacity-60 transition"
                        >
                            {saving ? "Збереження..." : saveLabel}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export function SettingsField({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <label className="flex flex-col gap-1.5">
            <span className="text-[14px] font-semibold text-[var(--foreground-primary)]">
                {label}
            </span>
            {children}
        </label>
    );
}

export const settingsInputClass =
    "w-full rounded-[9px] border border-[color-mix(in_srgb,var(--foreground-primary)_18%,transparent)] bg-[var(--background-elevated)] px-3 py-2.5 text-[14px] text-[var(--foreground-primary)] outline-none focus:border-[var(--color-green)] placeholder:text-[var(--color-muted-fg)]";
