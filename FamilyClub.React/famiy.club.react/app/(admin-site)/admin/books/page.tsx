// "use client";

// import BooksNav from './booksNav';
// import { ProductsApi, Configuration, ProductDto } from '@/lib/api/generated';
// import ItemActions from "@/app/(admin-site)/common_elements/item_actions";
// import { useEffect, useState } from "react";
// import EntitiesSearchSorting from "@/app/(admin-site)/common_elements/entities_search_sorting";

// // Опції сортування для книг
// const BOOK_SORT_OPTIONS = [
//     { value: "id_asc", label: "Старі на початку" },
//     { value: "id_desc", label: "Нові на початку" },
//     { value: "asc", label: "За алфавітом (А→Я)" },
//     { value: "desc", label: "За алфавітом (Я→А)" },
// ];

// if (process.env.NODE_ENV === 'development') {
//     process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// }

// export default function AllBooks() {
//     const [products, setProducts] = useState<ProductDto[]>([]);
//     const [search, setSearch] = useState("");
//     const [sortOrder, setSortOrder] = useState("asc");
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<unknown>(null);

//     useEffect(() => {
//         const config = new Configuration({ basePath: "https://localhost:7069" });
//         const api = new ProductsApi(config);

//         api.apiProductsGet()
//             .then((data) => {
//                 setProducts(data);
//                 setIsLoading(false);
//             })
//             .catch((err) => {
//                 console.error("API ERROR FULL:", err);
//                 setError(err);
//                 setIsLoading(false);
//             });
//     }, []);

//     // Фільтрація та сортування книг на стороні клієнта
//     const filteredAndSorted = products
//         .filter(p => (p.productName ?? "").toLowerCase().includes(search.toLowerCase()))
//         .sort((a, b) => {
//             if (sortOrder === "asc") {
//                 return (a.productName ?? "").localeCompare(b.productName ?? "");
//             }
//             if (sortOrder === "desc") {
//                 return (b.productName ?? "").localeCompare(b.productName ?? "");
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

//     if (error) {
//         return <div className="p-[35px]">Failed to load products.</div>;
//     }

//     return (
//         <>
//             {/* Links for entities pages */}
//             <BooksNav />

//             {/* Main content part*/}
//             <div
//                 className="absolute bg-cover bg-center bg-no-repeat overflow-hidden"
//                 style={{
//                     width: '1492.88px',
//                     height: '1062.04px',
//                     backgroundImage: "url('/images/entities/main_field_background.svg')",
//                 }}
//             >
//                 <div className="absolute inset-[25px] overflow-auto p-[10px]">

//                     {/* Наш уніфікований блок пошуку, сортування та кнопки "Додати" */}
//                     <EntitiesSearchSorting
//                         searchPlaceholder="Введіть будь ласка назву книги для пошуку..."
//                         searchValue={search}
//                         onSearchChange={setSearch}
//                         addButtonText="Додати книгу"
//                         addButtonHref="/products/addProduct" // Ваш оригінальний шлях з форми
//                         sortValue={sortOrder}
//                         onSortChange={setSortOrder}
//                         sortOptions={BOOK_SORT_OPTIONS}
//                     />

//                     {/* Table Section */}
//                     <div className="mt-8 px-[20px] w-full text-left">
//                         {/* Table Header */}
//                         <div className="flex border-none pb-4 font-bold text-lg">
//                             <div className="flex-1 padding-10">Товари</div>
//                             <div className="w-[338px] text-center">Дії</div>
//                         </div>

//                         {/* Список усіх наявних продуктів */}
//                         <div className="grid gap-4">
//                             {isLoading ? (
//                                 <div className="text-[20px] opacity-60">Завантаження...</div>
//                             ) : filteredAndSorted.length > 0 ? (
//                                 filteredAndSorted.map((product) => (
//                                     <div
//                                         key={product.id}
//                                         className="max-w-[1464px] w-full h-[50px] bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] px-[24px] flex items-center justify-between"
//                                     >
//                                         {/* Left side: product name */}
//                                         <p className="font-sanspro font-semibold text-[20px] leading-[150%] tracking-[-0.011em] align-middle">
//                                             {product.productName || "Unknown name"}
//                                         </p>

//                                         {/* Right side: buttons */}
//                                         <div className="flex items-center gap-[20px]">
//                                             <ItemActions 
//                                                 id={product.id} 
//                                                 type="product" 
//                                                 onDeleteSuccess={(deletedId) => {
//                                                     // Миттєве видалення зі стейту без перезавантаження
//                                                     setProducts((prev) => prev.filter((p) => p.id !== deletedId));
//                                                 }}
//                                             />
//                                         </div>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <div className="text-[20px] opacity-60">Книг не знайдено</div>
//                             )}
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </>
//     );
// }

"use client";

import BooksNav from './booksNav';
import { ProductDto } from '@/lib/api/generated';
import { productService } from '@/lib/api/services';
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
        productService.apiProductsGet()
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
                </div>
            </div>
        </div>

    );
}