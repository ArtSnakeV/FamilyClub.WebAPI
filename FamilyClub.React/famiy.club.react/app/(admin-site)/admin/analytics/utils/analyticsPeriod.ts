export type AnalyticsPeriod = "7d" | "30d" | "90d" | "180d" | "365d";

export const ANALYTICS_PERIOD_OPTIONS: { value: AnalyticsPeriod; label: string }[] = [
    { value: "7d", label: "7 днів" },
    { value: "30d", label: "30 днів" },
    { value: "90d", label: "3 місяці" },
    { value: "180d", label: "6 місяців" },
    { value: "365d", label: "1 рік" },
];

export function periodToDays(period: AnalyticsPeriod): number {
    switch (period) {
        case "7d":
            return 7;
        case "30d":
            return 30;
        case "90d":
            return 90;
        case "180d":
            return 180;
        case "365d":
            return 365;
        default:
            return 30;
    }
}

export function startOfDay(date: Date): Date {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}

export function periodStart(period: AnalyticsPeriod, now = new Date()): Date {
    const start = startOfDay(now);
    start.setDate(start.getDate() - (periodToDays(period) - 1));
    return start;
}

export function previousPeriodRange(
    period: AnalyticsPeriod,
    now = new Date()
): { start: Date; end: Date } {
    const days = periodToDays(period);
    const end = startOfDay(now);
    end.setDate(end.getDate() - days);
    const start = new Date(end);
    start.setDate(start.getDate() - (days - 1));
    return { start, end };
}

export function localDayKey(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export function formatDayLabel(date: Date): string {
    return date.toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit" });
}

export function formatPeriodRangeLabel(
    period: AnalyticsPeriod,
    now = new Date()
): string {
    const start = periodStart(period, now);
    const end = startOfDay(now);
    const opts: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };
    return `${start.toLocaleDateString("uk-UA", opts)} – ${end.toLocaleDateString("uk-UA", opts)}`;
}

export function periodCompareLabel(period: AnalyticsPeriod): string {
    switch (period) {
        case "7d":
            return "порівняно з минулим тижнем";
        case "30d":
            return "порівняно з минулим місяцем";
        case "90d":
            return "порівняно з попередніми 3 міс.";
        case "180d":
            return "порівняно з попередніми 6 міс.";
        case "365d":
            return "порівняно з минулим роком";
        default:
            return "порівняно з попереднім періодом";
    }
}

export function formatUah(value: number): string {
    return `${Math.round(value).toLocaleString("uk-UA")} грн`;
}

export function formatNumber(value: number): string {
    return Math.round(value).toLocaleString("uk-UA");
}

export function formatPercent(value: number, digits = 1): string {
    const sign = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(digits)}%`;
}

export function percentChange(current: number, previous: number): number {
    if (previous <= 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
}
