"use client";

import type { OrderDTO } from "@/lib/api/generated";
import { normalizeOrderStatusGroup } from "@/lib/constants/orderStatusGroups";
import {
    ADMIN_ORDER_STATUS_META,
    type AdminOrderStatusId,
} from "../utils/orderDisplay";

type Props = {
    orders: OrderDTO[];
    active: AdminOrderStatusId | "all";
    onChange: (next: AdminOrderStatusId | "all") => void;
};

const TAB_ORDER: Array<AdminOrderStatusId | "all"> = [
    "all",
    "accepted",
    "shipped",
    "completed",
    "cancelled",
    "disputed",
];

export default function OrderStatusTabs({ orders, active, onChange }: Props) {
    const counts = new Map<AdminOrderStatusId | "all", number>();
    counts.set("all", orders.length);
    for (const order of orders) {
        const id = normalizeOrderStatusGroup(order.status);
        counts.set(id, (counts.get(id) ?? 0) + 1);
    }

    return (
        <div className="flex flex-wrap gap-2">
            {TAB_ORDER.map((id) => {
                const isActive = active === id;
                const label =
                    id === "all"
                        ? "Всі замовлення"
                        : ADMIN_ORDER_STATUS_META[id].tabLabel;
                const count = counts.get(id) ?? 0;

                return (
                    <button
                        key={id}
                        type="button"
                        onClick={() => onChange(id)}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                            isActive
                                ? "bg-[var(--color-green)] text-white"
                                : "bg-[var(--background-elevated)]/90 text-[var(--foreground-primary)] hover:bg-[var(--background-elevated)]"
                        }`}
                    >
                        <span>{label}</span>
                        <span
                            className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                                isActive
                                    ? "bg-[var(--background-elevated)] text-[var(--color-green)]"
                                    : "bg-[#E8E4DC] text-[#555]"
                            }`}
                        >
                            {count}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
