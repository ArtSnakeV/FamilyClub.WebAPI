"use client";

import type { OrderDTO, ClubMemberReadDto } from "@/lib/api/generated";
import { usePagination } from "../hooksR/usePagination";
import PaginationOrders from "./PaginationOrders";
import {
    displayMemberName,
    formatDate,
    formatMoney,
    formatOrderNumber,
} from "../utilsR/OrderDisplay";
import StatusBadge from "../sectionR/StatusBadge";
import { CancellationRequest } from "../hooksR/useCancellationRequests";
import CancellationStatusBadge from "../sectionR/CancellationStatusBadge";

interface OrdersListProps {
    orders: OrderDTO[];
    members: Map<string, ClubMemberReadDto>;
    selectedId?: number | null;
    onSelectOrder?: (order: OrderDTO | null) => void;
    pageSize?: number;
    /** Мок-запити на скасування — поки нема бекенда під це. */
    cancellationRequests?: Record<number, CancellationRequest>;
}

export default function OrdersList({
    orders,
    members,
    selectedId,
    onSelectOrder,
    pageSize = 10,
    cancellationRequests,
}: OrdersListProps) {
    const { currentPage, totalPages, paginatedItems, setCurrentPage } =
        usePagination(orders, pageSize);

    return (
        <div className="w-[600px] max-w-[700px] h-[880px] shadow-[var(--shadow-card)] flex flex-col bg-[var(--background-elevated)] border border-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)] rounded-[20px] ml-3 px-6 py-4">
            <div className="grid grid-cols-[1.2fr_1.5fr_1fr_1fr_1fr] gap-4 px-4 pb-3 border-b border-[color-mix(in_srgb,var(--foreground-primary)_22%,transparent)] text-[14px] text-[var(--foreground-primary)] shrink-0">
                <span>№ Замовлення</span>
                <span>Клієнт</span>
                <span>Сума</span>
                <span>Статус</span>
                <span>Дата</span>
            </div>

            <div className="flex flex-col gap-4 mt-3 flex-1 p-2 overflow-y-auto">
                {paginatedItems.map((order) => {
                    const isSelected = selectedId === order.id;
                    const member = order.userId
                        ? members.get(order.userId)
                        : undefined;

                    const cancellationRequest =
                        order.id != null
                            ? cancellationRequests?.[order.id]
                            : undefined;
                    const showCancellationBadge =
                        cancellationRequest?.status === "pending";
                    return (
                        <button
                            key={order.id}
                            onClick={() =>
                                onSelectOrder?.(isSelected ? null : order)
                            }
                            className={`grid grid-cols-[1.2fr_1.5fr_1fr_1fr_1fr] p-2 gap-4 shadow-[var(--shadow-card)]
                                items-center px-4 py-3 rounded-[9px] text-left text-sm transition-colors border border-[color-mix(in_srgb,var(--foreground-primary)_10%,transparent)] ${
                                    isSelected
                                        ? "bg-[color-mix(in_srgb,var(--color-green)_18%,var(--background-elevated))]"
                                        : "bg-[var(--background-elevated)] hover:bg-[color-mix(in_srgb,var(--color-green)_12%,var(--background-elevated))]"
                                }`}
                        >
                            <span className="text-[var(--foreground-primary)]">
                                {formatOrderNumber(order.id)}
                            </span>
                            <span className="text-[var(--foreground-primary)] truncate">
                                {displayMemberName(member)}
                            </span>
                            <span className="text-[var(--foreground-primary)]">
                                {formatMoney(order.totalPrice)}
                            </span>
                            {showCancellationBadge ? (
                                <div className="flex flex-col gap-0.5">
                                    <CancellationStatusBadge
                                        status={cancellationRequest!.status}
                                    />
                                    <span
                                        className="text-[12px] font-medium leading-none"
                                        style={{
                                            color:
                                                cancellationRequest!.type ===
                                                "return"
                                                    ? "#761283"
                                                    : "#AC3C3C",
                                        }}
                                    >
                                        {cancellationRequest!.type === "return"
                                            ? "Повернення"
                                            : "Скасування"}
                                    </span>
                                </div>
                            ) : (
                                <StatusBadge status={order.status ?? ""} />
                            )}
                            <span className="text-[var(--color-muted-fg)]">
                                {formatDate(order.orderDate)}
                            </span>
                        </button>
                    );
                })}
            </div>
            <div className="w-full flex justify-center pt-4 mt-2 shrink-0">
                <PaginationOrders
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}
