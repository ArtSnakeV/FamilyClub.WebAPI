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

import Hero from "@/app/main_page/Hero";
import BookSection from "@/app/main_page/BookSection";
import InkSection from "@/app/main_page/InkSection";
import AboutSection from "@/app/main_page/AboutSection";
import AdvantagesSection from "@/app/main_page/AdvantagesSection";
import ReviewsSection from "@/app/main_page/ReviewsSection";
import FormatSection from "@/app/main_page/FormatSection";
import { productService, reviewService } from "@/lib/api/services";
import type { ProductDto, ReviewDto } from "@/lib/api/generated";

const formatPrice = (value?: number | null) => {
    if (value == null) return "";
    return `${new Intl.NumberFormat("uk-UA").format(value)} грн`;
};

const getImageSrc = (product: ProductDto) => {
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

const mapProductToBook = (product: ProductDto, rating: number) => ({
    title: product.productName ?? "",
    author: null,
    price: formatPrice(product.discountPrice ?? product.price),
    image: getImageSrc(product),
    rating,
});

export default async function Home() {
    let products: ProductDto[] = [];
    let reviews: ReviewDto[] = [];
    try {
        products = await productService.apiProductsGet({ cache: "no-store" });
    } catch (error) {
        console.error("Products fetch failed:", error);
    }
    try {
        reviews = await reviewService.apiReviewsGet({ cache: "no-store" });
    } catch (error) {
        console.error("Reviews fetch failed:", error);
    }

    const ratingByProductId = new Map<number, { sum: number; count: number }>();
    for (const review of reviews) {
        if (!review.productId || review.rating == null) continue;
        if (review.approved === false) continue;
        const current = ratingByProductId.get(review.productId) ?? { sum: 0, count: 0 };
        ratingByProductId.set(review.productId, {
            sum: current.sum + review.rating,
            count: current.count + 1,
        });
    }

    const getRatingForProduct = (productId?: number) => {
        if (!productId) return 0;
        const entry = ratingByProductId.get(productId);
        if (!entry || entry.count === 0) return 0;
        return entry.sum / entry.count;
    };

    const recommendationBooks = products
        .map((product) => mapProductToBook(product, getRatingForProduct(product.id)))
        .slice(0, 4);
    return (
        <main className="bg-[#f5f3ee] text-[#242424]">
            <Hero />

            <BookSection title="Рекомендації для тебе" books={recommendationBooks} showMore pillWidth={531} />

            <InkSection />

            <AboutSection />

            <AdvantagesSection />

            <ReviewsSection />

            <FormatSection />

            <BookSection title="Роман" books={recommendationBooks} pillWidth={206} />
            <BookSection title="Триллери" books={recommendationBooks} pillWidth={253} />
            <BookSection title="Наукові" books={recommendationBooks} pillWidth={211} />
            <BookSection title="Фантастика" books={recommendationBooks} pillWidth={292} />

            <BookSection title="Хіти продажу" books={recommendationBooks} pillWidth={355} />
            <BookSection title="Новинки" books={recommendationBooks} pillWidth={237} />
            <BookSection title="Книжкові комплекти" books={recommendationBooks} pillWidth={472} />
            <BookSection title="Анонси" books={recommendationBooks} pillWidth={204} />
        </main>
    );
}