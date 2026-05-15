"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Configuration, LanguageDto, LanguagesApi } from "@/lib/api/generated";
import Link from "next/link";

export default function DropDownLanguage() {
  const [languages, setLanguages] = useState<LanguageDto[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const config = new Configuration({
      basePath: "https://localhost:7069",
    });
    const api = new LanguagesApi(config);

    api.apiLanguagesGet().then(setLanguages).catch(console.error);
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
          ${!open ? "-translate-y-[236px]" : "translate-y-0"}
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
          <span className="text-[var(--color-white)]">Мови</span>
        </button>

        {open && (
          <div className="absolute z-20 top-[42px] w-full flex flex-col items-center gap-2 text-[var(--color-white)]">
            <div className="relative top-[40px] w-[110px] h-[40px]">
              <div className="relative mt-[50px] flex flex-col items-center justify-center gap-4">
                {languages.length === 0 ? (
                  <div className="text-[13px]">Не знайдено</div>
                ) : (
                  languages.map((l) => (
                    <Link
                      key={l.id}
                      href={`/languages/${l.id}`}
                      onClick={() => setOpen(false)}
                      className={`
                      flex
                   items-center
                    justify-center
                       text-center
                        text-[13px]
                        w-[110px]
                 h-[30px]
                rounded-[15px]
                border-[2px]
                 border-transparent
                    hover:border-[#27272780]
                     transition-all
                  duration-200
                     `}
                    >
                      {l.languageName}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
