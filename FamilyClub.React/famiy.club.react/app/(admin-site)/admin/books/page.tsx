"use client";

import BooksNav from './booksNav';
import { ProductsApi, Configuration, ProductDto } from '@/lib/api/generated';
import ItemActions from "@/app/(admin-site)/common_elements/item_actions";
import { useEffect, useState } from "react";
import EntitiesSearchSorting from "@/app/(admin-site)/common_elements/entities_search_sorting";
import Pagination from "@/app/(admin-site)/common_elements/entities_pagination"; // Імпортуємо наш компонент пагінації

// Опції сортування для книг
const BOOK_SORT_OPTIONS = [
    { value: "id_asc", label: "Старі на початку" },
    { value: "id_desc", label: "Нові на початку" },
    { value: "asc", label: "За алфавітом (А→Я)" },
    { value: "desc", label: "За алфавітом (Я→А)" },
];

const ITEMS_PER_PAGE = 10;

if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export default function AllBooks() {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1); // Додаємо відстеження поточної сторінки
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const config = new Configuration({ basePath: "https://localhost:7069" });
        const api = new ProductsApi(config);

        api.apiProductsGet()
            .then((data) => {
                setProducts(data);
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

    // Фільтрація та сортування книг на стороні клієнта
    const filteredAndSorted = products
        .filter(p => (p.productName ?? "").toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return (a.productName ?? "").localeCompare(b.productName ?? "");
            }
            if (sortOrder === "desc") {
                return (b.productName ?? "").localeCompare(a.productName ?? ""); // Виправлено друкарську помилку
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

    // Нарізаємо масив (.slice), щоб отримати лише 10 елементів для поточної сторінки
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentPaginatedItems = filteredAndSorted.slice(indexOfFirstItem, indexOfLastItem);

    if (error) {
        return <div className="p-[35px]">Failed to load products.</div>;
    }

    return (
        <div className="relative min-h-screen w-full flex flex-col">
            
            {/* ШАР 1: Глобальний фон для всієї сторінки (на весь екран) */}
            <img
                src="/images/entities/main_background.png" 
                alt="Main Background"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
            />
            
            {/* Навігація зверху */}
            <BooksNav />

            {/* ШАР 2: Обгортка для контенту (Макс. ширина 1492px) */}
            <div className="relative flex-1 flex flex-col w-full max-w-[1492px] mx-auto my-4 px-4 sm:px-8">
                
                {/* Фонова PNG-рамка для самого контентного блоку */}
                <img
                    src="/images/entities/main_field_background.png" 
                    alt="Background Frame"
                    className="absolute inset-0 w-full h-full object-fill pointer-events-none z-0 rounded-xl shadow-sm"
                />

                {/* ШАР 3: Контент поверх рамки завдяки z-10 */}
                <div className="relative z-10 flex flex-col justify-between flex-1 min-h-[75vh] p-8 md:p-12">
                    
                    {/* Верхня частина контенту */}
                    <div className="pt-6">
                        <EntitiesSearchSorting
                            searchPlaceholder="Введіть будь ласка назву книги для пошуку..."
                            searchValue={search}
                            onSearchChange={handleSearchChange} // Скидає сторінку на першу при пошуку
                            addButtonText="Додати книгу"
                            addButtonHref="/products/addProduct" 
                            sortValue={sortOrder}
                            onSortChange={setSortOrder}
                            sortOptions={BOOK_SORT_OPTIONS}
                        />

                        {/* Table Header замість оригінальної таблиці */}
                        <div className="flex border-none pb-4 pt-6 font-bold text-lg px-[20px]">
                            <div className="flex-1">Товари</div>
                            <div className="w-[100px] text-center md:mr-4">Дії</div>
                        </div>

                        {/* Список усіх наявних продуктів */}
                        <div className="grid gap-4 w-full">
                            {isLoading ? (
                                <div className="text-[20px] opacity-60">Завантаження...</div>
                            ) : currentPaginatedItems.length > 0 ? (
                                currentPaginatedItems.map((product) => (
                                    <div
                                        key={product.id}
                                        className="w-full min-h-[50px] py-3 bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] px-[24px] flex items-center justify-between"
                                    >
                                        {/* Назва книги */}
                                        <p className="font-sanspro font-semibold text-[18px] md:text-[20px]">
                                            {product.productName || "Unknown name"}
                                        </p>
                                        
                                        {/* Кнопки дій */}
                                        <div className="flex items-center gap-[20px]">
                                            <ItemActions 
                                                id={product.id} 
                                                type="product" 
                                                onDeleteSuccess={(deletedId) => {
                                                    setProducts((prev) => {
                                                        const updated = prev.filter((p) => p.id !== deletedId);
                                                        const totalFilteredAfterDelete = updated.filter(p =>
                                                            (p.productName ?? "").toLowerCase().includes(search.toLowerCase())
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
                                <div className="text-[20px] opacity-60 px-[20px]">Книг не знайдено</div>
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