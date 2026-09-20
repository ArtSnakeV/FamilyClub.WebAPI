"use client";

import type { OrderDTO } from "@/lib/api/generated";
import { type AdminOrderStatusId } from "../utilsR/OrderDisplay";

interface OrderActionItem {
    status: AdminOrderStatusId;
    label: string;
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
        <div className="relative w-[330px] max-w-[400px] mt-4">
            <img
                src="/images/ordersAdminPage/Rectangle 705.png"
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-fill pointer-events-none admin-parchment-bg"
            />

            <div className="relative z-10 flex flex-col items-center gap-3 px-10 pt-6 pb-7">
                <p className="w-full text-[20px] text-[var(--foreground-primary)] font-bold text-center">
                    Дії із замовленням
                </p>

                <div className="w-full flex flex-col gap-3">
                    {ACTIONS.map((action) => (
                        <button
                            key={action.status}
                            type="button"
                            disabled={disabled}
                            onClick={() => onAction?.(action.status)}
                            className="h-[30px] w-full rounded-[10px] text-[var(--color-cream)] text-[15px] font-semibold shadow-[var(--shadow-card)] hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:opacity-40"
                            style={{ backgroundColor: action.color }}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
