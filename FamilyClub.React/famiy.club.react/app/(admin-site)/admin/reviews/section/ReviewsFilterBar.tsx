"use client";

import Image from "next/image";

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
        <div
            className="rounded-2xl w-[77vw] h-[14vh] p-2 pb-4 flex items-center justify-between"
            style={{
                backgroundImage: "url('/images/reviewsAdmin/Rectangle 712.png')",
                backgroundSize: "100% 100%",
            }}
        >
            <div className="p-2 flex flex-row gap-6 ml-4 items-center">
                <div className="relative">
                    <label className="text-[20px] font-medium block mb-1">Пошук</label>
                    <input
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Пошук по відгукам"
                        className="border rounded-lg px-3 py-2 w-56 pr-10"
                    />
                    <span className="absolute right-2 top-[4.7vh] w-[20px] h-[20px] flex items-center justify-center pointer-events-none">
                        <Image
                            src="/images/reviewsAdmin/magnifying-glass-solid-full.png"
                            alt=""
                            width={20}
                            height={20}
                            className="object-contain opacity-60"
                        />
                    </span>
                </div>

                <div>
                    <label className="text-[20px] font-medium block mb-1">Книги</label>
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
                    <label className="text-[20px] font-medium block mb-1">Оцінка</label>
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
            </div>
            <div className="p-2 mt-2">
                <button
                    type="button"
                    onClick={onReset}
                    className="mr-6 flex items-center gap-2 text-[16px] text-gray-500 hover:text-gray-800 whitespace-nowrap"
                >
                    <Image
                        src="/images/reviewsAdmin/arrows-rotate-solid-full 1.png"
                        alt=""
                        width={16}
                        height={16}
                        className="object-contain opacity-60"
                    />
                    Скинути фільтри
                </button>
            </div>
        </div>
    );
}