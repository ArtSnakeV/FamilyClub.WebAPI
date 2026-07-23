"use client";

import { useState } from "react";
import OrderTabsStatus from "./section/OrderTabsStatus";
import { useOrdersStats } from "./hooks/useOrders";
import OrdersList from "./section/OrdersList";

export type OrderTabKey =
    | "all"
    | "accepted"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "return";

const STATUS_BY_TAB: Record<OrderTabKey, string | null> = {
    all: null,
    accepted: "Pending",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
    return: "Return",
};

export default function Page() {
    const { stats, orders, loading } = useOrdersStats();
    const [status, setStatus] = useState<OrderTabKey>("all");

    const filteredOrders = orders.filter((o) => {
        const target = STATUS_BY_TAB[status];
        return target === null || o.status === target;
    });

    const tabs = [
        { key: "all" as OrderTabKey, label: "Всі замовлення", count: stats.all },
        { key: "accepted" as OrderTabKey, label: "Прийняті", count: stats.accepted },
        { key: "shipped" as OrderTabKey, label: "Відправленні", count: stats.shipped },
        { key: "delivered" as OrderTabKey, label: "Доставленні", count: stats.delivered },
        { key: "cancelled" as OrderTabKey, label: "Скасовані", count: stats.cancelled },
        { key: "return" as OrderTabKey, label: "На повернення", count: stats.return },
    ];

    return (
        <div className="w-full min-h-screen overflow-hidden relative m-0 p-0">
            <div className="w-[100vw] min-h-screen relative">
                <img
                    src="/images/usersPageAdmin/Rectangle 675.png"
                    className="absolute"
                    style={{ width: "100vw", height: "auto", top: "40px", left: "-20px" }}
                    alt=""
                />

                <div className="flex relative mt-[1vh] ml-3 gap-2 items-start">
                    <OrderTabsStatus
                        tabs={tabs}
                        activeTab={status}
                        onChange={(k) => setStatus(k as OrderTabKey)}
                    />
                </div>

                <div className="relative mt-6 mx-3">
                    {loading ? (
                        <p className="text-center text-[#6B6B6B] py-10">
                            Завантаження...
                        </p>
                    ) : (
                        <OrdersList orders={filteredOrders} />
                    )}
                </div>
            </div>
        </div>
    );
}