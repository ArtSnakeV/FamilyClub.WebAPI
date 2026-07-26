import { useEffect, useState, useCallback } from "react";
import { orderService } from "@/lib/api/services";
import type { OrderDTO } from "@/lib/api/generated";
import { normalizeOrderStatusGroup } from "@/lib/constants/orderStatusGroups";

export interface OrdersStats {
    all: number;
    accepted: number;
    shipped: number;
    completed: number;
    cancelled: number;
    disputed: number;
}

const initialStats: OrdersStats = {
    all: 0,
    accepted: 0,
    shipped: 0,
    completed: 0,
    cancelled: 0,
    disputed: 0,
};

function computeStats(orders: OrderDTO[]): OrdersStats {
    const stats = { ...initialStats, all: orders.length };
    for (const o of orders) {
        stats[normalizeOrderStatusGroup(o.status)] += 1;
    }
    return stats;
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