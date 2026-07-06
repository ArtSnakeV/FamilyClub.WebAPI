"use client";

import { UserInfo } from "../../hooks/useAllUsersInfo";
import { useUserOrders } from "../../hooks/useUserOrders";

interface Props {
    user: UserInfo;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
    Pending: { label: "Очікує обробки", color: "text-yellow-600" },
    Processing: { label: "В обробці", color: "text-yellow-600" },
    Completed: { label: "Виконано", color: "text-[var(--color-green)]" },
    Delivered: { label: "Доставлено", color: "text-[var(--color-green)]" },
    Cancelled: { label: "Скасовано", color: "text-[#981717]" },
};

export default function OrdersTab({ user }: Props) {
    const { orders, loading } = useUserOrders(user.id);

    if (loading) {
        return <p className="text-sm text-[var(--color-black)]">Завантаження...</p>;
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-[var(--color-black)] font-semibold text-[18px]">
                    Замовлень поки немає
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    Тут з'являться всі замовлення користувача
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 max-w-full">
            {orders.map((order) => {
                const status = STATUS_LABELS[order.status] ?? {
                    label: order.status,
                    color: "text-gray-500",
                };

                return (
                    <div
                        key={order.id}
                        className="rounded-[9px] border border-[#8D8C89]/40 p-4 flex flex-col gap-2 max-w-full"
                    >
                        <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1">
                            <span className="font-semibold text-[16px] text-[var(--color-black)] truncate">
                                Замовлення №{order.id}
                            </span>
                            <span className={`text-sm font-medium whitespace-nowrap ${status.color}`}>
                                {status.label}
                            </span>
                        </div>

                        <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
                            <span className="text-gray-500 whitespace-nowrap">
                                {new Date(order.orderDate).toLocaleDateString("uk-UA", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </span>
                            <span className="font-medium text-[var(--color-black)] whitespace-nowrap">
                                {order.totalPrice.toLocaleString("uk-UA")} грн
                            </span>
                        </div>

                        {order.orderItems?.length > 0 && (
                            <div className="flex flex-col gap-1 mt-1 pt-2 border-t border-[#8D8C89]/20">
                                {order.orderItems.map((item) => (
                                    <div
                                        key={item.id ?? `${item.productId}-${item.format}`}
                                        className="flex flex-wrap justify-between gap-x-4 text-sm text-gray-600"
                                    >
                                        <span className="truncate min-w-0 flex-1">
                                            Товар #{item.productId}
                                            {item.format ? ` (${item.format})` : ""}
                                        </span>
                                        <span className="whitespace-nowrap shrink-0">
                                            {item.quantity} × {item.unitPrice.toLocaleString("uk-UA")} грн
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}