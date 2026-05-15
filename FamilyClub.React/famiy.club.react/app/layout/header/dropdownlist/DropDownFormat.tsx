"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Configuration, ProductsApi } from "@/lib/api/generated";
import Link from "next/link";

export default function DropDownCategories() {
  const [formats, setFormats] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const api = new ProductsApi(
      new Configuration({ basePath: "https://localhost:7069" }),
    );

    api
      .apiProductsGet()
      .then((products) => {
        const unique = Array.from(
          new Set(
            products
              .map((p) => p.format)
              .filter((f): f is string => f != null && f.length > 0),
          ),
        );
        setFormats(unique);
      })
      .catch(console.error);
  }, []);

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
          <span className="text-[var(--color-white)]">Формати</span>
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute z-20 items-center top-[42px] w-full flex justify-center text-[var(--color-white)]">

            <div className="relative items-center mt-[50px] -ml-[4px] w-[110px] flex flex-col gap-2">

              {formats.length === 0 ? (
                <div className="text-[13px]">Не знайдено</div>
              ) : (
                formats.map((f) => {
                  const isSelected = selectedFormat === f;

                  return (
                    <div key={f} className="flex items-center gap-0">

                      {/* RADIO BUTTON */}
                      <div className="w-[30px] h-[30px] flex justify-center shrink-0">
                        <button
                          onClick={() => setSelectedFormat(f)}
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

                      {/* LINK */}
                      <Link
                        href={`/formats/${f}`}
                        onClick={() => {
                          setSelectedFormat(f);
                          setOpen(false);
                        }}
                        className="text-[13px] -mt-[4px]"
                      >
                        {f}
                      </Link>
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
