"use client";

import { useState, useMemo } from "react";
import StatusBadge from "./StatusBadge";
import Pagination from "./Pagination";
import type { OrderDTO } from "@/lib/api/generated";

interface OrdersListProps {
    orders: OrderDTO[];
    selectedId?: number | null;
    onSelectOrder?: (order: OrderDTO) => void;
    pageSize?: number;
}

export default function OrdersList({
    orders,
    selectedId,
    onSelectOrder,
    pageSize = 10,
}: OrdersListProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(orders.length / pageSize));

    const pageOrders = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return orders.slice(start, start + pageSize);
    }, [orders, currentPage, pageSize]);

    return (
        <div className="w-[600px] h-[700px] bg-[var(--color-white)] rounded-[20px] ml-3 px-6 py-4">
            <div className="grid grid-cols-[1.2fr_1.5fr_1fr_1fr_1fr] gap-4 px-4 pb-3 border-b border-[#D8D3C4] text-[14px] text-[var(--color-black)]">
                <span>№ Замовлення</span>
                <span>Клієнт</span>
                <span>Сума</span>
                <span>Статус</span>
                <span>Дата</span>
            </div>

            <div className="flex flex-col gap-4 mt-3 ">
                {pageOrders.map((order) => {
                    const isSelected = selectedId === order.id;

                    return (
                        <button
                            key={order.id}
                            onClick={() => onSelectOrder?.(order)}
                            className={`grid grid-cols-[1.2fr_1.5fr_1fr_1fr_1fr] gap-4 shadow-[0px_0px_10px_0px_#00000040] items-center px-4 py-3 rounded-[9px] text-left text-sm transition-colors ${isSelected
                                    ? "bg-[#F6DFC4]"
                                    : "bg-white hover:bg-[#F0EDE3]"
                                }`}
                        >
                            <span className="text-[#2A2A2A]">#{order.id ?? "—"}</span>
                            <span className="text-[#2A2A2A] truncate">
                                {order.userName ?? order.userId ?? "—"}
                            </span>
                            <span className="text-[#2A2A2A]">
                                {order.totalPrice ?? 0}₴
                            </span>
                            <StatusBadge status={order.status ?? "Pending"} />
                            <span className="text-[#6B6B6B]">
                                {order.orderDate
                                    ? new Date(order.orderDate).toLocaleDateString("uk-UA")
                                    : "—"}
                            </span>
                        </button>
                    );
                })}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}