"use client";

import BooksNav from '../booksNav';
import { PublishersApi, Configuration, PublisherDto } from '@/lib/api/generated';
import ItemActions from "@/app/(admin-site)/common_elements/item_actions";
import { useEffect, useState } from "react";
import EntitiesSearchSorting from "@/app/(admin-site)/common_elements/entities_search_sorting";
import Pagination from "@/app/(admin-site)/common_elements/entities_pagination"; // Імпортуємо наш компонент пагінації

const PUBLISHER_SORT_OPTIONS = [
    { value: "id_asc", label: "Старі на початку" },
    { value: "id_desc", label: "Нові на початку" },
    { value: "asc", label: "За алфавітом (А→Я)" },
    { value: "desc", label: "За алфавітом (Я→А)" },
];

const ITEMS_PER_PAGE = 10;

export default function PublishersPage() {
    const [publishers, setPublishers] = useState<PublisherDto[]>([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1); // Додаємо відстеження поточної сторінки
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const config = new Configuration({ basePath: "https://localhost:7069" });
        const api = new PublishersApi(config);

        api.apiPublishersGet()
            .then((data) => {
                setPublishers(data);
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
    const filteredAndSorted = publishers
        .filter(p => (p.publisherName ?? "").toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return (a.publisherName ?? "").localeCompare(b.publisherName ?? "");
            }
            if (sortOrder === "desc") {
                return (b.publisherName ?? "").localeCompare(a.publisherName ?? "");
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

    // 2. Нарізаємо масив (.slice), щоб отримати лише 10 елементів для поточної сторінки
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentPaginatedItems = filteredAndSorted.slice(indexOfFirstItem, indexOfLastItem);

    if (error) {
        return <div className="p-[35px]">Failed to load publishers.</div>;
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
                    margin: '5px',
                    backgroundImage: "url('/images/entities/main_field_background.svg')",
                }}
            >
                <EntitiesSearchSorting
                    searchPlaceholder="Пошук видавництва..."
                    searchValue={search}
                    onSearchChange={handleSearchChange} // Використовуємо функцію зі скиданням сторінки
                    addButtonText="Додати видавництво"
                    addButtonHref="/admin/books/publishers/addPublisher"
                    sortValue={sortOrder}
                    onSortChange={setSortOrder}
                    sortOptions={PUBLISHER_SORT_OPTIONS}
                />

                <p className="z-10 font-[Source_Sans_Pro] font-semibold text-[36px] leading-[150%] tracking-[-0.011em] align-middle mt-4">
                    Видавництва:
                </p>

                {/* Список видавництв із пагінацією */}
                <div className="z-10 grid gap-4 mt-4">
                    {isLoading ? (
                        <div className="text-[20px] opacity-60">Завантаження...</div>
                    ) : currentPaginatedItems.length > 0 ? (
                        currentPaginatedItems.map((publisher) => (
                            <div
                                key={publisher.id}
                                className="max-w-[1464px] w-full h-[50px] bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] px-[24px] flex items-center justify-between"
                            >
                                {/* Left side: publisher name */}
                                <p className="font-sanspro font-semibold text-[20px] leading-[150%] tracking-[-0.011em] align-middle">
                                    {publisher.publisherName || "Unnamed Publisher"}
                                </p>

                                {/* Right side: actions */}
                                <div className="flex items-center gap-[20px]">
                                    <ItemActions 
                                        id={publisher.id} 
                                        type="publisher" 
                                        onDeleteSuccess={(deletedId) => {
                                            setPublishers((prev) => {
                                                const updated = prev.filter((p) => p.id !== deletedId);

                                                // Рахуємо елементи, що залишаться після видалення для поточного пошуку
                                                const totalFilteredAfterDelete = updated.filter(p =>
                                                    (p.publisherName ?? "").toLowerCase().includes(search.toLowerCase())
                                                ).length;

                                                // Обчислюємо нову максимальну кількість сторінок
                                                const maxPages = Math.ceil(totalFilteredAfterDelete / ITEMS_PER_PAGE);

                                                // Якщо ми були на останній сторінці й видалили єдиний елемент — зміщуємося назад
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
                        <div className="text-[20px] opacity-60">Видавництв не знайдено</div>
                    )}
                </div>

                {/* Компонент пагінації внизу сторінки */}
                <Pagination 
                    totalItems={filteredAndSorted.length} // передаємо довжину відфільтрованого масиву
                    itemsPerPage={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}