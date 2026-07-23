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
        <div className="rounded-[12px] bg-white px-5 py-5 shadow-[0_0_15px_rgba(0,0,0,0.12)] flex flex-col gap-4 h-full">
            <h2 className="text-[18px] font-bold text-[#1F1F1F]">{title}</h2>
            <div className="flex-1 flex flex-col gap-4">{children}</div>
            {(onCancel || onSave || onReset) && (
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    {onReset ? (
                        <button
                            type="button"
                            onClick={onReset}
                            disabled={saving}
                            className="rounded-[9px] border border-[#2F2F2F]/40 bg-white px-5 py-2.5 text-[14px] font-semibold text-[#2F2F2F] hover:bg-[#F7F4EE] disabled:opacity-60"
                        >
                            Скинути
                        </button>
                    ) : onCancel ? (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={saving}
                            className="rounded-[9px] border border-[var(--color-green)] bg-transparent px-5 py-2.5 text-[14px] font-semibold text-[var(--color-green)] hover:bg-[#E3FEE5] disabled:opacity-60"
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
                            className="rounded-[9px] bg-[var(--color-green)] px-5 py-2.5 text-[14px] font-semibold text-white hover:opacity-90 disabled:opacity-60"
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
            <span className="text-[14px] font-semibold text-[#1F1F1F]">
                {label}
            </span>
            {children}
        </label>
    );
}

export const settingsInputClass =
    "w-full rounded-[9px] border border-[#E0DCD3] bg-[#FAFAF7] px-3 py-2.5 text-[14px] text-[#2F2F2F] outline-none focus:border-[#005b33] placeholder:text-[#999]";
