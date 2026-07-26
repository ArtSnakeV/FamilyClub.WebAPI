"use client";

import type { ManagerWorkload } from "../utils/buildComplaintsMetrics";

type Props = {
    managers: ManagerWorkload[];
    isLoading?: boolean;
};

export default function ManagersWorkloadPanel({ managers, isLoading }: Props) {
    return (
        <div className="rounded-[12px] bg-white px-5 py-5 shadow-[0_0_15px_rgba(0,0,0,0.12)] min-h-[280px] flex flex-col">
            <h3 className="text-[16px] font-bold text-[#1F1F1F] mb-4">
                Менеджери та навантаження
            </h3>
            {isLoading ? (
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-8 h-8 border-4 border-[#005b33] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : managers.length === 0 ? (
                <p className="text-[14px] text-[#888] text-center py-8">
                    Немає менеджерів
                </p>
            ) : (
                <ul className="space-y-4 flex-1">
                    {managers.map((m) => (
                        <li key={m.id} className="min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-9 h-9 rounded-full overflow-hidden bg-[#E8E4DC] flex-shrink-0 flex items-center justify-center">
                                    {m.avatarData ? (
                                        <img
                                            src={`data:image/jpeg;base64,${m.avatarData}`}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-[12px] font-semibold text-[#777]">
                                            {m.name.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[13px] font-semibold text-[#1F1F1F] truncate">
                                        {m.name}
                                    </p>
                                    <p className="text-[12px] text-[#777] break-words">
                                        {m.underReview} на розгляді
                                    </p>
                                </div>
                                <span className="text-[12px] font-semibold text-[#005b33] flex-shrink-0">
                                    {m.loadPercent}%
                                </span>
                            </div>
                            <div className="h-2 rounded-full bg-[#EFEBE3] overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-[#005b33] transition-all"
                                    style={{
                                        width: `${Math.min(100, m.loadPercent)}%`,
                                    }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
