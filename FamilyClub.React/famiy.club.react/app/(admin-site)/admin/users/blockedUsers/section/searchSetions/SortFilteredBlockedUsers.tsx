"use client";

import Image from "next/image";

interface Props {
    sort: string;
    onChange: (value: string) => void;
}

export default function SortFilteredBlockedUsers({
    sort,
    onChange,
}: Props) {
    return (
        <div className="relative w-[180px] ml-6">
            <label className="block font-source-sans text-[18px] font-semibold leading-[150%] tracking-[-0.011em] text-[var(--color-black)]">
                Сортування
            </label>

            <div className="relative">
                <select
                    value={sort}
                    onChange={(e) => onChange(e.target.value)}
                    className="
                        w-full
                        h-[50px]
                        rounded-[9px]
                        border
                        border-[#272727]
                        bg-white
                        px-4
                        pr-10
                        text-[15px]
                        text-[#272727]
                        outline-none
                        appearance-none
                        cursor-pointer
                    "
                >
                    <option value="newest">Найновіші</option>
                    <option value="oldest">Найстаріші</option>
                    <option value="nameAsc">Ім'я (А-Я)</option>
                    <option value="nameDesc">Ім'я (Я-А)</option>
                    <option value="expires">За датою завершення</option>
                </select>

                <Image
                    src="/images/blockedUsersPageAdmin/angle-down-solid-full (10) 1.png"
                    alt=""
                    width={20}
                    height={20}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                />
            </div>
        </div>
    );
}