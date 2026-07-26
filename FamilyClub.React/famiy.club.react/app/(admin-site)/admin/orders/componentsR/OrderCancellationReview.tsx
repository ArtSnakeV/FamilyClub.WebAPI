"use client";

import type { AuthorDTO, ClubMemberReadDto, OrderDTO, ProductDto } from "@/lib/api/generated";
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
import { InfoRowInline } from "../sectionR/InfoRow";
import type { CancellationRequest, OrderRequestType } from "../hooksR/useCancellationRequests";
import CancellationStatusBadge from "../sectionR/CancellationStatusBadge";

const REQUEST_TYPE_LABELS: Record<
    OrderRequestType,
    {
        title: string;
        reasonHeading: string;
        confirmLabel: string;
        rejectLabel: string;
        consequences: string[];
    }
> = {
    cancellation: {
        title: "Скасування замовлення",
        reasonHeading: "Причина скасування",
        confirmLabel: "✓ Підтвердити скасування",
        rejectLabel: "✕ Відмовити скасування",
        consequences: [
            "✓ Замовлення буде скасовано",
            "✓ Кошти буде повернуто клієнту",
            "✓ Товари повернуться в наявність",
            "✓ Клієнту буде надіслано повідомлення",
        ],
    },
    return: {
        title: "Повернення замовлення",
        reasonHeading: "Причина повернення",
        confirmLabel: "✓ Підтвердити повернення",
        rejectLabel: "✕ Відмовити повернення",
        consequences: [
            "✓ Замовлення буде позначено як повернене",
            "✓ Кошти буде повернуто клієнту",
            "✓ Товари повернуться в наявність",
            "✓ Клієнту буде надіслано повідомлення",
        ],
    },
};

interface OrderCancellationReviewProps {
    order: OrderDTO;
    member?: ClubMemberReadDto | null;
    products: Map<number, ProductDto>;
    authors: Map<number, AuthorDTO>;
    request: CancellationRequest;
    onCommentChange: (comment: string) => void;
    onConfirm: () => void;
    onReject: () => void;
}

