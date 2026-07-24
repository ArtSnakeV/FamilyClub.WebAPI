"use client";

import type { ReactNode } from "react";
import type {
    AuthorDTO,
    ClubMemberReadDto,
    OrderDTO,
    ProductDto,
} from "@/lib/api/generated";
import {
    displayMemberName,
    formatDateTime,
    formatMoney,
    formatOrderNumber,
    getAuthorNameForProduct,
    getOrderExtras,
    getOrderStatusMeta,
    getProductCover,
} from "../utilsR/OrderDisplay";
import Image from "next/image";
import userImg from "@/public/images/ordersAdminPage/userImg.png"
import shopingCart from "@/public/images/ordersAdminPage/shopingCart.png"
import { InfoRowInline, InfoRowStacked } from "./InfoRow";

type Props = {
    order: OrderDTO | null;
    member?: ClubMemberReadDto | null;
    products: Map<number, ProductDto>;
    authors: Map<number, AuthorDTO>;
};

export default function OrderDetail({
    order,
    member,
    products,
    authors,
}: Props) {
    if (!order) {
        return (
            <div
                className="w-[500px] max-w-[600px] shadow-[0px_0px_15px_0px_#00000040] items-center flex flex-col bg-[var(--color-white)] rounded-[20px] ml-3 px-6 py-4"
                style={{ height: 760 }}
            >
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
        <div
            className="rounded-[20px] w-[500px] max-w-[600px] bg-[var(--color-white)] shadow-[0px_0px_15px_0px_#00000040] px-5 py-5 
        shadow-[0_0_15px_rgba(0,0,0,0.08)] flex flex-col gap-4 min-h-0"
            style={{ height: 760 }}
        >
            {/* Header */}
            <div className="flex flex-row items-center justify-between gap-4 shrink-0">
                <h2 className="text-[18px] font-bold text-[#1F1F1F] leading-tight">
                    Деталі замовлення {formatOrderNumber(order.id)}
                </h2>
                <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 rounded-[10px] bg-transparent border-1 border-[var(--color-black)] px-3 py-2 text-[13px] font-semibold text-[#2F2F2F] hover:bg-[#F5F3EE] shrink-0"
                >
                    <Image src="/images/ordersAdminPage/printer.png" alt="printer" width={20} height={20} />
                    Друк
                </button>
            </div>

            {/* Status / dates / delivery card */}
            <section className="rounded-[9px] bg-[var(--color-white)] shadow-[0_0_10px_0_#00000040] text-[13px]
            flex flex-row gap-6 px-5 py-4 shrink-0">
                <div className="flex flex-col gap-3 flex-1 min-w-0">
                    <InfoRowInline label="Статус">
                        <span className="font-semibold" style={{ color: status.color }}>
                            {status.badgeLabel}
                        </span>
                    </InfoRowInline>

                    <InfoRowInline label="ТТН">
                        <span className="font-medium text-[#1F1F1F]">
                            {extras.ttn ?? "—"}
                        </span>
                    </InfoRowInline>

                    <InfoRowStacked label="Спосіб оплати">
                        {extras.paymentLabel ?? "—"}
                    </InfoRowStacked>

                    <InfoRowStacked label="Спосіб доставки">
                        {extras.deliveryLabel ?? "—"}
                    </InfoRowStacked>
                </div>

                <div className="flex flex-col gap-3 flex-1 min-w-0">
                    <InfoRowStacked label="Дата створення">
                        {formatDateTime(order.orderDate)}
                    </InfoRowStacked>

                    <InfoRowStacked label="Дата відправлення">
                        {formatDateTime(extras.shippedAt)}
                    </InfoRowStacked>
                </div>
            </section>

            {/* Customer info */}
            <section className="rounded-[9px] bg-[var(--color-white)] shadow-[0_0_10px_0_#00000040] text-[13px]
            flex flex-col gap-6 px-5 py-4 shrink-0">
                <h3 className="flex items-center gap-2 text-[14px] font-bold text-[#1F1F1F]">
                    <Image src={userImg} alt="" width={16} height={16} />
                    Інформація про клієнта
                </h3>
                <div className="flex flex-row gap-6 text-[13px]">
                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                        <InfoRowStacked label="Ім'я">
                            {displayMemberName(member)}
                        </InfoRowStacked>
                        <InfoRowStacked label="Телефон">
                            {member?.phoneNumber ?? "—"}
                        </InfoRowStacked>
                    </div>
                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                        <InfoRowStacked label="Email">
                            {member?.email ?? "—"}
                        </InfoRowStacked>
                        <InfoRowStacked label="Адреса доставки">
                            {extras.address ?? "—"}
                        </InfoRowStacked>
                    </div>
                </div>
            </section>

            {/* Products */}
            <section className="rounded-[9px] shadow-[0_0_10px_0_#00000040] bg-[#F7F4EE] px-4 py-3 flex flex-col gap-4 flex-1 min-h-0">
                <div className="flex items-center justify-between gap-2 shrink-0">
                    <h3 className="flex items-center gap-2 text-[14px] font-bold text-[#1F1F1F]">
                        <Image src={shopingCart} alt="" width={16} height={16} />
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
                    <ul className="flex flex-col gap-3 overflow-y-auto min-h-0">
                        {visibleItems.map((item, idx) => {
                            const cover = getProductCover(
                                item.productId,
                                products
                            );
                            const title =
                                item.productName ||
                                products.get(item.productId ?? -1)?.productName ||
                                `Товар #${item.productId ?? "—"}`;
                            const authorName = getAuthorNameForProduct(
                                item.productId,
                                products,
                                authors
                            );
                            const lineTotal =
                                (item.unitPrice ?? 0) * (item.quantity ?? 1);

                            return (
                                <li
                                    key={item.id ?? `${item.productId}-${idx}`}
                                    className="flex items-center gap-3 border-b pb-2 border-[#8D8C89]"
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
                                            {authorName !== "—"
                                                ? authorName
                                                : item.format
                                                  ? `Формат: ${item.format}`
                                                  : "Книга"}
                                        </p>
                                    </div>
                                    <span className="text-[13px] text-[#555] whitespace-nowrap shrink-0 w-12 text-center">
                                        {item.quantity ?? 1} шт.
                                    </span>
                                    <span className="text-[13px] font-semibold text-[#1F1F1F] whitespace-nowrap shrink-0 p-2">
                                        {formatMoney(lineTotal)}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                )}

                <div className="mt-auto pt-3 border-t border-[#8D8C89] flex items-center justify-between shrink-0">
                    <span className="text-[14px] font-bold text-[var(--color-black)]">
                        Разом:
                    </span>
                    <span className="text-[16px] font-bold text-[var(--color-black)]">
                        {formatMoney(order.totalPrice)}
                    </span>
                </div>
            </section>
        </div>
    );
}
