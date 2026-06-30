// "use client";

// import BooksNav from '../booksNav';
// import { LanguagesApi, Configuration, LanguageDto } from '@/lib/api/generated';
// import ItemActions from "@/app/(admin-site)/common_elements/item_actions";
// import { useEffect, useState } from "react";
// import EntitiesSearchSorting from "@/app/(admin-site)/common_elements/entities_search_sorting";
// import Pagination from "@/app/(admin-site)/common_elements/entities_pagination"; // Імпортуємо наш компонент пагінації

// const LANGUAGE_SORT_OPTIONS = [
//     { value: "id_asc", label: "Старі на початку" },
//     { value: "id_desc", label: "Нові на початку" },
//     { value: "asc", label: "За алфавітом (А→Я)" },
//     { value: "desc", label: "За алфавітом (Я→А)" },
// ];

// const ITEMS_PER_PAGE = 10;

// export default function LanguagesPage() {
//     const [languages, setLanguages] = useState<LanguageDto[]>([]);
//     const [search, setSearch] = useState("");
//     const [sortOrder, setSortOrder] = useState("asc");
//     const [currentPage, setCurrentPage] = useState(1); // Відстежуємо поточну сторінку
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<unknown>(null);

//     useEffect(() => {
//         const config = new Configuration({ basePath: "https://localhost:7069" });
//         const api = new LanguagesApi(config);

//         api.apiLanguagesGet()
//             .then((data) => {
//                 setLanguages(data);
//                 setIsLoading(false);
//             })
//             .catch((err) => {
//                 console.error("API ERROR FULL:", err);
//                 setError(err);
//                 setIsLoading(false);
//             });
//     }, []);

//     // Скидаємо сторінку на першу при зміні тексту в пошуку
//     const handleSearchChange = (value: string) => {
//         setSearch(value);
//         setCurrentPage(1);
//     };

//     // 1. Фільтрація та сортування повного масиву
//     const filteredAndSorted = languages
//         .filter(l => (l.languageName ?? "").toLowerCase().includes(search.toLowerCase()))
//         .sort((a, b) => {
//             if (sortOrder === "asc") {
//                 return (a.languageName ?? "").localeCompare(b.languageName ?? "");
//             }
//             if (sortOrder === "desc") {
//                 return (b.languageName ?? "").localeCompare(a.languageName ?? "");
//             }

//             const idA = Number(a.id ?? 0);
//             const idB = Number(b.id ?? 0);

//             if (sortOrder === "id_asc") {
//                 return idA - idB;
//             }
//             if (sortOrder === "id_desc") {
//                 return idB - idA;
//             }

//             return 0;
//         });

//     // 2. Нарізаємо масив для поточної сторінки (по 10 елементів)
//     const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
//     const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
//     const currentPaginatedItems = filteredAndSorted.slice(indexOfFirstItem, indexOfLastItem);

//     if (error) {
//         return <div className="p-[35px]">Failed to load languages.</div>;
//     }

//     return (
//         <div>
//             <BooksNav />
//             {/* Main content part*/}
//             <div
//                 className="absolute bg-cover bg-center bg-no-repeat overflow-hidden"
//                 style={{
//                     width: '1492.88px',
//                     height: '1062.04px',
//                     padding: '35px',
//                     backgroundImage: "url('/images/entities/main_field_background.svg')",
//                 }}
//             >
//                 {/* Компонент пошуку та сортування */}
//                 <EntitiesSearchSorting
//                     searchPlaceholder="Пошук мови..."
//                     searchValue={search}
//                     onSearchChange={handleSearchChange} // Використовуємо функцію зі скиданням сторінки
//                     addButtonText="Додати мову"
//                     addButtonHref="/admin/books/languages/addLanguage"
//                     sortValue={sortOrder}
//                     onSortChange={setSortOrder}
//                     sortOptions={LANGUAGE_SORT_OPTIONS}
//                 />

//                 <p className="font-[Source_Sans_Pro] font-semibold text-[36px] leading-[150%] tracking-[-0.011em] align-middle mt-4">
//                     Мови:
//                 </p>

//                 {/* Список мов із підтримкою пагінації */}
//                 <div className="grid gap-4 mt-4">
//                     {isLoading ? (
//                         <div className="text-[20px] opacity-60">Завантаження...</div>
//                     ) : currentPaginatedItems.length > 0 ? (
//                         currentPaginatedItems.map((language) => (
//                             <div
//                                 key={language.id}
//                                 className="max-w-[1464px] w-full h-[50px] bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] px-[24px] flex items-center justify-between"
//                             >
//                                 {/* Left side: language name */}
//                                 <p className="font-sanspro font-semibold text-[20px] leading-[150%] tracking-[-0.011em] align-middle">
//                                     {language.languageName || "Unnamed Language"}
//                                 </p>

//                                 {/* Right side: actions */}
//                                 <div className="flex items-center gap-[20px]">
//                                     <ItemActions 
//                                         id={language.id} 
//                                         type="language" 
//                                         onDeleteSuccess={(deletedId) => {
//                                             setLanguages((prev) => {
//                                                 const updated = prev.filter((l) => l.id !== deletedId);

//                                                 // Розраховуємо залишок для поточної фільтрації
//                                                 const totalFilteredAfterDelete = updated.filter(l =>
//                                                     (l.languageName ?? "").toLowerCase().includes(search.toLowerCase())
//                                                 ).length;

//                                                 // Обчислюємо нову макс. кількість сторінок
//                                                 const maxPages = Math.ceil(totalFilteredAfterDelete / ITEMS_PER_PAGE);

