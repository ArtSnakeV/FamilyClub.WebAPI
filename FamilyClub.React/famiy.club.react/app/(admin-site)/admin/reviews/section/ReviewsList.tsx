"use client";

import { Review } from "../types";
import StatusBadge from "../ui/StatusBadge";
import StarRating from "../ui/StarRating";
import Pagination from "../Pagination";
import { usePagination } from "../hooks/usePagination";

interface Props {
  reviews: Review[];
  selectedId?: number;
  // onSelect: (r: Review) => void;
  onSelect: (r: Review | null) => void;
  getImageSrc: (review: Review) => string | null;
}

export default function ReviewsList({
  reviews,
  selectedId,
  onSelect,
  getImageSrc,
}: Props) {

  const {
    currentPage,
    totalPages,
    paginatedItems,
    setCurrentPage,
  } = usePagination(reviews, 1);

  return (
    <div className="bg-white rounded-2xl flex flex-col justify-between w-[800px] h-[700px] border border-gray-100 p-4">

      <div className="flex-1 overflow-y-hidden overflow-x-hidden pr-1 flex flex-col gap-3">
        {paginatedItems.map((r) => {
          const imageSrc = getImageSrc(r);
          const productName = r.productName ?? `Товар #${r.productId}`;
          const isSelected = selectedId === r.id;
          return (
            <button
              key={r.id}
              type="button"
              // onClick={() => onSelect(r)}
             onClick={() => onSelect(isSelected ? null : r)}
              className={`w-[730px] h-[114px] shrink-0 py-[15px] mt-6 px-[30px] ml-5 rounded-[9px] text-left transition-all flex items-center justify-between gap-4 border ${isSelected
                ? "border-[#005B33] shadow-sm bg-[#FFFFFF]"
                : "border-transparent hover:border-gray-200"
                }`}
            >
              {/* Обкладинка + Назва + Автор */}
              <div className="flex items-center gap-3 w-[210px] shrink-0">
                <div className="w-[56px] h-[84px] shrink-0 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[10px] text-gray-400 text-center px-1 truncate">
                      {productName}
                    </span>
                  )}
                </div>

                <div className="flex flex-col justify-center gap-1 min-w-0">
                  <h4
                    className="font-bold text-sm text-gray-900 leading-tight truncate"
                    title={productName}
                  >
                    {productName}
                  </h4>
                  <p
                    className="text-xs text-gray-500 truncate"
                    title={r.authors ?? ""}
                  >
                    {r.authors}
                  </p>
                </div>
              </div>

              <div className="h-[60px] border-r border-dashed border-gray-300 shrink-0" />

              {/* Автор відгуку, Дата, Зірочки */}
              <div className="flex flex-col justify-center gap-1 w-[150px] shrink-0">
                <span
                  className="font-medium text-[16px] text-gray-800 truncate"
                  title={r.userName ?? "Анонім"}
                >
                  {r.userName ?? "Анонім"}
                </span>
                <span className="text-[16px] text-gray-400">
                  {new Date(r.createdAt).toLocaleString("uk-UA", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <StarRating rating={r.rating} />
              </div>

              {/* Коментар */}
              <div className="flex-1 min-w-0 px-2">
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed break-words">
                  {r.comment}
                </p>
              </div>

              {/* Статус та Стрілочка */}
              <div className="flex items-center justify-end gap-3 w-[120px] shrink-0">
                <StatusBadge approved={r.approved} />
              </div>
            </button>
          );
        })}
      </div>
      <div className="w-full flex justify-center pt-4 mt-2 shrink-0">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}