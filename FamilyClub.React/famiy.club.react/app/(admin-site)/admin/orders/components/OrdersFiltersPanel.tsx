"use client";

import {
    // DELIVERY_OPTIONS,
    // PAYMENT_OPTIONS,
    ADMIN_ORDER_STATUS_META,
    type AdminOrderStatusId,
} from "../utils/orderDisplay";
import type { OrdersFilterState } from "../utils/filterOrders";

type Props = {
    draft: OrdersFilterState;
    onChange: (next: OrdersFilterState) => void;
    onApply: () => void;
};

const selectClass =
    "rounded-[10px] border border-[#E0DCD3] bg-white px-3 py-2.5 text-[13px] text-[#2F2F2F] outline-none focus:border-[#005b33] w-full";

export default function OrdersFiltersPanel({
    draft,
    onChange,
    onApply,
}: Props) {
    const set = <K extends keyof OrdersFilterState>(
        key: K,
        value: OrdersFilterState[K]
    ) => onChange({ ...draft, [key]: value });

    return (
        <div className="rounded-[12px] bg-white/90 px-4 py-4 shadow-[0_0_15px_rgba(0,0,0,0.08)] flex flex-col gap-3">
            <h3 className="text-[15px] font-bold text-[#1F1F1F]">Фільтри</h3>

            <label className="flex flex-col gap-1">
                <span className="text-[12px] text-[#777]">Пошук</span>
                <div className="relative">
                    <input
                        value={draft.search}
                        onChange={(e) => set("search", e.target.value)}
                        placeholder="№ замовлення, ім'я або email"
                        className={`${selectClass} pl-9`}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999] text-[14px]">
                        ⌕
                    </span>
                </div>
            </label>

            <label className="flex flex-col gap-1">
                <span className="text-[12px] text-[#777]">Статус</span>
                <select
                    value={draft.status}
                    onChange={(e) =>
                        set(
                            "status",
                            e.target.value as OrdersFilterState["status"]
                        )
                    }
                    className={selectClass}
                >
                    <option value="all">Всі статуси</option>
                    {(
                        Object.keys(ADMIN_ORDER_STATUS_META) as AdminOrderStatusId[]
                    ).map((id) => (
                        <option key={id} value={id}>
                            {ADMIN_ORDER_STATUS_META[id].tabLabel}
                        </option>
                    ))}
                </select>
            </label>

            {/* Немає в OrderDTO — тимчасово приховано
            <label className="flex flex-col gap-1">
                <span className="text-[12px] text-[#777]">Спосіб оплати</span>
                <select
                    value={draft.payment}
                    onChange={(e) => set("payment", e.target.value)}
                    className={selectClass}
                >
                    <option value="all">Всі способи</option>
                    {PAYMENT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            </label>

            <label className="flex flex-col gap-1">
                <span className="text-[12px] text-[#777]">Спосіб доставки</span>
                <select
                    value={draft.delivery}
                    onChange={(e) => set("delivery", e.target.value)}
                    className={selectClass}
                >
                    <option value="all">Всі способи</option>
                    {DELIVERY_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            </label>
            */}

            <div className="flex flex-col gap-1">
                <span className="text-[12px] text-[#777]">Дата створення</span>
                <div className="grid grid-cols-2 gap-2">
                    <label className="flex flex-col gap-1">
                        <span className="text-[11px] text-[#999]">Від</span>
                        <input
                            type="date"
                            value={draft.dateFrom}
                            onChange={(e) => set("dateFrom", e.target.value)}
                            className={selectClass}
                        />
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="text-[11px] text-[#999]">До</span>
                        <input
                            type="date"
                            value={draft.dateTo}
                            onChange={(e) => set("dateTo", e.target.value)}
                            className={selectClass}
                        />
                    </label>
                </div>
            </div>

            <button
                type="button"
                onClick={onApply}
                className="mt-1 w-full rounded-[10px] bg-[var(--color-green)] px-4 py-3 text-[14px] font-semibold text-white hover:opacity-95 transition"
            >
                Застосувати фільтри
            </button>
        </div>
    );
}
