"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BookCard from "@/app/main_page/BookCard";
import { languageService, productService, publisherService, reviewService } from "@/lib/api/services";
import type { LanguageDto, ProductDto, PublisherDto, ReviewDto } from "@/lib/api/generated";

type ReviewCardData = {
    id: number | string;
    author: string;
    text: string;
    timeLabel: string;
    likes: number;
};

const fallbackDescription =
    "Номінація Goodreads Choice Award 2017 у категорії Readers' Favorite Romance. " +
    "Читання для поціновувачів: «сонечко/буркотун», «протилежності притягуються», " +
    "«роман на роботі», «вимушена співпраця», «від неприязні до кохання».";

const fallbackAuthorBio =
    "Біографія автора недоступна. Додайте опис у профілі автора, щоб він з'явився на сторінці.";

const formatPrice = (value?: number | null) => {
    if (value == null) return "";
    return `${new Intl.NumberFormat("uk-UA").format(value)} грн`;
};

const clampRating = (value: number) => Math.max(0, Math.min(5, value));

const ratingToStars = (rating: number) => {
    const rounded = clampRating(Math.round(rating));
    return Array.from({ length: 5 }, (_, index) => (index < rounded ? "★" : "☆")).join("");
};

const getImageSrc = (product?: ProductDto | null) => {
    if (!product) return null;
    const image = product.productImages?.[0];
    if (!image?.imageData) return null;
    if (image.imageData.startsWith("data:")) {
        return image.imageData;
    }

    const extension = image.imageName?.split(".").pop()?.toLowerCase();
    const mimeType = extension === "png"
        ? "image/png"
        : extension === "webp"
            ? "image/webp"
            : extension === "gif"
                ? "image/gif"
                : "image/jpeg";

    return `data:${mimeType};base64,${image.imageData}`;
};

const getGalleryImages = (product?: ProductDto | null) => {
    if (!product) return [];
    const images = (product.productImages ?? [])
        .map((image) => {
            if (!image.imageData) return null;
            if (image.imageData.startsWith("data:")) return image.imageData;
            const extension = image.imageName?.split(".").pop()?.toLowerCase();
            const mimeType = extension === "png"
                ? "image/png"
                : extension === "webp"
                    ? "image/webp"
                    : extension === "gif"
                        ? "image/gif"
                        : "image/jpeg";
            return `data:${mimeType};base64,${image.imageData}`;
        })
        .filter(Boolean) as string[];

    return images;
};

const formatBookType = (format?: string | null) => {
    if (!format) return "";
    const normalized = format.toLowerCase();
    if (normalized.includes("audio")) return "Аудіо";
    if (normalized.includes("ebook") || normalized.includes("e-book")) return "Електронна";
    if (normalized.includes("paper") || normalized.includes("print")) return "Паперова";
    return format;
};

const formatYear = (value?: Date | string | null) => {
    if (!value) return "—";
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return `${date.getFullYear()}`;
};

const formatWeight = (value?: number | null) => {
    if (!value) return "—";
    const kilograms = value / 1000;
    return `${kilograms.toFixed(2)} кг`;
};

const formatOptions = [
    {
        id: "paper",
        label: "Паперова",
        icon: "/images/main_page/icons/rec-icon-paper.png",
        bg: "/images/main_page/icons/rec-icon-paper-bg.png",
    },
    {
        id: "ebook",
        label: "Електронна",
        icon: "/images/main_page/icons/rec-icon-ebook.png",
        bg: "/images/main_page/icons/rec-icon-ebook-bg.png",
    },
    {
        id: "audio",
        label: "Аудіо",
        icon: "/images/main_page/icons/rec-icon-audio.png",
        bg: "/images/main_page/icons/rec-icon-audio-bg.png",
    },
];

