"use client";

import { AuthorDTO, AuthorsApi, Configuration } from "@/lib/api/generated";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DropDownAuthors() {
  const [authors, setAuthors] = useState<AuthorDTO[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const config = new Configuration({
      basePath: "https://localhost:7069",
    });
    const api = new AuthorsApi(config);

    api.apiAuthorsGet().then(setAuthors).catch(console.error);
  }, []);

  const filtered = authors.filter((a) =>
    a.authorName?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Menu as="div">
      <MenuButton className="relative w-[120px] h-[120px]">
        <Image
          src="/images/header/Rectangle144.png"
          alt="bg"
          fill
          className="object-contain"
        />

        <span className="absolute inset-0 flex items-center justify-center text-[#F5F3EE] mt-8">
          Автори
        </span>
      </MenuButton>

      <MenuItems
        anchor="bottom"
        className="z-10 relative w-[120px] bg-[var(--color-green)] text-[var(--color-white)] rounded -mt-2"
      >
        {/* Пошук */}
        <div className="relative px-2 pt-2 pb-1">
          <Image
            src="/images/header/Rectangle 58.svg"
            alt="search bg"
            width={110}
            height={40}
            className="w-full"
          />
          <div className="absolute inset-0 flex items-center px-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-transparent outline-none text-gray-800 text-xs ml-1"
              placeholder=""
            />
            <div className="absolute mr-2 w-[16px] h-[16px]">
              <Image
                src="/images/header/zoom_out_24px.svg"
                alt="search icon"
                width={14}
                height={14}
                className="shrink-0"
              />
            </div>
          </div>
        </div>

        {/* Список */}
        {filtered.length === 0 ? (
          <div className="px-2 py-1 text-sm">Не знайдено</div>
        ) : (
          filtered.map((author) => (
            <MenuItem key={author.id}>
              {({ active }) => (
                <div className="flex flex-row items-center">
                  <Image
                    src="/images/header/icon.svg"
                    alt="Icon"
                    className="w-4 h-4 ml-2"
                    width={16}
                    height={16}
                  />
                  <Link
                    href={`/authors/${author.id}`}
                    className={`block px-2 py-1 ${active ? "bg-green-600" : ""}`}
                  >
                    {author.authorName}
                  </Link>
                </div>
              )}
            </MenuItem>
          ))
        )}
      </MenuItems>
    </Menu>
  );
}
