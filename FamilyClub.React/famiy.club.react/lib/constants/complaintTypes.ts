export type ComplaintReason =
  | "rights_violation"
  | "spam"
  | "false_content"
  | "poor_quality_product"
  | "other";

export const COMPLAINT_REASONS: {
  value: ComplaintReason;
  label: string;
  color: string;
}[] = [
  { value: "rights_violation", label: "Порушення прав", color: "#4A3060" },
  { value: "spam", label: "Спам", color: "#C98BAF" },
  { value: "false_content", label: "Неправдивий вміст", color: "#E8944A" },
  { value: "poor_quality_product", label: "Неякісний товар", color: "#E8C547" },
  { value: "other", label: "Інше", color: "#9E9E9E" },
];

export function getComplaintTypeLabel(type?: string | null): string {
  return (
    COMPLAINT_REASONS.find((r) => r.value === type)?.label ??
    type ??
    "Інше"
  );
}
