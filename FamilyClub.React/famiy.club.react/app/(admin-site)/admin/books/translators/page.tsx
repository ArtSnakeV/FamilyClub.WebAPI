// "use client";

// import BooksNav from '../booksNav';
// import { TranslatorsApi, Configuration, TranslatorDto } from '@/lib/api/generated';
// import ItemActions from "@/app/(admin-site)/common_elements/item_actions";
// import { useEffect, useState } from "react";
// import EntitiesSearchSorting from "@/app/(admin-site)/common_elements/entities_search_sorting";
// import Pagination from "@/app/(admin-site)/common_elements/entities_pagination"; // Import our new pagination component

// const TRANSLATOR_SORT_OPTIONS = [
//     { value: "id_asc", label: "Старі на початку" },
//     { value: "id_desc", label: "Нові на початку" },
//     { value: "asc", label: "За алфавітом (А→Я)" },
//     { value: "desc", label: "За алфавітом (Я→А)" },
// ];

// const ITEMS_PER_PAGE = 10;

// export default function TranslatorsPage() {
//     const [translators, setTranslators] = useState<TranslatorDto[]>([]);
//     const [search, setSearch] = useState("");
//     const [sortOrder, setSortOrder] = useState("asc");
//     const [currentPage, setCurrentPage] = useState(1); // Track current page
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<unknown>(null);

//     useEffect(() => {
//         const config = new Configuration({ basePath: "https://localhost:7069" });
//         const api = new TranslatorsApi(config);

//         api.apiTranslatorsGet()
//             .then((data) => {
//                 setTranslators(data);
//                 setIsLoading(false);
//             })
//             .catch((err) => {
//                 console.error("API ERROR FULL:", err);
//                 setError(err);
//                 setIsLoading(false);
//             });
//     }, []);

//     // Reset page to 1 when search changes
//     const handleSearchChange = (value: string) => {
//         setSearch(value);
//         setCurrentPage(1);
//     };

//     // 1. Filter and Sort the array first
//     const filteredAndSorted = translators
//         .filter(t => (t.translatorName ?? "").toLowerCase().includes(search.toLowerCase()))
//         .sort((a, b) => {
//             if (sortOrder === "asc") {
//                 return (a.translatorName ?? "").localeCompare(b.translatorName ?? "");
//             }
//             if (sortOrder === "desc") {
//                 return (b.translatorName ?? "").localeCompare(a.translatorName ?? "");
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

//     // 2. Slice the final array to get only 10 items for the current page
//     const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
//     const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
//     const currentPaginatedItems = filteredAndSorted.slice(indexOfFirstItem, indexOfLastItem);

//     if (error) {
//         return <div className="p-[35px]">Failed to load translators.</div>;
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
//                 <EntitiesSearchSorting
//                     searchPlaceholder="Пошук перекладача..."
//                     searchValue={search}
//                     onSearchChange={handleSearchChange} // Uses our page-resetting function
//                     addButtonText="Додати перекладача"
//                     addButtonHref="/admin/books/translators/addTranslator"
//                     sortValue={sortOrder}
//                     onSortChange={setSortOrder}
//                     sortOptions={TRANSLATOR_SORT_OPTIONS}
//                 />

//                 <p className="font-[Source_Sans_Pro] font-semibold text-[36px] leading-[150%] tracking-[-0.011em] align-middle mt-4">
//                     Перекладачі:
//                 </p>

//                 {/* Grid list of paginated translators */}
//                 <div className="grid gap-4 mt-4">
//                     {isLoading ? (
//                         <div className="text-[20px] opacity-60">Завантаження...</div>
//                     ) : currentPaginatedItems.length > 0 ? (
//                         currentPaginatedItems.map((translator) => (
//                             <div
//                                 key={translator.id}
//                                 className="max-w-[1464px] w-full h-[50px] bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] px-[24px] flex items-center justify-between"
//                             >
//                                 <p className="font-sanspro font-semibold text-[20px] leading-[150%] tracking-[-0.011em] align-middle">
//                                     {translator.translatorName || "Unnamed Translator"}
//                                 </p>

//                                 <div className="flex items-center gap-[20px]">
//                                     <ItemActions
//                                         id={translator.id}
//                                         type="translator"
//                                         onDeleteSuccess={(deletedId) => {
//                                             setTranslators((prev) => {
//                                                 const updated = prev.filter((t) => t.id !== deletedId);

//                                                 // Обчислюємо, скільки елементів залишиться після фільтрації (для пошуку)
//                                                 const totalFilteredAfterDelete = updated.filter(t =>
//                                                     (t.translatorName ?? "").toLowerCase().includes(search.toLowerCase())
//                                                 ).length;

