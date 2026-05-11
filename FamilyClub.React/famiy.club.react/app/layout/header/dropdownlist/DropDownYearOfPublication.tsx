"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";


const yearFilters = [
  "2000–2002",
  "2003–2005",
  "2006–2010",
  "2011–2020",
  "2020+",
];

export default function DropDownYearOfPublication() {

  return (
    <Menu as="div">
      <MenuButton className="relative w-[120px] h-[120px] inline-block">
        <Image
          src="/images/header/Rectangle144.png"
          alt="bg"
          fill
          className="object-contain"
        />

        <span className="absolute inset-0 flex items-center justify-center text-[var(--color-white)] mt-8">
          Рік видання
        </span>
      </MenuButton>

      <MenuItems
        anchor="bottom"
        className="z-10 relative w-[120px] bg-[var(--color-green)] text-[var(--color-white)] rounded -mt-2"
      >
        {yearFilters.length === 0 ? (
          <div>Loading...</div>
        ) : (
          yearFilters.map((year) => (
            <MenuItem key={year}>
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
                    href={`/products/${year}`}
                    className={`block px-2 py-1 ${active ? "bg-green-600" : ""}`}
                  >
                    {year}
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
