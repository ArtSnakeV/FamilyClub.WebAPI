"use client";

import type { OrderDTO } from "@/lib/api/generated";
import { type AdminOrderStatusId } from "../utilsR/OrderDisplay";

interface OrderActionItem {
    status: AdminOrderStatusId;
    label: string;
    /** Колір кнопки дії — окремий набір від кольору тексту статусу в OrderDetail/StatusBadge. */
    color: string;
}

const ACTIONS: OrderActionItem[] = [
    { status: "accepted", label: "Підтвердити замовлення", color: "#005B33" },
    { status: "shipped", label: "Відправити замовлення", color: "#1A7583" },
    { status: "completed", label: "Позначити як доставлене", color: "#887321" },
    { status: "cancelled", label: "Скасувати замовлення", color: "#8B2A2A" },
    { status: "disputed", label: "Оформити повернення", color: "#6C2276" },
];

interface OrderActionsProps {
    order?: OrderDTO | null;
    onAction?: (status: AdminOrderStatusId) => void;
}

export default function OrderActions({ order, onAction }: OrderActionsProps) {
    const disabled = !order;

    return (
        <div className="relative w-[330px] items-center max-w-[400px] flex flex-col">
            <img
                src="/images/ordersAdminPage/Rectangle 705.png"
                className="absolute"
                style={{ width: "330px", height:"290px", maxHeight: "310px" }}
                alt=""
            />

            <p className="relative text-[20px] text-[var(--color-black)] p-2 mt-3 font-bold">
                Дії із замовленням
            </p>

            <div className="relative w-[290px] flex flex-col gap-3 px-7 pb-7">
                {ACTIONS.map((action) => (
                    <button
                        key={action.status}
                        type="button"
                        disabled={disabled}
                        onClick={() => onAction?.(action.status)}
                        className="h-[30px] rounded-[10px] text-[var(--color-white)] text-[15px] font-semibold shadow-[0_0_10px_0_#00000040] hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:opacity-40"
                        style={{ backgroundColor: action.color }}
                    >
                        {action.label}
                    </button>
                ))}
            </div>
        </div>
    );
}