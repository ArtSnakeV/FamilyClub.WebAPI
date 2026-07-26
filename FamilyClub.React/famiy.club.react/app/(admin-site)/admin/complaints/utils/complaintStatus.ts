import type { ComplaintsReadDto } from "@/lib/api/generated";

export type ComplaintStatusId =
    | "under_review"
    | "resolved"
    | "rejected"
    | "overdue";

export type ComplaintPriorityId = "high" | "medium" | "low";

const OVERDUE_DAYS = 7;

const PRIORITY_BY_TYPE: Record<string, ComplaintPriorityId> = {
    poor_quality_product: "high",
    rights_violation: "high",
    false_content: "medium",
    spam: "low",
    other: "low",
};

export const COMPLAINT_STATUS_META: Record<
    ComplaintStatusId,
    { label: string; bg: string; text: string; chartColor: string }
> = {
    under_review: {
        label: "На розгляді",
        bg: "#FFF3CD",
        text: "#856404",
        chartColor: "#C98BAF",
    },
    resolved: {
        label: "Вирішено",
        bg: "#E3F5E8",
        text: "#1F7A4D",
        chartColor: "#005b33",
    },
    rejected: {
        label: "Відхилено",
        bg: "#F0EBE3",
        text: "#6B5E4F",
        chartColor: "#A89880",
    },
    overdue: {
        label: "Прострочено",
        bg: "#F8D7DA",
        text: "#721C24",
        chartColor: "#E8944A",
    },
};

export const COMPLAINT_PRIORITY_META: Record<
    ComplaintPriorityId,
    { label: string; bg: string; text: string }
> = {
    high: { label: "Високий", bg: "#F8D7DA", text: "#721C24" },
    medium: { label: "Середній", bg: "#FFE5CC", text: "#CC6600" },
    low: { label: "Низький", bg: "#E8ECF0", text: "#5A6570" },
};

function looksRejected(complaint: ComplaintsReadDto): boolean {
    const notes = (complaint.resolutionNotes ?? "").toLowerCase();
    return (
        notes.includes("відхил") ||
        notes.includes("reject") ||
        notes.includes("denied")
    );
}

export function getComplaintPriority(
    complaint: ComplaintsReadDto
): ComplaintPriorityId {
    return PRIORITY_BY_TYPE[complaint.complaintType ?? "other"] ?? "low";
}

export function getComplaintStatus(
    complaint: ComplaintsReadDto,
    now = new Date()
): ComplaintStatusId {
    if (complaint.isResolved) {
        return looksRejected(complaint) ? "rejected" : "resolved";
    }
    if (!complaint.createdAt) return "under_review";
    const ageMs = now.getTime() - new Date(complaint.createdAt).getTime();
    const ageDays = ageMs / (1000 * 60 * 60 * 24);
    if (ageDays >= OVERDUE_DAYS) return "overdue";
    return "under_review";
}

export function formatComplaintDate(date?: Date | null): {
    date: string;
    time: string;
} {
    if (!date) return { date: "—", time: "" };
    const d = new Date(date);
    return {
        date: d.toLocaleDateString("uk-UA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }),
        time: d.toLocaleTimeString("uk-UA", {
            hour: "2-digit",
            minute: "2-digit",
        }),
    };
}

export function displayMemberName(
    name?: string | null,
    surname?: string | null,
    email?: string | null
): string {
    const first = name?.trim() ?? "";
    const last = surname?.trim() ?? "";
    if (first || last) {
        return `${first}${last ? ` ${last.charAt(0)}.` : ""}`.trim();
    }
    return email?.split("@")[0] ?? "—";
}