//                                                 // Перенаправляємо на попередню сторінку, якщо поточна стала порожньою
//                                                 if (currentPage > maxPages && maxPages >= 1) {
//                                                     setCurrentPage(maxPages);
//                                                 }

//                                                 return updated;
//                                             });
//                                         }}
//                                     />
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="text-[20px] opacity-60">Мов не знайдено</div>
//                     )}
//                 </div>

//                 {/* Елемент пагінації */}
//                 <Pagination 
//                     totalItems={filteredAndSorted.length} // передаємо кількість результатів після фільтрації
//                     itemsPerPage={ITEMS_PER_PAGE}
//                     currentPage={currentPage}
//                     onPageChange={setCurrentPage}
//                 />
//             </div>
//         </div>
//     );
// }

"use client";

import BooksNav from '../booksNav';
import { LanguagesApi, Configuration, LanguageDto } from '@/lib/api/generated';
import ItemActions from "@/app/(admin-site)/common_elements/item_actions";
import { useEffect, useState } from "react";
import EntitiesSearchSorting from "@/app/(admin-site)/common_elements/entities_search_sorting";
import Pagination from "@/app/(admin-site)/common_elements/entities_pagination"; // Імпортуємо наш компонент пагінації

const LANGUAGE_SORT_OPTIONS = [
    { value: "id_asc", label: "Старі на початку" },
    { value: "id_desc", label: "Нові на початку" },
    { value: "asc", label: "За алфавітом (А→Я)" },
    { value: "desc", label: "За алфавітом (Я→А)" },
];

const ITEMS_PER_PAGE = 10;

export default function LanguagesPage() {
    const [languages, setLanguages] = useState<LanguageDto[]>([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1); // Відстежуємо поточну сторінку
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const config = new Configuration({ basePath: "https://localhost:7069" });
        const api = new LanguagesApi(config);

        api.apiLanguagesGet()
            .then((data) => {
                setLanguages(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("API ERROR FULL:", err);
                setError(err);
                setIsLoading(false);
            });
    }, []);

    // Скидаємо сторінку на першу при зміні тексту в пошуку
    const handleSearchChange = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    // 1. Фільтрація та сортування повного масиву
    const filteredAndSorted = languages
        .filter(l => (l.languageName ?? "").toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return (a.languageName ?? "").localeCompare(b.languageName ?? "");
            }
            if (sortOrder === "desc") {
                return (b.languageName ?? "").localeCompare(a.languageName ?? "");
            }

            const idA = Number(a.id ?? 0);
            const idB = Number(b.id ?? 0);

            if (sortOrder === "id_asc") {
                return idA - idB;
            }
            if (sortOrder === "id_desc") {
                return idB - idA;
            }

            return 0;
        });

    // 2. Нарізаємо масив для поточної сторінки (по 10 елементів)
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentPaginatedItems = filteredAndSorted.slice(indexOfFirstItem, indexOfLastItem);

    if (error) {
        return <div className="p-[35px]">Failed to load languages.</div>;
    }

    return (
        <div
            className="w-full min-h-screen overflow-hidden relative m-0 p-0">
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


                    {/* Main content part*/}
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

                            {/* Компонент пошуку та сортування */}
                            <EntitiesSearchSorting
                                searchPlaceholder="Пошук мови..."
                                searchValue={search}
                                onSearchChange={handleSearchChange} // Використовуємо функцію зі скиданням сторінки
                                addButtonText="Додати мову"
                                addButtonHref="/admin/books/languages/addLanguage"
                                sortValue={sortOrder}
                                onSortChange={setSortOrder}
                                sortOptions={LANGUAGE_SORT_OPTIONS}
                            />

                            <p className="font-[Source_Sans_Pro] font-semibold text-[36px] leading-[150%] tracking-[-0.011em] align-middle mt-4">
                                Мови:
                            </p>

                            {/* Список мов із підтримкою пагінації */}
                            <div className="grid gap-4 mt-4">
                                {isLoading ? (
                                    <div className="text-[20px] opacity-60">Завантаження...</div>
                                ) : currentPaginatedItems.length > 0 ? (
                                    currentPaginatedItems.map((language) => (
                                        <div
                                            key={language.id}
                                            className="max-w-[1464px] w-full h-[50px] bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] px-[24px] flex items-center justify-between"
                                        >
                                            {/* Left side: language name */}
                                            <p className="font-sanspro font-semibold text-[20px] leading-[150%] tracking-[-0.011em] align-middle">
                                                {language.languageName || "Unnamed Language"}
                                            </p>

                                            {/* Right side: actions */}
                                            <div className="flex items-center gap-[20px]">
                                                <ItemActions
                                                    id={language.id}
                                                    type="language"
                                                    onDeleteSuccess={(deletedId) => {
                                                        setLanguages((prev) => {
                                                            const updated = prev.filter((l) => l.id !== deletedId);

                                                            // Розраховуємо залишок для поточної фільтрації
                                                            const totalFilteredAfterDelete = updated.filter(l =>
                                                                (l.languageName ?? "").toLowerCase().includes(search.toLowerCase())
                                                            ).length;

                                                            // Обчислюємо нову макс. кількість сторінок
                                                            const maxPages = Math.ceil(totalFilteredAfterDelete / ITEMS_PER_PAGE);

                                                            // Перенаправляємо на попередню сторінку, якщо поточна стала порожньою
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
                                    <div className="text-[20px] opacity-60">Мов не знайдено</div>
                                )}
                            </div>

                            {/* Елемент пагінації */}
                            <Pagination
                                totalItems={filteredAndSorted.length} // передаємо кількість результатів після фільтрації
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}