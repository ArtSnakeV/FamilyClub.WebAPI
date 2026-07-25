"use client";

import { useMemo } from "react";
import type { ClubMemberReadDto, OrderDTO } from "@/lib/api/generated";
import { normalizeOrderStatusGroup } from "@/lib/constants/orderStatusGroups";
import { displayMemberName, getOrderExtras } from "../utilsR/OrderDisplay";
import type { OrderTabKey } from "../types";
import type { OrdersFiltersValue } from "./useOrdersFilterForm";

/**
 * Фільтрує список замовлень за табом статусу зверху + панеллю фільтрів зліва.
 * Статус з панелі фільтрів має пріоритет над табом, якщо він обраний.
 */
export function useFilteredOrders(
    orders: OrderDTO[],
    tabStatus: OrderTabKey,
    filters: OrdersFiltersValue,
    members: Map<string, ClubMemberReadDto>
) {
    return useMemo(() => {
        const search = filters.search.trim().toLowerCase();

        return orders.filter((o) => {
            const effectiveStatus = filters.status || tabStatus;
            if (
                effectiveStatus !== "all" &&
                normalizeOrderStatusGroup(o.status) !== effectiveStatus
            ) {
                return false;
            }

            if (search) {
                const member = o.userId ? members.get(o.userId) : undefined;
                const haystack = [
                    String(o.id ?? ""),
                    displayMemberName(member, ""),
                    member?.email ?? "",
                ]
                    .join(" ")
                    .toLowerCase();
                if (!haystack.includes(search)) return false;
            }

            // ⚠️ paymentMethod/deliveryMethod у getOrderExtras — синтетичні
            // (порахувані з id), бо в OrderDTO реальних полів ще нема.
            if (filters.payment || filters.delivery) {
                const extras = getOrderExtras(o);
                if (filters.payment && extras.paymentMethod !== filters.payment) {
                    return false;
                }
                if (filters.delivery && extras.deliveryMethod !== filters.delivery) {
                    return false;
                }
            }

            if (filters.dateFrom || filters.dateTo) {
                if (!o.orderDate) return false;
                const orderDate = new Date(o.orderDate);
                if (filters.dateFrom && orderDate < new Date(filters.dateFrom)) {
                    return false;
                }
                if (filters.dateTo) {
                    const to = new Date(filters.dateTo);
                    to.setHours(23, 59, 59, 999);
                    if (orderDate > to) return false;
                }
            }

            return true;
        });
    }, [orders, tabStatus, filters, members]);
}