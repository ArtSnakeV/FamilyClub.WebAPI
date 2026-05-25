"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CategoriesApi } from "@/lib/api/generated/apis/CategoriesApi";
import { Configuration, type CategoryDto } from "@/lib/api/generated";
import Link from "next/link";

export default function DropDownCategories() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const config = new Configuration({
      basePath: "https://localhost:7069",
    });
    const api = new CategoriesApi(config);

    api.apiCategoriesGet().then(setCategories).catch(console.error);
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
    <div ref={containerRef} className="relative w-[130px] z-10">
      <div
        className={`
        relative w-[130px] h-[360px]
        transition-transform duration-300
        ${open ? "translate-y-0" : "-translate-y-[236px]"}
      `}
      >
        <Image
          src="/images/header/Rectangle 144.svg"
          alt="bg"
          fill
          className="object-contain"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen((v) => !v);
          }}
          className="absolute inset-0 flex justify-center items-end mb-[34px] z-10 focus:outline-none"
        >
          <span className="text-[var(--color-white)]">Жанри</span>
        </button>

        {open && (
          <div className="absolute pointer-events-auto z-20 top-[42px] w-full flex flex-col items-center text-[var(--color-white)]">
            {/* RIGHT PANEL */}
            <div
              className="
        relative mt-[72px] ml-[146px]
        w-[256px]
        h-[180px]
        rounded-[12px]
        bg-[var(--color-green)]
        p-3 z-50
        pointer-events-auto
      "
            >
              {/* GRID 2 COLUMNS */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full">
                {/* ALL ITEM */}
                <div className="flex items-center gap-2">
                  <div className="w-[30px] h-[30px] flex justify-center shrink-0">
                    <button
                      onClick={() => setSelectedCategoryId(null)}
                      className="w-[22px] h-[22px] flex items-center justify-center"
                    >
                      <Image
                        src={
                          selectedCategoryId === null
                            ? "/images/header/check2.svg"
                            : "/images/header/icon.svg"
                        }
                        alt=""
                        width={20}
                        height={20}
                        className={`
                  object-contain
                  transition-transform duration-200
                  ${selectedCategoryId === null ? "ml-[6px] scale-125" : "scale-90"}
                `}
                      />
                    </button>
                  </div>

                  <Link
                    href="/categories"
                    onClick={() => {
                      setSelectedCategoryId(null);
                      setOpen(false);
                    }}
                    className="text-[13px]"
                  >
                    Всі жанри
                  </Link>
                </div>

                {/* CATEGORIES */}
                {categories.map((c) => {
                  const isSelected = selectedCategoryId === c.id;

                  return (
                    <div key={c.id} className="flex items-center gap-2">
                      <div className="w-[30px] h-[30px] flex justify-center shrink-0">
                        <button
                          onClick={() => setSelectedCategoryId(c.id!)}
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

                      <Link
                        href={`/categories/${c.id}`}
                        onClick={() => {
                          setSelectedCategoryId(c.id!);
                          setOpen(false);
                        }}
                        className="text-[13px]"
                      >
                        {c.categoryName}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // return (
  //   <div ref={containerRef} className="relative w-[130px]">
  //     {/* MAIN WRAPPER */}
  //     <div
  //       className={`
  //         relative w-[130px] h-[360px]
  //         transition-transform duration-300
  //         ${open ? "translate-y-0" : "-translate-y-[236px]"}
  //       `}
  //     >
  //       {/* BACKGROUND */}
  //       <Image
  //         src="/images/header/Rectangle 144.svg"
  //         alt="bg"
  //         fill
  //         className="object-contain pointer-events-none"
  //       />

  //       {/* BUTTON */}
  //       <button
  //         onClick={(e) => {
  //           e.stopPropagation();
  //           setOpen((v) => !v);
  //         }}
  //         className="absolute inset-0 flex justify-center items-end mb-[34px] z-10 focus:outline-none"
  //       >
  //         <span className="text-[#F5F3EE]">Жанри</span>
  //       </button>

  //       {/* DROPDOWN */}
  //       {open && (
  //         <div className="absolute z-20 top-[0px] w-full flex flex-col items-center text-[var(--color-white)]">
  //           <div className="relative mt-[90px] flex flex-col items-center gap-1 justify-center">

  //             {[allItem, ...categories].map((c) => {
  //               const isAll = c.id === 0;

  //               const isSelected =
  //                 (isAll && selectedCategoryId === null) ||
  //                 (!isAll && selectedCategoryId === c.id);

  //               return (
  //                 <div
  //                   key={c.id}
  //                   className="flex items-center gap-2 w-[110px]"
  //                 >
  //                   {/* RADIO */}
  //                   <div className="w-[30px] h-[30px] flex justify-center shrink-0">
  //                     <button
  //                       onClick={() => {
  //                         setSelectedCategoryId(isAll ? null : c.id!);
  //                       }}
  //                       className="w-[22px] h-[22px] flex items-center justify-center"
  //                     >
  //                       <Image
  //                         src={
  //                           isSelected
  //                             ? "/images/header/check2.svg"
  //                             : "/images/header/icon.svg"
  //                         }
  //                         alt=""
  //                         width={20}
  //                         height={20}
  //                         className={`
  //                           object-contain
  //                           transition-transform duration-200
  //                           ${isSelected ? "ml-[6px] scale-125" : "scale-90"}
  //                         `}
  //                       />
  //                     </button>
  //                   </div>

  //                   {/* TEXT */}
  //                   <Link
  //                     href={
  //                       isAll ? "/categories" : `/categories/${c.id}`
  //                     }
  //                     onClick={() => {
  //                       setSelectedCategoryId(isAll ? null : c.id!);
  //                       setOpen(false);
  //                     }}
  //                     className="text-[13px]"
  //                   >
  //                     {c.categoryName}
  //                   </Link>
  //                 </div>
  //               );
  //             })}
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
}
