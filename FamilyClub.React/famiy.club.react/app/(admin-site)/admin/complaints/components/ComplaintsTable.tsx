"use client";

import type { ClubMemberReadDto, ComplaintsReadDto } from "@/lib/api/generated";
import { getComplaintTypeLabel } from "@/lib/constants/complaintTypes";
import { truncateText } from "@/app/(admin-site)/admin/desktop/utils/formatRelativeTime";
import { assignManagerName } from "../utils/buildComplaintsMetrics";
import {
    displayMemberName,
    formatComplaintDate,
    getComplaintPriority,
    getComplaintStatus,
} from "../utils/complaintStatus";
import { PriorityBadge, StatusBadge } from "./ComplaintBadges";
import ComplaintsPagination from "./ComplaintsPagination";

type Props = {
    complaints: ComplaintsReadDto[];
    members: ClubMemberReadDto[];
    managers: ClubMemberReadDto[];
    page: number;
    pageSize?: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
    variant?: "admin" | "manager";
};

const borderSubtle =
    "border-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)]";
const surfaceMuted =
    "bg-[color-mix(in_srgb,var(--foreground-primary)_8%,var(--background-elevated))]";

export default function ComplaintsTable({
    complaints,
    members,
    managers,
    page,
    pageSize = 5,
    onPageChange,
    isLoading,
    variant = "admin",
}: Props) {
    const totalPages = Math.max(1, Math.ceil(complaints.length / pageSize));
    const safePage = Math.min(page, totalPages);
    const slice = complaints.slice(
        (safePage - 1) * pageSize,
        safePage * pageSize
    );

    const memberMap = new Map(
        members.filter((m) => m.id).map((m) => [m.id as string, m])
    );

    return (
        <div
            className={`rounded-[12px] bg-[var(--background-elevated)] px-5 py-5 shadow-[var(--shadow-card)] border ${borderSubtle}`}
        >
            <h3 className="text-[16px] font-bold text-[var(--foreground-primary)] mb-4">
                {variant === "admin" ? "Останні скарги" : "Список скарг"}
            </h3>

            {isLoading ? (
                <div className="flex justify-center py-16">
                    <div className="w-8 h-8 border-4 border-[var(--color-green)] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : slice.length === 0 ? (
                <p className="text-center text-[14px] text-[var(--color-muted-fg)] py-12">
                    Скарг за обраними фільтрами немає
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left border-collapse">
                        <thead>
                            <tr
                                className={`text-[12px] text-[var(--color-muted-fg)] border-b ${borderSubtle}`}
                            >
                                {variant === "admin" ? (
                                    <>
                                        <th className="pb-3 font-semibold pr-3">
                                            ID
                                        </th>
                                        <th className="pb-3 font-semibold pr-3">
                                            Тип скарги
                                        </th>
                                        <th className="pb-3 font-semibold pr-3">
                                            Об&apos;єкт
                                        </th>
                                        <th className="pb-3 font-semibold pr-3">
                                            Користувач
                                        </th>
                                        <th className="pb-3 font-semibold pr-3">
                                            Менеджер
                                        </th>
                                        <th className="pb-3 font-semibold pr-3">
                                            Дата
                                        </th>
                                        <th className="pb-3 font-semibold pr-3">
                                            Статус
                                        </th>
                                        <th className="pb-3 font-semibold">
                                            Пріоритет
                                        </th>
                                    </>
                                ) : (
                                    <>
                                        <th className="pb-3 font-semibold pr-3">
                                            Об&apos;єкт
                                        </th>
                                        <th className="pb-3 font-semibold pr-3">
                                            Тип скарги
                                        </th>
                                        <th className="pb-3 font-semibold pr-3">
                                            Користувач
                                        </th>
                                        <th className="pb-3 font-semibold pr-3">
                                            Дата
                                        </th>
                                        <th className="pb-3 font-semibold pr-3">
                                            Статус
                                        </th>
                                        <th className="pb-3 font-semibold pr-3">
                                            Пріоритет
                                        </th>
                                        <th className="pb-3 font-semibold w-10">
                                            {" "}
                                        </th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {slice.map((c) => {
                                const member = c.clubMemberId
                                    ? memberMap.get(c.clubMemberId)
                                    : undefined;
                                const status = getComplaintStatus(c);
                                const priority = getComplaintPriority(c);
                                const when = formatComplaintDate(c.createdAt);
                                const typeLabel = getComplaintTypeLabel(
                                    c.complaintType
                                );
                                const preview = truncateText(
                                    c.complaintText ?? "",
                                    variant === "manager" ? 48 : 36
                                );
                                const cover =
                                    c.images?.[0]?.imageData != null
                                        ? `data:image/jpeg;base64,${c.images[0].imageData}`
                                        : null;

                                if (variant === "manager") {
                                    return (
                                        <tr
                                            key={c.id}
                                            className={`border-b ${borderSubtle} last:border-0 align-top`}
                                        >
                                            <td className="py-3 pr-3">
                                                <div className="flex gap-3 items-start min-w-0">
                                                    <div
                                                        className={`w-10 h-12 rounded ${surfaceMuted} overflow-hidden flex-shrink-0`}
                                                    >
                                                        {cover ? (
                                                            <img
                                                                src={cover}
                                                                alt=""
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : null}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-[13px] font-semibold text-[var(--foreground-primary)] break-words">
                                                            {preview ||
                                                                typeLabel}
                                                        </p>
                                                        <p className="text-[11px] text-[var(--color-muted-fg)] mt-0.5">
                                                            ID: #{c.id ?? "—"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 pr-3">
                                                <p className="text-[13px] font-semibold text-[var(--foreground-primary)]">
                                                    {typeLabel}
                                                </p>
                                                <p className="text-[11px] text-[var(--color-muted-fg)] line-clamp-2 break-words max-w-[160px]">
                                                    {c.complaintText?.trim() ||
                                                        "—"}
                                                </p>
                                            </td>
                                            <td className="py-3 pr-3">
                                                <p className="text-[13px] font-semibold text-[var(--foreground-primary)]">
                                                    {displayMemberName(
                                                        member?.name,
                                                        member?.surname,
                                                        member?.email
                                                    )}
                                                </p>
                                                <p className="text-[11px] text-[var(--color-muted-fg)] truncate max-w-[140px]">
                                                    {member?.email
                                                        ? `@${member.email.split("@")[0]}`
                                                        : "—"}
                                                </p>
                                            </td>
                                            <td className="py-3 pr-3 whitespace-nowrap">
                                                <p className="text-[13px] text-[var(--foreground-primary)]">
                                                    {when.date}
                                                </p>
                                                <p className="text-[11px] text-[var(--color-muted-fg)]">
                                                    {when.time}
                                                </p>
                                            </td>
                                            <td className="py-3 pr-3">
                                                <StatusBadge status={status} />
                                            </td>
                                            <td className="py-3 pr-3">
                                                <PriorityBadge
                                                    priority={priority}
                                                />
                                            </td>
                                            <td className="py-3">
                                                <button
                                                    type="button"
                                                    className={`w-8 h-8 rounded-full ${surfaceMuted} text-[var(--foreground-primary)] hover:bg-[color-mix(in_srgb,var(--color-green)_22%,var(--background-elevated))] transition`}
                                                    aria-label="Дії"
                                                >
                                                    ⋯
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }

                                return (
                                    <tr
                                        key={c.id}
                                        className={`border-b ${borderSubtle} last:border-0 align-top`}
                                    >
                                        <td className="py-3 pr-3 text-[13px] font-semibold text-[var(--foreground-primary)] whitespace-nowrap">
                                            #{c.id ?? "—"}
                                        </td>
                                        <td className="py-3 pr-3 text-[13px] text-[var(--foreground-primary)] max-w-[140px] break-words">
                                            {typeLabel}
                                        </td>
                                        <td className="py-3 pr-3 text-[13px] text-[var(--foreground-primary)] max-w-[180px] break-words">
                                            {preview || "—"}
                                        </td>
                                        <td className="py-3 pr-3 text-[13px] text-[var(--foreground-primary)] whitespace-nowrap">
                                            {displayMemberName(
                                                member?.name,
                                                member?.surname,
                                                member?.email
                                            )}
                                        </td>
                                        <td className="py-3 pr-3 text-[13px] text-[var(--foreground-primary)] whitespace-nowrap">
                                            {assignManagerName(c, managers)}
                                        </td>
                                        <td className="py-3 pr-3 text-[13px] text-[var(--foreground-primary)] whitespace-nowrap">
                                            {when.date}
                                        </td>
                                        <td className="py-3 pr-3">
                                            <StatusBadge status={status} />
                                        </td>
                                        <td className="py-3">
                                            <PriorityBadge
                                                priority={priority}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            <ComplaintsPagination
                page={safePage}
                totalPages={totalPages}
                totalItems={complaints.length}
                pageSize={pageSize}
                onPageChange={onPageChange}
            />
        </div>
    );
}
