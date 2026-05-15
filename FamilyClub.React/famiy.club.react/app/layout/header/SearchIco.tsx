"use client";

import {
  Configuration,
  ProductDto,
  ProductsApi,
} from "@/lib/api/generated";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function SearchIco() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const config = new Configuration({
      basePath: "https://localhost:7069",
    });

    const api = new ProductsApi(config);

    api.apiProductsGet().then(setProducts).catch(console.error);
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

    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, []);

  const filteredProducts =
    search.trim() === ""
      ? []
      : products.filter((p) =>
          p.productName
            ?.toLowerCase()
            .includes(search.toLowerCase()),
        );

  return (
    <div
      ref={containerRef}
      className="relative flex items-center"
    >
      {/* INPUT */}
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpen(true);
        }}
        onClick={(e) => e.stopPropagation()}
        placeholder=""
        className="
          w-[268px]
          px-4
          h-[36px]
          bg-[var-(--color-white)]
          rounded-full
          text-[15px]
          text-[#272727]
          outline-none
        "
      />

      {/* ICON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="
          relative
          right-[1vw]
          w-[30px]
          h-[30px]
          flex
          items-center
          justify-center
        "
      >
        <Image
          src="/images/header/zoom_out_24px.png"
          alt="search"
          width={28}
          height={28}
          className="object-contain"
          priority
        />
      </button>

      {/* RESULTS */}
      {open && filteredProducts.length > 0 && (
        <div
          className="
            absolute
            top-[45px]
            left-0
            w-[220px]
            max-h-[260px]
            overflow-y-auto
            rounded-[20px]
            bg-[#F5F3EE]
            shadow-[0px_0px_15px_0px_#24242433]
            p-2
            z-50
          "
        >
          {filteredProducts.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              onClick={() => {
                setOpen(false);
                setSearch("");
              }}
              className="
                flex
                items-center
                px-3
                py-2
                rounded-[14px]
                text-[13px]
                text-[#272727]
                hover:bg-white
                transition-all
              "
            >
              {p.productName}
            </Link>
          ))}
        </div>
      )}

      {/* EMPTY */}
      {open &&
        search.trim() !== "" &&
        filteredProducts.length === 0 && (
          <div
            className="
              absolute
              top-[45px]
              left-0
              w-[220px]
              rounded-[20px]
              bg-[var-(--color-white)]
              shadow-[0px_0px_15px_0px_#24242433]
              p-4
              text-[13px]
              text-[#272727]
              z-50
            "
          >
            Не знайдено
          </div>
        )}
    </div>
  );
}