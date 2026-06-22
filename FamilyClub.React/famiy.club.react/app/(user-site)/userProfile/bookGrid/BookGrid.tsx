"use client";

import { ProductDto } from "@/lib/api/generated";

type Props = {
  books: ProductDto[];
};

export default function BookGrid({ books }: Props) {
  if (books.length === 0) {
    return (
      <div
        className="flex h-[680px] relative flex-col items-center justify-center"
        style={{
        backgroundImage: "url('/images/userProfile/Frame 627.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 700px",
        backgroundPosition: "top center",
      }}
      >
        <img
          src="/images/userProfile/imgIko.png"
          alt="Порожньо"
          className="w-[230px] h-[240px] object-contain"
        />
        <p className="mt-4 text-gray-500 text-lg">Тут покищо порожньо</p>
      </div>
    );
  }

  return (
    <div
      className="grid min-h-screen grid-cols-3 gap-x-10 gap-y-20 px-10 py-10"
      style={{
        backgroundImage: "url('/images/userProfile/Frame 627.png')",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% 340px",
        backgroundPosition: "top center",
      }}
    >
      {books.map((book) => (
        <div key={book.id} className="relative flex flex-col items-center">
          <button
            type="button"
            className="absolute top-2 right-2 z-10"
            aria-label="У вподобані"
          >
            <img
              src="/images/userProfile/heart-icon.png"
              alt=""
              className="w-[20px] h-[20px]"
            />
          </button>

          <div className="w-[180px] h-[260px] bg-white shadow-md rounded-sm overflow-hidden flex items-center justify-center">
            <span className="text-xs text-gray-400 px-2 text-center">
              {book.productName}
            </span>
          </div>

          <div className="mt-3 text-center">
            <p className="text-[#D9A441] text-sm leading-none">★★★★★</p>
            <p className="font-semibold text-[15px] mt-1">{book.productName}</p>
            <p className="text-xs text-gray-500">
              {book.publishingDate
                ? new Date(book.publishingDate).getFullYear()
                : "рік невідомий"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}