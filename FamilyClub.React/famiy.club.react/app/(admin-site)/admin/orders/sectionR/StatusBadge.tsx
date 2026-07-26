import { getOrderStatusMeta } from "../utilsR/OrderDisplay";

interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const { badgeLabel, color } = getOrderStatusMeta(status);

    return (
        <span className="text-sm font-medium" style={{ color }}>
            {badgeLabel}
        </span>
    );
}