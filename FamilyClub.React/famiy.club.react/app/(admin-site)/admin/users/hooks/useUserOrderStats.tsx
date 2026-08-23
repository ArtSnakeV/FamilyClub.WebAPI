"use client";

import { useEffect, useState } from "react";
import { orderService } from "@/lib/api/services";

export function useUserOrderStats(userId?: string) {
  const [ordersCount, setOrdersCount] = useState(0);
  const [spentAmount, setSpentAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);

    orderService
      .apiOrdersByUserUserIdGet({ userId })
      .then((orders) => {
        setOrdersCount(orders.length);
        const total = orders.reduce((sum, order) => sum + (order.totalPrice ?? 0), 0);
        setSpentAmount(total);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  return { ordersCount, spentAmount, loading };
}