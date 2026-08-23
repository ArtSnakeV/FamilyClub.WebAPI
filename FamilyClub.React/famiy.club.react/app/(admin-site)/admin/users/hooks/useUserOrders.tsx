"use client";

import { useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";

export interface OrderItem {
    id?: number;
    quantity: number;
    unitPrice: number;
    productId: number;
    orderId: number;
    productName?: string | null;
    format?: string | null;
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

    const fetchOrders = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const res = await fetch(`${apiBasePath}/api/Orders/by-user/${userId}`);
            if (!res.ok) throw new Error("Failed to fetch orders");
            const data: Order[] = await res.json();
            setOrders(data);
        } catch (error) {
            console.error("Не вдалося завантажити замовлення користувача:", error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [userId]);

    return { orders, loading, refetch: fetchOrders };
}