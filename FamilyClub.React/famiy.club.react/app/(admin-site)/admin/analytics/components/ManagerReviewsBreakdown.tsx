"use client";

import type { RatingBucket } from "../utils/buildManagerAnalytics";
import { formatNumber } from "../utils/analyticsPeriod";

type Props = {
    buckets: RatingBucket[];
    total: number;
    isLoading?: boolean;
};

export default function ManagerReviewsBreakdown({
    buckets,
    total,
    isLoading,
}: Props) {
    const maxCount = Math.max(...buckets.map((b) => b.count), 1);

    return (
        <div className="rounded-[12px] bg-white px-5 py-5 shadow-[0_0_15px_rgba(0,0,0,0.12)] min-h-[280px] flex flex-col">
            <h3 className="text-[16px] font-bold text-[#1F1F1F] mb-4">
                Відгуки
            </h3>
            {isLoading ? (
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-8 h-8 border-4 border-[#005b33] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <>
                    <ul className="space-y-2.5 flex-1">
                        {buckets.map((bucket) => (
                            <li
                                key={bucket.stars}
                                className="flex items-center gap-3"
                            >
                                <span className="w-8 text-[13px] font-semibold text-[#2F2F2F] tabular-nums">
                                    {bucket.stars}★
                                </span>
                                <div className="flex-1 h-2.5 rounded-full bg-[#EFEBE3] overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-[#005b33] transition-all"
                                        style={{
                                            width: `${(bucket.count / maxCount) * 100}%`,
                                        }}
                                    />
                                </div>
                                <span className="w-10 text-right text-[13px] text-[#555] tabular-nums">
                                    {formatNumber(bucket.count)}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 pt-3 border-t border-[#E8E4DC] text-[13px] text-[#555]">
                        Всього відгуків:{" "}
                        <span className="font-semibold text-[#1F1F1F]">
                            {formatNumber(total)}
                        </span>
                    </p>
                </>
            )}
        </div>
    );
}
