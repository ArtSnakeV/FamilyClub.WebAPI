"use client";

import { useEffect, useState } from "react";
import OrderTabsStatus from "./componentsR/OrderTabsStatus";
import OrdersList from "./componentsR/OrdersList";
import { useOrdersStats } from "./hooksR/useOrders";
import { useOrdersEnrichment } from "./hooksR/useOrdersEnrichment";
import { useFilteredOrders } from "./hooksR/useFilteredOrders";
import { useCancellationRequests } from "./hooksR/useCancellationRequests";
import { EMPTY_ORDERS_FILTERS } from "./hooksR/useOrdersFilterForm";
import { orderService } from "@/lib/api/services";
import type { OrderDTO } from "@/lib/api/generated";
import type { OrderTabKey } from "./types";
import type { AdminOrderStatusId } from "./utilsR/OrderDisplay";
import OrderDetail from "./componentsR/OrderDetail";
import OrderCancellationReview from "./componentsR/OrderCancellationReview";
import LeftFilterBlock, {
    type OrdersFiltersValue,
} from "./componentsR/LeftFilterBlock";
import OrderActions from "./componentsR/OrderActions";

// Підтверджено з бекенда лише "Cancelled" 
// Решта — за аналогією зі старим StatusBadge (Pending/Shipped/Delivered/Return).
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

    const {
        requests: cancellationRequests,
        getRequest: getCancellationRequest,
        createRequest: createCancellationRequest,
        setComment: setCancellationComment,
        decide: decideCancellation,
    } = useCancellationRequests();
    const filteredOrders = useFilteredOrders(orders, status, filters, members, cancellationRequests);

    // Лічильник для табу очікують рішення,для обох типів
    // запитів (і скасування, і повернення), поки рішення не прийняте.
    // Це не входить у useOrdersStats, бо це не OrderDTO.status, а окремий
    // (мок) стан з useCancellationRequests.
    const pendingDecisionCount = orders.filter(
        (o) => o.id != null && cancellationRequests[o.id]?.status === "pending"
    ).length;

    // Після refetch тримаємо selectedOrder синхронізованим зі свіжими даними
    useEffect(() => {
        if (!selectedOrder) return;
        const fresh = orders.find((o) => o.id === selectedOrder.id);
        if (fresh && fresh !== selectedOrder) setSelectedOrder(fresh);
    }, [orders, selectedOrder]);

    const applyRealStatusChange = async (rawStatus: string) => {
        if (!selectedOrder?.id) return;
        const updated: OrderDTO = { ...selectedOrder, status: rawStatus };
        try {
            await orderService.apiOrdersIdPut({ id: selectedOrder.id, orderDTO: updated });
            await refetch();
        } catch (err) {
            console.error("Не вдалось оновити статус замовлення:", err);
        }
    };
    // Поки ми на табі очікують рішення якщо вибране замовлення щойно
    // отримало рішення (approved/rejected), автоматично перемикаємось
    // на наступне замовлення, що досі очікує рішення.
    useEffect(() => {
        if (status !== "pendingCancellation") return;

        const stillPending =
            selectedOrder?.id != null &&
            cancellationRequests[selectedOrder.id]?.status === "pending";

        if (stillPending) return;

        const nextPending = orders.find(
            (o) => o.id != null && cancellationRequests[o.id]?.status === "pending"
        );

        setSelectedOrder(nextPending ?? null);
    }, [status, orders, cancellationRequests, selectedOrder]);

    const handleOrderAction = async (newStatus: AdminOrderStatusId) => {
        if (!selectedOrder?.id) return;

        if (newStatus === "cancelled") {
            // Не міняємо статус одразу — відкриваємо панель розгляду скасування (мок).
            createCancellationRequest(selectedOrder.id, "cancellation");
            return;
        }

        if (newStatus === "disputed") {
            // Аналогічно скасуванню: спочатку розгляд, реальний статус
            // міняється лише після підтвердження в панелі.
            createCancellationRequest(selectedOrder.id, "return");
            return;
        }

        await applyRealStatusChange(STATUS_GROUP_TO_RAW[newStatus]);
    };

    const handleConfirmRequest = async () => {
        if (!selectedOrder?.id || !activeCancellationRequest) return;
        const rawStatus =
            activeCancellationRequest.type === "return"
                ? STATUS_GROUP_TO_RAW.disputed
                : STATUS_GROUP_TO_RAW.cancelled;
        await applyRealStatusChange(rawStatus);
        decideCancellation(selectedOrder.id, true);
    };

    const handleRejectRequest = () => {
        if (!selectedOrder?.id) return;
        decideCancellation(selectedOrder.id, false);
    };

    const selectedMember =
        selectedOrder?.userId ? members.get(selectedOrder.userId) ?? null : null;

    const activeCancellationRequest = selectedOrder?.id
        ? getCancellationRequest(selectedOrder.id)
        : null;

    const showRequestReview =
        status === "pendingCancellation" &&
        !!activeCancellationRequest &&
        activeCancellationRequest.status !== "approved";

    const tabs = [
        { key: "all" as OrderTabKey, label: "Всі замовлення", count: stats.all },
        { key: "accepted" as OrderTabKey, label: "Прийняті", count: stats.accepted },
        { key: "shipped" as OrderTabKey, label: "Відправленні", count: stats.shipped },
        { key: "completed" as OrderTabKey, label: "Доставленні", count: stats.completed },
        { key: "cancelled" as OrderTabKey, label: "Скасовані", count: stats.cancelled },
        { key: "disputed" as OrderTabKey, label: "На повернення", count: stats.disputed },
        {
            key: "pendingCancellation" as OrderTabKey,
            label: "Очікують рішення",
            count: pendingDecisionCount,
        },
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
                        onChange={(k) => {
                            const nextStatus = k as OrderTabKey;
                            setStatus(nextStatus);

                            // При переході на таб очікують рішення
                            // підставляємо перше замовлення з pending-запитом
                            // (скасування чи повернення),
                            // щоб панель розгляду показалась по кліку на сам таб.
                            if (nextStatus === "pendingCancellation") {
                                const firstPending = orders.find(
                                    (o) =>
                                        o.id != null &&
                                        cancellationRequests[o.id]?.status === "pending"
                                );
                                if (firstPending) setSelectedOrder(firstPending);
                            }
                        }}
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
                                cancellationRequests={cancellationRequests}
                            />
                        )}
                    </div>

                    {/* деталі замовлення АБО панель розгляду*/}
                    <div className="relative">
                        {showRequestReview && selectedOrder && activeCancellationRequest ? (
                            <OrderCancellationReview
                                order={selectedOrder}
                                member={selectedMember}
                                products={products}
                                authors={authors}
                                request={activeCancellationRequest}
                                onCommentChange={(comment) =>
                                    setCancellationComment(selectedOrder.id!, comment)
                                }
                                onConfirm={handleConfirmRequest}
                                onReject={handleRejectRequest}
                            />
                        ) : (
                            <div className="w-[500px]  mt-2 mx-3">
                                <OrderDetail
                                    order={selectedOrder}
                                    member={selectedMember}
                                    products={products}
                                    authors={authors}
                                    onStatusChange={applyRealStatusChange}
                                />
                            </div>
                        )}
                    </div>

                    {/* фільтри і дії ховаємо тільки для табу Очікують рішення */}
                    {status !== "pendingCancellation" && (
                        <div className="relative flex flex-col items-center gap-3 w-[330px] -ml-2">
                            <LeftFilterBlock
                                onApply={setFilters}
                                onReset={() => setStatus("all")}
                            />
                            <OrderActions
                                order={selectedOrder}
                                onAction={handleOrderAction}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}