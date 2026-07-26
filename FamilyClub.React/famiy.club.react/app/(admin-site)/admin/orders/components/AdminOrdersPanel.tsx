"use client";

import { useEffect, useMemo, useState } from "react";
import type {
    ClubMemberReadDto,
    OrderDTO,
    ProductDto,
} from "@/lib/api/generated";
import { Configuration, OrdersApi } from "@/lib/api/generated";
import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";
import {
    DEFAULT_ORDERS_FILTERS,
    filterOrders,
    sortOrdersNewest,
    type OrdersFilterState,
} from "../utils/filterOrders";
import OrderStatusTabs from "./OrderStatusTabs";
import OrdersTable from "./OrdersTable";
import OrderDetailsPanel from "./OrderDetailsPanel";
import OrdersFiltersPanel from "./OrdersFiltersPanel";
import OrderActionsPanel from "./OrderActionsPanel";

type Props = {
    orders: OrderDTO[];
    members: ClubMemberReadDto[];
    products: ProductDto[];
    isLoading?: boolean;
    onOrdersChange: (orders: OrderDTO[]) => void;
};

const STATUS_BY_ACTION = {
    confirm: "Processing",
    ship: "Shipped",
    deliver: "Delivered",
    cancel: "Cancelled",
    return: "ReturnRequested",
} as const;

export default function AdminOrdersPanel({
    orders,
    members,
    products,
    isLoading,
    onOrdersChange,
}: Props) {
    const [tab, setTab] = useState<OrdersFilterState["status"]>("all");
    const [draftFilters, setDraftFilters] = useState<OrdersFilterState>(
        DEFAULT_ORDERS_FILTERS
    );
    const [appliedFilters, setAppliedFilters] = useState<OrdersFilterState>(
        DEFAULT_ORDERS_FILTERS
    );
    const [page, setPage] = useState(1);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [busy, setBusy] = useState(false);

    const memberMap = useMemo(
        () =>
            new Map(
                members.filter((m) => m.id).map((m) => [m.id as string, m])
            ),
        [members]
    );

    const productMap = useMemo(
        () =>
            new Map(
                products
                    .filter((p) => p.id != null)
                    .map((p) => [p.id as number, p])
            ),
        [products]
    );

    const filtersForList = useMemo(
        () => ({ ...appliedFilters, status: tab }),
        [appliedFilters, tab]
    );

    const filtered = useMemo(
        () => sortOrdersNewest(filterOrders(orders, filtersForList, memberMap)),
        [orders, filtersForList, memberMap]
    );

    useEffect(() => {
        setPage(1);
    }, [filtersForList]);

    useEffect(() => {
        if (filtered.length === 0) {
            setSelectedId(null);
            return;
        }
        if (
            selectedId == null ||
            !filtered.some((o) => o.id === selectedId)
        ) {
            setSelectedId(filtered[0].id ?? null);
        }
    }, [filtered, selectedId]);

    const selectedOrder =
        filtered.find((o) => o.id === selectedId) ?? null;
    const selectedMember =
        selectedOrder?.userId != null
            ? memberMap.get(selectedOrder.userId)
            : null;

    const handleApplyFilters = () => {
        setAppliedFilters(draftFilters);
        if (draftFilters.status !== "all") {
            setTab(draftFilters.status);
        }
    };

    const handleTabChange = (next: OrdersFilterState["status"]) => {
        setTab(next);
        setDraftFilters((f) => ({ ...f, status: next }));
        setAppliedFilters((f) => ({ ...f, status: next }));
    };

    const handleAction = async (
        action: keyof typeof STATUS_BY_ACTION
    ) => {
        if (!selectedOrder?.id) return;
        const token = getAuthToken();
        if (!token) return;

        setBusy(true);
        try {
            const config = new Configuration({
                basePath: apiBasePath,
                headers: { Authorization: `Bearer ${token}` },
            });
            const api = new OrdersApi(config);
            const nextStatus = STATUS_BY_ACTION[action];
            await api.apiOrdersIdPut({
                id: selectedOrder.id,
                orderDTO: {
                    ...selectedOrder,
                    status: nextStatus,
                },
            });
            onOrdersChange(
                orders.map((o) =>
                    o.id === selectedOrder.id
                        ? { ...o, status: nextStatus }
                        : o
                )
            );
        } catch (err) {
            console.error("Не вдалося оновити статус замовлення", err);
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <OrderStatusTabs
                orders={orders}
                active={tab}
                onChange={handleTabChange}
            />

            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_280px] gap-5 items-start">
                <div className="rounded-[12px] bg-white/70 px-4 py-4 shadow-[0_0_15px_rgba(0,0,0,0.08)] min-h-[520px]">
                    <OrdersTable
                        orders={filtered}
                        members={memberMap}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                        page={page}
                        pageSize={10}
                        onPageChange={setPage}
                        isLoading={isLoading}
                    />
                </div>

                <OrderDetailsPanel
                    order={selectedOrder}
                    member={selectedMember}
                    products={productMap}
                />

                <div className="flex flex-col gap-4">
                    <OrdersFiltersPanel
                        draft={draftFilters}
                        onChange={setDraftFilters}
                        onApply={handleApplyFilters}
                    />
                    <OrderActionsPanel
                        order={selectedOrder}
                        busy={busy}
                        onAction={handleAction}
                    />
                </div>
            </div>
        </div>
    );
}
