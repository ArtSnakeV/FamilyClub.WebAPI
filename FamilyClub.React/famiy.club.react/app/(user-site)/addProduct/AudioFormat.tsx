"use client";

export default function AudioFormat() {
  return (
    <div className="h-[46px] flex flex-row items-center justify-between px-4 rounded-[9px] bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040]"> 
      <p className="text-[14px] text-[#242424]/50 ">
        Завантажити в MP3, M4B, AAX
      </p>
      <button
        type="button"
        className="w-[16px] h-[20px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/addProducts/file-solid-full 1.svg')",
        }}
      />

      <input type="file" accept=".mp3,.m4b,.aax" className="hidden" />
    </div>
  );
}
