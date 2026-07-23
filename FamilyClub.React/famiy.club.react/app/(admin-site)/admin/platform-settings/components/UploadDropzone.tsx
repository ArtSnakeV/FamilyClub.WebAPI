"use client";

import { useRef } from "react";

type Props = {
    hint: string;
    buttonLabel: string;
    previewSrc: string | null;
    accept: string;
    onFile: (file: File) => void;
    aspectClass?: string;
};

export default function UploadDropzone({
    hint,
    buttonLabel,
    previewSrc,
    accept,
    onFile,
    aspectClass = "min-h-[120px]",
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex flex-col gap-2">
            <div
                className={`relative rounded-[12px] border-2 border-dashed border-[var(--color-green)] bg-[#FAFAF7] overflow-hidden flex items-center justify-center ${aspectClass}`}
            >
                {previewSrc ? (
                    <img
                        src={previewSrc}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="text-center px-4 py-6">
                        <p className="text-[28px] text-[var(--color-green)] leading-none mb-2">
                            +
                        </p>
                        <p className="text-[13px] text-[#666]">{hint}</p>
                    </div>
                )}
            </div>
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="w-full rounded-[9px] border border-[var(--color-green)] bg-white px-4 py-2.5 text-[14px] font-semibold text-[var(--color-green)] hover:bg-[#E3FEE5] transition"
            >
                {buttonLabel}
            </button>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onFile(file);
                    e.target.value = "";
                }}
            />
        </div>
    );
}
