"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DropDownCatalog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-[160px] z-10">
      <div
        className={`
    relative w-[160px] h-[360px]
    -top-[200px] -ml-[10px]
    transition-transform duration-300 ease-out
    ${open ? "translate-y-[6px]" : "translate-y-0"}
  `}
      >
        {/* BG */}
        <Image
          src="/images/header/Rectangle 144.svg"
          alt="bg"
          fill
          className="object-contain pointer-events-none"
        />

        {/* BUTTON */}
        <button
          onClick={() => {
            setOpen(true);

            setTimeout(() => {
              router.push("/products");
            }, 200);
          }}
          className="
            absolute inset-0
            flex justify-center items-end
            mb-[34px]
            z-10
            focus:outline-none
          "
        >
          <span className="text-[var(--color-white)]">Каталог</span>
        </button>
      </div>
    </div>
  );
}
