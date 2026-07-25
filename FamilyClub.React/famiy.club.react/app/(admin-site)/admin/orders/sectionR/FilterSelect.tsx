interface FilterSelectOption {
    value: string;
    label: string;
}

interface FilterSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: FilterSelectOption[];
}

export default function FilterSelect({
    label,
    value,
    onChange,
    options,
}: FilterSelectProps) {
    return (
        <div className="flex flex-col gap-1 w-[220px]">
            <label className="text-[16px] text-[var(--color-black)]">{label}</label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-[36px] appearance-none bg-[var(--color-white)] rounded-[9px] text-[15px] pl-3 pr-9 text-[#272727] outline-none shadow-[0_0_10px_0_#00000040] cursor-pointer"
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                >
                    <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="#272727"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    );
}