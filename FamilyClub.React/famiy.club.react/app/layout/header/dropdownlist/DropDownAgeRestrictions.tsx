"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AgeRestriction } from "@/src/lib/api/generated";

const ageFilters = [
  { label: "0+", value: AgeRestriction.NUMBER_0 },
  { label: "6+", value: AgeRestriction.NUMBER_1 },
  { label: "12+", value: AgeRestriction.NUMBER_2 },
  { label: "16+", value: AgeRestriction.NUMBER_3 },
  { label: "18+", value: AgeRestriction.NUMBER_4 },
];

export default function DropDownAgeRestrictions() {
  const [open, setOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState<AgeRestriction | null>(null);

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

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  function selectAge(f: (typeof ageFilters)[number]) {
    setSelectedAge(f.value);

    setTimeout(() => {
      const params = new URLSearchParams();

      params.set("ageRestriction", String(f.value));
      router.push(`/products?${params.toString()}`);

      setOpen(false);
    }, 600);
  }

  const selectedLabel =
    ageFilters.find((x) => x.value === selectedAge)?.label ?? "Вік";

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
          <span className="text-[var(--color-white)]">{selectedLabel}</span>
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute z-20 top-[42px] w-full flex flex-col items-center text-[var(--color-white)]">
            <div className="relative mt-[50px] flex flex-col gap-2">
              {ageFilters.map((f) => {
                const isSelected = selectedAge === f.value;

                return (
                  <div key={f.value} className="flex items-center gap-1">
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
                            ${isSelected ? "ml-[6px] scale-125" : "scale-90"}
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