export default function OrderCancellationReview({
    order,
    member,
    products,
    authors,
    request,
    onCommentChange,
    onConfirm,
    onReject,
}: OrderCancellationReviewProps) {
    const status = getOrderStatusMeta(order.status);
    const extras = getOrderExtras(order);
    const items = order.orderItems ?? [];
    const decided = request.status !== "pending";
    const labels = REQUEST_TYPE_LABELS[request.type];

    return (
        <div className="relative w-[740px] items-center max-w-[760px] flex flex-col">
            <img
                src="/images/ordersAdminPage/Rectangle 704.png"
                className="absolute"
                style={{ width: "740px", height: "900px" }}
                alt=""
            />
            <div className="flex flex-col relative gap-4 pt-10">
                <div className="flex items-center justify-between gap-3 shrink-0">
                    <h2 className="text-[18px] font-bold text-[#1F1F1F] leading-tight">
                        {labels.title} {formatOrderNumber(order.id)}
                    </h2>
                    <div className="flex items-center gap-3 shrink-0">
                        <CancellationStatusBadge status={request.status} />
                        <span className="text-[18px] leading-none text-[#8D8C89]">⋮</span>
                    </div>
                </div>
                {/* Order info */}
                <section className="rounded-[9px] bg-[var(--color-white)] shadow-[0_0_10px_0_#00000040] text-[13px]
            grid grid-cols-2 gap-x-6 gap-y-3 px-5 py-4 shrink-0">
                    <InfoRowInline label="Клієнт">{displayMemberName(member)}</InfoRowInline>
                    <InfoRowInline label="Спосіб доставки">{extras.deliveryLabel}</InfoRowInline>

                    <InfoRowInline label="Дата замовлення">{formatDateTime(order.orderDate)}</InfoRowInline>
                    <InfoRowInline label="Місто доставки">{extras.address}</InfoRowInline>

                    <InfoRowInline label="Статус замовлення">
                        <span className="font-semibold" style={{ color: status.color }}>
                            {status.badgeLabel}
                        </span>
                    </InfoRowInline>
                    <InfoRowInline label="Сума замовлення">{formatMoney(order.totalPrice)}</InfoRowInline>

                    <InfoRowInline label="Спосіб оплати">{extras.paymentLabel}</InfoRowInline>
                    <InfoRowInline label="Номер ТТН">{extras.ttn}</InfoRowInline>
                </section>

                {/* Products */}
                <section className="rounded-[9px] h-[220px]  bg-[var(--colo-white)] shadow-[0_0_10px_0_#00000040] px-4 py-3 flex
                 flex-col gap-3 shrink-0 overflow-y-auto">
                    <h3 className="text-[20px] font-bold text-[var(--color-black)]">Товари в замовленні</h3>
                    <ul className="flex flex-col gap-3">
                        {items.map((item, idx) => {
                            const cover = getProductCover(item.productId, products);
                            const title =
                                item.productName ||
                                products.get(item.productId ?? -1)?.productName ||
                                `Товар #${item.productId ?? "—"}`;
                            const authorName = getAuthorNameForProduct(item.productId, products, authors);
                            const lineTotal = (item.unitPrice ?? 0) * (item.quantity ?? 1);

                            return (
                                <li key={item.id ?? `${item.productId}-${idx}`} className="flex items-center gap-3">
                                    <img
                                        src={cover}
                                        alt=""
                                        className="w-12 h-16 object-cover rounded-[6px] bg-white shrink-0"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[13px] font-semibold text-[#1F1F1F] truncate">{title}</p>
                                        <p className="text-[12px] text-[#777] truncate">
                                            {authorName !== "—" ? authorName : "Книга"}
                                        </p>
                                    </div>
                                    <span className="text-[13px] text-[#555] whitespace-nowrap shrink-0 w-12 text-center">
                                        {item.quantity ?? 1} шт.
                                    </span>
                                    <span className="text-[13px] font-semibold text-[#1F1F1F] whitespace-nowrap shrink-0">
                                        {formatMoney(lineTotal)}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </section>

                {/* Reason */}
                <section className="flex flex-col gap-2 shrink-0">
                    <h3 className="text-[20px] font-bold text-[var(--color-black)]">{labels.reasonHeading}</h3>
                    <div className="rounded-[9px] bg-[#FEF5E5] shadow-[0_0_10px_0_#00000040] px-4 py-3 flex flex-col gap-1">
                        <p className="text-[13px] text-[var(--color-black)]">{request.reason}</p>
                        <p className="text-[11px] text-[#8D8C89]">
                            Додано {formatDateTime(request.createdAt)}
                        </p>
                    </div>
                </section>

                {/* Comment + consequences */}
                <section className="flex gap-4 shrink-0">
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <label className="text-[20px] font-bold text-[var(--color-black)]">
                            Коментар <span className="font-normal text-[#8D8C89] text-[14px]">(необов&apos;язково)</span>
                        </label>
                        <div className="relative">
                            <textarea
                                value={request.managerComment}
                                onChange={(e) => onCommentChange(e.target.value)}
                                disabled={decided}
                                maxLength={500}
                                placeholder="Додайте коментар для клієнта..."
                                className="w-full h-[90px] resize-none rounded-[9px] bg-[var(--color-white)] shadow-[0_0_10px_0_#00000040] p-3 text-[13px] outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                            <span className="absolute bottom-2 right-3 text-[11px] text-[#8D8C89]">
                                {request.managerComment.length}/500
                            </span>
                        </div>

                        <h3 className="text-[20px] font-bold text-[var(--color-black)] mt-2">Дії менеджера</h3>
                        <p className="text-[12px] text-[#8D8C89]">Ваше рішення</p>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onConfirm}
                                disabled={decided}
                                className="flex-1 h-[38px] rounded-[10px] bg-[#005B33] text-[var(--color-white)] text-[16px] 
                                font-semibold shadow-[0_0_10px_0_#00000040] hover:opacity-90 transition-opacity disabled:opacity-40 
                                disabled:cursor-not-allowed"
                            >
                                {labels.confirmLabel}
                            </button>
                            <button
                                type="button"
                                onClick={onReject}
                                disabled={decided}
                                className="flex-1 h-[38px] rounded-[10px] bg-transparent border border-[#005B33] 
                                text-[var(--color-green)] text-[16px] font-semibold hover:bg-black/5 transition-colors disabled:opacity-40 
                                disabled:cursor-not-allowed"
                            >
                                {labels.rejectLabel}
                            </button>
                        </div>
                    </div>

                    <div className="w-[140px] shrink-0 rounded-[9px] shadow-[0_0_10px_0_#00000040] bg-[#EEF5EE] p-3 flex flex-col gap-2">
                        <p className="text-[12px] font-bold text-[var(--color-black)] leading-tight">
                            Що станеться після підтвердження?
                        </p>
                        <ul className="flex flex-col gap-1.5 text-[11px] text-[#3A3A3A]">
                            {labels.consequences.map((line) => (
                                <li key={line}>{line}</li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}