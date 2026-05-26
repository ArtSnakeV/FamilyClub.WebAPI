"use client";

export default function EbookFormat() {
  return (
    <div className="h-[46px] flex flex-row items-center justify-between px-4 rounded-[9px] bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040]">
      <p className="text-[14px] text-[#242424]/50">
        Завантажити в EPUB, FB2, MOBI/AZW, PDF
      </p>

      <button
        type="button"
        className="w-[16px] h-[20px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/addProducts/file-solid-full 1.svg')",
        }}
      />

      <input
        type="file"
        accept=".epub,.fb2,.mobi,.azw,.pdf"
        className="hidden"
      />
    </div>
  );
}