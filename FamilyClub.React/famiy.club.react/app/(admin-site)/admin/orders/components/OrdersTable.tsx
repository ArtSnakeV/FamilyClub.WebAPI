"use client";

import type { ClubMemberReadDto, OrderDTO } from "@/lib/api/generated";
import {
    displayMemberName,
    formatDate,
    formatMoney,
    formatOrderNumber,
    getOrderStatusMeta,
} from "../utils/orderDisplay";
import OrdersPagination from "./OrdersPagination";

type Props = {
    orders: OrderDTO[];
    members: Map<string, ClubMemberReadDto>;
    selectedId: number | null;
    onSelect: (id: number) => void;
    page: number;
    pageSize?: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
};

export default function OrdersTable({
    orders,
    members,
    selectedId,
    onSelect,
    page,
    pageSize = 10,
    onPageChange,
    isLoading,
}: Props) {
    const totalPages = Math.max(1, Math.ceil(orders.length / pageSize));
    const safePage = Math.min(page, totalPages);
    const slice = orders.slice(
        (safePage - 1) * pageSize,
        safePage * pageSize
    );

    return (
        <div className="flex flex-col min-h-0 h-full">
            {isLoading ? (
                <div className="flex justify-center py-16">
                    <div className="w-8 h-8 border-4 border-[#005b33] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : slice.length === 0 ? (
                <p className="text-center text-[14px] text-[#888] py-12">
                    Замовлень за обраними фільтрами немає
                </p>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[520px] text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="text-[12px] text-[#777]">
                                    <th className="font-semibold px-3 pb-1">
                                        № Замовлення
                                    </th>
                                    <th className="font-semibold px-3 pb-1">
                                        Клієнт
                                    </th>
                                    <th className="font-semibold px-3 pb-1">
                                        Сума
                                    </th>
                                    <th className="font-semibold px-3 pb-1">
                                        Статус
                                    </th>
                                    <th className="font-semibold px-3 pb-1">
                                        Дата
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {slice.map((order) => {
                                    const id = order.id ?? 0;
                                    const selected = selectedId === id;
                                    const member = order.userId
                                        ? members.get(order.userId)
                                        : undefined;
                                    const status = getOrderStatusMeta(
                                        order.status
                                    );

                                    return (
                                        <tr
                                            key={id}
                                            onClick={() => onSelect(id)}
                                            className={`cursor-pointer transition ${
                                                selected
                                                    ? "bg-[#F3D9C4]"
                                                    : "bg-[#F5F3EE] hover:bg-[#EFEAE2]"
                                            }`}
                                        >
                                            <td className="rounded-l-[10px] px-3 py-3 text-[13px] font-semibold text-[#1F1F1F] whitespace-nowrap">
                                                {formatOrderNumber(id)}
                                            </td>
                                            <td className="px-3 py-3 text-[13px] text-[#2F2F2F] max-w-[140px] truncate">
                                                {displayMemberName(member)}
                                            </td>
                                            <td className="px-3 py-3 text-[13px] font-medium text-[#1F1F1F] whitespace-nowrap">
                                                {formatMoney(order.totalPrice)}
                                            </td>
                                            <td className="px-3 py-3 text-[13px] font-semibold whitespace-nowrap">
                                                <span
                                                    style={{
                                                        color: status.color,
                                                    }}
                                                >
                                                    {status.badgeLabel}
                                                </span>
                                            </td>
                                            <td className="rounded-r-[10px] px-3 py-3 text-[13px] text-[#2F2F2F] whitespace-nowrap">
                                                {formatDate(order.orderDate)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <OrdersPagination
                        page={safePage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                </>
            )}
        </div>
    );
}
