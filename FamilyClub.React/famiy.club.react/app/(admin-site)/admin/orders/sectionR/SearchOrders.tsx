interface AdminHeaderControlsProps {
    searchPlaceholder: string;
    searchValue: string;
    onSearchChange: (value: string) => void;
}

export default function SearchOrders({
    searchPlaceholder,
    searchValue,
    onSearchChange,
}: AdminHeaderControlsProps) {
    return (
        <div>
            <div className="relative w-[220px] flex flex-col gap-1">
                <label className="text-[16px] text-[var(--foreground-primary)]">
                    Пошук
                </label>
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    placeholder={searchPlaceholder}
                    className="w-full pl-4 pr-10 h-[36px] bg-[var(--background-elevated)] rounded-[9px] text-[15px] px-2 text-[var(--foreground-primary)] outline-none shadow-[var(--shadow-card)] border border-[color-mix(in_srgb,var(--foreground-primary)_18%,transparent)] placeholder:text-[var(--color-muted-fg)]"
                />
            </div>
        </div>
    );
}
