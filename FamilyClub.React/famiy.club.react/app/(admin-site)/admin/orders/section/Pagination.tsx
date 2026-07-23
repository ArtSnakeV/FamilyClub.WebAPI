interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const getPages = (): (number | "...")[] => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages: (number | "...")[] = [1, 2, 3];
        if (currentPage > 4 && currentPage < totalPages) {
            pages.push("...");
        } else {
            pages.push("...");
        }
        pages.push(totalPages);
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-2 py-4">
            {getPages().map((page, idx) =>
                page === "..." ? (
                    <span key={`dots-${idx}`} className="px-2 text-[#8A8A8A]">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                            currentPage === page
                                ? "bg-[#1E5631] text-white"
                                : "text-[#3A3A3A] hover:bg-black/5"
                        }`}
                    >
                        {page}
                    </button>
                )
            )}
        </div>
    );
}