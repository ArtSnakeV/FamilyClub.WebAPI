"use client";

import { UserInfo } from "../../hooks/useAllUsersInfo";
import { useUserComplaints } from "../../hooks/useUserComplaints";

interface Props {
    user: UserInfo;
}

export default function ComplaintsTab({ user }: Props) {
    const { complaints, loading } = useUserComplaints(user.id);

    if (loading) {
        return <p className="text-sm text-[var(--color-black)]">Завантаження...</p>;
    }

    if (complaints.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-[var(--color-black)] font-semibold text-[18px]">
                    Скарг поки немає
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    Тут з'являться всі скарги, додані користувачем
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 max-w-full">
            {complaints.map((complaint) => (
                <div
                    key={complaint.id}
                    className="rounded-[9px] border border-[#8D8C89]/40 p-4 flex flex-col gap-2 max-w-full"
                >
                    <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1">
                        <span className="font-semibold text-[16px] text-[var(--color-black)] truncate">
                            {complaint.complaintType}
                        </span>
                        <span
                            className={`text-sm font-medium whitespace-nowrap ${
                                complaint.isResolved
                                    ? "text-[var(--color-green)]"
                                    : "text-[#981717]"
                            }`}
                        >
                            {complaint.isResolved ? "Вирішено" : "Не вирішено"}
                        </span>
                    </div>

                    <p className="text-sm text-[var(--color-black)]">{complaint.complaintText}</p>

                    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
                        <span className="text-gray-500 whitespace-nowrap">
                            {new Date(complaint.createdAt).toLocaleDateString("uk-UA", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </span>
                        {complaint.resolvedAt && (
                            <span className="text-gray-500 whitespace-nowrap">
                                Вирішено:{" "}
                                {new Date(complaint.resolvedAt).toLocaleDateString("uk-UA", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </span>
                        )}
                    </div>

                    {complaint.resolutionNotes && (
                        <div className="text-sm text-gray-600 pt-2 border-t border-[#8D8C89]/20">
                            <span className="font-medium">Коментар адміністратора: </span>
                            {complaint.resolutionNotes}
                        </div>
                    )}

                    {complaint.images.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {complaint.images.map((img) => (
                                <img
                                    key={img.id}
                                    src={img.imageUrl}
                                    alt=""
                                    className="w-16 h-16 rounded-[6px] object-cover"
                                />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}