"use client";

import type { ReactNode } from "react";
import type {
    ClubMemberReadDto,
    OrderDTO,
    ProductDto,
} from "@/lib/api/generated";
import {
    displayMemberName,
    formatDateTime,
    formatMoney,
    formatOrderNumber,
    getOrderExtras,
    getOrderStatusMeta,
    getProductCover,
} from "../utils/orderDisplay";

type Props = {
    order: OrderDTO | null;
    member?: ClubMemberReadDto | null;
    products: Map<number, ProductDto>;
};

export default function OrderDetailsPanel({
    order,
    member,
    products,
}: Props) {
    if (!order) {
        return (
            <div className="rounded-[12px] bg-white/70 px-5 py-8 shadow-[0_0_15px_rgba(0,0,0,0.08)] h-full flex items-center justify-center">
                <p className="text-[14px] text-[#888]">
                    Оберіть замовлення зі списку
                </p>
            </div>
        );
    }

    const status = getOrderStatusMeta(order.status);
    const extras = getOrderExtras(order);
    const items = order.orderItems ?? [];
    const visibleItems = items.slice(0, 4);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="rounded-[12px] bg-white/80 px-5 py-5 shadow-[0_0_15px_rgba(0,0,0,0.08)] flex flex-col gap-4 h-full min-h-0">
            <div className="flex items-start justify-between gap-3">
                <h2 className="text-[18px] font-bold text-[#1F1F1F] leading-tight">
                    Деталі замовлення {formatOrderNumber(order.id)}
                </h2>
                <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 rounded-[10px] bg-white border border-[#E0DCD3] px-3 py-2 text-[13px] font-semibold text-[#2F2F2F] hover:bg-[#F5F3EE] shrink-0"
                >
                    <PrinterIcon />
                    Друк
                </button>
            </div>

            <section className="rounded-[12px] bg-[#F7F4EE] px-4 py-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[13px]">
                <InfoRow label="Статус">
                    <span
                        className="font-semibold"
                        style={{ color: status.color }}
                    >
                        {status.badgeLabel}
                    </span>
                </InfoRow>
                <InfoRow label="ТТН">
                    <span className="font-medium text-[#1F1F1F]">
                        {extras.ttn}
                    </span>
                </InfoRow>
                {/* Немає в OrderDTO — тимчасово приховано
                <InfoRow label="Спосіб оплати">
                    {extras.paymentLabel}
                </InfoRow>
                <InfoRow label="Спосіб доставки">
                    {extras.deliveryLabel}
                </InfoRow>
                */}
                <InfoRow label="Дата створення">
                    {formatDateTime(order.orderDate)}
                </InfoRow>
                <InfoRow label="Дата відправлення">
                    {formatDateTime(extras.shippedAt)}
                </InfoRow>
            </section>

            <section className="rounded-[12px] bg-[#F7F4EE] px-4 py-3 flex flex-col gap-2">
                <h3 className="text-[14px] font-bold text-[#1F1F1F]">
                    Інформація про клієнта
                </h3>
                <div className="grid grid-cols-1 gap-1.5 text-[13px]">
                    <InfoRow label="ПІБ">{displayMemberName(member)}</InfoRow>
                    <InfoRow label="Email">
                        {member?.email ?? "—"}
                    </InfoRow>
                    <InfoRow label="Телефон">
                        {member?.phoneNumber ?? "—"}
                    </InfoRow>
                    {/* Немає в OrderDTO — тимчасово приховано
                    <InfoRow label="Адреса доставки">
                        {extras.address}
                    </InfoRow>
                    */}
                </div>
            </section>

            <section className="rounded-[12px] bg-[#F7F4EE] px-4 py-3 flex flex-col gap-3 flex-1 min-h-0">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-[14px] font-bold text-[#1F1F1F]">
                        Товари в замовленні
                    </h3>
                    {items.length > 4 && (
                        <button
                            type="button"
                            className="text-[12px] font-semibold text-[#005b33] hover:underline"
                        >
                            Переглянути все
                        </button>
                    )}
                </div>

                {visibleItems.length === 0 ? (
                    <p className="text-[13px] text-[#888]">Немає товарів</p>
                ) : (
                    <ul className="flex flex-col gap-3 overflow-y-auto">
                        {visibleItems.map((item, idx) => {
                            const cover = getProductCover(
                                item.productId,
                                products
                            );
                            const title =
                                item.productName ||
                                `Товар #${item.productId ?? "—"}`;
                            const lineTotal =
                                (item.unitPrice ?? 0) * (item.quantity ?? 1);

                            return (
                                <li
                                    key={item.id ?? `${item.productId}-${idx}`}
                                    className="flex items-center gap-3"
                                >
                                    <img
                                        src={cover}
                                        alt=""
                                        className="w-12 h-16 object-cover rounded-[6px] bg-white shrink-0"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[13px] font-semibold text-[#1F1F1F] truncate">
                                            {title}
                                        </p>
                                        <p className="text-[12px] text-[#777] truncate">
                                            {item.format
                                                ? `Формат: ${item.format}`
                                                : "Книга"}
                                        </p>
                                        <p className="text-[12px] text-[#555] mt-0.5">
                                            {item.quantity ?? 1} шт.
                                        </p>
                                    </div>
                                    <span className="text-[13px] font-semibold text-[#1F1F1F] whitespace-nowrap">
                                        {formatMoney(lineTotal)}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                )}

                <div className="mt-auto pt-3 border-t border-[#E0DCD3] flex items-center justify-between">
                    <span className="text-[14px] font-bold text-[#1F1F1F]">
                        Разом
                    </span>
                    <span className="text-[16px] font-bold text-[#1F1F1F]">
                        {formatMoney(order.totalPrice)}
                    </span>
                </div>
            </section>
        </div>
    );
}

function InfoRow({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <div className="flex gap-2 min-w-0">
            <span className="text-[#777] shrink-0">{label}:</span>
            <span className="text-[#2F2F2F] min-w-0 break-words">
                {children}
            </span>
        </div>
    );
}

function PrinterIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
        >
            <path
                d="M6 9V3h12v6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6 17H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6 14h12v7H6v-7Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
