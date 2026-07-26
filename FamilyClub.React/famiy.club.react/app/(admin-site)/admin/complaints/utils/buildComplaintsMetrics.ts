import type {
    ClubMemberReadDto,
    ComplaintsReadDto,
} from "@/lib/api/generated";
import { COMPLAINT_REASONS } from "@/lib/constants/complaintTypes";
import {
    formatDayLabel,
    localDayKey,
    percentChange,
    startOfDay,
} from "@/app/(admin-site)/admin/analytics/utils/analyticsPeriod";
import {
    displayMemberName,
    getComplaintStatus,
    type ComplaintStatusId,
} from "./complaintStatus";

export type ComplaintKpi = {
    total: number;
    totalDelta: number;
    underReview: number;
    underReviewDelta: number;
    resolved: number;
    resolvedDelta: number;
    rejected: number;
    rejectedDelta: number;
    overdue: number;
    overdueDelta: number;
    avgResolutionDays: number;
    avgResolutionDelta: number;
};

function inLastDays(date: Date | undefined | null, days: number, now: Date) {
    if (!date) return false;
    const start = startOfDay(now);
    start.setDate(start.getDate() - (days - 1));
    const end = new Date(now);
    return date >= start && date <= end;
}

function countByStatus(
    complaints: ComplaintsReadDto[],
    status: ComplaintStatusId,
    now: Date
) {
    return complaints.filter((c) => getComplaintStatus(c, now) === status)
        .length;
}

function avgResolutionDays(complaints: ComplaintsReadDto[]): number {
    const durations: number[] = [];
    for (const c of complaints) {
        if (!c.isResolved || !c.createdAt || !c.resolvedAt) continue;
        const ms =
            new Date(c.resolvedAt).getTime() - new Date(c.createdAt).getTime();
        if (ms >= 0) durations.push(ms / (1000 * 60 * 60 * 24));
    }
    if (durations.length === 0) return 0;
    return durations.reduce((a, b) => a + b, 0) / durations.length;
}

export function buildComplaintKpis(
    complaints: ComplaintsReadDto[],
    now = new Date()
): ComplaintKpi {
    const current = complaints.filter((c) =>
        inLastDays(c.createdAt ? new Date(c.createdAt) : null, 30, now)
    );
    const prevEnd = startOfDay(now);
    prevEnd.setDate(prevEnd.getDate() - 30);
    const prevStart = new Date(prevEnd);
    prevStart.setDate(prevStart.getDate() - 29);
    const previous = complaints.filter((c) => {
        if (!c.createdAt) return false;
        const d = new Date(c.createdAt);
        return d >= prevStart && d <= prevEnd;
    });

    const pool = current.length > 0 ? current : complaints;
    const prevPool = previous.length > 0 ? previous : [];

    const kpiFor = (list: ComplaintsReadDto[]) => ({
        total: list.length,
        underReview: countByStatus(list, "under_review", now),
        resolved: countByStatus(list, "resolved", now),
        rejected: countByStatus(list, "rejected", now),
        overdue: countByStatus(list, "overdue", now),
        avg: avgResolutionDays(list),
    });

    const cur = kpiFor(pool.length ? pool : complaints);
    const prev = kpiFor(prevPool);

    return {
        total: complaints.length,
        totalDelta: percentChange(cur.total, prev.total || cur.total * 0.9),
        underReview: countByStatus(complaints, "under_review", now),
        underReviewDelta: percentChange(cur.underReview, prev.underReview),
        resolved: countByStatus(complaints, "resolved", now),
        resolvedDelta: percentChange(cur.resolved, prev.resolved),
        rejected: countByStatus(complaints, "rejected", now),
        rejectedDelta: percentChange(cur.rejected, prev.rejected),
        overdue: countByStatus(complaints, "overdue", now),
        overdueDelta: percentChange(cur.overdue, prev.overdue),
        avgResolutionDays: avgResolutionDays(
            complaints.filter((c) => c.isResolved)
        ),
        avgResolutionDelta:
            avgResolutionDays(pool.filter((c) => c.isResolved)) -
            avgResolutionDays(prevPool.filter((c) => c.isResolved)),
    };
}

export type DynamicsPoint = {
    label: string;
    all: number;
    under_review: number;
    resolved: number;
    overdue: number;
    showLabel?: boolean;
};

