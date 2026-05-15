"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ageFilters = [
  { label: "0+", from: 0, to: 5 },
  { label: "6+", from: 6, to: 11 },
  { label: "12+", from: 12, to: 15 },
  { label: "16+", from: 16, to: 17 },
  { label: "18+", from: 18, to: 100 },
];

export default function DropDownAgeRestrictions() {
  const [open, setOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, []);

  function selectAge(f: (typeof ageFilters)[number]) {
    setSelectedAge(f.label);

    setTimeout(() => {
      const params = new URLSearchParams();

      params.set("ageFrom", String(f.from));
      params.set("ageTo", String(f.to));

      router.push(`/products?${params.toString()}`);

      setOpen(false);
    }, 300);
  }

  return (
    <div ref={containerRef} className="relative w-[130px]">
      <div
        className={`
          relative w-[130px] h-[360px]
          transition-transform duration-300
          ${open ? "translate-y-0" : "-translate-y-[236px]"}
        `}
      >
        {/* BG */}
        <Image
          src="/images/header/Rectangle 144.svg"
          alt="bg"
          fill
          className="object-fill pointer-events-none"
        />

        {/* BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen((v) => !v);
          }}
          className="absolute inset-0  flex justify-center items-end mb-[34px] z-10"
        >
          <span className="text-[var(--color-white)]">
            Вік
          </span>
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute z-20 top-[42px] w-full flex flex-col items-center text-[var(--color-white)]">

            <div className="relative mt-[50px] flex flex-col gap-2">

              {ageFilters.map((f) => {
                const isSelected = selectedAge === f.label;

                return (
                  <div
                    key={f.label}
                    className="flex items-center gap-1"
                  >
                    {/* RADIO */}
                    <div className="w-[30px] h-[30px] flex justify-center shrink-0">
                      <button
                        onClick={() => selectAge(f)}
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
                            ${
                              isSelected
                                ? "ml-[6px] scale-125"
                                : "scale-90"
                            }
                          `}
                        />
                      </button>
                    </div>

                    {/* TEXT */}
                    <button
                      onClick={() => selectAge(f)}
                      className="text-[13px] text-left"
                    >
                      {f.label}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}