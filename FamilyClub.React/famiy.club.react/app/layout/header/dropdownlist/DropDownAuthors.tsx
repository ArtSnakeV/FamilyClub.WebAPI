"use client";

import { AuthorDTO, AuthorsApi, Configuration } from "@/lib/api/generated";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function DropDownAuthors() {
  const [authors, setAuthors] = useState<AuthorDTO[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const config = new Configuration({
      basePath: "https://localhost:7069",
    });
    const api = new AuthorsApi(config);

    api.apiAuthorsGet().then(setAuthors).catch(console.error);
  }, []);

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

  const displayedAuthors =
    search.trim() === ""
      ? authors.slice(0, 4)
      : authors.filter((a) =>
          a.authorName?.toLowerCase().includes(search.toLowerCase()),
        );

  function formatAuthorName(fullName?: string) {
    if (!fullName) return "";

    const parts = fullName.trim().split(" ").filter(Boolean);

    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ");

    if (!firstName) return "";

    const initial = firstName[0]?.toUpperCase() + ".";

    return lastName ? `${initial} ${lastName}` : initial;
  }
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
            setSearch("");
          }}
          className="absolute inset-0 flex justify-center items-end mb-[34px] z-10 focus:outline-none"
        >
          <span className="text-[#F5F3EE]">Автори</span>
        </button>

        {open && (
          <div className="absolute z-20 top-[42px] w-full flex flex-col items-center gap-2 text-[var(--color-white)]">
            <div className="relative top-[40px] w-[110px] h-[40px]">
              <Image
                src="/images/header/Rectangle 58.svg"
                alt="search bg"
                fill
                className="object-cover"
              />

              <div className="relative p-3 inset-0 flex items-center px-5">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder=""
                  className="
                      w-full
                      bg-transparent
                      outline-none
                      text-[#272727]
                      text-xs
                      pr-5
                    "
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  <Image
                    src="/images/header/zoom_out_24px.svg"
                    alt="search"
                    width={14}
                    height={14}
                  />
                </div>
              </div>
            </div>

            <div className="relative mt-[50px] flex flex-col items-center justify-center gap-4">
              {displayedAuthors.length === 0 ? (
                <div className="text-[13px]">Не знайдено</div>
              ) : (
                displayedAuthors.map((a) => (
                  <Link
                    key={a.id}
                    href={`/authors/${a.id}`}
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
                    {formatAuthorName(a.authorName ?? undefined)}
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