const fallbackReviews: ReviewCardData[] = [
    {
        id: 1,
        author: "Олена В.",
        text: "Яскрава, жива історія про свободу та кохання у Нью-Йорку 40-х. Неймовірна атмосфера!",
        timeLabel: "15 хв тому",
        likes: 798,
    },
    {
        id: 2,
        author: "Олена В.",
        text: "Я не просто прочитала цю книгу, я прожила її разом із Лу та Віллом. Це історія не про банальне кохання, а про складний вибір, про те, як одна людина може змінити весь твій світ, навіть якщо ваші шляхи перетнулися за трагічних обставин.",
        timeLabel: "15 хв тому",
        likes: 798,
    },
    {
        id: 3,
        author: "Олена В.",
        text: "Ця книга — справжній струс для мозку. Навіть через десятки років після написання вона вражає тим, наскільки точно автор передав механізми маніпуляції та контролю.",
        timeLabel: "15 хв тому",
        likes: 798,
    },
    {
        id: 4,
        author: "Олена В.",
        text: "Сюжет жорстокий і безжальний, але за горами металу та крові ховається неймовірна психологічна глибина та трагедія.",
        timeLabel: "15 хв тому",
        likes: 798,
    },
];

const fallbackSimilarBooks = [
    {
        title: "Егоманіяк",
        author: null,
        price: "400 грн",
        image: "/images/main_page/books/rec-book-1.png",
        rating: 4.8,
    },
    {
        title: "Кохання та протиріччя",
        author: null,
        price: "370 грн",
        image: "/images/main_page/books/rec-book-2.png",
        rating: 4.6,
    },
    {
        title: "Тисяча поцілунків",
        author: null,
        price: "420 грн",
        image: "/images/main_page/books/rec-book-3.png",
        rating: 4.9,
    },
    {
        title: "Роман на роботі",
        author: null,
        price: "390 грн",
        image: "/images/main_page/books/rec-book-4.png",
        rating: 4.5,
    },
];

const desktopReviewLayout = [
    { left: -84, top: 22, height: 217 },
    { left: -84, top: 259, height: 168 },
    { left: 443, top: 22, height: 168 },
    { left: 443, top: 210, height: 217 },
    { left: 970, top: 22, height: 183 },
    { left: 970, top: 225, height: 168 },
    { left: 1497, top: 22, height: 168 },
    { left: 1497, top: 210, height: 183 },
];

function ReviewCard({ author, text, timeLabel, likes }: ReviewCardData) {
    return (
        <div className="flex h-full flex-col gap-3 rounded-[21px] bg-[#f5f3ee] p-4 shadow-[0px_0px_15px_0px_rgba(0,0,0,0.6)]">
            <div className="flex gap-4">
                <img alt="" className="h-[80px] w-[80px]" src="/images/main_page/reviews/reviews-avatar.png" />
                <div className="flex-1">
                    <p className="font-mono text-[24px] font-medium text-[#242424]">{author}</p>
                    <p className="mt-2 max-h-[120px] overflow-hidden text-[14px] text-[#242424]">{text}</p>
                </div>
                <img
                    alt=""
                    className="h-[108px] w-[77px] rounded-[9px] object-cover"
                    src="/images/main_page/reviews/reviews-book.png"
                />
            </div>
            <div className="flex items-center justify-between">
                <span className="text-[14px] font-medium text-[#242424]">{timeLabel}</span>
                <div className="flex items-center gap-2">
                    <span className="text-[16px] text-[#242424]">{likes}</span>
                    <img alt="" className="h-[30px] w-[30px]" src="/images/main_page/icons/reviews-heart.png" />
                </div>
            </div>
        </div>
    );
}

function MiniBookCard({ title, price, image }: { title: string; price: string; image?: string | null }) {
    return (
        <div className="flex h-[250px] w-[180px] flex-col items-center justify-between rounded-[16px] bg-[#f5f3ee] px-4 py-4 shadow-[0px_6px_10px_0px_rgba(36,36,36,0.2)]">
            {image ? (
                <img alt={title} className="h-[160px] w-[120px] object-contain" src={image} />
            ) : (
                <div className="h-[160px] w-[120px] rounded-[12px] bg-[rgba(36,36,36,0.1)]" />
            )}
            <p className="text-center font-mono text-[14px] text-[#242424]">{title}</p>
            <span className="text-[16px] text-[#242424]">{price}</span>
        </div>
    );
}

