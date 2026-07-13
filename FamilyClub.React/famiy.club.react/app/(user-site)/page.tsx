// import Image from "next/image";
//
//
// export default async function Home() {
// /////////////////////////////////////////////////////
// // Added to test connection between backend and frontend
//   let message = "Loading...";
//   try {
//     const response = await fetch('https://localhost:7069/api/Home', {
//       cache: 'no-store' // This ensures we get fresh data every time
//     });
//
//     if (response.ok) {
//       message = await response.text(); // We use .text() because the API returns a string
//     } else {
//       message = "Error: Backend reached but returned " + response.status;
//     }
//   } catch (error) {
//     console.log("REAL ERROR:", error);
//     message = "Connection Failed: Is the Backend running?";
//   }
// /////////////////////////////////////////////////////
//
//   return (
//     <h1>Our amazing `main_page`.</h1>
//
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import Hero from "@/app/(user-site)/main_page/Hero";
import BookSection from "@/app/(user-site)/main_page/BookSection";
import InkSection from "@/app/(user-site)/main_page/InkSection";
import AboutSection from "@/app/(user-site)/main_page/AboutSection";
import AdvantagesSection from "@/app/(user-site)/main_page/AdvantagesSection";
import ReviewsSection from "@/app/(user-site)/main_page/ReviewsSection";
import FormatSection from "@/app/(user-site)/main_page/FormatSection";
import PromoBanner from "@/app/(user-site)/main_page/PromoBanner";
import MobileHome from "@/app/(user-site)/main_page/mobile/MobileHome";
import {
    authorService,
    categoriesService,
    clubMemberService,
    formatService,
    productService,
    reviewService,
} from "@/lib/api/services";
import { Availability } from "@/lib/api/generated";
import type {
    AuthorDTO,
    CategoryDto,
    ClubMemberReadDto,
    FormatDto,
    ProductDto,
    ReviewDto,
} from "@/lib/api/generated";

const formatPrice = (value?: number | null) => {
    if (value == null) return "";
    return `${new Intl.NumberFormat("uk-UA").format(value)} грн`;
};

const getImageSrc = (product: ProductDto) => {
    const image = product.productImages?.[0];
    if (!image?.imageData) return null;
    const normalizedData = image.imageData.trim();
    if (normalizedData.startsWith("data:") || normalizedData.startsWith("http://") || normalizedData.startsWith("https://") || normalizedData.startsWith("/")) {
        return normalizedData;
    }

    const mimeType = (() => {
        if (normalizedData.startsWith("UklGR")) return "image/webp";
        if (normalizedData.startsWith("/9j/")) return "image/jpeg";
        if (normalizedData.startsWith("iVBORw0KGgo")) return "image/png";
        if (normalizedData.startsWith("R0lGOD")) return "image/gif";

        const extension = image.imageName?.split(".").pop()?.toLowerCase();
        switch (extension) {
            case "webp": return "image/webp";
            case "png": return "image/png";
            case "gif": return "image/gif";
            default: return "image/jpeg";
        }
    })();

    return `data:${mimeType};base64,${normalizedData}`;
};

const getAvatarSrc = (avatarData?: string | null) => {
    if (!avatarData) return null;
    const normalizedData = avatarData.trim();
    if (normalizedData.startsWith("data:")) {
        return normalizedData;
    }
    const mimeType = (() => {
        if (normalizedData.startsWith("UklGR")) return "image/webp";
        if (normalizedData.startsWith("/9j/")) return "image/jpeg";
        if (normalizedData.startsWith("iVBORw0KGgo")) return "image/png";
        if (normalizedData.startsWith("R0lGOD")) return "image/gif";
        return "image/jpeg";
    })();
    return `data:${mimeType};base64,${normalizedData}`;
};

const formatReviewDate = (value?: Date | string | null) => {
    if (!value) return "";
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("uk-UA");
};

const mapProductToBook = (
    product: ProductDto,
    rating: number | null,
    author: string | null,
    formatTags: Array<"paper" | "ebook" | "audio">,
) => ({
    href: product.id ? `/products/${product.id}` : undefined,
    title: product.productName ?? "",
    author,
    price: formatPrice(product.discountPrice ?? product.price),
    image: getImageSrc(product),
    rating,
    formatTags,
});

