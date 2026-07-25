import type { ReactNode } from "react";

export function InfoRowInline({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <div className="flex gap-1.5 items-baseline min-w-0">
            <span className="text-[var(--color-black)] text-[14px] font-medium shrink-0">
                {label}:
            </span>
            <span className="text-[var(--color-black)] text-[13px] min-w-0 break-words">
                {children}
            </span>
        </div>
    );
}

export function InfoRowStacked({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[var(--color-black)] text-[14px] font-medium">
                {label}:
            </span>
            <span className="text-[var(--color-black)] text-[13px] min-w-0 break-words">
                {children}
            </span>
        </div>
    );
}