"use client";

import { useState } from "react";
import type { OrderContextData } from "../hooks/useOrderContext";
import { formatOrderStatus } from "../hooks/useOrderContext";
import styles from "../complaints.module.css";

function resolveProductImage(prod: { productImages?: { imageData?: string | null }[] | null } | null | undefined): string {
  const fallback = "/images/catalog/hunger_games.png";
  if (!prod?.productImages?.length || !prod.productImages[0].imageData) {
    return fallback;
  }

  const rawData = prod.productImages[0].imageData.trim();
  if (
    rawData.startsWith("data:") ||
    rawData.startsWith("http") ||
    rawData.startsWith("/")
  ) {
    return rawData;
  }

  let mimeType = "image/jpeg";
  if (rawData.startsWith("UklGR")) mimeType = "image/webp";
  else if (rawData.startsWith("iVBORw0KGgo")) mimeType = "image/png";

  return `data:${mimeType};base64,${rawData}`;
}

type Props = {
  context: OrderContextData;
};

export default function OrderSummaryAccordion({ context }: Props) {
  const [open, setOpen] = useState(true);
  const { order, products } = context;

  const orderNumber = order.id
    ? `№ ${String(order.id).padStart(9, "0")}`
    : "№ —";

  const orderDate = order.orderDate
    ? new Date(order.orderDate).toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "—";

  const itemCount =
    order.orderItems?.reduce((sum, i) => sum + (i.quantity ?? 1), 0) ?? 0;

  const statusLabel = formatOrderStatus(order.status);
  const receivedLabel =
    statusLabel === "Отримано"
      ? `Отримано ${itemCount} ${itemCount === 1 ? "товар" : "товари"}`
      : `${statusLabel} · ${itemCount} ${itemCount === 1 ? "товар" : "товари"}`;

  return (
    <div className={styles.card}>
      <div
        className={styles.orderHeader}
        onClick={() => setOpen((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen((v) => !v);
        }}
        aria-expanded={open}
      >
        <div>
          <div className={styles.orderMeta}>Замовлення:</div>
          <div className={styles.orderNumber}>{orderNumber}</div>
          <div className={styles.orderMeta}>{orderDate}</div>
          <span className={styles.statusBadge}>{receivedLabel}</span>
        </div>
        <span
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
          aria-hidden
        >
          ▼
        </span>
      </div>

      {open && (
        <div className={styles.orderBody}>
          {(order.orderItems ?? []).map((item, idx) => {
            const prod = item.productId
              ? products.find((p) => p.id === item.productId)
              : products[idx];

            return (
              <div key={item.id ?? idx} className={styles.bookRow}>
                <img
                  src={resolveProductImage(prod)}
                  alt=""
                  className={styles.bookCover}
                />
                <div>
                  <div className={styles.bookTitle}>
                    {prod?.productName ?? `Товар #${item.productId ?? idx + 1}`}
                  </div>
                  <div className={styles.bookQty}>{item.quantity ?? 1} шт.</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
