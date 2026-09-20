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
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none admin-parchment-bg"
                style={{
                    backgroundImage:
                        "url('/images/ordersAdminPage/Rectangle 704.png')",
                    backgroundSize: "100% 100%",
                }}
            />
            <div className="flex flex-col relative z-10 gap-4 pt-10">
                <div className="flex items-center justify-between gap-3 shrink-0">
                    <h2 className="text-[18px] font-bold text-[var(--foreground-primary)] leading-tight">
                        {labels.title} {formatOrderNumber(order.id)}
                    </h2>
                    <div className="flex items-center gap-3 shrink-0">
                        <CancellationStatusBadge status={request.status} />
                        <span className="text-[18px] leading-none text-[var(--color-muted-fg)]">⋮</span>
                    </div>
                </div>
                {/* Order info */}
                <section className="rounded-[9px] bg-[var(--background-elevated)] shadow-[var(--shadow-card)] text-[13px]
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
                <section className="rounded-[9px] h-[220px]  bg-[var(--background-elevated)] shadow-[var(--shadow-card)] px-4 py-3 flex
                 flex-col gap-3 shrink-0 overflow-y-auto">
                    <h3 className="text-[20px] font-bold text-[var(--foreground-primary)]">Товари в замовленні</h3>
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
                                        className="w-12 h-16 object-cover rounded-[6px] bg-[var(--background-elevated)] shrink-0"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[13px] font-semibold text-[var(--foreground-primary)] truncate">{title}</p>
                                        <p className="text-[12px] text-[var(--color-muted-fg)] truncate">
                                            {authorName !== "—" ? authorName : "Книга"}
                                        </p>
                                    </div>
                                    <span className="text-[13px] text-[var(--color-muted-fg)] whitespace-nowrap shrink-0 w-12 text-center">
                                        {item.quantity ?? 1} шт.
                                    </span>
                                    <span className="text-[13px] font-semibold text-[var(--foreground-primary)] whitespace-nowrap shrink-0">
                                        {formatMoney(lineTotal)}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </section>

                {/* Reason */}
                <section className="flex flex-col gap-2 shrink-0">
                    <h3 className="text-[20px] font-bold text-[var(--foreground-primary)]">{labels.reasonHeading}</h3>
                    <div className="rounded-[9px] bg-[#FEF5E5] shadow-[var(--shadow-card)] px-4 py-3 flex flex-col gap-1">
                        <p className="text-[13px] text-[var(--foreground-primary)]">{request.reason}</p>
                        <p className="text-[11px] text-[var(--color-muted-fg)]">
                            Додано {formatDateTime(request.createdAt)}
                        </p>
                    </div>
                </section>

                {/* Comment + consequences */}
                <section className="flex gap-4 shrink-0">
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <label className="text-[20px] font-bold text-[var(--foreground-primary)]">
                            Коментар <span className="font-normal text-[var(--color-muted-fg)] text-[14px]">(необов&apos;язково)</span>
                        </label>
                        <div className="relative">
                            <textarea
                                value={request.managerComment}
                                onChange={(e) => onCommentChange(e.target.value)}
                                disabled={decided}
                                maxLength={500}
                                placeholder="Додайте коментар для клієнта..."
                                className="w-full h-[90px] resize-none rounded-[9px] bg-[var(--background-elevated)] shadow-[var(--shadow-card)] p-3 text-[13px] outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                            <span className="absolute bottom-2 right-3 text-[11px] text-[var(--color-muted-fg)]">
                                {request.managerComment.length}/500
                            </span>
                        </div>

                        <h3 className="text-[20px] font-bold text-[var(--foreground-primary)] mt-2">Дії менеджера</h3>
                        <p className="text-[12px] text-[var(--color-muted-fg)]">Ваше рішення</p>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onConfirm}
                                disabled={decided}
                                className="flex-1 h-[38px] rounded-[10px] bg-[var(--color-green)] text-[var(--color-cream)] text-[16px] 
                                font-semibold shadow-[var(--shadow-card)] hover:opacity-90 transition-opacity disabled:opacity-40 
                                disabled:cursor-not-allowed"
                            >
                                {labels.confirmLabel}
                            </button>
                            <button
                                type="button"
                                onClick={onReject}
                                disabled={decided}
                                className="flex-1 h-[38px] rounded-[10px] bg-transparent border border-[var(--color-green)] 
                                text-[var(--color-green)] text-[16px] font-semibold hover:bg-[color-mix(in_srgb,var(--color-green)_16%,var(--background-elevated))] transition-colors disabled:opacity-40 
                                disabled:cursor-not-allowed"
                            >
                                {labels.rejectLabel}
                            </button>
                        </div>
                    </div>

                    <div className="w-[140px] shrink-0 rounded-[9px] shadow-[var(--shadow-card)] bg-[color-mix(in_srgb,var(--color-green)_14%,var(--background-elevated))] p-3 flex flex-col gap-2">
                        <p className="text-[12px] font-bold text-[var(--foreground-primary)] leading-tight">
                            Що станеться після підтвердження?
                        </p>
                        <ul className="flex flex-col gap-1.5 text-[11px] text-[var(--foreground-primary)]">
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