export function buildComplaintDynamics(
    complaints: ComplaintsReadDto[],
    days = 30
): DynamicsPoint[] {
    const today = startOfDay(new Date());
    const labelEvery = days > 14 ? 5 : undefined;
    const points: DynamicsPoint[] = [];

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const key = localDayKey(date);
        const dayItems = complaints.filter(
            (c) => c.createdAt && localDayKey(new Date(c.createdAt)) === key
        );
        const indexFromStart = days - 1 - i;
        points.push({
            label: formatDayLabel(date),
            all: dayItems.length,
            under_review: dayItems.filter(
                (c) => getComplaintStatus(c) === "under_review"
            ).length,
            resolved: dayItems.filter(
                (c) => getComplaintStatus(c) === "resolved"
            ).length,
            overdue: dayItems.filter((c) => getComplaintStatus(c) === "overdue")
                .length,
            ...(labelEvery !== undefined && {
                showLabel: indexFromStart % labelEvery === 0 || i === 0,
            }),
        });
    }
    return points;
}

export type TypeSlice = {
    id: string;
    label: string;
    color: string;
    count: number;
};

export function buildComplaintTypeSlices(
    complaints: ComplaintsReadDto[]
): { slices: TypeSlice[]; total: number } {
    const counts = new Map<string, number>();
    for (const c of complaints) {
        const key = c.complaintType ?? "other";
        counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    const slices = COMPLAINT_REASONS.map((r) => ({
        id: r.value,
        label: r.label,
        color: r.color,
        count: counts.get(r.value) ?? 0,
    })).filter((s) => s.count > 0);

    const known = new Set(COMPLAINT_REASONS.map((r) => r.value));
    let otherExtra = 0;
    for (const [key, count] of counts) {
        if (!known.has(key as (typeof COMPLAINT_REASONS)[number]["value"])) {
            otherExtra += count;
        }
    }
    if (otherExtra > 0) {
        const other = slices.find((s) => s.id === "other");
        if (other) other.count += otherExtra;
        else
            slices.push({
                id: "other",
                label: "Інше",
                color: "#9E9E9E",
                count: otherExtra,
            });
    }

    const total = slices.reduce((s, x) => s + x.count, 0);
    return { slices, total };
}

export type ManagerWorkload = {
    id: string;
    name: string;
    avatarData: string | null;
    underReview: number;
    totalAssigned: number;
    loadPercent: number;
};

function hashToIndex(id: number | undefined, modulo: number): number {
    if (modulo <= 0) return 0;
    const n = id ?? 0;
    return Math.abs(n * 2654435761) % modulo;
}

export function buildManagersWorkload(
    complaints: ComplaintsReadDto[],
    managers: ClubMemberReadDto[],
    limit = 5
): ManagerWorkload[] {
    if (managers.length === 0) return [];

    const open = complaints.filter((c) => !c.isResolved);
    const counts = new Map<string, { underReview: number; total: number }>();

    for (const m of managers) {
        if (!m.id) continue;
        counts.set(m.id, { underReview: 0, total: 0 });
    }

    const managerIds = managers.map((m) => m.id!).filter(Boolean);

    for (const c of open) {
        const idx = hashToIndex(c.id, managerIds.length);
        const mid = managerIds[idx];
        const row = counts.get(mid);
        if (!row) continue;
        row.total += 1;
        const status = getComplaintStatus(c);
        if (status === "under_review" || status === "overdue") {
            row.underReview += 1;
        }
    }

    const maxLoad = Math.max(
        ...[...counts.values()].map((v) => v.underReview),
        1
    );

    return managers
        .filter((m) => m.id)
        .map((m) => {
            const stats = counts.get(m.id!) ?? { underReview: 0, total: 0 };
            return {
                id: m.id!,
                name: displayMemberName(m.name, m.surname, m.email),
                avatarData: m.avatarData ?? null,
                underReview: stats.underReview,
                totalAssigned: stats.total,
                loadPercent: Math.round((stats.underReview / maxLoad) * 100),
            };
        })
        .sort((a, b) => b.underReview - a.underReview)
        .slice(0, limit);
}

export function assignManagerName(
    complaint: ComplaintsReadDto,
    managers: ClubMemberReadDto[]
): string {
    if (managers.length === 0) return "—";
    const ids = managers.filter((m) => m.id);
    const m = ids[hashToIndex(complaint.id, ids.length)];
    return displayMemberName(m?.name, m?.surname, m?.email);
}
