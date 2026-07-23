import { useEffect, useState, useCallback } from "react";
import { orderService } from "@/lib/api/services";
import type { OrderDTO } from "@/lib/api/generated";

export interface OrdersStats {
    all: number;
    accepted: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    return: number;
}

export const ORDER_STATUS = {
    Accepted: "Pending",     
    Shipped: "Shipped",
    Delivered: "Delivered",
    Cancelled: "Cancelled",
    Return: "Return",
} as const;

const initialStats: OrdersStats = {
    all: 0,
    accepted: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    return: 0,
};

function computeStats(orders: OrderDTO[]): OrdersStats {
    return {
        all: orders.length,
        accepted: orders.filter((o) => o.status === ORDER_STATUS.Accepted).length,
        shipped: orders.filter((o) => o.status === ORDER_STATUS.Shipped).length,
        delivered: orders.filter((o) => o.status === ORDER_STATUS.Delivered).length,
        cancelled: orders.filter((o) => o.status === ORDER_STATUS.Cancelled).length,
        return: orders.filter((o) => o.status === ORDER_STATUS.Return).length,
    };
}

export function useOrdersStats() {
    const [orders, setOrders] = useState<OrderDTO[]>([]);
    const [stats, setStats] = useState<OrdersStats>(initialStats);
    const [loading, setLoading] = useState(true);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const data = await orderService.apiOrdersGet();
            setOrders(data);
            setStats(computeStats(data));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return { stats, orders, loading, refetch: fetchOrders };
}