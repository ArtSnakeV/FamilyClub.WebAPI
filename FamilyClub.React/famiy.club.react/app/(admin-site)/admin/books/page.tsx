"use client";

import BooksNav from './booksNav';
import { ProductsApi, Configuration, ProductDto } from '@/lib/api/generated';
import ItemActions from "@/app/(admin-site)/common_elements/item_actions";
import { useEffect, useState } from "react";
import EntitiesSearchSorting from "@/app/(admin-site)/common_elements/entities_search_sorting";

// Опції сортування для книг
const BOOK_SORT_OPTIONS = [
    { value: "id_asc", label: "Старі на початку" },
    { value: "id_desc", label: "Нові на початку" },
    { value: "asc", label: "За алфавітом (А→Я)" },
    { value: "desc", label: "За алфавітом (Я→А)" },
];

if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export default function AllBooks() {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
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

    // Фільтрація та сортування книг на стороні клієнта
    const filteredAndSorted = products
        .filter(p => (p.productName ?? "").toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return (a.productName ?? "").localeCompare(b.productName ?? "");
            }
            if (sortOrder === "desc") {
                return (b.productName ?? "").localeCompare(b.productName ?? "");
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

    if (error) {
        return <div className="p-[35px]">Failed to load products.</div>;
    }

    return (
        <>
            {/* Links for entities pages */}
            <BooksNav />

            {/* Main content part*/}
            <div
                className="absolute bg-cover bg-center bg-no-repeat overflow-hidden"
                style={{
                    width: '1492.88px',
                    height: '1062.04px',
                    backgroundImage: "url('/images/entities/main_field_background.svg')",
                }}
            >
                <div className="absolute inset-[25px] overflow-auto p-[10px]">

                    {/* Наш уніфікований блок пошуку, сортування та кнопки "Додати" */}
                    <EntitiesSearchSorting
                        searchPlaceholder="Введіть будь ласка назву книги для пошуку..."
                        searchValue={search}
                        onSearchChange={setSearch}
                        addButtonText="Додати книгу"
                        addButtonHref="/products/addProduct" // Ваш оригінальний шлях з форми
                        sortValue={sortOrder}
                        onSortChange={setSortOrder}
                        sortOptions={BOOK_SORT_OPTIONS}
                    />

                    {/* Table Section */}
                    <div className="mt-8 px-[20px] w-full text-left">
                        {/* Table Header */}
                        <div className="flex border-none pb-4 font-bold text-lg">
                            <div className="flex-1 padding-10">Товари</div>
                            <div className="w-[338px] text-center">Дії</div>
                        </div>

                        {/* Список усіх наявних продуктів */}
                        <div className="grid gap-4">
                            {isLoading ? (
                                <div className="text-[20px] opacity-60">Завантаження...</div>
                            ) : filteredAndSorted.length > 0 ? (
                                filteredAndSorted.map((product) => (
                                    <div
                                        key={product.id}
                                        className="max-w-[1464px] w-full h-[50px] bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] px-[24px] flex items-center justify-between"
                                    >
                                        {/* Left side: product name */}
                                        <p className="font-sanspro font-semibold text-[20px] leading-[150%] tracking-[-0.011em] align-middle">
                                            {product.productName || "Unknown name"}
                                        </p>
                                        
                                        {/* Right side: buttons */}
                                        <div className="flex items-center gap-[20px]">
                                            <ItemActions 
                                                id={product.id} 
                                                type="product" 
                                                onDeleteSuccess={(deletedId) => {
                                                    // Миттєве видалення зі стейту без перезавантаження
                                                    setProducts((prev) => prev.filter((p) => p.id !== deletedId));
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-[20px] opacity-60">Книг не знайдено</div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}