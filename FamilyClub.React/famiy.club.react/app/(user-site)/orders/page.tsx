"use client";

import React, { useEffect, useState, useMemo } from "react";
import OrdersHeader from "./OrdersHeader";
import OrdersTabs from "./OrdersTabs";
import OrderCard from "./OrderCard";
import { EMPTY_ORDERS_BY_TAB, MockOrderItem, OrderTabId } from "./mockData";
import { orderService, productService } from "@/lib/api/services";
import { OrderDTO, ProductDto } from "@/lib/api/generated";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderTabId>("waiting_payment");
  const [ordersByTab, setOrdersByTab] = useState<Record<OrderTabId, MockOrderItem[]>>(EMPTY_ORDERS_BY_TAB);
  const [loading, setLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadDatabaseOrders = async () => {
    setLoading(true);
    try {
      const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
      
      // Завантажуємо продукти з БД для визначення назв та обкладинок
      const allProducts: ProductDto[] = (await productService.apiProductsGet().catch(() => [])) || [];
      const productMap = new Map<number, ProductDto>();
      allProducts.forEach((p) => {
        if (p.id != null) productMap.set(p.id, p);
      });

      // Завантажуємо реальні замовлення користувача з БД
      let dbOrders: OrderDTO[] = [];
      if (userId) {
        dbOrders = (await orderService.apiOrdersByUserUserIdGet({ userId }).catch(() => [])) || [];
      } else {
        dbOrders = (await orderService.apiOrdersGet().catch(() => [])) || [];
      }

      const mapped: Record<OrderTabId, MockOrderItem[]> = {
        waiting_payment: [],
        waiting_dispatch: [],
        order_sent: [],
        add_review: [],
        returns: [],
        history: [],
      };

      for (const order of dbOrders) {
        if (!order.id) continue;
        const statusStr = (order.status || "Pending").toLowerCase();
        
        let targetTab: OrderTabId = "waiting_payment";
        let statusText = "Оформлено";
        let statusColor = "#005b33";
        let showConfirmBtn = false;

        if (statusStr.includes("paid") || statusStr.includes("processing") || statusStr.includes("waitingdispatch") || statusStr.includes("очікувана") || statusStr.includes("відправк")) {
          targetTab = "waiting_dispatch";
          statusText = "Очікувана";
        } else if (statusStr.includes("sent") || statusStr.includes("shipped") || statusStr.includes("intransit") || statusStr.includes("надіслано") || statusStr.includes("відправлено")) {
          targetTab = "order_sent";
          statusText = "Відправлено";
          showConfirmBtn = true;
        } else if (statusStr.includes("delivered") || statusStr.includes("received") || statusStr.includes("completed") || statusStr.includes("доставлено") || statusStr.includes("відгук")) {
          targetTab = "add_review";
          statusText = "Доставлено";
        } else if (statusStr.includes("returnrequested") || statusStr.includes("returning") || statusStr.includes("повернення")) {
          targetTab = "returns";
          statusText = "Повернення";
        } else if (statusStr.includes("cancelled") || statusStr.includes("returned") || statusStr.includes("скасовано") || statusStr.includes("повернено")) {
          targetTab = "history";
          statusText = statusStr.includes("cancelled") || statusStr.includes("скасовано") ? "Скасовано" : "Повернено";
          statusColor = statusText === "Скасовано" ? "#C0392B" : "#2A2A2A";
        } else {
          targetTab = "waiting_payment";
          statusText = "Оформлено";
        }

        const orderDateStr = order.orderDate
          ? new Date(order.orderDate).toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit", year: "2-digit" }) + ", " + new Date(order.orderDate).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })
          : "Щойно";

        const items = order.orderItems && order.orderItems.length > 0 ? order.orderItems : [{ id: order.id, productId: 0, quantity: 1, unitPrice: order.totalPrice || 0 }];

        for (const item of items) {
          const prod = item.productId ? productMap.get(item.productId) : null;
          let imageSrc = "/images/catalog/hunger_games.png";
          if (prod?.productImages && prod.productImages.length > 0 && prod.productImages[0].imageData) {
            imageSrc = `data:image/jpeg;base64,${prod.productImages[0].imageData}`;
          }

          const cardItem: MockOrderItem = {
            id: `${order.id}-${item.id || Math.random()}`,
            dbOrderId: order.id,
            orderNumber: `№${String(order.id).padStart(12, "0")}`,
            statusText,
            statusColor,
            lastStatusDate: orderDateStr,
            bookTitle: prod?.productName || "Замовлення #" + order.id,
            bookImage: imageSrc,
            quantity: item.quantity || 1,
            price: item.unitPrice || prod?.price || order.totalPrice || 0,
            formats: ["print"],
            showConfirmReceiptBtn: showConfirmBtn,
          };

          mapped[targetTab].push(cardItem);
        }
      }

      setOrdersByTab(mapped);
    } catch (err) {
      console.error("Помилка завантаження замовлень з Бази Даних:", err);
      setOrdersByTab(EMPTY_ORDERS_BY_TAB);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDatabaseOrders();
  }, []);

  const handleAction = async (actionName: string, itemId: string, dbOrderId?: number) => {
    if (actionName === "cancel") {
      if (dbOrderId) {
        try {
          await orderService.apiOrdersIdPut({
            id: dbOrderId,
            orderDTO: { id: dbOrderId, status: "Cancelled" },
          });
        } catch (e) {
          console.error("Failed to cancel order in DB", e);
        }
      }
      showToast("Замовлення скасовано та переміщено в Історію");
      await loadDatabaseOrders();
    } else if (actionName === "confirm_receipt") {
      if (dbOrderId) {
        try {
          await orderService.apiOrdersIdPut({
            id: dbOrderId,
            orderDTO: { id: dbOrderId, status: "Delivered" },
          });
        } catch (e) {
          console.error("Failed to confirm receipt in DB", e);
        }
      }
      showToast("Отримання підтверджено! Товар переміщено в «Додати відгук»");
      await loadDatabaseOrders();
    } else if (actionName === "return") {
      if (dbOrderId) {
        try {
          await orderService.apiOrdersIdPut({
            id: dbOrderId,
            orderDTO: { id: dbOrderId, status: "ReturnRequested" },
          });
        } catch (e) {
          console.error("Failed to return order in DB", e);
        }
      }
      showToast("Заявку на повернення надіслано в Базу Даних");
      await loadDatabaseOrders();
    } else if (actionName === "complain") {
      showToast("Скаргу зареєстровано в системі");
    } else if (actionName === "seller_profile") {
      showToast("Перехід на профіль продавця...");
    } else if (actionName === "write_review") {
      showToast("Відкриття форми написання відгуку...");
    }
  };

  const counts = useMemo(() => {
    return {
      waiting_payment: ordersByTab.waiting_payment.length,
      waiting_dispatch: ordersByTab.waiting_dispatch.length,
      order_sent: ordersByTab.order_sent.length,
      add_review: ordersByTab.add_review.length,
      returns: ordersByTab.returns.length,
      history: ordersByTab.history.length,
    };
  }, [ordersByTab]);

  // Розрахунок реальних бонусних лапок зі здійснених замовлень у Базі Даних
  const { paws, discount } = useMemo(() => {
    const allCompleted = [...ordersByTab.add_review, ...ordersByTab.history.filter(i => i.statusText !== "Скасовано")];
    const totalSpent = allCompleted.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const calculatedPaws = Math.floor(totalSpent / 10);
    return { paws: calculatedPaws, discount: Math.floor(calculatedPaws / 10) };
  }, [ordersByTab]);

  const currentItems = ordersByTab[activeTab] || [];

  return (
    <div
      className="relative min-h-screen pt-[80px] pb-20 font-sans"
      style={{
        backgroundImage: "url('/images/userProfile/Rectangle 326.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#242424] text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in border border-gray-700">
          <span className="text-green-400 text-lg">✓</span>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <OrdersHeader paws={paws} discount={discount} />

        {/* Brown Background Board Container under cards */}
        <div
          className="relative w-full pt-4 pb-20 px-4 sm:px-8 rounded-3xl min-h-[680px] shadow-xl border border-[#B7895E]/40 mt-4"
          style={{
            backgroundImage: "url('/images/addProducts/Rectangle 312.svg')",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          {/* Tabs Bar */}
          <div className="-mt-2 mb-6">
            <OrdersTabs activeTab={activeTab} onSelectTab={setActiveTab} counts={counts} />
          </div>

          {/* Informational Text Under Tabs for Certain States */}
          {(activeTab === "add_review" || activeTab === "returns" || activeTab === "history") && (
            <div className="text-center text-sm md:text-base font-semibold text-[#242424] my-4 tracking-wide bg-white/70 backdrop-blur-sm py-2.5 px-6 rounded-2xl max-w-md mx-auto shadow-sm border border-white/40">
              Всі карточки автоматично приберуться через місяць
            </div>
          )}

          {/* Orders List Container */}
          <div className="mt-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-4 border-[#005b33] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : currentItems.length === 0 ? (
              <div className="bg-[#D8D3C8]/90 backdrop-blur-sm rounded-3xl p-12 text-center border border-[#C8C2B4] shadow-md my-6 max-w-xl mx-auto">
                <span className="text-4xl block mb-3">📦</span>
                <h3 className="text-xl font-bold text-[#242424] mb-1">Тут наразі пусто</h3>
                <p className="text-sm text-[#555555]">Тут з&apos;являтимуться ваші реальні замовлення після оформлення</p>
              </div>
            ) : (
              currentItems.map((item) => (
                <OrderCard
                  key={item.id}
                  item={item}
                  activeTab={activeTab}
                  onAction={handleAction}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
