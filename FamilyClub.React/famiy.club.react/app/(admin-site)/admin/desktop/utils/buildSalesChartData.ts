import type { OrderDTO } from "@/lib/api/generated";
import { normalizeOrderStatusGroup } from "@/lib/constants/orderStatusGroups";

export type SalesPeriod = "week" | "month" | "year";

export type SalesPoint = {
  label: string;
  value: number;
  /** When false, point is drawn but x-axis label is hidden (dense month view). */
  showLabel?: boolean;
};

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function localDayKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function formatDayLabel(date: Date): string {
  return date.toLocaleDateString("uk-UA", { day: "numeric", month: "short" });
}

function formatMonthLabel(date: Date): string {
  return date.toLocaleDateString("uk-UA", { month: "short" });
}

function isCountableOrder(order: OrderDTO): boolean {
  if (!order.orderDate) return false;
  return normalizeOrderStatusGroup(order.status) !== "cancelled";
}

function buildDaySeries(
  days: number,
  orders: OrderDTO[],
  labelEvery?: number
): SalesPoint[] {
  const today = startOfDay(new Date());
  const buckets: SalesPoint[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const key = localDayKey(date);

    const value = orders
      .filter(
        (order) =>
          isCountableOrder(order) &&
          localDayKey(new Date(order.orderDate!)) === key
      )
      .reduce((sum, order) => sum + (order.totalPrice ?? 0), 0);

    const indexFromStart = days - 1 - i;
    buckets.push({
      label: formatDayLabel(date),
      value,
      ...(labelEvery !== undefined && {
        showLabel: indexFromStart % labelEvery === 0 || i === 0,
      }),
    });
  }

  return buckets;
}

function buildMonthSeries(months: number, orders: OrderDTO[]): SalesPoint[] {
  const now = new Date();
  const buckets: SalesPoint[] = [];

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = monthKey(date);

    const value = orders
      .filter(
        (order) =>
          isCountableOrder(order) && monthKey(new Date(order.orderDate!)) === key
      )
      .reduce((sum, order) => sum + (order.totalPrice ?? 0), 0);

    buckets.push({ label: formatMonthLabel(date), value });
  }

  return buckets;
}

export function buildSalesChartData(
  orders: OrderDTO[],
  period: SalesPeriod
): SalesPoint[] {
  switch (period) {
    case "week":
      return buildDaySeries(7, orders);
    case "month":
      return buildDaySeries(30, orders, 6);
    case "year":
      return buildMonthSeries(12, orders);
    default:
      return buildDaySeries(7, orders);
  }
}

export function getNiceYMax(maxValue: number): number {
  if (maxValue <= 0) return 1000;
  const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)));
  const normalized = maxValue / magnitude;
  const nice =
    normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return nice * magnitude;
}

export function formatSalesAxis(value: number): string {
  if (value >= 1000) {
    const k = value / 1000;
    return Number.isInteger(k) ? `${k} k` : `${k.toFixed(1)} k`;
  }
  return String(Math.round(value));
}
