"use client";

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
  
  addButtonText: string;
  addButtonHref: string;

  /** Optional temporary/admin action next to Add button */
  secondaryButtonText?: string;
  onSecondaryButtonClick?: () => void;
  secondaryButtonDisabled?: boolean;
  
  sortValue: string;
  onSortChange: (value: string) => void;
  sortOptions: SortOption[];
}

export default function EntitiesSearchSorting({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  addButtonText,
  addButtonHref,
  secondaryButtonText,
  onSecondaryButtonClick,
  secondaryButtonDisabled,
  sortValue,
  onSortChange,
  sortOptions,
}: AdminHeaderControlsProps) {
  const router = useRouter();

  return (
    <div className="relative flex flex-row items-center gap-4 pt-[10px] px-[32px] w-full">
      {/* 1. Search Bar */}
      <div className="relative w-[400px]">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          placeholder={searchPlaceholder}
          className="w-full pl-4 pr-10 h-[36px] bg-[var(--color-white)] rounded-[9px] text-[15px] px-2 text-[#272727] outline-none border-[1px]"
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 w-[22px] h-[22px] flex items-center justify-center pointer-events-none">
          <Image
            src="/images/header/zoom_out_24px.png"
            alt="search"
            width={22}
            height={22}
            className="object-contain"
            priority
          />
        </span>
      </div>

      {/* 2. Dynamic Add Button */}
      <button
        type="button"
        className="transition-all duration-200 hover:opacity-90 hover:shadow-[0px_0px_20px_0px_#00000080] active:scale-[0.98] px-4 cursor-pointer h-[36px] rounded-[9px] bg-[var(--color-green)] text-[var(--color-white)] flex items-center gap-2 text-[14px] flex-shrink-0"
        onClick={() => router.push(addButtonHref)}
      >
        <img
          src="/images/authorPageAdmin/pen-to-square-solid-full 1.svg"
          alt="add"
          width={18}
          height={18}
          className="object-contain"
        />
        {addButtonText}
      </button>

      {secondaryButtonText && onSecondaryButtonClick ? (
        <button
          type="button"
          disabled={secondaryButtonDisabled}
          className="transition-all duration-200 hover:bg-[#B88968] active:scale-[0.98] px-4 cursor-pointer h-[36px] rounded-[9px] bg-[#C9A07A] text-[#3D3229] font-medium flex items-center gap-2 text-[14px] flex-shrink-0 disabled:opacity-60 disabled:cursor-wait border border-[#B89574]"
          onClick={onSecondaryButtonClick}
          title="Тимчасова кнопка: додає відсутні книги з каталогу без очищення БД"
        >
          {secondaryButtonText}
        </button>
      ) : null}

      {/* 3. Dynamic Sorting Dropdown */}
      <div className="flex flex-row items-center gap-2 ml-auto">
        <p className="text-[14px] text-[var(--color-black)] whitespace-nowrap">
          Сортування:
        </p>
        <select
          value={sortValue}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-[30px] bg-[var(--color-white)] rounded-[9px] text-[14px] px-2 text-[var(--color-black)] outline-none border-[1px]"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}