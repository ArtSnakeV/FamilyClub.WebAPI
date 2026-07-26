import type { CancellationDecisionStatus } from "../hooksR/useCancellationRequests";

export const CANCELLATION_DECISION_META: Record<
    CancellationDecisionStatus,
    { label: string; color: string }
> = {
    pending: { label: "Очікує рішення", color: "#DB8529" },
    approved: { label: "Підтверджено", color: "#005B33" },
    rejected: { label: "Відхилено", color: "#8B2A2A" },
};

interface CancellationStatusBadgeProps {
    status: CancellationDecisionStatus;
}

export default function CancellationStatusBadge({ status }: CancellationStatusBadgeProps) {
    const meta = CANCELLATION_DECISION_META[status];
    return (
        <span className="text-[13px] font-semibold" style={{ color: meta.color }}>
            {meta.label}
        </span>
    );
}