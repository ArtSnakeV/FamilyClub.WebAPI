type OrderStatus =
    | "Pending"
    | "Shipped"
    | "Delivered"
    | "Cancelled"
    | "Return";

const STATUS_MAP: Record<OrderStatus, { label: string; color: string }> = {
    Pending: { label: "Прийняте", color: "--color-green" },
    Shipped: { label: "Відправлене", color: "#156976" },
    Delivered: { label: "Доставлено", color: "#CDA400" },
    Cancelled: { label: "Скасоване", color: "#AC3C3C" },
    Return: { label: "Повернене", color: "#761283" },
};

interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const info = STATUS_MAP[status as OrderStatus] ?? {
        label: status,
        color: "#6B6B6B",
    };

    return (
        <span
            className="text-sm font-medium"
            style={{ color: info.color }}
        >
            {info.label}
        </span>
    );
}