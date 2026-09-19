"use client";

import type { TopBookRevenue } from "../utils/buildAnalyticsMetrics";
import { formatNumber } from "../utils/analyticsPeriod";

type Props = {
    items: TopBookRevenue[];
    isLoading?: boolean;
};

export default function ManagerTopSalesList({ items, isLoading }: Props) {
    return (
        <div className="rounded-[12px] bg-[var(--background-elevated)] px-5 py-5 shadow-[var(--shadow-card)] min-h-[280px] flex flex-col">
            <h3 className="text-[16px] font-bold text-[var(--foreground-primary)] mb-4">
                Топ продажів
            </h3>
            {isLoading ? (
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-8 h-8 border-4 border-[var(--color-green)] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : items.length === 0 ? (
                <p className="text-[14px] text-[var(--color-muted-fg)] py-6 text-center">
                    Немає продажів за період
                </p>
            ) : (
                <ul className="space-y-3 flex-1">
                    {items.map((book) => (
                        <li
                            key={book.productId}
                            className="flex items-center gap-3"
                        >
                            <div className="w-10 h-14 rounded-[6px] overflow-hidden bg-[color-mix(in_srgb,var(--foreground-primary)_14%,transparent)] flex-shrink-0">
                                {book.coverSrc ? (
                                    <img
                                        src={book.coverSrc}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                ) : null}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-[14px] font-semibold text-[var(--foreground-primary)] truncate">
                                    {book.name}
                                </p>
                                <p className="text-[12px] text-[var(--color-muted-fg)] truncate">
                                    {book.authorName || "Автор невідомий"}
                                </p>
                            </div>
                            <p className="text-[13px] font-semibold text-[#005b33] whitespace-nowrap">
                                {formatNumber(book.salesCount)} прод.
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
