// "use client";

// import { useEffect, useState } from "react";
// import { UserInfo } from "../../hooks/useAllUsersInfo";
// import OneUserInfoCard from "./OneUserInfoCard";
// import OverviewTab from "../tabs/OverviewTab";
// import OrdersTab from "../tabs/OrdersTab";
// import ReviewsTab from "../tabs/ReviewsTab";
// import { useUserReviews } from "@/app/(user-site)/userProfile/hooks/useUserReviews";
// import { useUserOrderStats } from "../../hooks/useUserOrderStats";
// import { lockUser, unlockUser } from "../../api/ActionUsers";


// interface Props {
//     user: UserInfo;
//     onLockToggle: (user: UserInfo) => void;
// }

// type TabKey = "overview" | "orders" | "reviews";

// const TABS: { key: TabKey; label: string }[] = [
//     { key: "overview", label: "Огляд" },
//     { key: "orders", label: "Замовлення" },
//     { key: "reviews", label: "Відгуки" },
// ];

// export default function OneUserInfo({ user, onLockToggle }: Props) {
//     const [activeTab, setActiveTab] = useState<TabKey>("overview");

//     const { ordersCount, spentAmount } = useUserOrderStats(user.id);
//     const { reviews } = useUserReviews(user.id);

//     const isLocked = !!user.lockoutEnd && new Date(user.lockoutEnd).getTime() > Date.now();


//     return (
//         <div className="w-[550px] -ml-8 h-[900px] rounded-2xl overflow-hidden"
//             style={{
//                 backgroundImage: "url('/images/usersPageAdmin/Rectangle 795.png')",
//                 backgroundSize: "100% 100%",
//             }}>
//             <div className="w-[490px] ml-4 px-6 py-4">
//                 <OneUserInfoCard user={user} />
//             </div>

//             <div className="flex gap-10 mt-[3vh] ml-10 text-[20px] w-[500px] font-semibold">
//                 {TABS.map((tab) => (
//                     <button
//                         key={tab.key}
//                         onClick={() => setActiveTab(tab.key)}
//                         className={`pb-2 transition ${activeTab === tab.key
//                             ? "text-[var(--color-green)] hover:text-[var(--color-green)] border-b-2 border-[var(--color-green)]"
//                             : "text-black "
//                             }`}
//                     >
//                         {tab.label}

//                     </button>
//                 ))}
//             </div>
//             <div className="w-[490px] h-[2px] bg-[#D2D2D2] -mt-[2px] ml-7 mb-4" />

//             <div className="px-10 overflow-y-hidden" style={{ maxHeight: "800px" }}>
//                 {activeTab === "overview" &&
//                     <OverviewTab
//                         user={user}
//                         ordersCount={ordersCount}
//                         spentAmount={spentAmount}
//                         reviewsCount={reviews.length}
//                         handleLockoutEnd={() => onLockToggle(user)}
//                     />}
//                 {activeTab === "orders" && <OrdersTab user={user} />}
//                 {activeTab === "reviews" && <ReviewsTab user={user} />}
//             </div>

//         </div>
//     );
// }
"use client";

import { useEffect, useState } from "react";
import { UserInfo } from "../../hooks/useAllUsersInfo";
import OneUserInfoCard from "./OneUserInfoCard";
import OverviewTab from "../tabs/OverviewTab";
import OrdersTab from "../tabs/OrdersTab";
import ReviewsTab from "../tabs/ReviewsTab";
import { useUserReviews } from "@/app/(user-site)/userProfile/hooks/useUserReviews";
import { useUserOrderStats } from "../../hooks/useUserOrderStats";
import { lockUser, unlockUser } from "../../api/ActionUsers";
import ComplaintsTab from "../tabs/ComplaintsTab";
import { useUserComplaints } from "../../hooks/useUserComplaints";
import { useRouter } from "next/navigation";


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
    const [activeTab, setActiveTab] = useState<TabKey>("overview");

    const { ordersCount, spentAmount } = useUserOrderStats(user.id);
    const { reviews } = useUserReviews(user.id);

    const isLocked = !!user.lockoutEnd && new Date(user.lockoutEnd).getTime() > Date.now();
    const { complaints } = useUserComplaints(user.id);

    return (
        <div className="w-[560px] max-w-full -ml-8 h-[900px] rounded-2xl overflow-hidden"
            style={{
                backgroundImage: "url('/images/usersPageAdmin/Rectangle 795.png')",
                backgroundSize: "100% 100%",
            }}>
            <div className="w-[490px] max-w-full ml-4 px-6 py-4">
                <OneUserInfoCard user={user} />
            </div>

            <div className="flex flex-wrap gap-10 mt-[3vh] ml-10 text-[20px] w-[500px] max-w-full font-semibold">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`pb-2 transition whitespace-nowrap ${activeTab === tab.key
                            ? "text-[var(--color-green)] hover:text-[var(--color-green)] border-b-2 border-[var(--color-green)]"
                            : "text-black "
                            }`}
                    >
                        {tab.label}

                    </button>
                ))}
            </div>
            <div className="w-[490px] max-w-full h-[2px] bg-[#D2D2D2] -mt-[2px] ml-7 mb-4" />

            {/* <div className="px-9 overflow-y-hidden overflow-x-hidden w-[520px] ml-5 max-w-full" style={{ maxHeight: "800px" }}> */}
            <div
                className="px-9 custom-scrollbar overflow-y-auto overflow-x-hidden w-[520px] ml-5 max-w-full pr-8"
                style={{ maxHeight: "580px" }}
            >
                {activeTab === "overview" &&
                    <OverviewTab
                        user={user}
                        ordersCount={ordersCount}
                        spentAmount={spentAmount}
                        reviewsCount={reviews.length}
                        complaintsCount={complaints.length}
                        handleLockoutEnd={() => onLockToggle(user)}
                        onAddManager={(id) => router.push(`/admin/managers/addEditManager?id=${id}`)}
                    />}
                {activeTab === "orders" && <OrdersTab user={user} />}
                {activeTab === "complaints" && <ComplaintsTab user={user} />}
                {activeTab === "reviews" && <ReviewsTab user={user} />}
            </div>

        </div>
    );
}