export default function ProductDetailsClient({ id }: { id: string }) {
    const router = useRouter();
    const [product, setProduct] = useState<ProductDto | null>(null);
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [reviews, setReviews] = useState<ReviewDto[]>([]);
    const [languages, setLanguages] = useState<LanguageDto[]>([]);
    const [publishers, setPublishers] = useState<PublisherDto[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const productId = Number(id);
        if (!Number.isFinite(productId)) return;
        let isMounted = true;

        const loadData = async () => {
            try {
                const [
                    productResult,
                    productsResult,
                    reviewsResult,
                    languagesResult,
                    publishersResult,
                ] = await Promise.all([
                    productService.apiProductsIdGet({ id: productId }),
                    productService.apiProductsGet(),
                    reviewService.apiReviewsGet(),
                    languageService.apiLanguagesGet(),
                    publisherService.apiPublishersGet(),
                ]);

                if (!isMounted) return;
                setProduct(productResult);
                setProducts(productsResult ?? []);
                setReviews(reviewsResult ?? []);
                setLanguages(languagesResult ?? []);
                setPublishers(publishersResult ?? []);
            } catch (error) {
                console.error("Failed to load product details:", error);
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [id]);

    const isLoading = !product;
    const currentProduct = product ?? undefined;
    const galleryImages = getGalleryImages(currentProduct);
    const primaryImage = galleryImages[0] ?? getImageSrc(currentProduct);
    const displayImage = selectedImage && galleryImages.includes(selectedImage)
        ? selectedImage
        : primaryImage;
    const thumbnails = Array.from({ length: 4 }, (_, index) => galleryImages[index] ?? null);

    const ratingByProductId = useMemo(() => {
        const map = new Map<number, { sum: number; count: number }>();
        for (const review of reviews) {
            if (!review.productId || review.rating == null) continue;
            if (review.approved === false) continue;
            const entry = map.get(review.productId) ?? { sum: 0, count: 0 };
            map.set(review.productId, {
                sum: entry.sum + review.rating,
                count: entry.count + 1,
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

    const productId = currentProduct?.id ?? Number(id);
    const productReviews = reviews.filter((review) => review.productId === productId && review.approved !== false);
    const rating = getRatingForProduct(productId);
    const ratingCount = productReviews.length;

    const reviewCards: ReviewCardData[] = productReviews.length
        ? productReviews.map((review, index) => ({
            id: review.id ?? review.createdAt?.toString() ?? review.comment ?? index,
            author: "Олена В.",
            text: review.comment ?? "",
            timeLabel: "15 хв тому",
            likes: 798,
        }))
        : fallbackReviews;

    const similarBooks = products
        .filter((item) => item.id !== currentProduct?.id)
        .slice(0, 4)
        .map((item) => ({
            href: item.id ? `/products/${item.id}` : undefined,
            title: item.productName ?? "",
            author: null,
            price: formatPrice(item.discountPrice ?? item.price),
            image: getImageSrc(item),
            rating: getRatingForProduct(item.id),
        }));
    const displaySimilarBooks = similarBooks.length ? similarBooks : fallbackSimilarBooks;

    const authorNameFromData = (product as { authors?: Array<{ authorName?: string | null }> } | null)
        ?.authors?.[0]?.authorName;
    const authorName = isLoading ? "Завантаження..." : (authorNameFromData ?? "Невідомо");
    const languageName = currentProduct?.originalLanguageId
        ? languages.find((language) => language.id === currentProduct.originalLanguageId)?.languageName
        : null;
    const publisherName = currentProduct?.publisherId
        ? publishers.find((publisher) => publisher.id === currentProduct.publisherId)?.publisherName
        : null;
    const productTitle = currentProduct?.productName ?? (isLoading ? "Завантаження..." : "Без назви");
    const descriptionText = currentProduct?.description ?? (isLoading ? "Завантаження..." : "Опис відсутній");
    const priceValue = currentProduct?.discountPrice ?? currentProduct?.price;
    const priceText = priceValue != null ? formatPrice(priceValue) : "—";

    return (
        <div className="bg-[#f5f3ee] text-[#242424]">
            <div className="mx-auto max-w-[1260px] px-4 pb-24 pt-24 lg:px-0">
                <div className="rounded-[24px] bg-[#f5f3ee] px-5 pb-16 pt-6 shadow-[0px_0px_25px_0px_rgba(0,0,0,0.25)]">
                    <button
                        className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#f5f3ee] text-[28px] shadow-[0px_6px_10px_0px_rgba(36,36,36,0.2)]"
                        onClick={() => router.back()}
                        type="button"
                        aria-label="Назад"
                    >
                        ‹
                    </button>

                    <div className="mt-6 grid gap-10 lg:grid-cols-[500px_1fr_330px]">
                        <div className="flex flex-col gap-6 lg:flex-row">
                            <div className="flex flex-row gap-4 lg:flex-col">
                                {thumbnails.map((image, index) => {
                                    const isActive = image != null && image === displayImage;
                                    return (
                                        <button
                                            key={`thumb-${index}`}
                                            type="button"
                                            className={`flex h-[120px] w-[88px] items-center justify-center rounded-[12px] bg-[#f5f3ee] shadow-[0px_6px_10px_0px_rgba(36,36,36,0.2)] ${
                                                isActive ? "ring-2 ring-[#7e4d1e]" : ""
                                            }`}
                                            onClick={() => image && setSelectedImage(image)}
                                            aria-label={image ? `Переглянути фото ${index + 1}` : "Фото недоступне"}
                                            aria-pressed={isActive}
                                            disabled={!image}
                                        >
                                            {image ? (
                                                <img alt="" className="h-[110px] w-[78px] object-contain" src={image} />
                                            ) : (
                                                <div className="h-[110px] w-[78px] rounded-[10px] bg-[rgba(36,36,36,0.1)]" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex h-[535px] w-full items-center justify-center rounded-[16px] bg-[#f5f3ee] shadow-[0px_10px_15px_0px_rgba(36,36,36,0.25)]">
                                {displayImage ? (
                                    <img alt={productTitle} className="h-[500px] w-[380px] object-contain" src={displayImage} />
                                ) : (
                                    <div className="h-[500px] w-[380px] rounded-[12px] bg-[rgba(36,36,36,0.1)]" />
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1 text-[20px] text-[#242424]" aria-label={`Рейтинг ${rating.toFixed(1)}/5`}>
                                        {ratingToStars(rating)}
                                    </div>
                                    <span className="text-[18px] font-medium">{rating.toFixed(1)}</span>
                                </div>
                                <span className="text-[14px] text-[#242424]">{ratingCount} оцінок</span>
                            </div>

                            <div>
                                <h1 className="font-mono text-[32px] font-semibold">{productTitle}</h1>
                                <div className="mt-3 flex items-center gap-2 text-[16px]">
                                    <span className="text-[#242424]/70">Автор:</span>
                                    <span className="text-[#242424]">{authorName}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="text-[18px]">{currentProduct?.pageCount ?? "—"} стор.</div>
                                <div className="border-t border-[#242424]/20 pt-3 text-[16px]">Роман</div>
                            </div>

                            {/* <div className="grid gap-3">
                                {formatOptions.map((option) => {
                                    const isActive = option.label.toLowerCase()
                                        === formatBookType(currentProduct?.format).toLowerCase();
                                    return (
                                        <div
                                            key={option.id}
                                            className={`flex items-center gap-4 rounded-[16px] px-4 py-3 shadow-[0px_6px_10px_0px_rgba(36,36,36,0.2)] ${
                                                isActive ? "bg-[#f5f3ee]" : "bg-[#f5f3ee]/80"
                                            }`}
                                        >
                                            <div className="relative h-[42px] w-[42px]">
                                                <img alt="" className="absolute inset-0" src={option.bg} />
                                                <img alt="" className="absolute inset-[8px]" src={option.icon} />
                                            </div>
                                            <span className="text-[16px]">{option.label}</span>
                                        </div>
                                    );
                                })}
                            </div> */}
                        </div>

                        <div className="h-fit rounded-[20px] bg-[#f5f3ee] shadow-[0px_10px_20px_0px_rgba(36,36,36,0.2)]">
                            <div className="border-b border-[#242424]/10 px-5 py-5">
                                <p className="text-[14px] text-[#242424]/70">Ціна в Libria:</p>
                                <p className="mt-2 font-mono text-[36px] font-semibold">{priceText}</p>
                            </div>

                            <div className="space-y-5 px-5 py-5">
                                <div className="flex items-center gap-4">
                                    <button className="h-[40px] flex-1 rounded-[12px] bg-[#7e4d1e] text-[16px] text-[#f5f3ee] shadow-[0px_4px_8px_0px_rgba(36,36,36,0.3)]" type="button">
                                        Додати в кошик
                                    </button>
                                    <button
                                        className="flex h-[40px] w-[40px] items-center justify-center rounded-[12px] bg-[#f5f3ee] shadow-[0px_4px_8px_0px_rgba(36,36,36,0.3)]"
                                        type="button"
                                        aria-label="Додати в улюблені"
                                    >
                                        <img alt="" className="h-[24px] w-[24px]" src="/images/main_page/icons/rec-icon-favorite.png" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 rounded-[20px] bg-[#f5f3ee] px-5 py-6 shadow-[0px_10px_15px_0px_rgba(36,36,36,0.2)]">
                        <h2 className="font-mono text-[22px] font-semibold">Опис</h2>
                        <p className="mt-4 text-[14px] leading-relaxed text-[#242424]/80">
                            {descriptionText}
                        </p>
                    </div>

                    <div className="mt-10 grid gap-10 lg:grid-cols-[300px_1fr]">
                        <div className="rounded-[20px] bg-[#f5f3ee] px-5 py-6 shadow-[0px_10px_15px_0px_rgba(36,36,36,0.2)]">
                            <h3 className="font-mono text-[24px] font-semibold">Характеристика</h3>
                            <div className="mt-6 grid gap-3 text-[14px]">
                                <div className="grid grid-cols-[120px_1fr] gap-2">
                                    <span>Код товару:</span>
                                    <span>{currentProduct?.productCode ?? "—"}</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-2">
                                    <span>Назва книги:</span>
                                    <span>{productTitle}</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-2">
                                    <span>Сторінок:</span>
                                    <span>{currentProduct?.pageCount ?? "—"}</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-2">
                                    <span>Вага:</span>
                                    <span>{formatWeight(currentProduct?.weightGrams)}</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-2">
                                    <span>Рік видання:</span>
                                    <span>{formatYear(currentProduct?.publishingDate)}</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-2">
                                    <span>Жанри:</span>
                                    <span>Роман</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-2">
                                    <span>Автор:</span>
                                    <span>{authorName}</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-2">
                                    <span>Мова:</span>
                                    <span>{languageName ?? (isLoading ? "Завантаження..." : "Невідомо")}</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-2">
                                    <span>Видавництво:</span>
                                    <span>{publisherName ?? (isLoading ? "Завантаження..." : "Невідомо")}</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-2">
                                    <span>Обкладинка:</span>
                                    <span>Тверда</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-2">
                                    <span>Формат:</span>
                                    <span>148x210 мм</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 border-[#242424]/10 lg:border-l lg:pl-8">
                            <div>
                                <h3 className="font-mono text-[24px] font-semibold">Про автора</h3>
                                <div className="mt-4 flex gap-6 rounded-[20px] bg-[#f5f3ee] p-5 shadow-[0px_10px_15px_0px_rgba(36,36,36,0.2)]">
                                    <div className="h-[170px] w-[120px] rounded-[12px] bg-[rgba(36,36,36,0.1)]" />
                                    <div className="flex flex-col gap-3">
                                        <p className="font-mono text-[20px]">{authorName}</p>
                                        <p className="text-[14px] text-[#242424]/80">{fallbackAuthorBio}</p>
                                        <button className="text-left text-[14px] font-semibold text-[#7e4d1e]" type="button">
                                            Більше про автора
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <h3 className="font-mono text-[24px] font-semibold">Книжки цього автора</h3>
                                    <button
                                        className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[#242424]/20"
                                        type="button"
                                        aria-label="Більше книжок автора"
                                    >
                                        &gt;
                                    </button>
                                </div>
                                <div className="mt-6 flex flex-wrap gap-5">
                                    {displaySimilarBooks.map((book) => (
                                        <MiniBookCard key={book.title} title={book.title} price={book.price} image={book.image} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="mt-16">
                        <div className="mx-auto max-w-[1218px]">
                            <div className="flex items-center gap-4 rounded-[20px] bg-[#f5f3ee] px-6 py-4 shadow-[0px_6px_12px_0px_rgba(36,36,36,0.2)]">
                                <input
                                    className="flex-1 bg-transparent text-[16px] text-[#242424] placeholder:text-[#242424]/60 focus:outline-none"
                                    placeholder="Додайте коментар..."
                                    type="text"
                                />
                                <button
                                    className="flex h-[50px] w-[50px] items-center justify-center rounded-[12px] bg-[#7e4d1e] text-[20px] text-[#f5f3ee]"
                                    type="button"
                                    aria-label="Надіслати коментар"
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>

                        <div className="relative mx-auto mt-8 hidden h-[450px] w-[1920px] max-w-full lg:block">
                            <div className="absolute inset-0 border-[20px] border-[#f5f3ee] shadow-[0px_0px_40px_0px_rgba(0,0,0,0.7)]">
                                <img
                                    alt=""
                                    className="absolute inset-0 h-full w-full object-cover opacity-20"
                                    src="/images/body/Rectangle%20287.png"
                                />
                            </div>
                            {desktopReviewLayout.map((layout, index) => {
                                const review = reviewCards[index % reviewCards.length];
                                return (
                                    <div
                                        key={`review-${review.id}-${index}`}
                                        className="absolute w-[507px]"
                                        style={{ left: layout.left, top: layout.top, height: layout.height }}
                                    >
                                        <ReviewCard {...review} />
                                    </div>
                                );
                            })}
                        </div>

                        <div className="relative mx-auto mt-8 max-w-[1920px] px-4 lg:hidden">
                            <div className="relative border-[20px] border-[#f5f3ee] shadow-[0px_0px_40px_0px_rgba(0,0,0,0.7)]">
                                <img
                                    alt=""
                                    className="absolute inset-0 h-full w-full object-cover opacity-20"
                                    src="/images/body/Rectangle%20287.png"
                                />
                                <div className="relative grid gap-6 px-6 py-8 md:grid-cols-2">
                                    {reviewCards.map((review) => (
                                        <ReviewCard key={`review-mobile-${review.id}`} {...review} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mx-auto mt-6 max-w-[1218px]">
                            <div className="h-[15px] w-full rounded-[12px] bg-[#f5f3ee] shadow-[0px_4px_6px_0px_rgba(36,36,36,0.2)]">
                                <div className="h-full w-[22%] rounded-[12px] bg-[#7e4d1e]" />
                            </div>
                        </div>
                    </section>

                    <section className="mt-16">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex h-[57px] items-center justify-center rounded-t-[10px] rounded-b-[30px] bg-[#f5f3ee] px-8 shadow-[0px_8px_8.5px_0px_rgba(0,0,0,0.5)]">
                                <h2 className="font-mono text-[32px] font-bold">Схожі</h2>
                            </div>
                            <button
                                className="flex h-[55px] w-[150px] items-center justify-center rounded-b-[25px] bg-[#f5f3ee] text-[24px] shadow-[0px_3px_2.7px_0px_rgba(0,0,0,0.3)]"
                                type="button"
                            >
                                Дивитись
                            </button>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[60px]">
                            {displaySimilarBooks.map((book, index) => (
                                <BookCard key={`${book.title}-${index}`} {...book} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
