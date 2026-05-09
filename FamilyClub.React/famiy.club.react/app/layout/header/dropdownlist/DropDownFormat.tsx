"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Configuration, ProductsApi, type ProductDto } from "@/lib/api/generated";
import Link from "next/link";

export default function DropDownCategories() {
  const [products, setProducts] = useState<ProductDto[]>([]);

  useEffect(() => {
    const config = new Configuration({
      basePath: "https://localhost:7069",
    });
    const api = new ProductsApi(config);

    api.apiProductsGet().then(setProducts).catch(console.error);
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
        {products.length === 0 ? (
          <div>Loading...</div>
        ) : (
          products.map((product) => (
            <MenuItem key={product.id}>
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
                    href={`/products/${product.id}`}
                    className={`block px-2 py-1 ${active ? "bg-green-600" : ""}`}
                  >
                    {product.format}
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
