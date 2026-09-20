"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import EntitiesSearchSorting from "@/app/(admin-site)/common_elements/entities_search_sorting";
import Pagination from "@/app/(admin-site)/common_elements/entities_pagination";
import ItemActionsClaim from "./section/ItemActionsClaim";
import {
    ClaimWithMemberDto,
    claimRowKey,
    fetchAllClaims,
} from "./api/claimsApi";
import { useTheme } from "@/lib/theme/ThemeProvider";

const CLAIM_SORT_OPTIONS = [
    { value: "email_asc", label: "Email (А→Я)" },
    { value: "email_desc", label: "Email (Я→А)" },
    { value: "type_asc", label: "Тип claim (А→Я)" },
    { value: "type_desc", label: "Тип claim (Я→А)" },
];

const ITEMS_PER_PAGE = 10;

function matchesSearch(c: ClaimWithMemberDto, q: string): boolean {
    if (!q) return true;
    const hay = [
        c.memberId,
        c.email,
        c.userName,
        c.phoneNumber,
        c.claimType,
        c.claimValue,
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
    return hay.includes(q);
}

export default function ClaimsPage() {
    const { theme } = useTheme();
    const isNight = theme === "ink-night";
    const [claims, setClaims] = useState<ClaimWithMemberDto[]>([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("email_asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAllClaims()
            .then((data) => {
                setClaims(data);
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

    const q = search.trim().toLowerCase();

    const filteredAndSorted = [...claims]
        .filter((c) => matchesSearch(c, q))
        .sort((a, b) => {
            const emailA = (a.email ?? a.userName ?? "").toLowerCase();
            const emailB = (b.email ?? b.userName ?? "").toLowerCase();
            const typeA = a.claimType.toLowerCase();
            const typeB = b.claimType.toLowerCase();
            if (sortOrder === "email_asc") return emailA.localeCompare(emailB, "uk");
            if (sortOrder === "email_desc") return emailB.localeCompare(emailA, "uk");
            if (sortOrder === "type_asc") return typeA.localeCompare(typeB, "uk");
            if (sortOrder === "type_desc") return typeB.localeCompare(typeA, "uk");
            return 0;
        });

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentPaginatedItems = filteredAndSorted.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    if (error) {
        return (
            <div className="p-[35px] text-[var(--foreground-primary)]">
                Не вдалося завантажити claims: {error}
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen overflow-hidden relative m-0 p-0 text-[var(--foreground-primary)]">
            <div className="w-[100vw] min-h-screen relative">
                <div
                    className="absolute pointer-events-none"
                    style={{ width: "100vw", top: "36px", left: "-20px" }}
                    aria-hidden
                >
                    <div className="admin-shelf-surface relative w-full">
                        <img
                            src="/images/authorPageAdmin/Rectangle 675.png"
                            className="block w-full h-auto"
                            alt=""
                        />
                    </div>
                </div>

                <div className="flex w-full flex-col">
                    <div
                        className="relative self-center mt-[90px]"
                        style={{
                            width: "min(1480px, 100%)",
                            marginLeft: "clamp(-420px, calc(50vw - 1430px), 0px)",
                            minHeight: "740px",
                        }}
                    >
                        <div
                            aria-hidden
                            className="absolute inset-0 pointer-events-none admin-parchment-bg"
                            style={{
                                backgroundImage:
                                    "url('/images/authorPageAdmin/Rectangle 708.png')",
                                backgroundSize: "100% 100%",
                            }}
                        />

                        <div className="absolute inset-[25px] overflow-auto p-[10px] z-10">
                            <EntitiesSearchSorting
                                searchPlaceholder="Пошук: email, login, id, телефон, type, value"
                                searchValue={search}
                                onSearchChange={handleSearchChange}
                                addButtonText="Додати claim"
                                addButtonHref="/admin/claims/addClaim"
                                sortValue={sortOrder}
                                onSortChange={setSortOrder}
                                sortOptions={CLAIM_SORT_OPTIONS}
                            />

                            <p className="font-[Source_Sans_Pro] font-semibold text-[36px] leading-[150%] tracking-[-0.011em] align-middle mt-4 text-[var(--foreground-primary)]">
                                Claims:
                            </p>

                            <div className="grid gap-4 mt-4">
                                {isLoading ? (
                                    <div className="text-[20px] text-[var(--color-muted-fg)]">
                                        Завантаження...
                                    </div>
                                ) : currentPaginatedItems.length > 0 ? (
                                    currentPaginatedItems.map((claim) => (
                                        <div
                                            key={claimRowKey(claim)}
                                            className="max-w-[1464px] w-full bg-[var(--background-elevated)] rounded-[9px] shadow-[var(--shadow-card)] px-[24px] py-3 flex items-center justify-between gap-4 border border-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)]"
                                        >
                                            <div className="flex items-center gap-4 min-w-0 flex-1">
                                                <div className="w-[56px] h-[56px] flex-shrink-0 rounded-full bg-[var(--color-green)]/15 flex items-center justify-center">
                                                    <img
                                                        src="/images/admin_manager_layout/claims.svg"
                                                        alt=""
                                                        className="w-7 h-7 object-contain"
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
                                                <div className="flex flex-col gap-0.5 min-w-0">
                                                    <p className="font-sanspro font-semibold text-[20px] leading-[150%] tracking-[-0.011em] text-[var(--foreground-primary)] truncate">
                                                        {claim.claimType}{" "}
                                                        <span className="font-normal text-[var(--color-muted-fg)]">
                                                            = {claim.claimValue}
                                                        </span>
                                                    </p>
                                                    <p className="text-[13px] text-[var(--color-muted-fg)] truncate">
                                                        {claim.email ?? "—"} · login:{" "}
                                                        {claim.userName ?? "—"} · тел:{" "}
                                                        {claim.phoneNumber ?? "—"}
                                                    </p>
                                                    <p className="text-[12px] text-[var(--color-muted-fg)] truncate">
                                                        ID: {claim.memberId}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-[20px] flex-shrink-0">
                                                <ItemActionsClaim
                                                    claim={claim}
                                                    onDeleteSuccess={(key) => {
                                                        setClaims((prev) => {
                                                            const updated = prev.filter(
                                                                (c) => claimRowKey(c) !== key
                                                            );
                                                            const totalAfter = updated.filter(
                                                                (c) => matchesSearch(c, q)
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
                                    <div className="text-[20px] text-[var(--color-muted-fg)]">
                                        Claims не знайдено.{" "}
                                        <Link
                                            href="/admin/claims/addClaim"
                                            className="text-[var(--color-green)] underline"
                                        >
                                            Додати перший
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
