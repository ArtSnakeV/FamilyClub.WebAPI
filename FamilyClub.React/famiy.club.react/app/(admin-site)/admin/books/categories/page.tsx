"use client";

import BooksNav from '../booksNav';
import { CategoriesApi, Configuration, CategoryDto } from '@/lib/api/generated';
import ItemActions from "@/app/(admin-site)/common_elements/item_actions";
import { useEffect, useState } from "react";
import EntitiesSearchSorting from "@/app/(admin-site)/common_elements/entities_search_sorting";
import Pagination from "@/app/(admin-site)/common_elements/entities_pagination"; // Імпортуємо наш компонент пагінації

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
        const config = new Configuration({ basePath: "https://localhost:7069" });
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
        <div>
            <BooksNav />
            {/* Main content part*/}
            <div
                className="absolute bg-cover bg-center bg-no-repeat overflow-hidden"
                style={{
                    width: '1492.88px',
                    height: '1062.04px',
                    padding: '35px',
                    backgroundImage: "url('/images/entities/main_field_background.svg')",
                }}
            >
                <EntitiesSearchSorting
                    searchPlaceholder="Пошук категорії..."
                    searchValue={search}
                    onSearchChange={handleSearchChange} // Замінили на функцію з обнуленням сторінки
                    addButtonText="Додати категорію"
                    addButtonHref="/admin/books/categories/addCategory"
                    sortValue={sortOrder}
                    onSortChange={setSortOrder}
                    sortOptions={CATEGORY_SORT_OPTIONS}
                />

                <p className="font-[Source_Sans_Pro] font-semibold text-[36px] leading-[150%] tracking-[-0.011em] align-middle mt-4">
                    Категорії:
                </p>

                {/* Список категорій із підтримкою пагінації */}
                <div className="grid gap-4 mt-4">
                    {isLoading ? (
                        <div className="text-[20px] opacity-60">Завантаження...</div>
                    ) : currentPaginatedItems.length > 0 ? (
                        currentPaginatedItems.map((category) => (
                            <div
                                key={category.id}
                                className="max-w-[1464px] w-full h-[50px] bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] px-[24px] flex items-center justify-between"
                            >
                                {/* Left side: Category name */}
                                <p className="font-sanspro font-semibold text-[20px] leading-[150%] tracking-[-0.011em] align-middle">
                                    {category.categoryName || "Unnamed Category"}
                                </p>

                                {/* Right side: Actions */}
                                <div className="flex items-center gap-[20px]">
                                    <ItemActions
                                        id={category.id}
                                        type="category"
                                        onDeleteSuccess={(deletedId) => {
                                            setCategories((prev) => {
                                                const updated = prev.filter((c) => c.id !== deletedId);

                                                // Рахуємо елементи, що залишаться після видалення для поточного пошуку
                                                const totalFilteredAfterDelete = updated.filter(c =>
                                                    (c.categoryName ?? "").toLowerCase().includes(search.toLowerCase())
                                                ).length;

                                                // Обчислюємо нову максимальну кількість сторінок
                                                const maxPages = Math.ceil(totalFilteredAfterDelete / ITEMS_PER_PAGE);

                                                // Автоматичний відкат на попередню сторінку, якщо поточна спорожніла
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

                {/* Рендеримо компоненту пагінації */}
                <Pagination 
                    totalItems={filteredAndSorted.length} // Загальна кількість знайдених категорій
                    itemsPerPage={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}