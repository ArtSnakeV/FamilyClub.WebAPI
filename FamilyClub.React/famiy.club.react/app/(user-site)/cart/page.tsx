"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, type FormatType } from "@/lib/hooks/useCart";
import {
  productService,
  authorService,
  formatService,
} from "@/lib/api/services";
import type { ProductDto, AuthorDTO, FormatDto } from "@/lib/api/generated";
import { Availability } from "@/lib/api/generated";
import CartItemCard from "./CartItemCard";
import CartSummary from "./CartSummary";
import MobileCartView from "./MobileCartView";
import styles from "./cart.module.css";

// ─── Helpers ───
function getImageSrc(product: ProductDto): string | null {
  const image = product.productImages?.[0];
  if (!image?.imageData) return null;
  const normalizedData = image.imageData.trim();
  if (normalizedData.startsWith("data:") || normalizedData.startsWith("http://") || normalizedData.startsWith("https://") || normalizedData.startsWith("/")) return normalizedData;

  const extension = image.imageName?.split(".").pop()?.toLowerCase();
  const mimeType =
    extension === "png"
      ? "image/png"
      : extension === "webp"
        ? "image/webp"
        : extension === "gif"
          ? "image/gif"
          : "image/jpeg";

  return `data:${mimeType};base64,${normalizedData}`;
}

function getFormatTypes(
  formatIds: Array<number> | null | undefined,
  formatById: Map<number, FormatDto>,
): Array<{ type: FormatType; available: boolean }> {
  const result: Array<{ type: FormatType; available: boolean }> = [];
  const seen = new Set<FormatType>();

  for (const formatId of formatIds ?? []) {
    const format = formatById.get(formatId);
    const label = `${format?.name ?? ""} ${format?.code ?? ""}`.toLowerCase();

    if ((label.includes("paper") || label.includes("папер")) && !seen.has("paper")) {
      result.push({ type: "paper", available: true });
      seen.add("paper");
    }
    if (
      (label.includes("ebook") || label.includes("e-book") || label.includes("електрон")) &&
      !seen.has("ebook")
    ) {
      result.push({ type: "ebook", available: true });
      seen.add("ebook");
    }
    if ((label.includes("audio") || label.includes("аудіо")) && !seen.has("audio")) {
      result.push({ type: "audio", available: true });
      seen.add("audio");
    }
  }

  // Always show all 3 format rows (some may be unavailable)
  if (!seen.has("paper")) result.push({ type: "paper", available: false });
  if (!seen.has("ebook")) result.push({ type: "ebook", available: false });
  if (!seen.has("audio")) result.push({ type: "audio", available: false });

  // Sort: paper → ebook → audio
  const order: Record<FormatType, number> = { paper: 0, ebook: 1, audio: 2 };
  result.sort((a, b) => order[a.type] - order[b.type]);

  return result;
}

// ─── Back Arrow SVG ───
function BackArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
        fill="currentColor"
      />
    </svg>
  );
}

const DELIVERY_COST = 75;

