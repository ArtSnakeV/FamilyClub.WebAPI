// "use client";

// import type { OrderDTO, ClubMemberReadDto } from "@/lib/api/generated";
// import { usePagination } from "../hooksR/usePagination";
// import PaginationOrders from "./PaginationOrders";
// import {
//     displayMemberName,
//     formatDate,
//     formatMoney,
//     formatOrderNumber,
// } from "../utilsR/OrderDisplay";
// import StatusBadge from "../sectionR/StatusBadge";

// interface OrdersListProps {
//     orders: OrderDTO[];
//     members: Map<string, ClubMemberReadDto>;
//     selectedId?: number | null;
//     onSelectOrder?: (order: OrderDTO) => void;
//     pageSize?: number;
// }

// export default function OrdersList({
//     orders,
//     members,
//     selectedId,
//     onSelectOrder,
//     pageSize = 10,
// }: OrdersListProps) {
//     const { currentPage, totalPages, paginatedItems, setCurrentPage } =
//         usePagination(orders, pageSize);

//     return (
//         <div className="w-[600px] max-w-[700px] h-[820px] shadow-[0px_0px_15px_0px_#00000040] flex flex-col bg-[var(--color-white)] rounded-[20px] ml-3 px-6 py-4">
//             <div className="grid grid-cols-[1.2fr_1.5fr_1fr_1fr_1fr] gap-4 px-4 pb-3 border-b border-[#8D8C89] text-[14px] text-[var(--color-black)] shrink-0">
//                 <span>№ Замовлення</span>
//                 <span>Клієнт</span>
//                 <span>Сума</span>
//                 <span>Статус</span>
//                 <span>Дата</span>
//             </div>

//             <div className="flex flex-col gap-4 mt-3 flex-1 p-2 overflow-y-auto">
//                 {paginatedItems.map((order) => {
//                     const isSelected = selectedId === order.id;
//                     const member = order.userId ? members.get(order.userId) : undefined;

//                     return (
//                         <button
//                             key={order.id}
//                             onClick={() => onSelectOrder?.(order)}
//                             className={`grid grid-cols-[1.2fr_1.5fr_1fr_1fr_1fr] p-2 gap-4 shadow-[0px_0px_10px_0px_#00000040]
//                                 items-center px-4 py-3 rounded-[9px] text-left text-sm transition-colors ${isSelected
//                                     ? "bg-[#F6DFC4]"
//                                     : "bg-white hover:bg-[#F0EDE3]"
//                                 }`}
//                         >
//                             <span className="text-[#2A2A2A]">{formatOrderNumber(order.id)}</span>
//                             <span className="text-[#2A2A2A] truncate">
//                                 {displayMemberName(member)}
//                             </span>
//                             <span className="text-[#2A2A2A]">{formatMoney(order.totalPrice)}</span>
//                             <StatusBadge status={order.status ?? ""} />
//                             <span className="text-[#6B6B6B]">{formatDate(order.orderDate)}</span>
//                         </button>
//                     );
//                 })}
//             </div>
//             <div className="w-full flex justify-center pt-4 mt-2 shrink-0">
//                 <PaginationOrders
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     onPageChange={setCurrentPage}
//                 />
//             </div>
//         </div>
//     );
// }
"use client";

import type { OrderDTO, ClubMemberReadDto } from "@/lib/api/generated";
import { usePagination } from "../hooksR/usePagination";
import PaginationOrders from "./PaginationOrders";
import {
    displayMemberName,
    formatDate,
    formatMoney,
    formatOrderNumber,
} from "../utilsR/OrderDisplay";
import StatusBadge from "../sectionR/StatusBadge";

interface OrdersListProps {
    orders: OrderDTO[];
    members: Map<string, ClubMemberReadDto>;
    selectedId?: number | null;
    onSelectOrder?: (order: OrderDTO | null) => void;
    pageSize?: number;
}

export default function OrdersList({
    orders,
    members,
    selectedId,
    onSelectOrder,
    pageSize = 10,
}: OrdersListProps) {
    const { currentPage, totalPages, paginatedItems, setCurrentPage } =
        usePagination(orders, pageSize);

    return (
        <div className="w-[600px] max-w-[700px] h-[760px] shadow-[0px_0px_15px_0px_#00000040] flex flex-col bg-[var(--color-white)] rounded-[20px] ml-3 px-6 py-4">
            <div className="grid grid-cols-[1.2fr_1.5fr_1fr_1fr_1fr] gap-4 px-4 pb-3 border-b border-[#8D8C89] text-[14px] text-[var(--color-black)] shrink-0">
                <span>№ Замовлення</span>
                <span>Клієнт</span>
                <span>Сума</span>
                <span>Статус</span>
                <span>Дата</span>
            </div>

            <div className="flex flex-col gap-4 mt-3 flex-1 p-2 overflow-y-auto">
                {paginatedItems.map((order) => {
                    const isSelected = selectedId === order.id;
                    const member = order.userId ? members.get(order.userId) : undefined;

                    return (
                        <button
                            key={order.id}
                            onClick={() => onSelectOrder?.(isSelected ? null : order)}
                            className={`grid grid-cols-[1.2fr_1.5fr_1fr_1fr_1fr] p-2 gap-4 shadow-[0px_0px_10px_0px_#00000040]
                                items-center px-4 py-3 rounded-[9px] text-left text-sm transition-colors ${isSelected
                                    ? "bg-[#F6DFC4]"
                                    : "bg-white hover:bg-[#F0EDE3]"
                                }`}
                        >
                            <span className="text-[#2A2A2A]">{formatOrderNumber(order.id)}</span>
                            <span className="text-[#2A2A2A] truncate">
                                {displayMemberName(member)}
                            </span>
                            <span className="text-[#2A2A2A]">{formatMoney(order.totalPrice)}</span>
                            <StatusBadge status={order.status ?? ""}  />
                            <span className="text-[#6B6B6B]">{formatDate(order.orderDate)}</span>
                        </button>
                    );
                })}
            </div>
            <div className="w-full flex justify-center pt-4 mt-2 shrink-0">
                <PaginationOrders
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}