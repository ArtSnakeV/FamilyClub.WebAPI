"use client";

import { useState } from "react";
import { UserInfo } from "../../hooks/useAllUsersInfo";
import { useUserOrders } from "../../hooks/useUserOrders";
import { orderService } from "@/lib/api/services";
import type { OrderDTO } from "@/lib/api/generated";

interface Props {
    user: UserInfo;
}

export default function OrdersTab({ user }: Props) {
    const { orders, loading, refetch } = useUserOrders(user.id);
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    const handleStatusChange = async (order: any, newStatus: string) => {
        if (!order.id) return;
        setUpdatingId(order.id);
        try {
            await orderService.apiOrdersIdPut({
                id: order.id,
                orderDTO: {
                    ...order,
                    status: newStatus,
                    orderDate: order.orderDate ? new Date(order.orderDate) : new Date(),
                } as any,
            });
            if (refetch) await refetch();
        } catch (err) {
            console.error("Не вдалося оновити статус замовлення:", err);
        } finally {
            setUpdatingId(null);
        }
    };

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
                return (
                    <div
                        key={order.id}
                        className="rounded-[9px] border border-[#8D8C89]/40 p-4 flex flex-col gap-2 max-w-full"
                    >
                        <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1">
                            <span className="font-semibold text-[16px] text-[var(--color-black)] truncate">
                                Замовлення №{order.id}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">Змінити статус:</span>
                                <select
                                    disabled={updatingId === order.id}
                                    value={order.status ?? "Pending"}
                                    onChange={(e) => handleStatusChange(order, e.target.value)}
                                    className="bg-[#F5F3EE] border border-[#C8C2B4] rounded-[6px] px-2 py-1 text-xs font-semibold text-[#005b33] outline-none cursor-pointer hover:border-[#005B33] transition disabled:opacity-50"
                                >
                                    <option value="Pending">Нове (Pending)</option>
                                    <option value="Paid">Прийнято (Paid)</option>
                                    <option value="Processing">Комплектується (Processing)</option>
                                    <option value="Shipped">Відправлено (Shipped)</option>
                                    <option value="Delivered">Доставлено (Delivered)</option>
                                    <option value="Cancelled">Скасовано (Cancelled)</option>
                                    <option value="ReturnRequested">На повернення (Return)</option>
                                </select>
                            </div>
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
                                            {item.productName ?? `Товар #${item.productId}`}
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