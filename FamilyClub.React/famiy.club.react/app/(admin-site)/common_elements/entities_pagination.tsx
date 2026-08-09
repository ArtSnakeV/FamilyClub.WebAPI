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

    // If there is only 1 page or no items, don't render pagination
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-2 mt-6 pb-8">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-[6px] border border-gray-300 bg-[#F5F3EE] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#005B33] hover:bg-[#E8F5EF] hover:text-[#005B33] hover:scale-105 transition-all duration-200"
            >
                Назад
            </button>

            {/* Page Numbers */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-9 h-9 rounded-[6px] text-sm font-semibold transition-all duration-200 ${
                        currentPage === page
                            ? "bg-[#005B33] text-white shadow-md hover:bg-[#003d22] hover:shadow-lg hover:scale-110"
                            : "bg-[#F5F3EE] text-[var(--foreground-primary)] border border-gray-300 hover:border-[#005B33] hover:bg-[#E8F5EF] hover:text-[#005B33] hover:scale-110"
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-[6px] border border-gray-300 bg-[#F5F3EE] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#005B33] hover:bg-[#E8F5EF] hover:text-[#005B33] hover:scale-105 transition-all duration-200"
            >
                Вперед
            </button>
        </div>
    );
}