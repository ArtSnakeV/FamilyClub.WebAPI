"use client";

import Link from "next/link";
import type { TopBookRevenue } from "../utils/buildAnalyticsMetrics";
import { formatNumber, formatUah } from "../utils/analyticsPeriod";

type Props = {
    items: TopBookRevenue[];
    isLoading?: boolean;
    href?: string;
};

export default function TopBooksRevenueList({
    items,
    isLoading,
    href = "/admin/books",
}: Props) {
    return (
        <div className="rounded-[12px] bg-white px-5 py-5 shadow-[0_0_15px_rgba(0,0,0,0.12)]">
            <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="text-[16px] font-bold text-[#1F1F1F]">
                    Топ книг за продажами
                </h3>
                <Link
                    href={href}
                    className="text-[13px] text-[#005b33] hover:underline whitespace-nowrap"
                >
                    Показати більше
                </Link>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-10">
                    <div className="w-8 h-8 border-4 border-[#005b33] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : items.length === 0 ? (
                <p className="text-[14px] text-[#888] py-6 text-center">
                    Немає продажів за обраний період
                </p>
            ) : (
                <div className="space-y-3">
                    <div className="hidden sm:grid grid-cols-[40px_1fr_100px_120px] gap-3 px-2 text-[12px] font-semibold text-[#777]">
                        <span>#</span>
                        <span>Книга</span>
                        <span className="text-right">Продано</span>
                        <span className="text-right">Дохід</span>
                    </div>
                    {items.map((book) => (
                        <div
                            key={book.productId}
                            className="grid grid-cols-[40px_1fr] sm:grid-cols-[40px_1fr_100px_120px] gap-3 items-center rounded-[9px] bg-[#F7F4EE] px-2 py-2"
                        >
                            <span className="text-[15px] font-bold text-[#1F1F1F] text-center">
                                {book.rank}
                            </span>
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-11 h-14 rounded-[6px] overflow-hidden bg-[#E8E4DC] flex-shrink-0">
                                    {book.coverSrc ? (
                                        <img
                                            src={book.coverSrc}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    ) : null}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[14px] font-semibold text-[#1F1F1F] truncate">
                                        {book.name}
                                    </p>
                                    <p className="text-[12px] text-[#777] truncate">
                                        {book.authorName || "Автор невідомий"}
                                    </p>
                                </div>
                            </div>
                            <p className="text-[13px] text-[#2F2F2F] sm:text-right">
                                <span className="sm:hidden text-[#777]">Продано: </span>
                                {formatNumber(book.salesCount)}
                            </p>
                            <p className="text-[13px] font-semibold text-[#005b33] sm:text-right">
                                <span className="sm:hidden text-[#777] font-normal">
                                    Дохід:{" "}
                                </span>
                                {formatUah(book.revenue)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
