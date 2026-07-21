"use client";

type Props = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function OrdersPagination({
    page,
    totalPages,
    onPageChange,
}: Props) {
    if (totalPages <= 1) return null;

    const pages: (number | "…")[] = [];
    if (totalPages <= 10) {
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
        <div className="flex items-center justify-center gap-2 pt-4">
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
                        className={`w-8 h-8 rounded-full text-[13px] font-semibold transition ${
                            p === page
                                ? "bg-[var(--color-green)] text-white"
                                : "text-[#2F2F2F] hover:bg-[#E8E4DC]"
                        }`}
                    >
                        {p}
                    </button>
                )
            )}
        </div>
    );
}