export default function CartPage() {
  const router = useRouter();
  const { items: cartItems, updateFormatQuantity, removeFromCart } = useCart();

  const [products, setProducts] = useState<ProductDto[]>([]);
  const [authors, setAuthors] = useState<AuthorDTO[]>([]);
  const [formats, setFormats] = useState<FormatDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  // Fetch all data needed
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    async function load() {
      try {
        const signal = { signal: controller.signal };
        const [productsRes, authorsRes, formatsRes] = await Promise.all([
          productService.apiProductsGet(signal).catch((err) => { console.warn("Cart: failed to fetch products", err); return []; }),
          authorService.apiAuthorsGet(signal).catch((err) => { console.warn("Cart: failed to fetch authors", err); return []; }),
          formatService.apiFormatsGet(signal).catch((err) => { console.warn("Cart: failed to fetch formats", err); return []; }),
        ]);
        if (!mounted) return;
        setProducts(productsRes ?? []);
        setAuthors(authorsRes ?? []);
        setFormats(formatsRes ?? []);
      } catch (error) {
        console.error("Cart: failed to fetch data", error);
        if (mounted) setFetchError(true);
      } finally {
        clearTimeout(timeout);
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);


  // Lookup maps
  const productById = useMemo(() => {
    const map = new Map<number, ProductDto>();
    for (const p of products) {
      if (p.id != null) map.set(p.id, p);
    }
    return map;
  }, [products]);

  const authorById = useMemo(() => {
    const map = new Map<number, AuthorDTO>();
    for (const a of authors) {
      if (a.id != null) map.set(a.id, a);
    }
    return map;
  }, [authors]);

  const formatById = useMemo(() => {
    const map = new Map<number, FormatDto>();
    for (const f of formats) {
      if (f.id != null) map.set(f.id, f);
    }
    return map;
  }, [formats]);

  const getAuthorLabel = (authorIds?: Array<number> | null) => {
    const names = (authorIds ?? [])
      .map((id) => authorById.get(id)?.authorName)
      .filter((name): name is string => Boolean(name));
    return names.length ? names.join(", ") : null;
  };

  // Compute totals
  const { subtotal, discount } = useMemo(() => {
    let sub = 0;
    let disc = 0;

    for (const item of cartItems) {
      const product = productById.get(item.productId);
      if (!product) continue;

      const totalQty =
        item.formatQuantities.paper +
        item.formatQuantities.ebook +
        item.formatQuantities.audio;

      const unitPrice = product.price ?? 0;
      const discountUnitPrice = product.discountPrice;

      sub += totalQty * unitPrice;

      if (discountUnitPrice != null && discountUnitPrice < unitPrice) {
        disc += totalQty * (unitPrice - discountUnitPrice);
      }
    }

    return { subtotal: sub, discount: disc };
  }, [cartItems, productById]);

  const hasItems = cartItems.length > 0;

  return (
    <>
      {/* Мобільна версія кошика (Figma Node 2784:6060) */}
      <div className="block md:hidden">
        <MobileCartView
          cartItems={cartItems}
          productById={productById}
          authorById={authorById}
          formatById={formatById}
          subtotal={subtotal}
          discount={discount}
          deliveryCost={DELIVERY_COST}
          updateFormatQuantity={updateFormatQuantity}
          removeFromCart={removeFromCart}
          loading={loading}
          fetchError={fetchError}
        />
      </div>

      {/* Десктопна версія кошика */}
      <div className="hidden md:block">
        {loading ? (
          <div className={styles.cartPage}>
            <div className={styles.cartHeader}>
              <h1 className={styles.cartTitle}>Мій кошик</h1>
            </div>
            <div className={styles.emptyCart}>
              <span className={styles.emptyCartIcon}>⏳</span>
              Завантаження...
            </div>
          </div>
        ) : fetchError && products.length === 0 ? (
          <div className={styles.cartPage}>
            <div className={styles.cartHeader}>
              <button
                className={styles.backButton}
                onClick={() => router.back()}
                aria-label="Назад"
                id="cart-back-btn"
              >
                <BackArrow />
              </button>
              <h1 className={styles.cartTitle}>Мій кошик</h1>
            </div>
            <div className={styles.emptyCart}>
              <span className={styles.emptyCartIcon}>⚠️</span>
              Не вдалося завантажити дані. Перевірте з&apos;єднання з сервером.
            </div>
          </div>
        ) : (
          <div className={styles.cartPage}>
            {/* Header */}
            <div className={styles.cartHeader}>
              <button
                className={styles.backButton}
                onClick={() => router.back()}
                aria-label="Назад"
                id="cart-back-btn"
              >
                <BackArrow />
              </button>
              <h1 className={styles.cartTitle}>Мій кошик</h1>
            </div>

            {!hasItems ? (
              <div className={styles.emptyCart}>
                <span className={styles.emptyCartIcon}>🛒</span>
                Ваш кошик порожній
              </div>
            ) : (
              <div className={styles.cartContent}>
                {/* Cart items */}
                <div className={styles.cartItems}>
                  {cartItems.map((item) => {
                    const product = productById.get(item.productId);
                    if (!product) return null;

                    const isAvailable =
                      product.availability !== Availability.NUMBER_2 &&
                      (product.quantityInStock ?? 0) > 0;

                    return (
                      <CartItemCard
                        key={item.productId}
                        productId={item.productId}
                        title={product.productName ?? "Без назви"}
                        author={getAuthorLabel(product.authorIds)}
                        imageSrc={getImageSrc(product)}
                        isAvailable={isAvailable}
                        price={product.price ?? 0}
                        discountPrice={product.discountPrice ?? null}
                        formats={getFormatTypes(product.formatIds, formatById)}
                        formatQuantities={item.formatQuantities}
                        onQuantityChange={updateFormatQuantity}
                        onRemove={removeFromCart}
                      />
                    );
                  })}
                </div>

                {/* Summary sidebar */}
                <CartSummary
                  subtotal={subtotal}
                  discount={discount}
                  deliveryCost={DELIVERY_COST}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
