import { useEffect, useState } from "react";
import { orderService } from "@/lib/api/services";
import type { OrderDTO } from "@/lib/api/generated";

export type PawsHistoryItem = {
  id: string;
  title: string;
  date: string;
  amount: number;
};

const PAWS_PERCENT_OF_ORDER = 5; // +5% від суми покупки → лапки
const PAWS_TO_UAH_RATE = 10; // 100 лапок = 10 грн

// Статуси, за яких замовлення вважається "здійсненою покупкою"
const COMPLETED_STATUSES = ["completed", "delivered"]; // ← перевір реальні значення status у твоєму enum'і

export function usePaws(userId?: string) {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    orderService
      .apiOrdersByUserUserIdGet({ userId })
      
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  const history: PawsHistoryItem[] = orders
    // .filter((o) => o.status != null && COMPLETED_STATUSES.includes(o.status))
    .filter((o) => o.status != null && COMPLETED_STATUSES.includes(o.status.toLowerCase()))
    .map((o) => {
      const total = o.totalPrice ?? 0;
      const earned = Math.round((total * PAWS_PERCENT_OF_ORDER) / 100);
      return {
        id: `order-${o.id}`,
        title: `Покупка замовлення №${o.id}`,
        date: o.orderDate
          ? o.orderDate.toLocaleDateString("uk-UA")
          : "",
        amount: earned,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const paws = history.reduce((sum, h) => sum + h.amount, 0);
  const discountInUah = Math.floor((paws / 100) * PAWS_TO_UAH_RATE);

  return { paws, history, discountInUah, loading };
}