"use client";

import Image from "next/image";

interface Props {
    reason: string;
    onChange: (value: string) => void;
}

export default function ReasonFilteredBlockedUsers({
    reason,
    onChange,
}: Props) {
    return (
        <div className="relative w-[180px] ml-6">
            <label className="block font-source-sans text-[18px] font-semibold leading-[150%] tracking-[-0.011em] text-[var(--color-black)]">
                Причини блокування
            </label>

            <div className="relative">
                <select
                    value={reason}
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
                    <option value="all">Всі типи</option>
                    <option value="spam">Спам</option>
                    <option value="insult">Образи</option>
                    <option value="fake">Фейкові відгуки</option>
                    <option value="rules">Порушення правил</option>
                    <option value="other">Інше</option>
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