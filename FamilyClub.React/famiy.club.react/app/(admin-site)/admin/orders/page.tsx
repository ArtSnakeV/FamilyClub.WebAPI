"use client";

import { useEffect, useState } from "react";
import OrderTabsStatus from "./componentsR/OrderTabsStatus";
import OrdersList from "./componentsR/OrdersList";
import { useOrdersStats } from "./hooksR/useOrders";
import { useOrdersEnrichment } from "./hooksR/useOrdersEnrichment";
import { useFilteredOrders } from "./hooksR/useFilteredOrders";
import { EMPTY_ORDERS_FILTERS } from "./hooksR/useOrdersFilterForm";
import type { OrderDTO } from "@/lib/api/generated";
import type { OrderTabKey } from "./types";
import OrderDetail from "./componentsR/OrderDetail";
import LeftFilterBlock, {
    type OrdersFiltersValue,
} from "./componentsR/LeftFilterBlock";
import OrderActions from "./componentsR/OrderActions";
import { AdminOrderStatusId } from "./utilsR/OrderDisplay";
import { orderService } from "@/lib/api/services";


const STATUS_GROUP_TO_RAW: Record<AdminOrderStatusId, string> = {
    accepted: "Pending",
    shipped: "Shipped",
    completed: "Delivered",
    cancelled: "Cancelled",
    disputed: "Return",
};

export default function Page() {
    const { stats, orders, loading, refetch } = useOrdersStats();
    const [status, setStatus] = useState<OrderTabKey>("all");
    const [selectedOrder, setSelectedOrder] = useState<OrderDTO | null>(null);
    const [filters, setFilters] = useState<OrdersFiltersValue>(EMPTY_ORDERS_FILTERS);

    const { members, products, authors } = useOrdersEnrichment(orders);
    const filteredOrders = useFilteredOrders(orders, status, filters, members);
    useEffect(() => {
        if (!selectedOrder) return;
        const fresh = orders.find((o) => o.id === selectedOrder.id);
        if (fresh && fresh !== selectedOrder) setSelectedOrder(fresh);
    }, [orders, selectedOrder]);

    const handleOrderAction = async (newStatus: AdminOrderStatusId) => {
        if (!selectedOrder?.id) return;

        const updated: OrderDTO = {
            ...selectedOrder,
            status: STATUS_GROUP_TO_RAW[newStatus],
        };

        await orderService.apiOrdersIdPut({
            id: selectedOrder.id,
            orderDTO: updated,
        });
        await refetch();
    };

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
        <div className="w-full min-h-screen overflow-hidden relative m-0 p-0 pb-8">
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
                    <div className="relative mt-2 mx-3 w-[500px]">
                        <OrderDetail
                            order={selectedOrder}
                            member={selectedMember}
                            products={products}
                            authors={authors}
                        />
                    </div>
                    <div className="relative flex flex-col items-center gap-[3vh] w-[330px] -ml-2">
                        <LeftFilterBlock
                            onApply={setFilters}
                            onReset={() => setStatus("all")}
                        />
                        <OrderActions order={selectedOrder}  onAction={handleOrderAction}/>
                    </div>
                </div>
            </div>
        </div>
    );
}