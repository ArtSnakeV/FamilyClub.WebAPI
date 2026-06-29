"use client";

import { useRef, useState } from "react";
import NotificationUser from "../ui/NotificationUser";


export default function SettingsUserProfile() {
    const [language, setLanguage] = useState("Українська");
    const [notifications, setNotifications] = useState({
        comments: false,
        likes: false,
        assistant: false,
        messages: false,
    });

    const inputClass = "w-full h-[52px] px-4 rounded-[8px] border border-gray-200 bg-[#f5f5f5] text-[15px] outline-none focus:border-[#005B33]";
    const inputStyle = { boxShadow: "0px 0px 10px 0px #00000040" };
    return (
        <div className="w-[560px] h-[526px]"
            style={{
                backgroundImage: "url('/images/userProfile/editUserProfile/Rectangle 472.png')",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
            }}>
            <div className="relative w-[334px] mt-12">
                <img
                    src="/images/userProfile/editUserProfile/Rectangle 478.png"
                    alt="green"
                    className="w-full h-[74px] object-fill"
                />
                <div className="absolute inset-0 -mt-1 flex flex-col justify-center pl-14">
                    <h3 className="text-[24px] text-[var(--color-white)] font-semibold">Налаштування</h3>
                </div>
            </div>
            <div className="flex w-[460px] flex-col gap-6 px-5 ml-12 mt-4 pb-10">
                {/* Мова */}
                <div className="flex flex-col gap-1">
                    <label className="text-[20px] font-medium">Мова</label>
                    <div className="relative">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className={`${inputClass} appearance-none cursor-pointer`}
                            style={inputStyle}
                        >
                            <option>Українська</option>
                            <option>English</option>
                            <option>Polski</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            ▼
                        </div>
                    </div>
                </div>

                {/* Сповіщення */}
                <div className="flex flex-col gap-3 mt-4">
                    <label className="text-[20px] font-medium">Сповіщеня</label>
                    <NotificationUser
                        notifications={notifications}
                        setNotifications={setNotifications}
                    />
                </div>
            </div>
        </div>
    )
}