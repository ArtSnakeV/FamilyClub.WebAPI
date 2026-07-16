import Image from "next/image";
import { MatrixColumn, PermissionRow } from "../data/rolesData";
import PermissionCell from "./PermissionCell";

interface AccessMatrixTableProps {
    rows: PermissionRow[];
    columns: MatrixColumn[];
    selectedColumn: string;
    onSelectColumn: (column: string) => void;
    onTogglePermission: (rowId: string, column: string) => void;
}

export default function AccessMatrixTable({
    rows,
    columns,
    selectedColumn,
    onSelectColumn,
    onTogglePermission,
}: AccessMatrixTableProps) {
    return (
        <div className="flex-1 min-w-0 max-w-full">
            <div
                className="rounded-2xl overflow-hidden shadow-sm"
                style={{
                    backgroundImage: "url('/images/usersPageAdmin/Rectangle 793.png')",
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="overflow-x-auto overscroll-x-contain">
                    <div className="min-w-0 px-8 py-6 sm:px-10">
                        <table className="w-full min-w-[900px] border-collapse">
                            <thead>
                                <tr className="text-left text-[14px] font-semibold text-[#2F2F2F]">
                                    <th className="pb-4 pr-6 w-[260px] min-w-[200px] sticky left-0 z-10 bg-transparent">
                                        Функція
                                    </th>
                                    {columns.map((column) => (
                                        <th
                                            key={column.key}
                                            className="pb-4 px-2 text-center min-w-[96px]"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => onSelectColumn(column.key)}
                                                className={`mx-auto block max-w-[110px] text-center leading-tight transition ${
                                                    selectedColumn === column.key
                                                        ? "text-[var(--color-green)]"
                                                        : "text-[#2F2F2F] hover:text-[var(--color-green)]"
                                                }`}
                                            >
                                                {column.label}
                                            </button>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                    <tr
                                        key={row.id}
                                        className={
                                            index % 2 === 0
                                                ? "bg-white/40"
                                                : "bg-transparent"
                                        }
                                    >
                                        <td className="py-3 pr-6 align-middle sticky left-0 z-10 bg-inherit">
                                            <div className="flex items-center gap-3 min-w-[200px]">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/70">
                                                    <Image
                                                        src={row.icon}
                                                        alt=""
                                                        width={20}
                                                        height={20}
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-[15px] text-[#1F1F1F]">
                                                        {row.title}
                                                    </p>
                                                    <p className="text-[12px] text-[#6B6B6B]">
                                                        {row.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        {columns.map((column) => (
                                            <td
                                                key={column.key}
                                                className="py-3 px-2 text-center align-middle"
                                            >
                                                <PermissionCell
                                                    allowed={
                                                        row.permissions[column.key] ??
                                                        false
                                                    }
                                                    onToggle={() =>
                                                        onTogglePermission(
                                                            row.id,
                                                            column.key
                                                        )
                                                    }
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
