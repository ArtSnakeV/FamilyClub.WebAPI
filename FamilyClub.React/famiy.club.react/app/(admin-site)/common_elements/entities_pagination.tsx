"use client";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const navBtnClass =
        "px-3 py-1.5 rounded-[6px] border border-[color-mix(in_srgb,var(--foreground-primary)_22%,transparent)] bg-[var(--background-elevated)] text-[var(--foreground-primary)] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-[var(--color-green)] hover:bg-[color-mix(in_srgb,var(--color-green)_22%,var(--background-elevated))] hover:text-[var(--color-green)] transition-all duration-200";

    return (
        <div className="flex items-center justify-center gap-2 mt-6 pb-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={navBtnClass}
            >
                Назад
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-9 h-9 rounded-[6px] text-sm font-semibold transition-all duration-200 ${
                        currentPage === page
                            ? "bg-[var(--color-green)] text-[var(--color-cream)] shadow-[var(--shadow-card)] hover:opacity-90"
                            : "bg-[var(--background-elevated)] text-[var(--foreground-primary)] border border-[color-mix(in_srgb,var(--foreground-primary)_22%,transparent)] hover:border-[var(--color-green)] hover:bg-[color-mix(in_srgb,var(--color-green)_22%,var(--background-elevated))] hover:text-[var(--color-green)]"
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={navBtnClass}
            >
                Вперед
            </button>
        </div>
    );
}
