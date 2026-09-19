"use client";

import SearchOrders from "../sectionR/SearchOrders";
import FilterSelect from "../sectionR/FilterSelect";
import DateField from "../sectionR/DateField";
import {
    useOrdersFilterForm,
    type OrdersFiltersValue,
} from "../hooksR/useOrdersFilterForm";
import {
    ADMIN_ORDER_STATUS_META,
    PAYMENT_OPTIONS,
    DELIVERY_OPTIONS,
} from "../utilsR/OrderDisplay";

export type { OrdersFiltersValue };

interface LeftFilterBlockProps {
    onApply?: (filters: OrdersFiltersValue) => void;
    onReset?: () => void;
}

const STATUS_OPTIONS = [
    { value: "", label: "Всі статуси" },
    ...Object.entries(ADMIN_ORDER_STATUS_META).map(([value, meta]) => ({
        value,
        label: meta.tabLabel,
    })),
];

const PAYMENT_SELECT_OPTIONS = [
    { value: "", label: "Всі" },
    ...PAYMENT_OPTIONS.map((p) => ({ value: p.value, label: p.label })),
];

const DELIVERY_SELECT_OPTIONS = [
    { value: "", label: "Всі" },
    ...DELIVERY_OPTIONS.map((d) => ({ value: d.value, label: d.label })),
];

export default function LeftFilterBlock({
    onApply,
    onReset,
}: LeftFilterBlockProps) {
    const {
        values,
        setSearch,
        setStatus,
        setPayment,
        setDelivery,
        setDateFrom,
        setDateTo,
        handleApply,
        handleReset,
    } = useOrdersFilterForm({ onApply, onReset });

    return (
        <div className="relative w-[330px] max-w-[400px] -mt-2">
            {/* Раніше було height: 610px — контент вищий, кнопки вилазили за малюнок */}
            <img
                src="/images/ordersAdminPage/Rectangle 705.png"
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-fill pointer-events-none admin-parchment-bg"
            />

            <div className="relative z-10 flex flex-col items-center gap-3 px-7 pt-8 pb-8">
                <p className="w-full text-[20px] text-[var(--foreground-primary)] font-bold pl-1">
                    Фільтри
                </p>

                <SearchOrders
                    searchPlaceholder="№ замовлення, ім’я, email..."
                    searchValue={values.search}
                    onSearchChange={setSearch}
                />

                <FilterSelect
                    label="Статус"
                    value={values.status}
                    onChange={setStatus}
                    options={STATUS_OPTIONS}
                />

                <FilterSelect
                    label="Спосіб оплати"
                    value={values.payment}
                    onChange={setPayment}
                    options={PAYMENT_SELECT_OPTIONS}
                />

                <FilterSelect
                    label="Спосіб доставки"
                    value={values.delivery}
                    onChange={setDelivery}
                    options={DELIVERY_SELECT_OPTIONS}
                />

                <div className="flex w-[220px] flex-col gap-2">
                    <label className="text-[16px] text-[var(--foreground-primary)]">
                        Дата створення
                    </label>
                    <div className="flex items-center gap-2">
                        <DateField
                            placeholder="Від"
                            value={values.dateFrom}
                            onChange={setDateFrom}
                        />
                        <DateField
                            placeholder="До"
                            value={values.dateTo}
                            onChange={setDateTo}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                    <button
                        type="button"
                        onClick={handleApply}
                        className="h-[42px] w-[220px] rounded-[10px] bg-[var(--color-green)] text-[var(--color-cream)] text-[15px] font-semibold shadow-[var(--shadow-card)] hover:opacity-90 transition-opacity"
                    >
                        Застосувати фільтри
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="h-[36px] w-[220px] rounded-[10px] bg-transparent border border-[var(--color-green)] text-[var(--color-green)] text-[14px] font-semibold hover:bg-[color-mix(in_srgb,var(--color-green)_22%,var(--background-elevated))] transition-colors"
                    >
                        Скинути фільтри
                    </button>
                </div>
            </div>
        </div>
    );
}
