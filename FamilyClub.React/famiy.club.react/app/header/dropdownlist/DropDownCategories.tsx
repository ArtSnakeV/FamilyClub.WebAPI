"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CategoriesApi } from "@/lib/api/generated/apis/CategoriesApi"
import { Configuration, type CategoryDto } from '@/lib/api/generated'
import Link from "next/link"

export default function DropDownCategories() {
  const [categories, setCategories] = useState<CategoryDto[]>([])

  useEffect(() => {
    const config = new Configuration({
      basePath: "https://localhost:7069"
    })
    const api = new CategoriesApi(config)

    api.apiCategoriesGet()
      .then(setCategories)
      .catch(console.error)
  }, [])

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
          Жанри
        </span>
      </MenuButton>

      <MenuItems anchor="bottom" className="relative w-[120px] bg-[#005B33]">

        {categories.length === 0 ? (
          <div>Loading...</div>
        ) : (
          categories.map((category) => (
            <MenuItem key={category.id}>
              {({ active }) => (
                <Link
                  href={`/categories/${category.id}`}
                  className={`block px-2 py-1 ${active ? "bg-green-600" : ""}`}
                >
                  {category.categoryName}
                </Link>
              )}
            </MenuItem>
          ))
        )}

      </MenuItems>
    </Menu>
  )
}