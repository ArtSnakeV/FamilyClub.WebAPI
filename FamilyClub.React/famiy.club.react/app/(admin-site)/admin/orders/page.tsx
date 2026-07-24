"use client";

import { useState } from "react";
import OrderTabsStatus from "./componentsR/OrderTabsStatus";
import OrdersList from "./componentsR/OrdersList";
import { useOrdersStats } from "./hooksR/useOrders";
import { useOrdersEnrichment } from "./hooksR/useOrdersEnrichment";
import type { OrderDTO } from "@/lib/api/generated";
import type { OrderTabKey } from "./types";
import { normalizeOrderStatusGroup } from "@/lib/constants/orderStatusGroups";
import OrderDetail from "./componentsR/OrderDetail";

export default function Page() {
    const { stats, orders, loading } = useOrdersStats();
    const [status, setStatus] = useState<OrderTabKey>("all");
    const [selectedOrder, setSelectedOrder] = useState<OrderDTO | null>(null);

    const { members, products, authors } = useOrdersEnrichment(orders);

    const filteredOrders = orders.filter(
        (o) => status === "all" || normalizeOrderStatusGroup(o.status) === status
    );

    const selectedMember =
        selectedOrder?.userId ? members.get(selectedOrder.userId) ?? null : null;

    const tabs = [
        { key: "all" as OrderTabKey, label: "Всі замовлення", count: stats.all },
        { key: "accepted" as OrderTabKey, label: "Прийняті", count: stats.accepted },
        { key: "shipped" as OrderTabKey, label: "Відправленні", count: stats.shipped },
        { key: "completed" as OrderTabKey, label: "Доставленні", count: stats.completed },
        { key: "cancelled" as OrderTabKey, label: "Скасовані", count: stats.cancelled },
        { key: "disputed" as OrderTabKey, label: "На повернення", count: stats.disputed },
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
                <div className="flex flex-row gap-0">
                    <div className="relative mt-2 mx-3">
                        {loading ? (
                            <p className="text-center text-[#6B6B6B] py-10">
                                Завантаження...
                            </p>
                        ) : (
                            <OrdersList
                                orders={filteredOrders}
                                members={members}
                                selectedId={selectedOrder?.id ?? null}
                                onSelectOrder={setSelectedOrder}
                            />
                        )}
                    </div>
                    <div className="relative mt-2 mx-3 w-[420px]">
                        <OrderDetail
                            order={selectedOrder}
                            member={selectedMember}
                            products={products}
                            authors={authors}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}