export default function Home() {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [reviews, setReviews] = useState<ReviewDto[]>([]);
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [authors, setAuthors] = useState<AuthorDTO[]>([]);
    const [clubMembers, setClubMembers] = useState<ClubMemberReadDto[]>([]);
    const [formats, setFormats] = useState<FormatDto[]>([]);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                const [
                    productsResult,
                    reviewsResult,
                    categoriesResult,
                    authorsResult,
                    membersResult,
                    formatsResult,
                ] = await Promise.all([
                    productService.apiProductsGet().catch((err) => { console.warn("Failed to fetch products:", err); return []; }),
                    reviewService.apiReviewsGet().catch((err) => { console.warn("Failed to fetch reviews:", err); return []; }),
                    categoriesService.apiCategoriesGet().catch((err) => { console.warn("Failed to fetch categories:", err); return []; }),
                    authorService.apiAuthorsGet().catch((err) => { console.warn("Failed to fetch authors:", err); return []; }),
                    clubMemberService.apiClubMemberGet().catch((err) => { console.warn("Failed to fetch club members:", err); return []; }),
                    formatService.apiFormatsGet().catch((err) => { console.warn("Failed to fetch formats:", err); return []; }),
                ]);

                if (!isMounted) return;
                setProducts(productsResult ?? []);
                setReviews(reviewsResult ?? []);
                setCategories(categoriesResult ?? []);
                setAuthors(authorsResult ?? []);
                setClubMembers(membersResult ?? []);
                setFormats(formatsResult ?? []);
            } catch (error) {
                console.error("Home data fetch failed:", error);
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, []);

    const ratingByProductId = useMemo(() => {
        const map = new Map<number, { sum: number; count: number }>();
        for (const review of reviews) {
            if (!review.productId || review.rating == null) continue;
            if (review.approved === false) continue;
            const current = map.get(review.productId) ?? { sum: 0, count: 0 };
            map.set(review.productId, {
                sum: current.sum + review.rating,
                count: current.count + 1,
            });
        }
        return map;
    }, [reviews]);

    const getRatingForProduct = (productId?: number) => {
        if (!productId) return 0;
        const entry = ratingByProductId.get(productId);
        if (!entry || entry.count === 0) return 0;
        return entry.sum / entry.count;
    };

    const getReviewCountForProduct = (productId?: number) => {
        if (!productId) return 0;
        const entry = ratingByProductId.get(productId);
        return entry?.count ?? 0;
    };

    const authorById = useMemo(() => {
        const map = new Map<number, AuthorDTO>();
        for (const author of authors) {
            if (author.id == null) continue;
            map.set(author.id, author);
        }
        return map;
    }, [authors]);

    const formatById = useMemo(() => {
        const map = new Map<number, FormatDto>();
        for (const format of formats) {
            if (format.id == null) continue;
            map.set(format.id, format);
        }
        return map;
    }, [formats]);

    const categoryByName = useMemo(() => {
        const map = new Map<string, number>();
        for (const category of categories) {
            const name = category.categoryName?.trim().toLowerCase();
            if (!name || category.id == null) continue;
            map.set(name, category.id);
        }
        return map;
    }, [categories]);

    const productById = useMemo(() => {
        const map = new Map<number, ProductDto>();
        for (const product of products) {
            if (product.id == null) continue;
            map.set(product.id, product);
        }
        return map;
    }, [products]);

    const memberById = useMemo(() => {
        const map = new Map<string, ClubMemberReadDto>();
        for (const member of clubMembers) {
            if (!member.id) continue;
            map.set(member.id, member);
        }
        return map;
    }, [clubMembers]);

    const getAuthorLabel = (authorIds?: Array<number> | null) => {
        const names = (authorIds ?? [])
            .map((id) => authorById.get(id)?.authorName)
            .filter((name): name is string => Boolean(name));
        return names.length ? names.join(", ") : null;
    };

    const getFormatTags = (formatIds?: Array<number> | null) => {
        const tags = new Set<"paper" | "ebook" | "audio">();
        for (const formatId of formatIds ?? []) {
            const format = formatById.get(formatId);
            const label = `${format?.name ?? ""} ${format?.code ?? ""}`.toLowerCase();
            if (!label) continue;
            if (label.includes("audio") || label.includes("аудіо")) {
                tags.add("audio");
            }
            if (label.includes("ebook") || label.includes("e-book") || label.includes("електрон")) {
                tags.add("ebook");
            }
            if (label.includes("paper") || label.includes("print") || label.includes("папер")) {
                tags.add("paper");
            }
        }
        return Array.from(tags);
    };

    const resolveCategoryId = (name: string) => {
        const normalized = name.trim().toLowerCase();
        const direct = categoryByName.get(normalized);
        if (direct != null) return direct;
        const fuzzy = categories.find((category) => category.categoryName?.toLowerCase().includes(normalized));
        return fuzzy?.id;
    };

    const mapProductsToBooks = (items: ProductDto[]) =>
        items.map((product) => {
            const reviewCount = getReviewCountForProduct(product.id);
            const ratingValue = reviewCount > 0 ? getRatingForProduct(product.id) : null;
            return mapProductToBook(
                product,
                ratingValue,
                getAuthorLabel(product.authorIds),
                getFormatTags(product.formatIds),
            );
        });

    const sortedByRating = [...products].sort(
        (a, b) => getRatingForProduct(b.id) - getRatingForProduct(a.id),
    );
    const recommendationBooks = mapProductsToBooks(sortedByRating).slice(0, 4);

    const romanceCategoryId = resolveCategoryId("Романи") ?? resolveCategoryId("Роман");
    const thrillerCategoryId = resolveCategoryId("Триллери");
    const scienceCategoryId = resolveCategoryId("Наукові");
    const fantasyCategoryId = resolveCategoryId("Фантастика");

    const romanceBooks = romanceCategoryId
        ? mapProductsToBooks(
              products.filter((product) => product.categoryIds?.includes(romanceCategoryId)),
          ).slice(0, 4)
        : [];
    const thrillerBooks = thrillerCategoryId
        ? mapProductsToBooks(
              products.filter((product) => product.categoryIds?.includes(thrillerCategoryId)),
          ).slice(0, 4)
        : [];
    const scienceBooks = scienceCategoryId
        ? mapProductsToBooks(
              products.filter((product) => product.categoryIds?.includes(scienceCategoryId)),
          ).slice(0, 4)
        : [];
    const fantasyBooks = fantasyCategoryId
        ? mapProductsToBooks(
              products.filter((product) => product.categoryIds?.includes(fantasyCategoryId)),
          ).slice(0, 4)
        : [];

    const hitsBooks = mapProductsToBooks(
        [...products].sort(
            (a, b) => getReviewCountForProduct(b.id) - getReviewCountForProduct(a.id),
        ),
    ).slice(0, 4);

    const newBooks = mapProductsToBooks(
        [...products].sort((a, b) => {
            const aTime = a.publishingDate ? new Date(a.publishingDate).getTime() : 0;
            const bTime = b.publishingDate ? new Date(b.publishingDate).getTime() : 0;
            return bTime - aTime;
        }),
    ).slice(0, 4);

    const setBooks = mapProductsToBooks(
        products.filter((product) => (product.itemsInSet ?? 0) > 1),
    ).slice(0, 4);

    const announcementBooks = mapProductsToBooks(
        products.filter((product) => product.availability === Availability.NUMBER_2),
    ).slice(0, 4);

    const reviewCards = useMemo(() => {
        return reviews
            .filter((review) => review.comment && review.approved !== false)
            .map((review, index) => {
                const member = review.userId ? memberById.get(review.userId) : undefined;
                const nameParts = [member?.name, member?.surname].filter(
                    (part): part is string => Boolean(part),
                );
                const author = nameParts.join(" ") || member?.email || review.userId || "";
                const product = review.productId ? productById.get(review.productId) : undefined;
                return {
                    id: review.id ?? review.createdAt?.toString() ?? index,
                    author,
                    text: review.comment ?? "",
                    timeLabel: formatReviewDate(review.createdAt),
                    avatar: getAvatarSrc(member?.avatarData),
                    bookImage: product ? getImageSrc(product) : null,
                    rating: review.rating,
                };
            });
    }, [reviews, memberById, productById]);

    const allBooks = mapProductsToBooks(products);

    const gazetteItems = useMemo(() => {
        return reviewCards.slice(0, 4).map((r, idx) => ({
            id: String(r.id),
            authorName: r.author || "Користувач",
            authorHandle: `@${(r.author || "user").toLowerCase().replace(/\s+/g, "_")}`,
            tag: "#новини",
            title: r.text.slice(0, 30) || "",
            image: r.bookImage || null,
            avatar: r.avatar || "/images/body/cat.png",
            href: "/categories",
        }));
    }, [reviewCards]);

    return (
        <main className="bg-[#f5f3ee] text-[#242424] overflow-x-hidden">
            {/* Mobile Home Page Version (1-to-1 Figma Node 2119:32862) */}
            <div className="block md:hidden">
                <MobileHome
                    recommendations={recommendationBooks}
                    newBooks={newBooks}
                    announcements={announcementBooks}
                    hitsBooks={hitsBooks}
                    otherBooks={allBooks}
                    gazetteItems={gazetteItems}
                />
            </div>

            {/* Desktop Home Page Version */}
            <div className="hidden md:block">
                <Hero />

                {recommendationBooks.length > 0 ? (
                    <BookSection title="Рекомендації для тебе" books={recommendationBooks} showMore pillWidth={531} />
                ) : null}

                <InkSection />

                <AboutSection />

                <AdvantagesSection />

                <ReviewsSection reviews={reviewCards} />

                <FormatSection />

                {romanceBooks.length > 0 ? <BookSection title="Романи" books={romanceBooks} pillWidth={206} /> : null}
                {thrillerBooks.length > 0 ? (
                    <BookSection title="Триллери" books={thrillerBooks} pillWidth={253} />
                ) : null}
                {scienceBooks.length > 0 ? (
                    <BookSection title="Наукові" books={scienceBooks} pillWidth={211} />
                ) : null}
                {fantasyBooks.length > 0 ? (
                    <BookSection title="Фантастика" books={fantasyBooks} pillWidth={292} />
                ) : null}

                <PromoBanner />

                {hitsBooks.length > 0 ? (
                    <BookSection title="Хіти продажу" books={hitsBooks} pillWidth={355} />
                ) : null}
                {newBooks.length > 0 ? <BookSection title="Новинки" books={newBooks} pillWidth={237} /> : null}
                {setBooks.length > 0 ? (
                    <BookSection title="Книжкові комплекти" books={setBooks} pillWidth={472} />
                ) : null}
                {announcementBooks.length > 0 ? (
                    <BookSection title="Анонси" books={announcementBooks} pillWidth={204} />
                ) : null}
            </div>
        </main>
    );
}