import type { ClubMemberReadDto, OrderDTO } from "@/lib/api/generated";
import { normalizeOrderStatusGroup } from "@/lib/constants/orderStatusGroups";
import {
    displayMemberName,
    getOrderExtras,
    type AdminOrderStatusId,
} from "./orderDisplay";

export type OrdersFilterState = {
    search: string;
    status: AdminOrderStatusId | "all";
    payment: string;
    delivery: string;
    dateFrom: string;
    dateTo: string;
};

export const DEFAULT_ORDERS_FILTERS: OrdersFilterState = {
    search: "",
    status: "all",
    payment: "all",
    delivery: "all",
    dateFrom: "",
    dateTo: "",
};

export function filterOrders(
    orders: OrderDTO[],
    filters: OrdersFilterState,
    members: Map<string, ClubMemberReadDto>
): OrderDTO[] {
    const q = filters.search.trim().toLowerCase();

    return orders.filter((order) => {
        const group = normalizeOrderStatusGroup(order.status);
        if (filters.status !== "all" && group !== filters.status) return false;

        const extras = getOrderExtras(order);
        // Немає в OrderDTO — тимчасово вимкнено
        // if (
        //     filters.payment !== "all" &&
        //     extras.paymentMethod !== filters.payment
        // ) {
        //     return false;
        // }
        // if (
        //     filters.delivery !== "all" &&
        //     extras.deliveryMethod !== filters.delivery
        // ) {
        //     return false;
        // }

        if (filters.dateFrom || filters.dateTo) {
            if (!order.orderDate) return false;
            const d = new Date(order.orderDate);
            d.setHours(0, 0, 0, 0);
            if (filters.dateFrom) {
                const from = new Date(filters.dateFrom);
                from.setHours(0, 0, 0, 0);
                if (d < from) return false;
            }
            if (filters.dateTo) {
                const to = new Date(filters.dateTo);
                to.setHours(0, 0, 0, 0);
                if (d > to) return false;
            }
        }

        if (!q) return true;

        const member = order.userId ? members.get(order.userId) : undefined;
        const name = displayMemberName(member, "").toLowerCase();
        const email = (member?.email ?? "").toLowerCase();
        const idStr = String(order.id ?? "");
        const phone = (member?.phoneNumber ?? "").toLowerCase();

        return (
            idStr.includes(q) ||
            name.includes(q) ||
            email.includes(q) ||
            phone.includes(q) ||
            extras.ttn.includes(q)
        );
    });
}

export function sortOrdersNewest(orders: OrderDTO[]): OrderDTO[] {
    return [...orders].sort((a, b) => {
        const ta = a.orderDate ? new Date(a.orderDate).getTime() : 0;
        const tb = b.orderDate ? new Date(b.orderDate).getTime() : 0;
        return tb - ta;
    });
}
