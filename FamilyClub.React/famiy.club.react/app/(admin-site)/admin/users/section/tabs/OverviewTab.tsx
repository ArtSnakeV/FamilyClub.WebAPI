// "use client";

// import { UserInfo } from "../../hooks/useAllUsersInfo";


// interface Props {
//     user: UserInfo;
//     ordersCount: number;
//     spentAmount: number;
//     reviewsCount: number;
//     handleLockoutEnd: () => void;
// }

// export default function OverviewTab({ user, ordersCount, spentAmount, reviewsCount, handleLockoutEnd }: Props) {
//     const isLocked = !!user.lockoutEnd && new Date(user.lockoutEnd).getTime() > Date.now();

//     const rows: [string, string][] = [
//         ["Повне ім'я", `${user.name ?? ""} ${user.surname ?? ""}`.trim() || "—"],
//         ["Email", user.email ?? "—"],
//         ["Роль", user.role ?? "Користувач"],
//         // ["Мова інтерфейсу", user.language ?? "—"],
//         // ["Часовой пояс", user.timeZone ?? "—"],
//         ["Статус", isLocked ? "Заблокований" : "Активний"],
//     ];
//     const rowsStats: [string, string][] = [
//         ["Оформлено замовлень", `${ordersCount}`],
//         ["Витрачено коштів", `${spentAmount.toLocaleString("uk-UA")} грн`],
//         ["Додано відгуків", `${reviewsCount}`],
//         // ["Додано скарг", `${user.complaintsCount ?? ""}`.trim() || "—"],
//         // ["Останній вхід", user.lastLoginAt ?? "—"],
//     ];

//     return (
//         <div className="flex flex-col gap-1 h-[500px]">
//             <div>
//                 <h3 className="font-semibold text-[20px] mb-3">Про користувача</h3>
//                 <div className="flex flex-col gap-2">
//                     {rows.map(([label, value]) => (
//                         <div key={label} className="flex justify-between text-sm">
//                             <span className="text-[var(--color-black)]">{label}:</span>
//                             <span className="text-[var(--color-black)]">{value}</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="w-[470px] h-px bg-[#8D8C89] mt-12 mb-4" />
//             <div>
//                 <h3 className="font-semibold text-[20px] mt-4 mb-3">Статистика</h3>
//                 <div className="flex flex-col gap-2">
//                     {rowsStats.map(([label, value]) => (
//                         <div key={label} className="flex justify-between text-sm">
//                             <span className="text-[var(--color-black)]">{label}:</span>
//                             <span className="text-[var(--color-black)]">{value}</span>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="p-4 top-[24px] relative w-full gap-4 flex flex-rows">
//                     <button
//                         type="submit"
//                         className="w-full h-[40px] rounded-[9px] bg-[var(--color-green)] text-[var(--color-white)] 
//                         text-[20px] font-medium transition-all duration-200 hover:opacity-90 hover:shadow-[0px_0px_20px_0px_#00000080] 
//                         active:scale-[0.98] disabled:opacity-50"
//                     >
//                         Переглянути профіль
//                     </button>
//                     <button
//                         type="button"
//                         onClick={handleLockoutEnd}
//                         className="w-full h-[40px] rounded-[9px] bg-transparent text-[var(--color-green)] border-2 
//                         border-[#005B3380] text-[#005B33] text-[20px] font-medium transition-all
//                          duration-200 hover:opacity-90 hover:shadow-[0px_0px_20px_0px_#00000080] 
//                          active:scale-[0.98] disabled:opacity-50"
//                     >
//                         {isLocked ? "Розблокувати" : "Заблокувати"}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }
"use client";

import { UserInfo } from "../../hooks/useAllUsersInfo";


interface Props {
    user: UserInfo;
    ordersCount: number;
    spentAmount: number;
    reviewsCount: number;
    complaintsCount: number;
    handleLockoutEnd: () => void;
    onAddManager: (id: string) => void;
}

export default function OverviewTab({ user, ordersCount, spentAmount, reviewsCount, handleLockoutEnd, complaintsCount, onAddManager }: Props) {
    const isLocked = !!user.lockoutEnd && new Date(user.lockoutEnd).getTime() > Date.now();

    const rows: [string, string][] = [
        ["Повне ім'я", `${user.name ?? ""} ${user.surname ?? ""}`.trim() || "—"],
        ["Email", user.email ?? "—"],
        ["Роль", user.role ?? "Користувач"],
        // ["Мова інтерфейсу", user.language ?? "—"],
        // ["Часовой пояс", user.timeZone ?? "—"],
        ["Статус", isLocked ? "Заблокований" : "Активний"],
    ];
    const rowsStats: [string, string][] = [
        ["Оформлено замовлень", `${ordersCount}`],
        ["Витрачено коштів", `${spentAmount.toLocaleString("uk-UA")} грн`],
        ["Додано відгуків", `${reviewsCount}`],
        ["Додано скарг", `${complaintsCount}`],
        // ["Останній вхід", user.lastLoginAt ?? "—"],
    ];

    return (
        <div className="flex flex-col gap-1 h-auto min-h-[500px] max-w-full">
            <div>
                <h3 className="font-semibold text-[20px] mb-3">Про користувача</h3>
                <div className="flex flex-col gap-2">
                    {rows.map(([label, value]) => (
                        <div key={label} className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
                            <span className="text-[var(--color-black)] whitespace-nowrap">{label}:</span>
                            <span className="text-[var(--color-black)] text-right truncate max-w-full">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-[470px] max-w-full h-px bg-[#8D8C89] mt-12 mb-4" />
            <div>
                <h3 className="font-semibold text-[20px] mt-4 mb-3">Статистика</h3>
                <div className="flex flex-col gap-2">
                    {rowsStats.map(([label, value]) => (
                        <div key={label} className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
                            <span className="text-[var(--color-black)] whitespace-nowrap">{label}:</span>
                            <span className="text-[var(--color-black)] text-right truncate max-w-full">{value}</span>
                        </div>
                    ))}
                </div>
                <div className="p-4 top-[24px] relative w-full max-w-full gap-4 flex flex-wrap">
                    <button
                        type="submit"
                        onClick={onAddManager ? () => onAddManager(user.id) : undefined}
                        className="flex-1 min-w-[160px] h-[40px] rounded-[9px] bg-[var(--color-green)] text-[var(--color-white)] 
                        text-[20px] font-medium transition-all duration-200 hover:opacity-90 hover:shadow-[0px_0px_20px_0px_#00000080] 
                        active:scale-[0.98] disabled:opacity-50 whitespace-nowrap"
                    >
                        Редагувати профіль
                    </button>
                    <button
                        type="button"
                         onClick={handleLockoutEnd}
                        className="flex-1 min-w-[160px] h-[40px] rounded-[9px] bg-transparent text-[var(--color-green)] border-2 
                        border-[#005B3380] text-[#005B33] text-[20px] font-medium transition-all
                         duration-200 hover:opacity-90 hover:shadow-[0px_0px_20px_0px_#00000080] 
                         active:scale-[0.98] disabled:opacity-50 whitespace-nowrap"
                    >
                        {isLocked ? "Розблокувати" : "Заблокувати"}
                    </button>
                </div>
            </div>
        </div>
    );
}