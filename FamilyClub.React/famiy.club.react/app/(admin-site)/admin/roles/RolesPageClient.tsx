"use client";

import { useEffect, useMemo, useState } from "react";
import RoleSummaryCard from "./section/RoleSummaryCard";
import AccessMatrixTable from "./section/AccessMatrixTable";
import RoleDetailsPanel from "./section/RoleDetailsPanel";
import useRoleCounts from "./hooks/useRoleCounts";
import useRoles from "./hooks/useRoles";
import {
    buildMatrixColumns,
    getRoleDisplayInfo,
    mergeMatrixWithColumns,
    normalizeRoleKey,
    PermissionRow,
    SUMMARY_CARD_DEFINITIONS,
} from "./data/rolesData";

type TabKey = "matrix" | "requests";

function resolveSelectedCount(
    selectedColumn: string,
    counts: Record<string, number>
): number {
    const key = normalizeRoleKey(selectedColumn);
    if (key === "Publisher") return counts.publishers ?? 0;
    if (key === "Author") return counts.authors ?? 0;
    return counts[key] ?? counts[selectedColumn] ?? 0;
}

export default function RolesPageClient() {
    const { counts, loading: countsLoading } = useRoleCounts();
    const { roles, loading: rolesLoading } = useRoles();
    const [activeTab, setActiveTab] = useState<TabKey>("matrix");
    const [selectedColumn, setSelectedColumn] = useState<string>("Admin");
    const [matrixRows, setMatrixRows] = useState<PermissionRow[]>([]);

    const matrixColumns = useMemo(
        () => buildMatrixColumns(roles.map((r) => r.name)),
        [roles]
    );

    useEffect(() => {
        if (matrixColumns.length === 0) return;

        setMatrixRows((prev) =>
            prev.length === 0
                ? mergeMatrixWithColumns([], matrixColumns)
                : mergeMatrixWithColumns(prev, matrixColumns)
        );
    }, [matrixColumns]);

    useEffect(() => {
        if (matrixColumns.length === 0) return;
        if (!matrixColumns.some((c) => c.key === selectedColumn)) {
            setSelectedColumn(matrixColumns[0].key);
        }
    }, [matrixColumns, selectedColumn]);

    const selectedRoleInfo = useMemo(
        () => getRoleDisplayInfo(selectedColumn),
        [selectedColumn]
    );

    const selectedCount = useMemo(
        () => resolveSelectedCount(selectedColumn, counts),
        [selectedColumn, counts]
    );

    useEffect(() => {
        document.body.style.backgroundImage =
            "url('/images/usersPageAdmin/Rectangle326.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";

        return () => {
            document.body.style.backgroundImage = "";
            document.body.style.backgroundSize = "";
            document.body.style.backgroundAttachment = "";
            document.body.style.backgroundPosition = "";
            document.body.style.backgroundRepeat = "";
        };
    }, []);

    const handleTogglePermission = (rowId: string, column: string) => {
        setMatrixRows((prev) =>
            prev.map((row) =>
                row.id === rowId
                    ? {
                          ...row,
                          permissions: {
                              ...row.permissions,
                              [column]: !row.permissions[column],
                          },
                      }
                    : row
            )
        );
    };

    const handleSave = () => {
        console.log("Saved permissions matrix", matrixRows);
    };

    const pageLoading = countsLoading || rolesLoading;

    return (
        <div className="w-full min-h-screen overflow-hidden relative m-0 p-0">
            <div className="w-[100vw] min-h-screen relative pb-10">
                <img
                    src="/images/usersPageAdmin/Rectangle 675.png"
                    className="absolute pointer-events-none"
                    style={{ width: "100vw", height: "auto", top: "-40px", left: "-20px" }}
                    alt=""
                />

                <div className="relative z-10 mt-24 px-4 max-w-[100vw] box-border">
                    <div className="flex flex-wrap gap-4">
                        {pageLoading ? (
                            <p>Завантаження...</p>
                        ) : (
                            SUMMARY_CARD_DEFINITIONS.map((card) => (
                                <RoleSummaryCard
                                    key={card.key}
                                    icon={card.icon}
                                    title={card.title}
                                    value={(counts[card.key] ?? 0).toLocaleString("uk-UA")}
                                    subtitle={card.subtitle}
                                    selected={
                                        selectedColumn === card.key ||
                                        selectedColumn === card.apiRoleName ||
                                        (card.key === "publishers" &&
                                            selectedColumn === "Publisher") ||
                                        (card.key === "authors" &&
                                            selectedColumn === "Author")
                                    }
                                    onClick={() => {
                                        if (card.apiRoleName) {
                                            setSelectedColumn(card.apiRoleName);
                                        } else if (card.key === "publishers") {
                                            setSelectedColumn("Publisher");
                                        } else if (card.key === "authors") {
                                            setSelectedColumn("Author");
                                        }
                                    }}
                                />
                            ))
                        )}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-4">
                        <button
                            type="button"
                            onClick={() => setActiveTab("matrix")}
                            className={`rounded-full px-6 py-2 text-[15px] font-semibold transition ${
                                activeTab === "matrix"
                                    ? "bg-[var(--color-green)] text-white"
                                    : "bg-white/70 text-[#2F2F2F] hover:bg-white"
                            }`}
                        >
                            Матриця доступів
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("requests")}
                            className={`rounded-full px-6 py-2 text-[15px] font-semibold transition flex items-center gap-2 ${
                                activeTab === "requests"
                                    ? "bg-[var(--color-green)] text-white"
                                    : "bg-white/70 text-[#2F2F2F] hover:bg-white"
                            }`}
                        >
                            Запит на доступ
                            <span className="rounded-full bg-[#4A4A4A] px-2 py-0.5 text-[12px] text-white">
                                215
                            </span>
                        </button>
                    </div>

                    {activeTab === "matrix" ? (
                        <div className="mt-4 flex flex-row flex-wrap gap-6 items-start">
                            {rolesLoading ? (
                                <p>Завантаження матриці...</p>
                            ) : (
                                <AccessMatrixTable
                                    rows={matrixRows}
                                    columns={matrixColumns}
                                    selectedColumn={selectedColumn}
                                    onSelectColumn={setSelectedColumn}
                                    onTogglePermission={handleTogglePermission}
                                />
                            )}

                            <RoleDetailsPanel
                                role={selectedRoleInfo}
                                count={selectedCount}
                                onSave={handleSave}
                            />
                        </div>
                    ) : (
                        <div
                            className="mt-4 rounded-2xl px-8 py-10 text-center overflow-hidden"
                            style={{
                                backgroundImage:
                                    "url('/images/usersPageAdmin/Rectangle 793.png')",
                                backgroundSize: "100% 100%",
                            }}
                        >
                            <p className="text-[18px] font-semibold text-[#2F2F2F]">
                                Запити на доступ
                            </p>
                            <p className="mt-2 text-[14px] text-[#6B6B6B]">
                                Розділ у розробці. Наразі доступна матриця доступів.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
