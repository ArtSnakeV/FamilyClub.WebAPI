export type OrderTabId = 
  | "waiting_payment"
  | "waiting_dispatch"
  | "order_sent"
  | "add_review"
  | "returns"
  | "history";

export interface OrderTabInfo {
  id: OrderTabId;
  label: string;
  count?: number;
}

export const ORDERS_TABS: OrderTabInfo[] = [
  { id: "waiting_payment", label: "Очікування оплати" },
  { id: "waiting_dispatch", label: "Очікування відправки" },
  { id: "order_sent", label: "Замовлення надіслано" },
  { id: "add_review", label: "Додати відгук" },
  { id: "returns", label: "Повернення" },
  { id: "history", label: "Історія" },
];

export interface MockOrderItem {
  id: string;
  dbOrderId?: number;
  orderNumber: string;
  statusText: string;
  statusColor: string;
  lastStatusDate: string;
  bookTitle: string;
  bookImage: string;
  quantity: number;
  price: number;
  formats: ("ebook" | "audio" | "print")[];
  showConfirmReceiptBtn?: boolean;
}

// Порожній початковий стан без жодних плейсхолдерів
export const EMPTY_ORDERS_BY_TAB: Record<OrderTabId, MockOrderItem[]> = {
  waiting_payment: [],
  waiting_dispatch: [],
  order_sent: [],
  add_review: [],
  returns: [],
  history: [],
};
