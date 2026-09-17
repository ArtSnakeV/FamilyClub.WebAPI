"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { orderService, productService } from "@/lib/api/services";
import { OrderDTO, ProductDto } from "@/lib/api/generated";
import WriteReviewModal from "../WriteReviewModal";
import ReturnOrderModal from "../ReturnOrderModal";
import { MockOrderItem } from "../mockData";
import { useLocale, useLocalizedPath, useTranslations } from "@/lib/i18n/LocaleProvider";

type OrderStatusStep = {
  id: string;
  title: string;
  completed: boolean;
  active: boolean;
  date?: string;
};

type BadgeKey = "new" | "accepted" | "packing" | "shipped" | "delivered" | "cancelled" | "returned";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations();
  const lp = useLocalizedPath();
  const { locale } = useLocale();
  const dateLocale = locale === "en" ? "en-GB" : "uk-UA";

  const rawId = params?.id;
  const orderId = rawId ? Number(rawId) : null;

  const [dbOrder, setDbOrder] = useState<OrderDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [productMap, setProductMap] = useState<Map<number, ProductDto>>(new Map());

  // Modal States
  const [selectedItemForReview, setSelectedItemForReview] = useState<MockOrderItem | null>(null);
  const [selectedItemForReturn, setSelectedItemForReturn] = useState<MockOrderItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const allProducts = await productService.apiProductsGet().catch(() => []);
        const pMap = new Map<number, ProductDto>();
        (allProducts || []).forEach((p) => {
          if (p.id != null) pMap.set(p.id, p);
        });
        setProductMap(pMap);

        if (orderId) {
          const ord = await orderService.apiOrdersIdGet({ id: orderId });
          setDbOrder(ord);
        } else {
          setError(t("orders.detail.notFound"));
        }
      } catch (err: any) {
        console.error("Error loading order:", err);
        setError(t("orders.detail.loadError"));
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [orderId]);

  const rawStatus = (dbOrder?.status || "Pending").toLowerCase();

  let activeStepIndex = 0;
  let badgeKey: BadgeKey = "new";
  let statusBadgeColor = "var(--color-green)";

  if (rawStatus.includes("new") || rawStatus.includes("pending") || rawStatus.includes("оформл")) {
    activeStepIndex = 0;
    badgeKey = "new";
  } else if (rawStatus.includes("paid") || rawStatus.includes("accept") || rawStatus.includes("прийнят") || rawStatus.includes("очікув")) {
    activeStepIndex = 1;
    badgeKey = "accepted";
  } else if (rawStatus.includes("process") || rawStatus.includes("pack") || rawStatus.includes("комплек")) {
    activeStepIndex = 2;
    badgeKey = "packing";
  } else if (rawStatus.includes("sent") || rawStatus.includes("shipp") || rawStatus.includes("відправл")) {
    activeStepIndex = 3;
    badgeKey = "shipped";
  } else if (rawStatus.includes("deliver") || rawStatus.includes("receiv") || rawStatus.includes("отримал") || rawStatus.includes("доставл") || rawStatus.includes("complet")) {
    activeStepIndex = 4;
    badgeKey = "delivered";
  } else if (rawStatus.includes("cancel") || rawStatus.includes("скасов")) {
    activeStepIndex = -1;
    badgeKey = "cancelled";
    statusBadgeColor = "#C0392B";
  } else if (rawStatus.includes("return") || rawStatus.includes("поверн")) {
    activeStepIndex = -2;
    badgeKey = "returned";
    statusBadgeColor = "#2A2A2A";
  }

  const statusBadgeText = t(`orders.detail.badge.${badgeKey}`);

  const orderDateStr = dbOrder?.orderDate
    ? new Date(dbOrder.orderDate).toLocaleDateString(dateLocale, { day: "2-digit", month: "2-digit", year: "numeric" })
    : "14.08.2026";

  const orderTimeStr = dbOrder?.orderDate
    ? new Date(dbOrder.orderDate).toLocaleTimeString(dateLocale, { hour: "2-digit", minute: "2-digit" })
    : "14:30";

  const timelineSteps: OrderStatusStep[] = [
    { id: "new", title: t("orders.detail.steps.new"), completed: activeStepIndex >= 0, active: activeStepIndex === 0, date: orderDateStr },
    { id: "accepted", title: t("orders.detail.steps.accepted"), completed: activeStepIndex >= 1, active: activeStepIndex === 1, date: orderDateStr },
    { id: "packing", title: t("orders.detail.steps.packing"), completed: activeStepIndex >= 2, active: activeStepIndex === 2, date: orderDateStr },
    { id: "shipped", title: t("orders.detail.steps.shipped"), completed: activeStepIndex >= 3, active: activeStepIndex === 3, date: orderDateStr },
    { id: "delivered", title: t("orders.detail.steps.delivered"), completed: activeStepIndex >= 4, active: activeStepIndex === 4, date: orderDateStr },
  ];

  const formatDisplay = (formats: string[]) =>
    formats
      .map((f) => {
        const lower = f.toLowerCase();
        if (lower === "ebook") return t("orders.formats.ebook");
        if (lower === "audio") return t("orders.formats.audio");
        if (lower === "print" || lower === "paper") return t("orders.formats.paper");
        return f;
      })
      .join(", ");

  // Helper to map OrderItem to MockOrderItem for Review / Return modal
  const createMockItem = (item: any, idx: number): MockOrderItem => {
    const prod = item.productId ? productMap.get(item.productId) : null;
    let imageSrc = "/images/catalog/hunger_games.png";
    if (prod?.productImages && prod.productImages.length > 0 && prod.productImages[0].imageData) {
      const rawData = prod.productImages[0].imageData.trim();
      if (rawData.startsWith("data:") || rawData.startsWith("http://") || rawData.startsWith("https://")) {
        imageSrc = rawData;
      } else {
        imageSrc = `data:image/jpeg;base64,${rawData}`;
      }
    }

    const rawFormat = (item.format || "").toString().toLowerCase();
    const rawName = (prod?.productName || item.productName || "").toString().toLowerCase();
    const combinedStr = `${rawFormat} ${rawName}`;

    const isEbook = combinedStr.includes("ebook") || combinedStr.includes("елек") || combinedStr.includes("pdf") || combinedStr.includes("epub");
    const isAudio = combinedStr.includes("audio") || combinedStr.includes("аудіо") || combinedStr.includes("mp3");

    const itemFormats: string[] = [];
    if (isEbook) itemFormats.push("ebook");
    if (isAudio) itemFormats.push("audio");
    if (itemFormats.length === 0) itemFormats.push("print");

    const fallbackId = item.productId || idx + 1;

    return {
      id: `item-${dbOrder?.id || idx}-${idx}`,
      dbOrderId: dbOrder?.id || orderId || 0,
      productId: item.productId ?? undefined,
      orderNumber: `№ ${dbOrder?.id ? String(dbOrder.id).padStart(10, "0") : "0000000001"}`,
      statusText: statusBadgeText,
      statusColor: statusBadgeColor,
      lastStatusDate: `${orderDateStr}, ${orderTimeStr}`,
      bookTitle: prod?.productName || t("orders.bookFallback").replace("{id}", String(fallbackId)),
      bookImage: imageSrc,
      quantity: item.quantity || 1,
      formats: itemFormats,
      price: item.unitPrice || (dbOrder?.totalPrice ? Math.round(dbOrder.totalPrice) : 350),
    };
  };

  const complaintsPath = lp(`/complaints?orderId=${dbOrder?.id || orderId}`);

  return (
    <div
      className="min-h-screen pt-[160px] md:pt-[210px] pb-16 px-4 sm:px-6 relative text-[var(--foreground-primary)]"
      style={{
        backgroundImage: "url('/images/userProfile/Rectangle 326.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[var(--color-green)] text-white px-6 py-3 rounded-2xl shadow-xl border border-white/20 animate-fade-in font-medium text-sm">
          {toastMessage}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Main Board Container (Matching Figma parchment style) */}
        <div
          className="rounded-3xl p-6 sm:p-10 shadow-2xl border border-[var(--color-border-warm)]/40 relative overflow-hidden"
          style={{
            backgroundImage: "url('/images/addProducts/Rectangle 312.svg')",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          {/* Back Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--color-menu-separator)]">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm font-semibold text-[var(--color-muted-fg)] hover:text-[var(--foreground-primary)] transition bg-[var(--color-menu-hover)] px-4 py-2 rounded-2xl border border-[var(--color-menu-separator)]"
            >
              {t("orders.detail.backToOrders")}
            </button>

            <div className="text-right">
              <span className="text-xs text-[var(--color-muted-fg)] block">{t("orders.detail.orderLabel")}</span>
              <span className="text-base sm:text-lg font-bold text-[var(--foreground-primary)]">
                № {dbOrder?.id ? String(dbOrder.id).padStart(10, "0") : "0000000001"}
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-primary)] mb-2 text-center">
            {t("orders.detail.pageTitle")}
          </h1>
          <p className="text-center text-sm text-[var(--color-muted-fg)] mb-8">
            {t("orders.detail.placedAt")
              .replace("{date}", orderDateStr)
              .replace("{time}", orderTimeStr)}
          </p>

          {loading ? (
            <div className="text-center py-12 text-[var(--color-muted-fg)] font-medium animate-pulse">
              {t("orders.detail.loading")}
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600 font-semibold bg-red-50 rounded-2xl border border-red-200">
              {error}
            </div>
          ) : (
            <div className="space-y-8">
              {/* SECTION 1: Status Tracking Stepper (Figma Node 1387:14537) */}
              <div className="bg-[var(--color-menu-hover)] rounded-2xl p-6 border border-[var(--color-menu-separator)] shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-[var(--foreground-primary)]">{t("orders.detail.statusTitle")}</h2>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                    style={{ backgroundColor: statusBadgeColor }}
                  >
                    {statusBadgeText}
                  </span>
                </div>

                {/* Stepper Timeline */}
                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0 px-2 py-4">
                  <div className="hidden md:block absolute top-1/2 left-8 right-8 h-1 bg-[var(--color-menu-separator)] -translate-y-1/2 -z-0" />

                  {timelineSteps.map((step, idx) => {
                    const isPassed = step.completed;
                    const isCurrent = step.active;

                    return (
                      <div key={step.id} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 w-full md:w-auto">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                            isCurrent
                              ? "bg-[var(--color-green)] text-white ring-4 ring-[var(--color-green)]/20 shadow-md scale-110"
                              : isPassed
                              ? "bg-[var(--color-green)] text-white"
                              : "bg-[var(--color-menu-separator)] text-[var(--color-muted-fg)]"
                          }`}
                        >
                          {isPassed ? "✓" : idx + 1}
                        </div>

                        <div className="md:text-center">
                          <p
                            className={`text-sm font-bold ${
                              isCurrent ? "text-[var(--color-green)]" : isPassed ? "text-[var(--foreground-primary)]" : "text-[var(--color-muted-fg)]"
                            }`}
                          >
                            {step.title}
                          </p>
                          {step.date && isPassed && (
                            <span className="text-[11px] text-[var(--color-muted-fg)] block">{step.date}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: Delivery Details Card */}
              <div className="bg-[var(--background-elevated)] rounded-2xl p-6 border border-[var(--color-menu-separator)] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🚚</span>
                  <h2 className="text-lg font-bold text-[var(--foreground-primary)]">{t("orders.detail.deliveryTitle")}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[var(--foreground-primary)]">
                  <div className="bg-[var(--color-menu-hover)] p-3.5 rounded-xl border border-[var(--color-menu-separator)]">
                    <span className="text-xs text-[var(--color-muted-fg)] block mb-0.5">{t("orders.detail.carrier")}</span>
                    <span className="font-semibold text-base">{t("orders.detail.carrierName")}</span>
                  </div>
                  <div className="bg-[var(--color-menu-hover)] p-3.5 rounded-xl border border-[var(--color-menu-separator)]">
                    <span className="text-xs text-[var(--color-muted-fg)] block mb-0.5">{t("orders.detail.trackingNumber")}</span>
                    <span className="font-bold text-base text-[var(--color-green)]">20450918234910</span>
                  </div>
                  <div className="sm:col-span-2 bg-[var(--color-menu-hover)] p-3.5 rounded-xl border border-[var(--color-menu-separator)]">
                    <span className="text-xs text-[var(--color-muted-fg)] block mb-0.5">{t("orders.detail.pickupAddress")}</span>
                    <span className="font-medium">м. Київ, Відділення № 45 (вул. Хрещатик, 22)</span>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Payment Details Card */}
              <div className="bg-[var(--background-elevated)] rounded-2xl p-6 border border-[var(--color-menu-separator)] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💳</span>
                  <h2 className="text-lg font-bold text-[var(--foreground-primary)]">{t("orders.detail.paymentTitle")}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[var(--foreground-primary)]">
                  <div className="bg-[var(--color-menu-hover)] p-3.5 rounded-xl border border-[var(--color-menu-separator)]">
                    <span className="text-xs text-[var(--color-muted-fg)] block mb-0.5">{t("orders.detail.paymentMethod")}</span>
                    <span className="font-semibold">{t("orders.detail.paymentMethodValue")}</span>
                  </div>
                  <div className="bg-[var(--color-menu-hover)] p-3.5 rounded-xl border border-[var(--color-menu-separator)]">
                    <span className="text-xs text-[var(--color-muted-fg)] block mb-0.5">{t("orders.detail.paymentStatus")}</span>
                    <span className="font-bold text-[var(--color-green)] flex items-center gap-1">
                      <span>✓</span>{" "}
                      {t("orders.detail.paidAmount").replace(
                        "{amount}",
                        String(dbOrder?.totalPrice || 350)
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 4: Seller / Publisher Contacts Card */}
              <div className="bg-[var(--background-elevated)] rounded-2xl p-6 border border-[var(--color-menu-separator)] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🏢</span>
                  <h2 className="text-lg font-bold text-[var(--foreground-primary)]">{t("orders.detail.sellerContacts")}</h2>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[var(--color-menu-hover)] p-4 rounded-xl border border-[var(--color-menu-separator)]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-green)] text-white flex items-center justify-center font-bold text-lg">
                      К
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--foreground-primary)] text-base">{t("orders.detail.defaultPublisher")}</h3>
                      <div className="flex items-center gap-2 text-xs text-[var(--color-muted-fg)] mt-0.5">
                        <span className="bg-[color-mix(in_srgb,var(--color-green)_10%,transparent)] text-[var(--color-green)] px-2 py-0.5 rounded-md font-semibold">
                          {t("orders.detail.positiveReviews").replace("{percent}", "98")}
                        </span>
                        <span>{t("orders.detail.manager").replace("{phone}", "+380(93) 505-08-19")}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push(complaintsPath)}
                    className="px-4 py-2 rounded-xl bg-[var(--background-elevated)] hover:bg-[var(--background-elevated)] border border-[var(--color-menu-separator)] text-[var(--foreground-primary)] text-xs font-bold transition flex items-center gap-2 shadow-2xs"
                  >
                    {t("orders.detail.writeSeller")}
                  </button>
                </div>
              </div>

              {/* SECTION 5: Order Items List & Actions */}
              <div className="bg-[var(--background-elevated)] rounded-2xl p-6 border border-[var(--color-menu-separator)] shadow-xs">
                <h2 className="text-lg font-bold text-[var(--foreground-primary)] mb-4">{t("orders.detail.itemsTitle")}</h2>

                <div className="space-y-4">
                  {((dbOrder?.orderItems && dbOrder.orderItems.length > 0) ? dbOrder.orderItems : [{ id: 1, productId: 1, quantity: 1, unitPrice: dbOrder?.totalPrice || 350 }]).map((item: any, idx: number) => {
                    const mockItem = createMockItem(item, idx);
                    return (
                      <div
                        key={idx}
                        className="bg-[var(--background-elevated)] rounded-2xl p-4 border border-[var(--color-menu-separator)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-24 relative rounded overflow-hidden shadow shrink-0 bg-gray-100 border border-gray-200">
                            <img
                              src={mockItem.bookImage}
                              alt={mockItem.bookTitle}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/catalog/hunger_games.png";
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-[var(--foreground-primary)] text-base leading-snug">
                              {mockItem.bookTitle}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-semibold text-[var(--color-muted-fg)] bg-[var(--background-elevated)] px-2 py-0.5 rounded-full border border-[var(--color-menu-separator)]">
                                {t("orders.qty").replace("{count}", String(mockItem.quantity))}
                              </span>
                              <span className="text-xs font-semibold text-[var(--color-green)] bg-[color-mix(in_srgb,var(--color-green)_18%,transparent)] px-2 py-0.5 rounded-full border border-[color-mix(in_srgb,var(--color-green)_45%,transparent)]">
                                {formatDisplay(mockItem.formats)}
                              </span>
                            </div>
                            <p className="text-sm font-bold text-[var(--foreground-primary)] mt-2">
                              {t("cart.price").replace("{value}", String(mockItem.price))}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons for Delivered / Received Status (Figma Node 1324:15339) */}
                        <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-center justify-end">
                          <button
                            onClick={() => setSelectedItemForReview(mockItem)}
                            className="px-4 py-2 rounded-xl bg-[var(--color-green)] hover:bg-[color-mix(in_srgb,var(--color-green)_85%,black)] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5"
                          >
                            {t("orders.detail.writeReviewBtn")}
                          </button>
                          <button
                            onClick={() => setSelectedItemForReturn(mockItem)}
                            className="px-4 py-2 rounded-xl bg-[var(--color-menu-hover)] hover:bg-[var(--color-menu-separator)] border border-[var(--color-menu-separator)] text-[var(--foreground-primary)] text-xs font-semibold transition"
                          >
                            {t("orders.detail.returnProductBtn")}
                          </button>
                          <button
                            onClick={() => router.push(complaintsPath)}
                            className="px-4 py-2 rounded-xl bg-[#F0E6DF] hover:bg-[#E4D7CF] text-[#C0392B] border border-[#D1AFA9] text-xs font-semibold transition"
                          >
                            {t("orders.detail.complaintsBtn")}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={!!selectedItemForReview}
        onClose={() => setSelectedItemForReview(null)}
        item={selectedItemForReview}
        onSubmitSuccess={(msg) => showToast(msg)}
      />

      {/* Return Order Modal */}
      <ReturnOrderModal
        isOpen={!!selectedItemForReturn}
        onClose={() => setSelectedItemForReturn(null)}
        item={selectedItemForReturn}
        onSubmitSuccess={(msg) => showToast(msg)}
      />
    </div>
  );
}
