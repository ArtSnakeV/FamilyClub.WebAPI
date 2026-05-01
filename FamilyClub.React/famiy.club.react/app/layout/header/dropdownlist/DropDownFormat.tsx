"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

export default function DropDownFormat() {
  return (
    <Menu as="div">
      <MenuButton className="relative w-[120px] h-[120px]">
        <Image
          src="/images/Rectangle144.png"
          alt="bg"
          fill
          className="object-contain"
        />

        <span className="absolute inset-0 flex items-center justify-center text-[#F5F3EE] mt-8">
          Формат
        </span>
      </MenuButton>

      <MenuItems
        anchor="bottom"
        className="z-10 relative w-[120px] bg-[var(--color-green)] text-[var(--color-white)] rounded -mt-2"
      >
        <MenuItem>
          <div className="flex flex-row items-center">
            <Image
              src="/images/header/icon.svg"
              alt="Icon"
              className="w-4 h-4 ml-2"
              width={16}
              height={16}
            />
            <Link href={``}>test</Link>
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
