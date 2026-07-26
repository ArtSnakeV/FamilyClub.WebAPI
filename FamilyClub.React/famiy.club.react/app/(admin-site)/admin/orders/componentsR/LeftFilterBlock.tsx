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

export default function LeftFilterBlock({ onApply, onReset }: LeftFilterBlockProps) {
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
        <div className="w-[330px] max-w-[400px] flex flex-col -mt-2 gap-10">
            <img
                src="/images/ordersAdminPage/Rectangle 705.png"
                className="absolute"
                style={{ width: "330px", height: "610px", maxHeight: "630px" }}
                alt=""
            />

            <p className="relative text-[20px] text-[var(--color-black)] p-2 mt-6 ml-7 font-bold">
                Фільтри
            </p>

            <div className="relative flex flex-col items-center gap-3 px-7 -mt-7 pb-2">
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

                <div className="flex  w-[220px] flex-col gap-2">
                    <label className="text-[16px] text-[var(--color-black)]">
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
                        className="mt-2 h-[42px] w-[220px] rounded-[10px] bg-[#0B3D2E] text-[var(--color-white)] text-[15px] 
                    font-semibold shadow-[0_0_10px_0_#00000040] hover:opacity-90 transition-opacity"
                    >
                        Застосувати фільтри
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="h-[36px]  w-[220px] rounded-[10px] bg-transparent border border-[#0B3D2E] text-[#0B3D2E]
                     text-[14px] font-semibold hover:bg-[#0B3D2E]/5 transition-colors"
                    >
                        Скинути фільтри
                    </button>
                </div>
            </div>
        </div>
    );
}