import type { ComplaintsReadDto } from "@/lib/api/generated";

export type ComplaintBadgeTone = "review" | "high" | "medium" | "low" | "resolved";

const PRIORITY_BY_TYPE: Record<string, Exclude<ComplaintBadgeTone, "review" | "resolved">> = {
  poor_quality_product: "high",
  rights_violation: "high",
  false_content: "medium",
  spam: "low",
  other: "low",
};

const BADGE_STYLES: Record<
  ComplaintBadgeTone,
  { label: string; bg: string; text: string }
> = {
  review: { label: "На розгляді", bg: "#FFF3CD", text: "#856404" },
  high: { label: "Високий", bg: "#F8D7DA", text: "#721C24" },
  medium: { label: "Середній", bg: "#FFE5CC", text: "#CC6600" },
  low: { label: "Низький", bg: "#D4EDDA", text: "#155724" },
  resolved: { label: "Вирішено", bg: "#E8E4DC", text: "#555555" },
};

const REVIEW_WINDOW_MS = 60 * 60 * 1000;

export function getComplaintBadge(complaint: ComplaintsReadDto): {
  label: string;
  bg: string;
  text: string;
} {
  if (complaint.isResolved) {
    return BADGE_STYLES.resolved;
  }

  const createdAt = complaint.createdAt ? new Date(complaint.createdAt).getTime() : 0;
  const isFresh = Date.now() - createdAt < REVIEW_WINDOW_MS;

  if (isFresh) {
    return BADGE_STYLES.review;
  }

  const tone =
    PRIORITY_BY_TYPE[complaint.complaintType ?? "other"] ?? "low";
  return BADGE_STYLES[tone];
}
