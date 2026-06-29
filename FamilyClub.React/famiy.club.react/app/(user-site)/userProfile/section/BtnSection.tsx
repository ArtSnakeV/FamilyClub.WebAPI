"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TabType } from "../page";

type Props = {
    activeTab: TabType | null;
    onTabChange: (tab: TabType | null) => void;
};

export default function BtnSection({ activeTab, onTabChange }: Props) {
    // const [selected, setSelected] = useState<string | null>(null);
    const router = useRouter();
    // const buttons = [
    //     { label: "Мої книги", href: "/userProfile/myBooks" },
    //     { label: "Улюблене", href: "/userProfile/favorite" },
    //     { label: "Моя газета", href: "/userProfile/myPosts" },
    // ];
    const buttons: { label: string; tab: TabType }[] = [
        { label: "Мої книги", tab: "myBooks" },
        { label: "Улюблене", tab: "favorite" },
        { label: "Моя газета", tab: "myPosts" },
    ];

    return (
        <div className="flex flex-row -mt-[26px] w-[1300px] h-[150px] p-0 m-0">
            {buttons.map(({ label, tab }) => {
                //const isSelected = selected === label;
                const isSelected = activeTab === tab;
                return (
                    <button
                        key={label}
                        // onClick={() => {
                        //     //setSelected(selected === label ? null : label)
                        //     // router.push(href);
                        //     onTabChange(tab)
                        // }}
                        onClick={() => {
                            if (activeTab === tab) {
                                onTabChange(null);
                            } else {
                                onTabChange(tab);
                            }
                        }}
                        type="button"
                        className="group relative w-[433px] h-[118px] -mr-[32px] p-0 cursor-pointer overflow-visible"
                    >
                        {/* Фон*/}
                        <div
                            className={`
                                absolute inset-0 origin-top bg-no-repeat
                                transition-transform duration-500
                                ease-[cubic-bezier(0.22,1,0.36,1)]
                                group-hover:scale-y-[1.27]
                                ${isSelected
                                    ? "scale-y-[1.27] bg-[url('/images/userProfile/Rectangle-389.png')]"
                                    : "bg-[url('/images/userProfile/Rectangle-389.png')] group-hover:bg-[url('/images/userProfile/Rectangle-389.png')]"
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