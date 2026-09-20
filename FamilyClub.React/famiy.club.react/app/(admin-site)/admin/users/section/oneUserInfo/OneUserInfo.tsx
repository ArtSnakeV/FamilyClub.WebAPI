"use client";

import { useState } from "react";
import { UserInfo } from "../../hooks/useAllUsersInfo";
import OneUserInfoCard from "./OneUserInfoCard";
import OverviewTab from "../tabs/OverviewTab";
import OrdersTab from "../tabs/OrdersTab";
import ReviewsTab from "../tabs/ReviewsTab";
import { useUserReviews } from "@/app/(user-site)/userProfile/hooks/useUserReviews";
import { useUserOrderStats } from "../../hooks/useUserOrderStats";
import ComplaintsTab from "../tabs/ComplaintsTab";
import { useUserComplaints } from "../../hooks/useUserComplaints";
import { useRouter } from "next/navigation";
import { useTheme } from "@/lib/theme/ThemeProvider";

interface Props {
    user: UserInfo;
    onLockToggle: (user: UserInfo) => void;
}

type TabKey = "overview" | "orders" | "complaints" | "reviews";

const TABS: { key: TabKey; label: string }[] = [
    { key: "overview", label: "Огляд" },
    { key: "orders", label: "Замовлення" },
    { key: "complaints", label: "Скарги" },
    { key: "reviews", label: "Відгуки" },
];

export default function OneUserInfo({ user, onLockToggle }: Props) {
    const router = useRouter();
    const { theme } = useTheme();
    const isNight = theme === "ink-night";
    const [activeTab, setActiveTab] = useState<TabKey>("overview");

    const { ordersCount, spentAmount } = useUserOrderStats(user.id);
    const { reviews } = useUserReviews(user.id);
    const { complaints } = useUserComplaints(user.id);

    return (
        <div className="relative w-[560px] max-w-full -ml-8 h-[900px] rounded-2xl overflow-hidden">
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none admin-parchment-bg"
                style={{
                    backgroundImage: "url('/images/usersPageAdmin/Rectangle 795.png')",
                    backgroundSize: "100% 100%",
                }}
            />
            <div
                className="relative z-10"
                style={{ color: isNight ? "var(--color-cream)" : "var(--color-black)" }}
            >
                <div className="w-[490px] max-w-full ml-4 px-6 py-4">
                    <OneUserInfoCard user={user} />
                </div>

                <div className="flex flex-wrap gap-10 mt-[3vh] ml-10 text-[20px] w-[500px] max-w-full font-semibold">
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`pb-2 transition whitespace-nowrap ${
                                activeTab === tab.key
                                    ? "text-[var(--color-green)] hover:text-[var(--color-green)] border-b-2 border-[var(--color-green)]"
                                    : ""
                            }`}
                            style={
                                activeTab === tab.key
                                    ? undefined
                                    : {
                                          color: isNight
                                              ? "var(--color-cream)"
                                              : "var(--color-black)",
                                      }
                            }
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div
                    className="w-[490px] max-w-full h-[2px] -mt-[2px] ml-7 mb-4"
                    style={{
                        backgroundColor: isNight ? "rgba(237,232,223,0.2)" : "#D2D2D2",
                    }}
                />

                <div
                    className="px-9 custom-scrollbar overflow-y-auto overflow-x-hidden w-[520px] ml-5 max-w-full pr-8"
                    style={{ maxHeight: "580px" }}
                >
                    {activeTab === "overview" && (
                        <OverviewTab
                            user={user}
                            ordersCount={ordersCount}
                            spentAmount={spentAmount}
                            reviewsCount={reviews.length}
                            complaintsCount={complaints.length}
                            handleLockoutEnd={() => onLockToggle(user)}
                            onAddManager={(id) =>
                                router.push(`/admin/managers/addEditManager?id=${id}`)
                            }
                        />
                    )}
                    {activeTab === "orders" && <OrdersTab user={user} />}
                    {activeTab === "complaints" && <ComplaintsTab user={user} />}
                    {activeTab === "reviews" && <ReviewsTab user={user} />}
                </div>
            </div>
        </div>
    );
}
