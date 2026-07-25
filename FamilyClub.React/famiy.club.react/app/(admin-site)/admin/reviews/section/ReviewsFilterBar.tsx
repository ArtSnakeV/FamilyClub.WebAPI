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
    <div className="bg-white rounded-2xl p-4 flex flex-wrap gap-4 items-end w-full max-w-full min-w-0 shadow-[0_0_15px_rgba(0,0,0,0.08)]">
      <div className="min-w-0 flex-1 basis-[200px]">
        <label className="text-sm font-medium block mb-1">Пошук</label>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Пошук по відгукам"
          className="border rounded-lg px-3 py-2 w-full min-w-0 max-w-full"
        />
      </div>

      <div className="min-w-0 flex-1 basis-[160px]">
        <label className="text-sm font-medium block mb-1">Книги</label>
        <select
          value={book}
          onChange={(e) => onBookChange(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full min-w-0 max-w-full"
        >
          <option value="all">Всі книги</option>
          {bookOptions.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title}
            </option>
          ))}
        </select>
      </div>

      <div className="min-w-0 flex-1 basis-[140px]">
        <label className="text-sm font-medium block mb-1">Оцінка</label>
        <select
          value={rating}
          onChange={(e) => onRatingChange(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full min-w-0 max-w-full"
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
        className="text-sm text-gray-500 hover:text-gray-800 whitespace-nowrap pb-2"
      >
        Скинути фільтри
      </button>
    </div>
  );
}
