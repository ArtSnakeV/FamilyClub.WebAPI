"use client";

import BooksNav from '../booksNav';
import { CategoriesApi, Configuration, CategoryDto } from '@/lib/api/generated';
import ItemActions from "@/app/(admin-site)/common_elements/item_actions";
import { useEffect, useState } from "react";
import EntitiesSearchSorting from "@/app/(admin-site)/common_elements/entities_search_sorting";
import Pagination from "@/app/(admin-site)/common_elements/entities_pagination"; // Імпортуємо наш компонент пагінації
import { apiBasePath } from '@/lib/api/services';

const CATEGORY_SORT_OPTIONS = [
    { value: "id_asc", label: "Старі на початку" },
    { value: "id_desc", label: "Нові на початку" },
    { value: "asc", label: "За алфавітом (А→Я)" },
    { value: "desc", label: "За алфавітом (Я→А)" },
];

const ITEMS_PER_PAGE = 10;

export default function CategoriesPage() {
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1); // Додаємо відстеження поточної сторінки
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const config = new Configuration({
            basePath: apiBasePath
        });
        const api = new CategoriesApi(config);

        api.apiCategoriesGet()
            .then((data) => {
                setCategories(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("API ERROR FULL:", err);
                setError(err);
                setIsLoading(false);
            });
    }, []);

    // Скидаємо сторінку на 1 при зміні пошукового запиту
    const handleSearchChange = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    // 1. Фільтрація та сортування повного списку на клієнті
    const filteredAndSorted = categories
        .filter(c => (c.categoryName ?? "").toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return (a.categoryName ?? "").localeCompare(b.categoryName ?? "");
            }
            if (sortOrder === "desc") {
                return (b.categoryName ?? "").localeCompare(a.categoryName ?? "");
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

    // 2. Нарізаємо відфільтрований масив для поточної сторінки
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentPaginatedItems = filteredAndSorted.slice(indexOfFirstItem, indexOfLastItem);

    if (error) {
        return <div className="p-[35px]">Failed to load categories.</div>;
    }

    return (
        <div className="relative min-h-screen w-full flex flex-col">
            {/* Фонове зображення для всієї сторінки */}
            <img 
                src="/images/entities/main_background.png" // Шлях до загального фону
                alt="Main Background" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
            />
            {/* Навігація зверху */}
            <BooksNav />

            {/* Обгортка для контенту та фону: 
        */}
            <div className="relative flex-1 flex flex-col w-full max-w-[1492px] mx-auto my-4 px-4 sm:px-8 ">
                <img
                    src="/images/entities/main_field_background.png"
                    alt="Background Frame"
                    className="absolute inset-0 w-full h-full object-fill pointer-events-none z-0 rounded-xl shadow-sm"
                />
                {/* Контент */}
                <div className="relative z-10 flex flex-col justify-between flex-1 min-h-[75vh] p-8 md:p-5">

                    {/* Верхня частина контенту */}
                    <div className="pt-6">
                        <EntitiesSearchSorting
                            searchPlaceholder="Пошук категорії..."
                            searchValue={search}
                            onSearchChange={handleSearchChange}
                            addButtonText="Додати категорію"
                            addButtonHref="/admin/books/categories/addCategory"
                            sortValue={sortOrder}
                            onSortChange={setSortOrder}
                            sortOptions={CATEGORY_SORT_OPTIONS}
                        />

                        <p className="font-[Source_Sans_Pro] font-semibold text-[32px] md:text-[36px] leading-[150%] tracking-[-0.011em] mt-6 mb-4">
                            Категорії:
                        </p>

                        {/* Список категорій */}
                        <div className="grid gap-4 w-full">
                            {isLoading ? (
                                <div className="text-[20px] opacity-60">Завантаження...</div>
                            ) : currentPaginatedItems.length > 0 ? (
                                currentPaginatedItems.map((category) => (
                                    <div
                                        key={category.id}
                                        className="w-full min-h-[50px] py-3 bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] px-[24px] flex items-center justify-between"
                                    >
                                        <p className="font-sanspro font-semibold text-[18px] md:text-[20px]">
                                            {category.categoryName || "Unnamed Category"}
                                        </p>

                                        <div className="flex items-center gap-[20px]">
                                            <ItemActions
                                                id={category.id}
                                                type="category"
                                                onDeleteSuccess={(deletedId) => {
                                                    setCategories((prev) => {
                                                        const updated = prev.filter((c) => c.id !== deletedId);
                                                        const totalFilteredAfterDelete = updated.filter(c =>
                                                            (c.categoryName ?? "").toLowerCase().includes(search.toLowerCase())
                                                        ).length;
                                                        const maxPages = Math.ceil(totalFilteredAfterDelete / ITEMS_PER_PAGE);

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
                                <div className="text-[20px] opacity-60">Категорій не знайдено</div>
                            )}
                        </div>
                    </div>

                    {/* Пагінація знизу */}
                    <div className="mt-8 flex justify-center">
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
    );
}