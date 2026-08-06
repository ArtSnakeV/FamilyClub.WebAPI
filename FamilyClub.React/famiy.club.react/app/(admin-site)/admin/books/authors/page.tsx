"use client";

import { useEffect, useState } from "react";
import BooksNav from "../booksNav";
import { AuthorDTO } from "@/lib/api/generated";
import { authorService, apiBasePath } from "@/lib/api/services";
import ItemActions from "@/app/(admin-site)/common_elements/item_actions";
import EntitiesSearchSorting from "@/app/(admin-site)/common_elements/entities_search_sorting";
import Pagination from "@/app/(admin-site)/common_elements/entities_pagination";
import Link from "next/link";

const AUTHOR_SORT_OPTIONS = [
  { value: "id_asc", label: "Старі на початку" },
  { value: "id_desc", label: "Нові на початку" },
  { value: "asc", label: "За алфавітом (А→Я)" },
  { value: "desc", label: "За алфавітом (Я→А)" },
];

const ITEMS_PER_PAGE = 10;

export default function ManagerAuthorPage() {
  const [authors, setAuthors] = useState<AuthorDTO[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("id_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    authorService
      .apiAuthorsGet()
      .then((data) => {
        setAuthors(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const filteredAndSorted = authors
    .filter((a) =>
      (a.authorName ?? "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return (a.authorName ?? "").localeCompare(b.authorName ?? "");
      }
      if (sortOrder === "desc") {
        return (b.authorName ?? "").localeCompare(a.authorName ?? "");
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
    indexOfLastItem
  );

  if (error) {
    return <div className="p-[35px]">Failed to load authors.</div>;
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
                searchPlaceholder="Пошук автора"
                searchValue={search}
                onSearchChange={handleSearchChange}
                addButtonText="Додати автора"
                addButtonHref="/admin/books/authors/addAuthor"
                sortValue={sortOrder}
                onSortChange={setSortOrder}
                sortOptions={AUTHOR_SORT_OPTIONS}
              />

              <p className="font-[Source_Sans_Pro] font-semibold text-[36px] leading-[150%] tracking-[-0.011em] align-middle mt-4">
                Автори:
              </p>

              <div className="grid gap-4 mt-4">
                {isLoading ? (
                  <div className="text-[20px] opacity-60">Завантаження...</div>
                ) : currentPaginatedItems.length > 0 ? (
                  currentPaginatedItems.map((author) => (
                    <div
                      key={author.id}
                      className="max-w-[1464px] w-full bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] px-[24px] py-3 flex items-center justify-between gap-4"
                    >
                      {/* <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className="w-[80px] h-[80px] flex-shrink-0 rounded-[8px] overflow-hidden bg-gray-100">
                          {author.photoUrl ? (
                            <img
                              src={`${apiBasePath}${author.photoUrl}`}
                              alt={author.authorName ?? ""}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-[12px]">
                              Немає фото
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-1 min-w-0">
                          <p className="font-sanspro font-semibold text-[20px] leading-[150%] tracking-[-0.011em] text-[var(--color-black)] truncate">
                            {author.authorName}
                          </p>
                          {author.biography && (
                            <p className="text-[13px] text-[var(--color-black)] line-clamp-2 opacity-70">
                              {author.biography}
                            </p>
                          )}
                        </div>
                      </div> */}
                      <Link
                        href={`/authors/${author.id}`}
                        className="flex items-center gap-4 min-w-0 flex-1 hover:opacity-80 transition-opacity"
                      >
                        <div className="w-[80px] h-[80px] flex-shrink-0 rounded-[8px] overflow-hidden bg-gray-100">
                          {author.photoUrl ? (
                            <img
                              src={`${apiBasePath}${author.photoUrl}`}
                              alt={author.authorName ?? ""}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-[12px]">
                              Немає фото
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-1 min-w-0">
                          <p className="font-sanspro font-semibold text-[20px] leading-[150%] tracking-[-0.011em] text-[var(--color-black)] truncate">
                            {author.authorName}
                          </p>

                          {author.biography && (
                            <p className="text-[13px] text-[var(--color-black)] line-clamp-2 opacity-70">
                              {author.biography}
                            </p>
                          )}
                        </div>
                      </Link>

                      <div className="flex items-center gap-[20px] flex-shrink-0">
                        <ItemActions
                          id={author.id}
                          type="author"
                          onDeleteSuccess={(deletedId) => {
                            setAuthors((prev) => {
                              const updated = prev.filter(
                                (a) => a.id !== deletedId
                              );

                              const totalFilteredAfterDelete = updated.filter(
                                (a) =>
                                  (a.authorName ?? "")
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                              ).length;

                              const maxPages = Math.ceil(
                                totalFilteredAfterDelete / ITEMS_PER_PAGE
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
                    Авторів не знайдено
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
