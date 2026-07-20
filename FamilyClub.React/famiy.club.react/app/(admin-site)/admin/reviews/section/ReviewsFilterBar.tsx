"use client";

interface Props {
    search: string;
    book: string;
    rating: string;
    onSearchChange: (v: string) => void;
    onBookChange: (v: string) => void;
    onRatingChange: (v: string) => void;
    onReset: () => void;
    bookOptions: { id: string; title: string }[];
}

export default function ReviewsFilterBar({
    search,
    book,
    rating,
    onSearchChange,
    onBookChange,
    onRatingChange,
    onReset,
    bookOptions,
}: Props) {
    return (
        <div className="bg-white rounded-2xl p-4 flex flex-wrap gap-6 items-end">
            <div>
                <label className="text-sm font-medium block mb-1">Пошук</label>
                <input
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Пошук по відгукам"
                    className="border rounded-lg px-3 py-2 w-56"
                />
            </div>

            <div>
                <label className="text-sm font-medium block mb-1">Книги</label>
                <select
                    value={book}
                    onChange={(e) => onBookChange(e.target.value)}
                    className="border rounded-lg px-3 py-2 w-44"
                >
                    <option value="all">Всі книги</option>
                    {bookOptions.map((b) => (
                        <option key={b.id} value={b.id}>
                            {b.title}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="text-sm font-medium block mb-1">Оцінка</label>
                <select
                    value={rating}
                    onChange={(e) => onRatingChange(e.target.value)}
                    className="border rounded-lg px-3 py-2 w-36"
                >
                    <option value="all">Всі оцінки</option>
                    {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>
                            {r} {r === 1 ? "зірка" : "зірок"}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="button"
                onClick={onReset}
                className="ml-auto text-sm text-gray-500 hover:text-gray-800"
            >
                ↻ Скинути фільтри
            </button>
        </div>
    );
}