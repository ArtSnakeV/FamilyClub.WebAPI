"use client";

import { UserInfo } from "../../hooks/useAllUsersInfo";
import { useUserComplaints } from "../../hooks/useUserComplaints";

interface Props {
    user: UserInfo;
}

const borderSubtle =
    "border-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)]";

export default function ComplaintsTab({ user }: Props) {
    const { complaints, loading } = useUserComplaints(user.id);

    if (loading) {
        return (
            <p className="text-sm text-[var(--color-muted-fg)]">Завантаження...</p>
        );
    }

    if (complaints.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-[var(--foreground-primary)] font-semibold text-[18px]">
                    Скарг поки немає
                </p>
                <p className="text-sm text-[var(--color-muted-fg)] mt-1">
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
                    className={`rounded-[9px] border ${borderSubtle} bg-[var(--background-elevated)] p-4 flex flex-col gap-2 max-w-full`}
                >
                    <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1">
                        <span className="font-semibold text-[16px] text-[var(--foreground-primary)] truncate">
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

                    <p className="text-sm text-[var(--foreground-primary)]">
                        {complaint.complaintText}
                    </p>

                    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
                        <span className="text-[var(--color-muted-fg)] whitespace-nowrap">
                            {new Date(complaint.createdAt).toLocaleDateString("uk-UA", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </span>
                        {complaint.resolvedAt && (
                            <span className="text-[var(--color-muted-fg)] whitespace-nowrap">
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
                        <div
                            className={`text-sm text-[var(--color-muted-fg)] pt-2 border-t ${borderSubtle}`}
                        >
                            <span className="font-medium text-[var(--foreground-primary)]">
                                Коментар адміністратора:{" "}
                            </span>
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
