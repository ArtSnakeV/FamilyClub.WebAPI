"use client";

import { useState } from "react";

export interface OrdersFiltersValue {
    search: string;
    status: string;
    payment: string;
    delivery: string;
    dateFrom: string;
    dateTo: string;
}

export const EMPTY_ORDERS_FILTERS: OrdersFiltersValue = {
    search: "",
    status: "",
    payment: "",
    delivery: "",
    dateFrom: "",
    dateTo: "",
};

interface UseOrdersFilterFormOptions {
    onApply?: (filters: OrdersFiltersValue) => void;
    /** Викликається додатково при скиданні — щоб батько міг скинути й свій стан (наприклад, активний таб). */
    onReset?: () => void;
}

/** Керує локальним станом форми фільтрів у LeftFilterBlock. */
export function useOrdersFilterForm({ onApply, onReset }: UseOrdersFilterFormOptions) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [payment, setPayment] = useState("");
    const [delivery, setDelivery] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const handleApply = () => {
        onApply?.({ search, status, payment, delivery, dateFrom, dateTo });
    };

    const handleReset = () => {
        setSearch("");
        setStatus("");
        setPayment("");
        setDelivery("");
        setDateFrom("");
        setDateTo("");
        onApply?.(EMPTY_ORDERS_FILTERS);
        onReset?.();
    };

    return {
        values: { search, status, payment, delivery, dateFrom, dateTo },
        setSearch,
        setStatus,
        setPayment,
        setDelivery,
        setDateFrom,
        setDateTo,
        handleApply,
        handleReset,
    };
}