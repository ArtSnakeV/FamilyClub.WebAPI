import Image from "next/image";
import { MatrixColumn, PermissionRow } from "../data/rolesData";
import PermissionCell from "./PermissionCell";

interface AccessMatrixTableProps {
    rows: PermissionRow[];
    columns: MatrixColumn[];
    selectedColumn: string;
    onSelectColumn: (column: string) => void;
    onTogglePermission: (rowId: string, column: string) => void;
    readOnly?: boolean;
    /** Без власної картки — коли вкладено в спільний контейнер */
    embedded?: boolean;
}

export default function AccessMatrixTable({
    rows,
    columns,
    selectedColumn,
    onSelectColumn,
    onTogglePermission,
    readOnly = false,
    embedded = false,
}: AccessMatrixTableProps) {
    const roleColMin = 100;
    const functionColMin = 240;
    const tableMinWidth = functionColMin + columns.length * roleColMin;

    const scrollArea = (
        <div
            className={`overflow-x-auto overscroll-x-contain ${
                embedded ? "px-4 py-4" : "px-5 py-4"
            }`}
            style={{ WebkitOverflowScrolling: "touch" }}
        >
            <table
                className="border-collapse"
                style={{
                    width: "max(100%, " + tableMinWidth + "px)",
                    minWidth: tableMinWidth,
                }}
            >
                <thead>
                    <tr className="text-left text-[14px] font-semibold text-[#2F2F2F]">
                        <th
                            className="pb-3 pr-3 sticky left-0 z-20"
                            style={{
                                minWidth: functionColMin,
                                background: "#F5F2EB",
                            }}
                        >
                            Функція
                        </th>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="pb-3 px-1.5 text-center"
                                style={{ minWidth: roleColMin }}
                            >
                                <button
                                    type="button"
                                    onClick={() => onSelectColumn(column.key)}
                                    className={`mx-auto block max-w-[96px] text-center leading-tight transition ${
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
                    {rows.map((row, index) => {
                        const even = index % 2 === 0;
                        const stickyBg = even ? "#FAF8F3" : "#F5F2EB";

                        return (
                            <tr
                                key={row.id}
                                className={even ? "bg-white/35" : "bg-transparent"}
                            >
                                <td
                                    className="py-2.5 pr-3 align-middle sticky left-0 z-10"
                                    style={{
                                        minWidth: functionColMin,
                                        backgroundColor: stickyBg,
                                    }}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/70">
                                            <Image
                                                src={row.icon}
                                                alt=""
                                                width={18}
                                                height={18}
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-[14px] text-[#1F1F1F]">
                                                {row.title}
                                            </p>
                                            <p className="text-[11px] text-[#6B6B6B]">
                                                {row.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className="py-2.5 px-1.5 text-center align-middle"
                                    >
                                        <PermissionCell
                                            allowed={
                                                row.permissions[column.key] ?? false
                                            }
                                            disabled={readOnly}
                                            onToggle={() =>
                                                onTogglePermission(row.id, column.key)
                                            }
                                        />
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    if (embedded) {
        return <div className="w-full min-w-0">{scrollArea}</div>;
    }

    return (
        <div className="w-full min-w-0">
            <div className="w-full rounded-2xl shadow-sm bg-[#F5F2EB] overflow-hidden">
                {scrollArea}
            </div>
        </div>
    );
}
