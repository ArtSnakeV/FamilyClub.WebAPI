"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const yearFilters = [
  { label: "до 2000", from: 0, to: 1999 },
  { label: "2000–2010", from: 2000, to: 2010 },
  { label: "2010–2020", from: 2010, to: 2020 },
  { label: "2020+", from: 2020, to: 3000 },
];

export default function DropDownYearOfPublication() {
  const [open, setOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  function selectYear(f: (typeof yearFilters)[number]) {
    setSelectedYear(f.label);

    setTimeout(() => {
      const params = new URLSearchParams();

      params.set("yearFrom", String(f.from));
      params.set("yearTo", String(f.to));

      router.push(`/products?${params.toString()}`);

      setOpen(false);
    }, 450);
  }

  const displayedYears =
    search.trim() === ""
      ? yearFilters
      : yearFilters.filter((y) => {
          const searchYear = Number(search);

          if (isNaN(searchYear)) {
            return y.label.toLowerCase().includes(search.toLowerCase());
          }

          return searchYear >= y.from && searchYear <= y.to;
        });
  return (
    <div ref={containerRef} className="relative w-[130px]">
      <div
        className={`
          relative w-[130px] h-[360px]
          transition-transform duration-300
          ${open ? "translate-y-0" : "-translate-y-[236px]"}
        `}
      >
        {/* BACKGROUND */}
        <Image
          src="/images/header/Rectangle 144.svg"
          alt="bg"
          fill
          className="object-contain pointer-events-none"
        />

        {/* BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen((v) => !v);
          }}
          className="absolute inset-0 flex justify-center items-end mb-[34px] z-10"
        >
          <span className="text-white">Рік видання</span>
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute ml-2 z-20 top-[42px] w-full flex flex-col items-start text-[var(--color-white)]">
            {/* SEARCH */}
            <div className="relative mt-[40px] ml-0.5 w-[110px] h-[40px]">
              <Image
                src="/images/header/Rectangle 58.svg"
                alt="search bg"
                fill
                className="object-cover"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder="Пошук..."
                className="
                  absolute inset-0
                  w-full h-full
                  bg-transparent
                  outline-none
                  text-[#272727]
                  text-xs
                  px-4 pr-7
                "
              />

              <div className="absolute right-2 top-1/2 -translate-y-1/2 px-2">
                <Image
                  src="/images/header/zoom_out_24px.svg"
                  alt="search"
                  width={14}
                  height={14}
                />
              </div>
            </div>

            {/* YEARS */}
            <div className="relative mt-[16px] ml-[6px] w-[160px] flex flex-col gap-2">
              {displayedYears.length === 0 ? (
                <div className="text-[13px] ml-4">Не знайдено</div>
              ) : (
                displayedYears.map((y) => {
                  const isSelected = selectedYear === y.label;

                  return (
                    <div key={y.label} className="flex items-center gap-1">
                      {/* RADIO */}
                      <div className="w-[30px] h-[30px] flex justify-center shrink-0">
                        <button
                          onClick={() => selectYear(y)}
                          className="w-[22px] h-[22px] flex items-center justify-center"
                        >
                          <Image
                            src={
                              isSelected
                                ? "/images/header/check2.svg"
                                : "/images/header/icon.svg"
                            }
                            alt=""
                            width={20}
                            height={20}
                            className={`
                              object-contain
                              transition-transform duration-200
                              ${isSelected ? "ml-[6px] scale-125" : "scale-90"}
                            `}
                          />
                        </button>
                      </div>

                      {/* TEXT */}
                      <button
                        onClick={() => selectYear(y)}
                        className="text-[13px] text-left"
                      >
                        {y.label}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
