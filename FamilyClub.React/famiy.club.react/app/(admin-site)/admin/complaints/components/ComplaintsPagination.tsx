"use client";

type Props = {
    page: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
};

export default function ComplaintsPagination({
    page,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
}: Props) {
    if (totalPages <= 0) return null;

    const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, totalItems);

    const pages: (number | "…")[] = [];
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        pages.push(1);
        if (page > 3) pages.push("…");
        for (
            let i = Math.max(2, page - 1);
            i <= Math.min(totalPages - 1, page + 1);
            i++
        ) {
            pages.push(i);
        }
        if (page < totalPages - 2) pages.push("…");
        pages.push(totalPages);
    }

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
            <p className="text-[12px] text-[#777]">
                Показано {from}–{to} з {totalItems}
            </p>
            <div className="flex items-center gap-1.5">
                {pages.map((p, idx) =>
                    p === "…" ? (
                        <span
                            key={`e-${idx}`}
                            className="w-8 text-center text-[#888]"
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={p}
                            type="button"
                            onClick={() => onPageChange(p)}
                            className={`w-8 h-8 rounded-[6px] text-[13px] font-semibold transition ${
                                p === page
                                    ? "bg-[var(--color-green)] text-white"
                                    : "bg-[#F3EFE7] text-[#2F2F2F] hover:bg-[#E8E4DC]"
                            }`}
                        >
                            {p}
                        </button>
                    )
                )}
            </div>
        </div>
    );
}
