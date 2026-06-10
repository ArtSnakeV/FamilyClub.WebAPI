"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProductDto, FormatDto, Configuration, ProductsApi, FormatsApi } from "@/lib/api/generated";
import { productService, formatService } from "@/lib/api/services";

export default function DropDownFormat() {
  const [open, setOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<FormatDto["id"] | null>(
    null,
  );

  const [products, setProducts] = useState<ProductDto[]>([]);
  const [formats, setFormats] = useState<FormatDto[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const config = new Configuration({
      basePath: "https://localhost:7069",
    });

    const productsApi = new ProductsApi(config);
    const formatsApi = new FormatsApi(config);

    productsApi
      .apiProductsGet()
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => console.error("API ERROR:", err));
    formatsApi
      .apiFormatsGet()
      .then((res) => {
        setFormats(res);
      })
      .catch((err) => console.error("API ERROR:", err));
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
    <div ref={containerRef} className="relative w-[110px]">
      <div
        className={`
          relative w-[110px] h-[360px]
          transition-transform duration-300
           ${open ? "translate-y-0" : "-translate-y-[232px]"}
        `}
      >
        {/* BACKGROUND */}
        <Image
          src="/images/header/Rectangle 144.svg"
          alt="bg"
          fill
          className="object-contain pointer-events-none"
        />

        {/* BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen((v) => !v);
          }}
          className="absolute inset-0 flex justify-center items-end mb-[56px] z-10"
        >
          <span className="text-[var(--color-white)]">Формати</span>
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute z-20 items-center top-[42px] w-full flex justify-center text-[var(--color-white)]">
            <div className="relative items-left mt-[50px] ml-2 w-[110px] flex flex-col gap-2">
              {formats.map((f) => {
                const isSelected = selectedFormat === f.id;
                return (
                  <div key={f.id} className="flex items-center gap-0">
                    {/* RADIO BUTTON */}
                    <div className="w-[28px] h-[28px] flex justify-center shrink-0">
                      <button
                        onClick={() => setSelectedFormat(f.id)}
                        className="w-[20px] h-[20px] flex items-center justify-center"
                      >
                        <Image
                          src={
                            isSelected
                              ? "/images/header/check2.svg"
                              : "/images/header/icon.svg"
                          }
                          alt=""
                          width={18}
                          height={18}
                          className={`
                              object-contain
                              transition-transform duration-200
                              ${isSelected ? "ml-[6px] scale-125" : "scale-90"}
                            `}
                        />
                      </button>
                    </div>

                    {/* LINK */}
                    <Link
                      href={`/products?formatId=${f.id}`}
                      onClick={() => {
                        setSelectedFormat(f.id);
                        setOpen(false);
                      }}
                      className="text-[11px] -mt-[4px]"
                    >
                      {f.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/*
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProductDto, FormatDto } from "@/lib/api/generated";
import { productService, formatService } from "@/lib/api/services";

export default function DropDownFormat() {
  const [open, setOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<FormatDto["id"] | null>(
    null,
  );

  const [products, setProducts] = useState<ProductDto[]>([]);
  const [formats, setFormats] = useState<FormatDto[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    formatService.apiFormatsGet().then(setFormats).catch(console.error);
    productService.apiProductsGet().then(setProducts).catch(console.error);
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

  const filteredProducts = selectedFormat
    ? products.filter((p) => p.formatIds?.includes(selectedFormat))
    : products;
  return (
    <div ref={containerRef} className="relative w-[110px]">
      <div
        className={`
          relative w-[110px] h-[360px]
          transition-transform duration-300
           ${open ? "translate-y-0" : "-translate-y-[232px]"}
        `}
      >
        <Image
          src="/images/header/Rectangle 144.svg"
          alt="bg"
          fill
          className="object-contain pointer-events-none"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen((v) => !v);
          }}
          className="absolute inset-0 flex justify-center items-end mb-[56px] z-10"
        >
          <span className="text-[var(--color-white)]">Формати</span>
        </button>

        {open && (
          <div className="absolute z-20 items-center top-[42px] w-full flex justify-center text-[var(--color-white)]">
            <div className="relative items-left mt-[50px] ml-2 w-[110px] flex flex-col gap-2">
              {formats.map((f) => {
                const isSelected = selectedFormat === f.id;
                return (
                  <div key={f.id} className="flex items-center gap-0">
                    <div className="w-[28px] h-[28px] flex justify-center shrink-0">
                      <button
                        onClick={() => setSelectedFormat(f.id)}
                        className="w-[20px] h-[20px] flex items-center justify-center"
                      >
                        <Image
                          src={
                            isSelected
                              ? "/images/header/check2.svg"
                              : "/images/header/icon.svg"
                          }
                          alt=""
                          width={18}
                          height={18}
                          className={`
                              object-contain
                              transition-transform duration-200
                              ${isSelected ? "ml-[6px] scale-125" : "scale-90"}
                            `}
                        />
                      </button>
                    </div>

                    <Link
                      href={`/products?formatId=${f.id}`}
                      onClick={() => {
                        setSelectedFormat(f.id);
                        setOpen(false);
                      }}
                      className="text-[11px] -mt-[4px]"
                    >
                      {f.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

*/