//                                                 // Рахуємо нову максимальну кількість сторінок
//                                                 const maxPages = Math.ceil(totalFilteredAfterDelete / ITEMS_PER_PAGE);

//                                                 // Якщо поточна сторінка більша за максимальну (і це не перша сторінка),
//                                                 // зміщуємо користувача на 1 сторінку назад
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
//                         <div className="text-[20px] opacity-60">Перекладачів не знайдено</div>
//                     )}
//                 </div>

//                 {/* Render the pagination row element at the bottom */}
//                 <Pagination
//                     totalItems={filteredAndSorted.length} // total filtered matches
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
import { TranslatorsApi, Configuration, TranslatorDto } from '@/lib/api/generated';
import { translatorService } from "@/lib/api/services";
import ItemActions from "@/app/(admin-site)/common_elements/item_actions";
import { useEffect, useState } from "react";
import EntitiesSearchSorting from "@/app/(admin-site)/common_elements/entities_search_sorting";
import Pagination from "@/app/(admin-site)/common_elements/entities_pagination"; // Import our new pagination component

const TRANSLATOR_SORT_OPTIONS = [
    { value: "id_asc", label: "Старі на початку" },
    { value: "id_desc", label: "Нові на початку" },
    { value: "asc", label: "За алфавітом (А→Я)" },
    { value: "desc", label: "За алфавітом (Я→А)" },
];

const ITEMS_PER_PAGE = 10;

export default function TranslatorsPage() {
    const [translators, setTranslators] = useState<TranslatorDto[]>([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        translatorService.apiTranslatorsGet()
            .then((data) => {
                setTranslators(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("API ERROR FULL:", err);
                setError(err);
                setIsLoading(false);
            });
    }, []);

    // Reset page to 1 when search changes
    const handleSearchChange = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    // 1. Filter and Sort the array first
    const filteredAndSorted = translators
        .filter(t => (t.translatorName ?? "").toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return (a.translatorName ?? "").localeCompare(b.translatorName ?? "");
            }
            if (sortOrder === "desc") {
                return (b.translatorName ?? "").localeCompare(a.translatorName ?? "");
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

    // 2. Slice the final array to get only 10 items for the current page
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentPaginatedItems = filteredAndSorted.slice(indexOfFirstItem, indexOfLastItem);

    if (error) {
        return <div className="p-[35px]">Failed to load translators.</div>;
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


                            <EntitiesSearchSorting
                                searchPlaceholder="Пошук перекладача..."
                                searchValue={search}
                                onSearchChange={handleSearchChange} // Uses our page-resetting function
                                addButtonText="Додати перекладача"
                                addButtonHref="/admin/books/translators/addTranslator"
                                sortValue={sortOrder}
                                onSortChange={setSortOrder}
                                sortOptions={TRANSLATOR_SORT_OPTIONS}
                            />

                            <p className="font-[Source_Sans_Pro] font-semibold text-[36px] leading-[150%] tracking-[-0.011em] align-middle mt-4">
                                Перекладачі:
                            </p>

                            {/* Grid list of paginated translators */}
                            <div className="grid gap-4 mt-4">
                                {isLoading ? (
                                    <div className="text-[20px] opacity-60">Завантаження...</div>
                                ) : currentPaginatedItems.length > 0 ? (
                                    currentPaginatedItems.map((translator) => (
                                        <div
                                            key={translator.id}
                                            className="max-w-[1464px] w-full h-[50px] bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] px-[24px] flex items-center justify-between"
                                        >
                                            <p className="font-sanspro font-semibold text-[20px] leading-[150%] tracking-[-0.011em] align-middle">
                                                {translator.translatorName || "Unnamed Translator"}
                                            </p>

                                            <div className="flex items-center gap-[20px]">
                                                <ItemActions
                                                    id={translator.id}
                                                    type="translator"
                                                    onDeleteSuccess={(deletedId) => {
                                                        setTranslators((prev) => {
                                                            const updated = prev.filter((t) => t.id !== deletedId);

                                                            // Обчислюємо, скільки елементів залишиться після фільтрації (для пошуку)
                                                            const totalFilteredAfterDelete = updated.filter(t =>
                                                                (t.translatorName ?? "").toLowerCase().includes(search.toLowerCase())
                                                            ).length;

                                                            // Рахуємо нову максимальну кількість сторінок
                                                            const maxPages = Math.ceil(totalFilteredAfterDelete / ITEMS_PER_PAGE);

                                                            // Якщо поточна сторінка більша за максимальну (і це не перша сторінка),
                                                            // зміщуємо користувача на 1 сторінку назад
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
                                    <div className="text-[20px] opacity-60">Перекладачів не знайдено</div>
                                )}
                            </div>

                            {/* Render the pagination row element at the bottom */}
                            <Pagination
                                totalItems={filteredAndSorted.length} // total filtered matches
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