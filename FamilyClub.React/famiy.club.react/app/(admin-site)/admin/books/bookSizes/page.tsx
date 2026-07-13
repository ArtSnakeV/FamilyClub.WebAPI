"use client";

import BooksNav from "../booksNav";
import { BookSizeDto } from "@/lib/api/generated";
import { bookSizeService } from "@/lib/api/services";
import ItemActions from "@/app/(admin-site)/common_elements/item_actions";
import { useEffect, useState } from "react";
import EntitiesSearchSorting from "@/app/(admin-site)/common_elements/entities_search_sorting";
import Pagination from "@/app/(admin-site)/common_elements/entities_pagination";

const BOOK_SIZE_SORT_OPTIONS = [
  { value: "id_asc", label: "Старі на початку" },
  { value: "id_desc", label: "Нові на початку" },
  { value: "asc", label: "За алфавітом (А→Я)" },
  { value: "desc", label: "За алфавітом (Я→А)" },
];

const ITEMS_PER_PAGE = 10;

export default function BookSizesPage() {
  const [bookSizes, setBookSizes] = useState<BookSizeDto[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    bookSizeService
      .apiBookSizesGet()
      .then((data) => {
        setBookSizes(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("API ERROR FULL:", err);
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const filteredAndSorted = bookSizes
    .filter((bookSize) => {
      const q = search.toLowerCase();
      return (
        (bookSize.name ?? "").toLowerCase().includes(q) ||
        (bookSize.code ?? "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return (a.name ?? "").localeCompare(b.name ?? "");
      }
      if (sortOrder === "desc") {
        return (b.name ?? "").localeCompare(a.name ?? "");
      }

      const idA = Number(a.id ?? 0);
      const idB = Number(b.id ?? 0);

      if (sortOrder === "id_asc") return idA - idB;
      if (sortOrder === "id_desc") return idB - idA;

      return 0;
    });

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentPaginatedItems = filteredAndSorted.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  if (error) {
    return <div className="p-[35px]">Failed to load book sizes.</div>;
  }

  return (
    <div className="w-full min-h-screen overflow-hidden relative m-0 p-0">
      <div className="w-[100vw] min-h-screen relative">
        <img
          src="/images/authorPageAdmin/Rectangle 675.png"
          className="absolute"
          style={{ width: "100vw", height: "auto", top: "36px", left: "-20px" }}
          alt=""
        />

        <div className="flex w-full flex-col">
          <div
            className="relative z-20 md:left-[-190px]"
            style={{ top: "50px", height: "60px" }}
          >
            <BooksNav />
          </div>

          <div
            className="relative self-center mt-[90px]"
            style={{
              width: "min(1480px, 100%)",
              marginLeft: "clamp(-420px, calc(50vw - 1430px), 0px)",
              minHeight: "740px",
            }}
          >
            <img
              src="/images/authorPageAdmin/Rectangle 708.png"
              alt=""
              className="absolute top-0 left-0 w-full h-full object-fill"
            />

            <div className="absolute inset-[25px] overflow-auto p-[10px]">
              <EntitiesSearchSorting
                searchPlaceholder="Пошук розміру..."
                searchValue={search}
                onSearchChange={handleSearchChange}
                addButtonText="Додати розмір"
                addButtonHref="/admin/books/bookSizes/addBookSize"
                sortValue={sortOrder}
                onSortChange={setSortOrder}
                sortOptions={BOOK_SIZE_SORT_OPTIONS}
              />

              <p className="font-[Source_Sans_Pro] font-semibold text-[36px] leading-[150%] tracking-[-0.011em] align-middle mt-4">
                Розміри книг:
              </p>

              <div className="grid gap-4 mt-4">
                {isLoading ? (
                  <div className="text-[20px] opacity-60">Завантаження...</div>
                ) : currentPaginatedItems.length > 0 ? (
                  currentPaginatedItems.map((bookSize) => (
                    <div
                      key={bookSize.id}
                      className="max-w-[1464px] w-full min-h-[50px] bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] px-[24px] py-3 flex items-center justify-between"
                    >
                      <div className="min-w-0">
                        <p className="font-sanspro font-semibold text-[20px] leading-[150%] tracking-[-0.011em] align-middle">
                          {bookSize.name || "Unnamed Book Size"}
                        </p>
                        {bookSize.code && (
                          <p className="text-[14px] text-[var(--color-black)] opacity-70 mt-0.5">
                            Код: {bookSize.code}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-[20px] flex-shrink-0">
                        <ItemActions
                          id={bookSize.id}
                          type="bookSize"
                          onDeleteSuccess={(deletedId) => {
                            setBookSizes((prev) => {
                              const updated = prev.filter(
                                (item) => item.id !== deletedId,
                              );

                              const q = search.toLowerCase();
                              const totalFilteredAfterDelete = updated.filter(
                                (item) =>
                                  (item.name ?? "").toLowerCase().includes(q) ||
                                  (item.code ?? "").toLowerCase().includes(q),
                              ).length;

                              const maxPages = Math.ceil(
                                totalFilteredAfterDelete / ITEMS_PER_PAGE,
                              );

                              if (currentPage > maxPages && maxPages >= 1) {
                                setCurrentPage(maxPages);
                              }

                              return updated;
                            });
                          }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-[20px] opacity-60">
                    Розмірів не знайдено
                  </div>
                )}
              </div>

              <Pagination
                totalItems={filteredAndSorted.length}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
