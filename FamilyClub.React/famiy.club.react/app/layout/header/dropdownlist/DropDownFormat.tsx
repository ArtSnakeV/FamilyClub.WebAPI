"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ProductsApi,
  Configuration,
  type ProductDto,
} from "@/lib/api/generated";

type Props = {
  value: string | null;
  onChange: (value: string) => void;
};

export default function DropDownFormat({ value, onChange }: Props) {
  const [formats, setFormats] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const api = new ProductsApi(
      new Configuration({ basePath: "https://localhost:7069" }),
    );

    api.apiProductsGet().then((products: ProductDto[]) => {
      const unique = Array.from(
        new Set(products.map((p) => p.format).filter(Boolean)),
      ) as string[];

      setFormats(unique);
    });
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const itemHeight = 34;
  const labelHeight = 46;

  return (
    <div ref={ref} className="relative w-[120px]">
      <div
        className="relative w-[120px] transition-all duration-300"
        style={{
          height: open ? 120 + formats.length * itemHeight : 120,
        }}
      >
        <Image
          src="/images/header/Rectangle144.png"
          alt="bg"
          fill
          className="object-fill"
        />

        {open && (
          <div
            className="absolute left-0 w-full z-40"
            style={{ bottom: labelHeight }}
          >
            {formats.map((format) => (
              <div
                key={format}
                className="flex items-center gap-2 px-3 py-1 text-white hover:bg-white/10 cursor-pointer"
                style={{ height: `${itemHeight}px` }}
                onClick={() => {
                  onChange(format);
                  setOpen(false);
                }}
              >
                <span className="w-3 h-3 rounded-full border border-white flex items-center justify-center">
                  {value === format && (
                    <span className="w-2 h-2 bg-white rounded-full" />
                  )}
                </span>
                <span className="text-[var(--color-white)]">{format}</span>
              </div>
            ))}
          </div>
        )}

        <div
          className="absolute bottom-5 left-0 w-full z-30 flex items-center justify-center cursor-pointer"
          style={{ height: `${labelHeight}px` }}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="text-[#F5F3EE] font-['Source_Sans_Pro'] font-normal text-[18px] leading-[100%]">
            {value || "Формат"}
          </span>
        </div>
      </div>
    </div>
  );
}