"use client";

import { useState } from "react";
import styles from "./cart.module.css";

export interface CartSummaryProps {
  subtotal: number;
  discount: number;
  deliveryCost: number;
}

function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("uk-UA").format(value)} грн`;
}

export default function CartSummary({ subtotal, discount, deliveryCost }: CartSummaryProps) {
  const [agreed, setAgreed] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const total = subtotal - discount + deliveryCost;

  return (
    <aside className={styles.summaryPanel} id="cart-summary">
      {/* Apply loyalty points */}
      <button className={styles.applyPointsBtn} type="button" id="apply-points-btn">
        Застосувати лапки до знижки
      </button>

      {/* Summary lines */}
      <div className={styles.summaryLines}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Сума:</span>
          <span className={styles.summaryValue}>{formatPrice(subtotal)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Знижка:</span>
          <span className={`${styles.summaryValue} ${styles.discountValue}`}>
            {discount > 0 ? `- ${formatPrice(discount)}` : "0 грн"}
          </span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Вартість доставки:</span>
          <span className={styles.summaryValue}>{formatPrice(deliveryCost)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Сума до сплати:</span>
          <span className={`${styles.summaryValue} ${styles.totalValue}`}>
            {formatPrice(Math.max(0, total))}
          </span>
        </div>
      </div>

      <div className={styles.summaryDivider} />

      {/* Agreement checkbox */}
      <div className={styles.agreement}>
        <input
          type="checkbox"
          className={styles.agreementCheckbox}
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          id="agreement-checkbox"
          aria-label="Погоджуюсь з умовами"
        />
        <span className={styles.agreementText}>
          Погоджуюсь з{" "}
          <a href="/privacy-policy" className={styles.agreementLink}>
            Політикою конфіденційності
          </a>{" "}
          та з{" "}
          <a href="/terms-of-service" className={styles.agreementLink}>
            Користувацькою угодою
          </a>
        </span>
      </div>

      {/* Checkout button */}
      <button
        className={styles.checkoutBtn}
        disabled={!agreed || subtotal === 0}
        type="button"
        id="checkout-btn"
      >
        До оформлення замовлення
      </button>

      {/* Promo code */}
      <div className={styles.promoSection}>
        <span className={styles.promoLabel}>Є промокод?</span>
        <input
          type="text"
          className={styles.promoInput}
          placeholder="Промокод..."
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          id="promo-code-input"
          aria-label="Введіть промокод"
        />
      </div>
    </aside>
  );
}
