"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BtnSection() {
    const [selected, setSelected] = useState<string | null>(null);
    const router = useRouter();
    const buttons = [
        { label: "Мої книги", href: "/userProfile/myBooks" },
        { label: "Улюблене", href: "/userProfile/favorite" },
        { label: "Моя газета", href: "/userProfile/myPosts" },
    ];

    return (
        <div className="flex flex-row -mt-[26px] w-[900px] h-[150px] p-0 m-0">
            {buttons.map(({ label, href }) => {
                const isSelected = selected === label;

                return (
                    <button
                        key={label}
                        onClick={() => {
                            setSelected(selected === label ? null : label)
                            router.push(href);
                        }}
                        type="button"
                        className="group relative w-[300px] h-[118px] -mr-[22px] p-0 cursor-pointer overflow-visible"
                    >
                        {/* Фон*/}
                        <div
                            className={`
                                absolute inset-0 origin-top bg-no-repeat
                                transition-transform duration-500
                                ease-[cubic-bezier(0.22,1,0.36,1)]
                                group-hover:scale-y-[1.27]
                                ${isSelected
                                    ? "scale-y-[1.27] bg-[url('/images/userProfile/Rectangle-389.svg')]"
                                    : "bg-[url('/images/userProfile/Rectangle-389.png')] group-hover:bg-[url('/images/userProfile/Rectangle-389.svg')]"
                                }
                            `}
                            style={{ backgroundSize: "100% 100%" }}
                        />

                        {/* Текст*/}
                        <div
                            className={`
                                absolute inset-0 z-10 flex items-end justify-center pb-[50px] pointer-events-none
                                transition-transform duration-500
                                ease-[cubic-bezier(0.22,1,0.36,1)]
                                group-hover:translate-y-[32px]
                                ${isSelected ? "translate-y-[32px]" : ""}
                            `}
                        >
                            <span className="text-[var(--color-white)] text-[22px] font-bold">
                                {label}
                            </span>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}