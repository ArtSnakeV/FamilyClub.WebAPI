"use client";

import type { ActiveUserRow } from "../utils/buildManagerAnalytics";
import { formatNumber } from "../utils/analyticsPeriod";

type Props = {
    users: ActiveUserRow[];
    isLoading?: boolean;
};

export default function ManagerActiveUsersList({ users, isLoading }: Props) {
    return (
        <div className="rounded-[12px] bg-white px-5 py-5 shadow-[0_0_15px_rgba(0,0,0,0.12)] min-h-[280px] flex flex-col">
            <h3 className="text-[16px] font-bold text-[#1F1F1F] mb-4">
                Найактивніші користувачі
            </h3>
            {isLoading ? (
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-8 h-8 border-4 border-[#005b33] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : users.length === 0 ? (
                <p className="text-[14px] text-[#888] py-6 text-center">
                    Немає замовлень за період
                </p>
            ) : (
                <ul className="space-y-3 flex-1">
                    {users.map((user) => (
                        <li
                            key={user.userId}
                            className="flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#E8E4DC] flex-shrink-0 flex items-center justify-center">
                                {user.avatarData ? (
                                    <img
                                        src={`data:image/jpeg;base64,${user.avatarData}`}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-[13px] font-semibold text-[#777]">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-[14px] font-semibold text-[#1F1F1F] truncate">
                                    {user.name}
                                </p>
                                <p className="text-[12px] text-[#777]">
                                    {formatNumber(user.orderCount)} замовлень
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
