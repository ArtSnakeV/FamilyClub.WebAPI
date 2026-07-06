"use client";

import { useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";

export interface OrderItem {
    id?: number;
    quantity: number;
    unitPrice: number;
    productId: number;
    orderId: number;
    format?: string;
}

export interface Order {
    id: number;
    userId: string;
    orderDate: string;
    status: string;
    totalPrice: number;
    orderItems: OrderItem[];
}

export function useUserOrders(userId: string) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        let cancelled = false;
        setLoading(true);

        const fetchOrders = async () => {
            try {
                const res = await fetch(`${apiBasePath}/api/Orders/by-user/${userId}`);
                if (!res.ok) throw new Error("Failed to fetch orders");
                const data: Order[] = await res.json();
                if (!cancelled) setOrders(data);
            } catch (error) {
                console.error("Не вдалося завантажити замовлення користувача:", error);
                if (!cancelled) setOrders([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchOrders();
        return () => {
            cancelled = true;
        };
    }, [userId]);

    return { orders, loading };
}