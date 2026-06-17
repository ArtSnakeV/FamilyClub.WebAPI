"use client";

import { useEffect, useRef, useState } from "react";
import BooksNav from "../booksNav";
import { AuthorDTO } from "@/lib/api/generated";
import { authorService, apiBasePath } from "@/lib/api/services";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ManagerAuthorPage() {
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [authors, setAuthors] = useState<AuthorDTO[]>([]);
  const [sortOrder, setSortOrder] = useState("name-new");
  const router = useRouter();

  useEffect(() => {
    authorService.apiAuthorsGet().then(setAuthors).catch(console.error);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setSearch("");
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const q = search.toLowerCase();

  const filteredAuthors =
    search.trim() === ""
      ? authors
      : authors.filter((a) => a.authorName?.toLowerCase().includes(q));

  const hasResults = filteredAuthors.length > 0;

  const sortedAuthors = [...filteredAuthors].sort((a, b) => {
    if (sortOrder === "name-new") return (b.id ?? 0) - (a.id ?? 0);
    if (sortOrder === "name-old") return (a.id ?? 0) - (b.id ?? 0);
    if (sortOrder === "name-asc")
      return (a.authorName ?? "").localeCompare(b.authorName ?? "");
    if (sortOrder === "name-desc")
      return (b.authorName ?? "").localeCompare(a.authorName ?? "");
    return 0;
  });
console.log("apiBasePath:", apiBasePath);
  return (
    <div
      className="w-full min-h-screen overflow-hidden relative m-0 p-0"
      style={{
        backgroundImage: "url('/images/authorPageAdmin/Rectangle 326.svg')",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="w-full min-h-screen relative">
        <img
          src="/images/authorPageAdmin/Rectangle 675.svg"
          className="absolute w-full"
          style={{ height: "auto", top: "30px", left:"-2px" }}
          alt=""
        />
        <div className="flex flex-col">
          <div
            className="relative z-20"
            style={{ top: "50px", left: "0", right: "0", height: "60px" }}
          >
            <BooksNav />
          </div>

          <div
            className="relative self-center mt-[80px] ml-4 w-[90%] max-w-[1500px]"
            style={{
              width: "1500px",
              marginLeft: "30px",
              minHeight: "800px",
            }}
          >
            <img
              src="/images/authorPageAdmin/Rectangle 708.png"
              alt=""
              className="absolute top-0 left-0 w-full h-full object-fill"
            />
            {/* Рядок: пошук + кнопка + сортування */}
            <div className="relative flex flex-row items-center gap-4 top-[36px] pt-[10px] px-[32px]">
              {/* Пошук */}
              <div className="relative w-[400px] ml-[38px]">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Пошук автора"
                  className="w-full pl-4 pr-10 h-[36px] bg-[var(--color-white)] rounded-[9px] text-[15px] px-2 text-[#272727] outline-none border-[1px]"
                />
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-[22px] h-[22px] flex items-center justify-center"
                >
                  <Image
                    src="/images/header/zoom_out_24px.png"
                    alt="search"
                    width={22}
                    height={22}
                    className="object-contain"
                    priority
                  />
                </button>
              </div>

              {/* Кнопка додати */}
              <button
                type="button"
                className="transition-all duration-200 hover:opacity-90 hover:shadow-[0px_0px_20px_0px_#00000080] active:scale-[0.98] w-[150px] cursor-pointer h-[36px] rounded-[9px] bg-[var(--color-green)] text-[var(--color-white)] flex items-center justify-around text-[14px]"
                onClick={() => router.push(`/admin/books/authors/addAuthor`)}
              >
                <img
                  src="/images/authorPageAdmin/pen-to-square-solid-full 1.svg"
                  alt="add"
                  width={18}
                  height={18}
                  className="object-contain"
                />
                Додати автора
              </button>

              {/* Сортування — справа */}
              <div className="flex flex-row items-center gap-2 absolute right-[70px]">
                <p className="text-[14px] text-[var(--color-black)]">
                  Сортування:
                </p>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="h-[30px] bg-[var(--color-white)] rounded-[9px] text-[14px] px-2 text-[var(--color-black)] outline-none border-[1px]"
                >
                  <option value="name-new">Нові спочатку</option>
                  <option value="name-old">Старі спочатку</option>
                  <option value="name-asc">За алфавітом (А→Я)</option>
                  <option value="name-desc">За алфавітом (Я→А)</option>
                </select>
              </div>
            </div>
            <div className="mt-4 relative top-[40px] ">
              <h1 className="text-[28px] relative w-[100px] ml-[70px] font-bold text-[var(--color-black)]">
                Автори:
              </h1>
            </div>
            {/* Список авторів */}
            <div
              className="relative flex flex-col"
              ref={containerRef}
              style={{
                width: "calc(100% - 66px)",
                marginLeft: "33px",
                top: "40px",
              }}
            >
              {hasResults ? (
                <div>
                  {sortedAuthors.map((author) => {
                    const handleDelete = async () => {
                      const confirmDelete = confirm(
                        "Ви точно хочете видалити автора?",
                      );
                      if (!confirmDelete) return;
                      try {
                        await authorService.apiAuthorsIdDelete({
                          id: Number(author.id),
                        });
                        setAuthors((prev) =>
                          prev.filter((a) => a.id !== author.id),
                        );
                      } catch (e) {
                        console.error(e);
                        alert("Помилка при видаленні");
                      }
                    };

                    return (
                      <div
                        className="flex flex-row items-center p-4 mt-2 mb-3 mx-[40px] gap-4 rounded-[9px] bg-[var(--color-white)] px-4 py-3 shadow-[0px_0px_10px_0px_#00000040]"
                        key={author.id}
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

                        <div className="flex flex-col flex-1 gap-1 min-w-0">
                          <p className="text-[16px] font-bold text-[var(--color-black)] truncate">
                            {author.authorName}
                          </p>
                          <p className="text-[13px] text-[var(--color-black)] line-clamp-3 opacity-70">
                            {author.biography}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2 flex-shrink-0">
                          <button
                            type="button"
                            className="transition-all duration-200 hover:opacity-90 hover:shadow-[0px_0px_20px_0px_#00000080] active:scale-[0.98] w-[100px] cursor-pointer h-[30px] rounded-[9px] bg-[var(--color-green)] text-[var(--color-white)] flex items-center justify-center gap-2 text-[10px]"
                           onClick={() => router.push(`/admin/books/authors/editAuthor/${author.id}`)}
                          >
                            <img
                              src="/images/authorPageAdmin/pen-to-square-solid-full 1.svg"
                              alt="add"
                              width={18}
                              height={18}
                              className="object-contain"
                            />
                            Редагувати
                          </button>
                          <button
                            type="button"
                            onClick={handleDelete}
                            className="border-2 w-[100px] border-[#005B3380] text-[#005B33] bg-transparent transition-all duration-200 hover:bg-[#005B3310] active:scale-[0.98] h-[30px] rounded-[9px] flex items-center justify-center gap-4 text-[10px]"
                          >
                            <img
                              src="/images/authorPageAdmin/trash.svg"
                              alt="del"
                              width={18}
                              height={18}
                              className="object-contain"
                            />
                            Видалити
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="ml-[76px] mt-4 text-[var(--color-black)] opacity-60">
                  Авторів не знайдено
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
