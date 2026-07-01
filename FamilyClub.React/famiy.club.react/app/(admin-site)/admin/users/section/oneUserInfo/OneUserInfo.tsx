"use client";

import { useState } from "react";
import { UserInfo } from "../../hooks/useAllUsersInfo";
import OneUserInfoCard from "./OneUserInfoCard";
import OverviewTab from "../tabs/OverviewTab";
import OrdersTab from "../tabs/OrdersTab";
import ReviewsTab from "../tabs/ReviewsTab";

interface Props {
    user: UserInfo;
}
type TabKey = "overview" | "orders" | "reviews";
const TABS: { key: TabKey; label: string }[] = [
    { key: "overview", label: "Огляд" },
    { key: "orders", label: "Замовлення" },
    { key: "reviews", label: "Відгуки" },
];
export default function OneUserInfo({ user }: Props) {
     const [activeTab, setActiveTab] = useState<TabKey>("overview");
    return (
        <div className="w-[550px] -ml-8 h-[900px] rounded-2xl overflow-hidden"
            style={{
                backgroundImage: "url('/images/usersPageAdmin/Rectangle 795.png')",
                backgroundSize: "100% 100%",
            }}>
            <div className="w-[490px] ml-4 px-6 py-4">
                <OneUserInfoCard user={user} />
            </div>

             <div className="flex gap-10 mt-[3vh] ml-10 text-[20px] w-[500px] font-semibold">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`pb-2 transition ${
                            activeTab === tab.key
                                ? "text-[var(--color-green)] hover:text-[var(--color-green)] border-b-2 border-[var(--color-green)]"
                                : "text-black "
                        }`}
                    >
                        {tab.label}
                        
                    </button>
                ))}
            </div>
            <div className="w-[490px] h-[2px] bg-[#D2D2D2] -mt-[2px] ml-7 mb-4" />

            <div className="px-10 overflow-y-auto" style={{ maxHeight: "600px" }}>
                {activeTab === "overview" && <OverviewTab user={user} />}
                {activeTab === "orders" && <OrdersTab user={user} />}
                {activeTab === "reviews" && <ReviewsTab user={user} />}
            </div>
            
        </div>
    );
}