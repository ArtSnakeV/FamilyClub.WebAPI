"use client";

import { useRef, useState } from "react";

export default function EbookFormat() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="h-[46px] flex flex-row items-center justify-between px-4 rounded-[9px] bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040]">
      <p className="text-[14px] text-[#242424]/50">
        {file ? file.name : "Завантажити в EPUB, FB2, MOBI/AZW, PDF"}
      </p>

      <button
        type="button"
        onClick={handleClick}
        className="w-[16px] h-[20px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/addProducts/file-solid-full 1.svg')",
        }}
      />

      <input
        ref={inputRef}
        type="file"
        accept=".epub,.fb2,.mobi,.azw,.pdf"
        className="hidden"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] ?? null;
          setFile(selectedFile);
        }}
      />
    </div>
  );
}
