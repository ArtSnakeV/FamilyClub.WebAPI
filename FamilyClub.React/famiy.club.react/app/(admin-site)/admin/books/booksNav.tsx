"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BooksNav() {
    const pathname = usePathname();
    const isBooksActive = pathname === "/admin/books";
    const isLanguagesActive = pathname === "/admin/books/languages";
    const isPublisherActive = pathname === "/admin/books/publishers";
    const isCategoryActive = pathname === "/admin/books/categories";
    const isAuthorActive = pathname === "/admin/books/authors";
    const isTranslatorActive = pathname === "/admin/books/translators";
    const isFormatsActive = pathname === "/admin/books/formats";
    const isBookSizesActive = pathname === "/admin/books/bookSizes";
    const isBlockReasonActive = pathname === "/admin/books/blockReasons";

    const linkClass = (active: boolean) =>
        `
        font-['Source_Sans_Pro'] font-normal text-[20px] leading-[125%] tracking-[-0.011em] align-middle no-underline
        px-5 py-2.5 rounded-[9px]
        hover:text-[var(--foreground-on-dark)] hover:bg-[var(--color-brand-green)]
        transition-colors duration-200 ease-in-out
        ${
            active
                ? "text-[var(--foreground-on-dark)] bg-[var(--color-brand-green)]"
                : "text-[var(--foreground-primary)] bg-transparent"
        }
        `;

    return (
        <div className="relative w-[1300px] max-w-full h-[96px] mt-[1vh] ml-[15vw] overflow-hidden flex items-center flex-row justify-center gap-2">
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none admin-parchment-bg"
                style={{
                    backgroundImage:
                        "url('/images/blockedUsersPageAdmin/Rectangle 56.png')",
                    backgroundSize: "100% 100%",
                }}
            />
            <div className="relative z-10 w-full -mt-2">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                    <Link href="/admin/books" className={linkClass(isBooksActive)}>
                        Книги
                    </Link>
                    <Link
                        href="/admin/books/languages"
                        className={linkClass(isLanguagesActive)}
                    >
                        Мови
                    </Link>
                    <Link
                        href="/admin/books/publishers"
                        className={linkClass(isPublisherActive)}
                    >
                        Видавництва
                    </Link>
                    <Link
                        href="/admin/books/categories"
                        className={linkClass(isCategoryActive)}
                    >
                        Категорії
                    </Link>
                    <Link
                        href="/admin/books/authors"
                        className={linkClass(isAuthorActive)}
                    >
                        Автори
                    </Link>
                    <Link
                        href="/admin/books/translators"
                        className={linkClass(isTranslatorActive)}
                    >
                        Перекладачі
                    </Link>
                    <Link
                        href="/admin/books/formats"
                        className={linkClass(isFormatsActive)}
                    >
                        Формати
                    </Link>
                    <Link
                        href="/admin/books/bookSizes"
                        className={linkClass(isBookSizesActive)}
                    >
                        Розміри книг
                    </Link>
                    <Link
                        href="/admin/books/blockReasons"
                        className={linkClass(isBlockReasonActive)}
                    >
                        Причини блокування
                    </Link>
                </div>
            </div>
        </div>
    );
}
