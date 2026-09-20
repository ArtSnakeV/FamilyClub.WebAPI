"use client";

import { useEffect, useMemo, useState } from "react";
import RoleSummaryCard from "./section/RoleSummaryCard";
import AccessMatrixTable from "./section/AccessMatrixTable";
import RoleDetailsPanel from "./section/RoleDetailsPanel";
import RolesNav from "./RolesNav";
import useRoleCounts from "./hooks/useRoleCounts";
import useRoles from "./hooks/useRoles";
import { useAccessControl } from "@/lib/auth/useAccessControl";
import {
    applyMatrixToPermissionRows,
    loadAccessMatrix,
    saveAccessMatrixFromRows,
} from "@/lib/auth/accessControl";
import {
    buildMatrixColumns,
    buildSummaryCardsFromRoles,
    getRoleDisplayInfo,
    mergeMatrixWithColumns,
    normalizeRoleKey,
    PermissionRow,
} from "./data/rolesData";

type TabKey = "matrix" | "requests";

export default function RolesPageClient() {
    const { roles, loading: rolesLoading } = useRoles();
    const roleNames = useMemo(() => roles.map((r) => r.name), [roles]);
    const { counts, loading: countsLoading } = useRoleCounts(roleNames);
    const { roles: userRoles } = useAccessControl();
    const [activeTab, setActiveTab] = useState<TabKey>("matrix");
    const [selectedColumn, setSelectedColumn] = useState<string>("Admin");
    const [matrixRows, setMatrixRows] = useState<PermissionRow[]>([]);
    const [saveMessage, setSaveMessage] = useState<string | null>(null);

    const canEditMatrix = userRoles.some(
        (r) => normalizeRoleKey(r) === "Admin"
    );

    const summaryCards = useMemo(
        () => buildSummaryCardsFromRoles(roleNames),
        [roleNames]
    );

    const matrixColumns = useMemo(
        () => buildMatrixColumns(roleNames),
        [roleNames]
    );

    useEffect(() => {
        if (matrixColumns.length === 0) return;

        setMatrixRows((prev) => {
            const base =
                prev.length === 0
                    ? mergeMatrixWithColumns([], matrixColumns)
                    : mergeMatrixWithColumns(prev, matrixColumns);
            if (prev.length === 0) {
                return applyMatrixToPermissionRows(base, loadAccessMatrix());
            }
            return base;
        });
    }, [matrixColumns]);

    useEffect(() => {
        if (matrixColumns.length === 0) return;
        if (!matrixColumns.some((c) => c.key === selectedColumn)) {
            setSelectedColumn(matrixColumns[0].key);
        }
    }, [matrixColumns, selectedColumn]);

    const selectedRoleInfo = useMemo(() => {
        const base = getRoleDisplayInfo(selectedColumn);
        const key = normalizeRoleKey(selectedColumn);
        const caps = matrixRows
            .filter(
                (row) =>
                    row.permissions[selectedColumn] || row.permissions[key]
            )
            .map((row) => row.title);

        if (caps.length === 0) {
            return {
                ...base,
                description:
                    base.description +
                    " Наразі для цієї ролі не обрано жодної функції доступу.",
            };
        }

        return {
            ...base,
            description: `${base.description} Обрані функції: ${caps.join(", ")}.`,
            capabilities: caps,
        };
    }, [selectedColumn, matrixRows]);

    const selectedCount = useMemo(() => {
        const key = normalizeRoleKey(selectedColumn);
        return counts[key] ?? counts[selectedColumn] ?? 0;
    }, [selectedColumn, counts]);

    const selectedCapabilities = useMemo(() => {
        const key = normalizeRoleKey(selectedColumn);
        return matrixRows
            .filter(
                (row) =>
                    row.permissions[selectedColumn] || row.permissions[key]
            )
            .map((row) => row.title);
    }, [matrixRows, selectedColumn]);

    const handleTogglePermission = (rowId: string, column: string) => {
        if (!canEditMatrix) return;
        setSaveMessage(null);
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
        if (!canEditMatrix) return;
        saveAccessMatrixFromRows(matrixRows);
        setSaveMessage("Доступи збережено. Меню оновиться згідно з матрицею.");
    };

    const pageLoading = countsLoading || rolesLoading;

    return (
        <div className="w-full min-h-full overflow-x-clip relative m-0 p-0 text-[var(--foreground-primary)]">
            <div className="w-full min-h-full relative pb-10">
                <div
                    className="absolute pointer-events-none"
                    style={{
                        width: "calc(100% + 20px)",
                        top: "-40px",
                        left: "-20px",
                    }}
                    aria-hidden
                >
                    <div className="admin-shelf-surface relative w-full">
                        <img
                            src="/images/usersPageAdmin/Rectangle 675.png"
                            className="block w-full h-auto"
                            alt=""
                        />
                    </div>
                </div>

                <div className="relative z-10 mt-24 px-4 box-border w-full max-w-[1480px]">
                    <RolesNav />

                    <div className="flex flex-wrap gap-3 mt-4">
                        {pageLoading ? (
                            <p className="text-[var(--color-muted-fg)]">
                                Завантаження...
                            </p>
                        ) : summaryCards.length === 0 ? (
                            <p className="text-[var(--color-muted-fg)]">
                                Ролей поки немає.
                            </p>
                        ) : (
                            summaryCards.map((card) => (
                                <RoleSummaryCard
                                    key={card.key}
                                    icon={card.icon}
                                    title={card.title}
                                    value={(
                                        counts[card.key] ?? 0
                                    ).toLocaleString("uk-UA")}
                                    subtitle={card.subtitle}
                                    selected={
                                        selectedColumn === card.key ||
                                        selectedColumn === card.apiRoleName
                                    }
                                    onClick={() => {
                                        if (card.apiRoleName) {
                                            setSelectedColumn(card.apiRoleName);
                                        }
                                    }}
                                />
                            ))
                        )}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setActiveTab("matrix")}
                            className={`rounded-full px-5 py-2 text-[15px] font-semibold transition ${
                                activeTab === "matrix"
                                    ? "bg-[var(--color-green)] text-[var(--color-cream)]"
                                    : "bg-[var(--background-elevated)] text-[var(--foreground-primary)] hover:bg-[var(--color-menu-hover)]"
                            }`}
                        >
                            Матриця доступів
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("requests")}
                            className={`rounded-full px-5 py-2 text-[15px] font-semibold transition flex items-center gap-2 ${
                                activeTab === "requests"
                                    ? "bg-[var(--color-green)] text-[var(--color-cream)]"
                                    : "bg-[var(--background-elevated)] text-[var(--foreground-primary)] hover:bg-[var(--color-menu-hover)]"
                            }`}
                        >
                            Запит на доступ
                            <span className="rounded-full bg-[var(--color-menu-separator)] px-2 py-0.5 text-[12px] text-[var(--foreground-primary)]">
                                215
                            </span>
                        </button>
                    </div>

                    {activeTab === "matrix" ? (
                        <div className="mt-4 flex flex-row flex-nowrap gap-4 items-start w-full">
                            <div className="flex-1 min-w-0">
                                {rolesLoading ? (
                                    <p className="text-[var(--color-muted-fg)]">
                                        Завантаження матриці...
                                    </p>
                                ) : (
                                    <AccessMatrixTable
                                        rows={matrixRows}
                                        columns={matrixColumns}
                                        selectedColumn={selectedColumn}
                                        onSelectColumn={setSelectedColumn}
                                        onTogglePermission={handleTogglePermission}
                                        readOnly={!canEditMatrix}
                                    />
                                )}
                            </div>

                            <aside className="w-[300px] flex-shrink-0 sticky top-4 self-start">
                                <RoleDetailsPanel
                                    role={selectedRoleInfo}
                                    count={selectedCount}
                                    capabilities={selectedCapabilities}
                                    onSave={handleSave}
                                    canEdit={canEditMatrix}
                                />
                                {saveMessage && (
                                    <p className="mt-2 text-[13px] text-[var(--color-green)]">
                                        {saveMessage}
                                    </p>
                                )}
                            </aside>
                        </div>
                    ) : (
                        <div className="relative mt-4 rounded-2xl overflow-hidden w-full">
                            <div
                                aria-hidden
                                className="absolute inset-0 pointer-events-none admin-parchment-bg"
                                style={{
                                    backgroundImage:
                                        "url('/images/usersPageAdmin/Rectangle 793.png')",
                                    backgroundSize: "100% 100%",
                                }}
                            />
                            <div className="relative z-10 px-8 py-10 text-center">
                                <p className="text-[18px] font-semibold text-[var(--foreground-primary)]">
                                    Запити на доступ
                                </p>
                                <p className="mt-2 text-[14px] text-[var(--color-muted-fg)]">
                                    Розділ у розробці. Наразі доступна матриця
                                    доступів.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
