"use client";

import Image from "next/image";
import { useTheme } from "@/lib/theme/ThemeProvider";
import { MatrixColumn, PermissionRow } from "../data/rolesData";
import PermissionCell from "./PermissionCell";

interface AccessMatrixTableProps {
    rows: PermissionRow[];
    columns: MatrixColumn[];
    selectedColumn: string;
    onSelectColumn: (column: string) => void;
    onTogglePermission: (rowId: string, column: string) => void;
    readOnly?: boolean;
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
    const { theme } = useTheme();
    const isNight = theme === "ink-night";

    const roleColMin = 100;
    const functionColMin = 240;
    const tableMinWidth = functionColMin + columns.length * roleColMin;

    const ink = isNight ? "var(--color-cream)" : "#1F1F1F";
    const muted = isNight ? "rgba(237,232,223,0.7)" : "#6B6B6B";
    const heading = isNight ? "var(--color-cream)" : "#2F2F2F";

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
                    <tr
                        className="text-left text-[14px] font-semibold"
                        style={{ color: heading }}
                    >
                        <th
                            className="pb-3 pr-3 sticky left-0 z-20 bg-[var(--admin-matrix-surface)]"
                            style={{ minWidth: functionColMin }}
                        >
                            Функція
                        </th>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="pb-3 px-1.5 text-center bg-[var(--admin-matrix-surface)]"
                                style={{ minWidth: roleColMin }}
                            >
                                <button
                                    type="button"
                                    onClick={() => onSelectColumn(column.key)}
                                    className={`mx-auto block max-w-[96px] text-center leading-tight transition ${
                                        selectedColumn === column.key
                                            ? "text-[var(--color-green)]"
                                            : "hover:text-[var(--color-green)]"
                                    }`}
                                    style={
                                        selectedColumn === column.key
                                            ? undefined
                                            : { color: heading }
                                    }
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
                        const rowBg = even
                            ? "var(--admin-matrix-surface-alt)"
                            : "var(--admin-matrix-surface)";

                        return (
                            <tr key={row.id} style={{ backgroundColor: rowBg }}>
                                <td
                                    className="py-2.5 pr-3 align-middle sticky left-0 z-10"
                                    style={{
                                        minWidth: functionColMin,
                                        backgroundColor: rowBg,
                                    }}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div
                                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{
                                                backgroundColor: isNight
                                                    ? "rgba(237,232,223,0.12)"
                                                    : "rgba(255,255,255,0.85)",
                                            }}
                                        >
                                            <Image
                                                src={row.icon}
                                                alt=""
                                                width={18}
                                                height={18}
                                                style={
                                                    isNight
                                                        ? {
                                                              filter:
                                                                  "brightness(0) invert(0.88)",
                                                          }
                                                        : undefined
                                                }
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <p
                                                className="font-semibold text-[14px]"
                                                style={{ color: ink }}
                                            >
                                                {row.title}
                                            </p>
                                            <p
                                                className="text-[11px]"
                                                style={{ color: muted }}
                                            >
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
            <div className="w-full rounded-2xl overflow-hidden shadow-[var(--shadow-card)] bg-[var(--admin-matrix-surface)]">
                {scrollArea}
            </div>
        </div>
    );
}
