"use client";

import type { OrderDTO } from "@/lib/api/generated";
import { normalizeOrderStatusGroup } from "@/lib/constants/orderStatusGroups";

type ActionId =
    | "confirm"
    | "ship"
    | "deliver"
    | "cancel"
    | "return";

type Props = {
    order: OrderDTO | null;
    busy?: boolean;
    onAction: (action: ActionId) => void;
};

const ACTIONS: {
    id: ActionId;
    label: string;
    className: string;
}[] = [
    {
        id: "confirm",
        label: "Підтвердити замовлення",
        className: "bg-[#005B33] hover:bg-[#004a29]",
    },
    {
        id: "ship",
        label: "Відправити замовлення",
        className: "bg-[#1A7A8C] hover:bg-[#16697a]",
    },
    {
        id: "deliver",
        label: "Позначити як доставлене",
        className: "bg-[#8A9A3D] hover:bg-[#7a8935]",
    },
    {
        id: "cancel",
        label: "Скасувати замовлення",
        className: "bg-[#8B2E2E] hover:bg-[#752626]",
    },
    {
        id: "return",
        label: "Оформити повернення",
        className: "bg-[#6B3FA0] hover:bg-[#5c3590]",
    },
];

export default function OrderActionsPanel({
    order,
    busy,
    onAction,
}: Props) {
    const group = order
        ? normalizeOrderStatusGroup(order.status)
        : null;

    const enabled: Record<ActionId, boolean> = {
        confirm: group === "accepted",
        ship: group === "accepted",
        deliver: group === "shipped",
        cancel: group === "accepted" || group === "shipped",
        return: group === "completed" || group === "shipped",
    };

    return (
        <div className="rounded-[12px] bg-white/90 px-4 py-4 shadow-[0_0_15px_rgba(0,0,0,0.08)] flex flex-col gap-3">
            <h3 className="text-[15px] font-bold text-[#1F1F1F]">
                Дії із замовленням
            </h3>

            {!order ? (
                <p className="text-[13px] text-[#888]">
                    Оберіть замовлення, щоб виконати дію
                </p>
            ) : (
                <div className="flex flex-col gap-2.5">
                    {ACTIONS.map((action) => {
                        const isEnabled = enabled[action.id] && !busy;
                        return (
                            <button
                                key={action.id}
                                type="button"
                                disabled={!isEnabled}
                                onClick={() => onAction(action.id)}
                                className={`w-full rounded-[10px] px-4 py-3 text-[13px] font-semibold text-white transition disabled:opacity-40 disabled:cursor-not-allowed ${action.className}`}
                            >
                                {action.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
