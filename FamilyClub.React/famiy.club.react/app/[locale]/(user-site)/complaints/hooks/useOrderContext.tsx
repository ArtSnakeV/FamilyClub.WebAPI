"use client";

import { useEffect, useState } from "react";
import { orderService, productService, publisherService } from "@/lib/api/services";
import type { OrderDTO, ProductDto, PublisherDto } from "@/lib/api/types";

export type OrderContextData = {
  order: OrderDTO;
  products: ProductDto[];
  publisher: PublisherDto | null;
  primaryProduct: ProductDto | null;
};

export function formatOrderStatus(status?: string | null): string {
  const s = (status || "").toLowerCase();
  if (s.includes("delivered") || s.includes("received") || s.includes("completed")) {
    return "Отримано";
  }
  if (s.includes("sent") || s.includes("shipped")) return "Відправлено";
  if (s.includes("paid") || s.includes("processing")) return "Оплачено";
  if (s.includes("pending")) return "Оформлено";
  if (s.includes("cancelled")) return "Скасовано";
  return status || "Оформлено";
}

export function useOrderContext(orderId: number | null) {
  const [data, setData] = useState<OrderContextData | null>(null);
  const [loading, setLoading] = useState(!!orderId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setData(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const [order, allProducts, publishers] = await Promise.all([
          orderService.apiOrdersIdGet({ id: orderId! }),
          productService.apiProductsGet().catch(() => []),
          publisherService.apiPublishersGet().catch(() => []),
        ]);

        if (cancelled) return;

        const productMap = new Map<number, ProductDto>();
        (allProducts ?? []).forEach((p) => {
          if (p.id != null) productMap.set(p.id, p);
        });

        const orderProducts = (order.orderItems ?? [])
          .map((item) => (item.productId ? productMap.get(item.productId) : undefined))
          .filter(Boolean) as ProductDto[];

        const primaryProduct = orderProducts[0] ?? null;
        const publisherId = primaryProduct?.publisherId;
        const publisher =
          publisherId != null
            ? (publishers ?? []).find((p) => p.id === publisherId) ?? null
            : null;

        setData({
          order,
          products: orderProducts,
          publisher,
          primaryProduct,
        });
      } catch {
        if (!cancelled) setError("Не вдалося завантажити замовлення");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  return { data, loading, error };
}
