"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Image from 'next/image'
import Link from "next/link"

export default function DropDownFormat() {

    return (
        <Menu as="div" className="shadow-[0px 10px 10px 0px #2424244D]">

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

            <MenuItems anchor="bottom" className="relative w-[120px] bg-[#005B33]">
                <MenuItem >
                    <Link href={``}>
                        test
                    </Link>
                </MenuItem>

            </MenuItems>
        </Menu>
    )
}