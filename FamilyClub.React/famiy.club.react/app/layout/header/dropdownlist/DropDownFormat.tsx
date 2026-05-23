"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Configuration,
  ProductsApi,
} from "@/lib/api/generated";

export default function DropDownCategories() {
  const [formats, setFormats] = useState<string[]>([]);
  
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
          Формат
        </span>
      </MenuButton>

      <MenuItems
        anchor="bottom"
        className="z-10 relative w-[120px] bg-[var(--color-green)] text-[var(--color-white)] rounded -mt-2"
      >
        {formats.length === 0 ? (
          <div className="px-2 py-1">Loading...</div>
        ) : (
          formats.map((format) => (
            <MenuItem key={format}>
              {({ active }) => (
                <div className="flex flex-row items-center">
                  <Image
                    src="/images/header/icon.svg"
                    alt="Icon"
                    className="w-4 h-4 ml-2"
                    width={16}
                    height={16}
                  />
                  <button
                    className={`block px-2 py-1 ${active ? "bg-green-600" : ""}`}
                  >
                    {format}
                  </button>
                </div>
              )}
            </MenuItem>
          ))
        )}
      </MenuItems>
    </Menu>
  );
}
