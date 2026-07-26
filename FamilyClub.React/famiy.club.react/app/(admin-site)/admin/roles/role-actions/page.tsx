"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import RolesNav from "../RolesNav";
import ItemActionsRole from "./section/ItemActionsRole";
import EntitiesSearchSorting from "@/app/(admin-site)/common_elements/entities_search_sorting";
import Pagination from "@/app/(admin-site)/common_elements/entities_pagination";
import { fetchRoles, RoleDto } from "./api/roleApi";

const ROLE_SORT_OPTIONS = [
    { value: "id_asc", label: "Старі на початку" },
    { value: "id_desc", label: "Нові на початку" },
    { value: "asc", label: "За алфавітом (А→Я)" },
    { value: "desc", label: "За алфавітом (Я→А)" },
];

const ITEMS_PER_PAGE = 10;

export default function RoleActionsPage() {
    const [roles, setRoles] = useState<RoleDto[]>([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRoles()
            .then((data) => {
                setRoles(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(err instanceof Error ? err.message : "Помилка завантаження");
                setIsLoading(false);
            });
    }, []);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const filteredAndSorted = roles
        .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === "asc") return a.name.localeCompare(b.name, "uk");
            if (sortOrder === "desc") return b.name.localeCompare(a.name, "uk");
            if (sortOrder === "id_asc") return a.id.localeCompare(b.id);
            if (sortOrder === "id_desc") return b.id.localeCompare(a.id);
            return 0;
        });

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentPaginatedItems = filteredAndSorted.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    if (error) {
        return <div className="p-[35px]">Не вдалося завантажити ролі: {error}</div>;
    }

    return (
        <div className="w-full min-h-screen overflow-hidden relative m-0 p-0">
            <div className="w-[100vw] min-h-screen relative">
                <img
                    src="/images/authorPageAdmin/Rectangle 675.png"
                    className="absolute"
                    style={{ width: "100vw", height: "auto", top: "36px", left: "-20px" }}
                    alt=""
                />

                <div className="flex w-full flex-col">
                    <div
                        className="relative z-20 md:left-[-190px]"
                        style={{ top: "50px", height: "60px" }}
                    >
                        <RolesNav />
                    </div>

                    <div
                        className="relative self-center mt-[90px]"
                        style={{
                            width: "min(1480px, 100%)",
                            marginLeft: "clamp(-420px, calc(50vw - 1430px), 0px)",
                            minHeight: "740px",
                        }}
                    >
                        <img
                            src="/images/authorPageAdmin/Rectangle 708.png"
                            alt=""
                            className="absolute top-0 left-0 w-full h-full object-fill"
                        />

                        <div className="absolute inset-[25px] overflow-auto p-[10px]">
                            <EntitiesSearchSorting
                                searchPlaceholder="Пошук ролі"
                                searchValue={search}
                                onSearchChange={handleSearchChange}
                                addButtonText="Додати роль"
                                addButtonHref="/admin/roles/role-actions/addRole"
                                sortValue={sortOrder}
                                onSortChange={setSortOrder}
                                sortOptions={ROLE_SORT_OPTIONS}
                            />

                            <p className="font-[Source_Sans_Pro] font-semibold text-[36px] leading-[150%] tracking-[-0.011em] align-middle mt-4">
                                Ролі:
                            </p>

                            <div className="grid gap-4 mt-4">
                                {isLoading ? (
                                    <div className="text-[20px] opacity-60">
                                        Завантаження...
                                    </div>
                                ) : currentPaginatedItems.length > 0 ? (
                                    currentPaginatedItems.map((role) => (
                                        <div
                                            key={role.id}
                                            className="max-w-[1464px] w-full bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] px-[24px] py-3 flex items-center justify-between gap-4"
                                        >
                                            <div className="flex items-center gap-4 min-w-0 flex-1">
                                                <div className="w-[56px] h-[56px] flex-shrink-0 rounded-full bg-[var(--color-green)]/15 flex items-center justify-center">
                                                    <img
                                                        src="/images/admin_manager_layout/roles.svg"
                                                        alt=""
                                                        className="w-7 h-7 object-contain"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-0.5 min-w-0">
                                                    <p className="font-sanspro font-semibold text-[20px] leading-[150%] tracking-[-0.011em] text-[var(--color-black)] truncate">
                                                        {role.name}
                                                    </p>
                                                    <p className="text-[12px] text-[var(--color-black)] opacity-50 truncate">
                                                        ID: {role.id}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-[20px] flex-shrink-0">
                                                <ItemActionsRole
                                                    id={role.id}
                                                    name={role.name}
                                                    onDeleteSuccess={(deletedId) => {
                                                        setRoles((prev) => {
                                                            const updated = prev.filter(
                                                                (r) => r.id !== deletedId
                                                            );
                                                            const totalAfter = updated.filter(
                                                                (r) =>
                                                                    r.name
                                                                        .toLowerCase()
                                                                        .includes(
                                                                            search.toLowerCase()
                                                                        )
                                                            ).length;
                                                            const maxPages = Math.ceil(
                                                                totalAfter / ITEMS_PER_PAGE
                                                            );
                                                            if (
                                                                currentPage > maxPages &&
                                                                maxPages >= 1
                                                            ) {
                                                                setCurrentPage(maxPages);
                                                            }
                                                            return updated;
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-[20px] opacity-60">
                                        Ролей не знайдено.{" "}
                                        <Link
                                            href="/admin/roles/role-actions/addRole"
                                            className="text-[var(--color-green)] underline"
                                        >
                                            Створити першу
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Pagination
                                totalItems={filteredAndSorted.length}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
