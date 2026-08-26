"use client";

import { useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

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
        const token = getAuthToken();
        if (!token) {
            console.error("No auth token found");
            setOrders([]);
            setLoading(false);
            return;
        }
        
        try {
            const res = await fetch(`${apiBasePath}/api/Orders/by-user/${userId}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
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