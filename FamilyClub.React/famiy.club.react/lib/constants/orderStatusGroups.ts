export type OrderStatusGroupId =
  | "accepted"
  | "shipped"
  | "completed"
  | "disputed"
  | "cancelled";

export const ORDER_STATUS_GROUPS: {
  id: OrderStatusGroupId;
  label: string;
  color: string;
}[] = [
  { id: "accepted", label: "Прийняті", color: "#4A3060" },
  { id: "shipped", label: "Відправлені", color: "#C98BAF" },
  { id: "completed", label: "Завершені", color: "#E8944A" },
  { id: "disputed", label: "Оспорені", color: "#E8C547" },
  { id: "cancelled", label: "Скасовані", color: "#9E9E9E" },
];

export function normalizeOrderStatusGroup(
  status?: string | null
): OrderStatusGroupId {
  const s = (status || "Pending").toLowerCase();

  if (
    s.includes("cancelled") ||
    s.includes("скасован")
  ) {
    return "cancelled";
  }
  if (
    s.includes("return") ||
    s.includes("dispute") ||
    s.includes("поверн")
  ) {
    return "disputed";
  }
  if (
    s.includes("delivered") ||
    s.includes("received") ||
    s.includes("completed") ||
    s.includes("доставлен")
  ) {
    return "completed";
  }
  if (
    s.includes("sent") ||
    s.includes("shipped") ||
    s.includes("intransit") ||
    s.includes("відправлен") ||
    s.includes("надіслан")
  ) {
    return "shipped";
  }

  return "accepted";
}
