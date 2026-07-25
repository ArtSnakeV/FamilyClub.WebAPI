import Image from "next/image";
import { useRouter } from "next/navigation";

interface SortOption {
    value: string;
    label: string;
}

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
                <label className="text-[16px] text-[var(--color-black)]">Пошук</label>
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    placeholder={searchPlaceholder}
                    className="w-full pl-4 pr-10 h-[36px] bg-[var(--color-white)] rounded-[9px] text-[15px] px-2 text-[#272727] outline-none shadow-[0_0_10px_0_#00000040]"
                />
            </div>
        </div>
    )
}