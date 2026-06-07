"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BookCard from "@/app/main_page/BookCard";
import { ProductDto } from "@/lib/api/generated";

interface CatalogClientProps {
  initialProducts: ProductDto[];
}

const PRODUCTS_PER_PAGE = 12; // 4 columns × 3 rows

export default function CatalogClient({ initialProducts }: CatalogClientProps) {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<ProductDto[]>(initialProducts);

  // Apply filters when search params change
  useEffect(() => {
    let products = [...initialProducts];

    // Filter by category
    const categoryId = searchParams.get("categoryId");
    if (categoryId) {
      const catId = parseInt(categoryId);
      products = products.filter(
        (p) => p.categoryIds?.includes(catId)
      );
    }

    // Filter by author
    const authorId = searchParams.get("authorId");
    if (authorId) {
      const authId = parseInt(authorId);
      products = products.filter(
        (p) => p.authorIds?.includes(authId)
      );
    }

    // Filter by language
    const languageId = searchParams.get("languageId");
    if (languageId) {
      const langId = parseInt(languageId);
      products = products.filter(
        (p) => p.languageIds?.includes(langId)
      );
    }

    // Filter by format
    const formatId = searchParams.get("formatId");
    if (formatId) {
      const fmtId = parseInt(formatId);
      products = products.filter(
        (p) => p.formatIds?.includes(fmtId)
      );
    }

    // Filter by price range
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice || maxPrice) {
      products = products.filter((p) => {
        const price = p.discountPrice ?? p.price ?? 0;
        if (minPrice && price < parseFloat(minPrice)) return false;
        if (maxPrice && price > parseFloat(maxPrice)) return false;
        return true;
      });
    }

    // Filter by age restriction
    const ageRestrictionId = searchParams.get("ageRestrictionId");
    if (ageRestrictionId) {
      const ageId = parseInt(ageRestrictionId);
      products = products.filter(
        (p) => p.ageRestrictionIds?.includes(ageId)
      );
    }

    // Filter by year of publication
    const year = searchParams.get("year");
    if (year) {
      const yearNum = parseInt(year);
      products = products.filter((p) => {
        if (!p.publishingDate) return false;
        const pubYear = new Date(p.publishingDate).getFullYear();
        return pubYear === yearNum;
      });
    }

    // Filter by year range
    const yearFrom = searchParams.get("yearFrom");
    const yearTo = searchParams.get("yearTo");
    if (yearFrom || yearTo) {
      products = products.filter((p) => {
        if (!p.publishingDate) return false;
        const pubYear = new Date(p.publishingDate).getFullYear();
        if (yearFrom && pubYear < parseInt(yearFrom)) return false;
        if (yearTo && pubYear > parseInt(yearTo)) return false;
        return true;
      });
    }

    // Filter by promotion only
    const promoOnly = searchParams.get("promo");
    if (promoOnly === "true") {
      products = products.filter((p) => p.discountPrice != null);
    }

    setFilteredProducts(products);
    setCurrentPage(1);
  }, [searchParams, initialProducts]);

  // Calculate pagination
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  // Generate page numbers to display
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of middle range
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the start
      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      }
      // Adjust if we're near the end
      else if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }

      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getProductImage = (product: ProductDto): string | undefined => {
    if (product.productImages && product.productImages.length > 0) {
      const image = product.productImages[0];
      if (!image.imageData) return undefined;
      if (image.imageData.startsWith("data:")) {
        return image.imageData;
      }

      const normalizedData = image.imageData.trim();
      const mimeType = (() => {
        if (normalizedData.startsWith("UklGR")) return "image/webp";
        if (normalizedData.startsWith("/9j/")) return "image/jpeg";
        if (normalizedData.startsWith("iVBORw0KGgo")) return "image/png";
        if (normalizedData.startsWith("R0lGOD")) return "image/gif";

        const extension = image.imageName?.split(".").pop()?.toLowerCase();
        switch (extension) {
          case "webp":
            return "image/webp";
          case "png":
            return "image/png";
          case "gif":
            return "image/gif";
          case "jpg":
          case "jpeg":
            return "image/jpeg";
          default:
            return "image/jpeg";
        }
      })();

      return `data:${mimeType};base64,${normalizedData}`;
    }
    return undefined;
  };

  const getProductPrice = (product: ProductDto): string => {
    const price = product.discountPrice ?? product.price ?? 0;
    return `${price.toFixed(2)} ₴`;
  };

  return (
    <div className="w-full min-h-screen bg-[var(--background-main)]">
      {/* Header Section */}
      <div className="w-full bg-gradient-to-b from-[#f5f3ee] to-[#ffffff] pt-[100px] pb-[80px] border-b-2 border-[#e0e0e0]">
        <div className="max-w-[1220px] mx-auto px-[16px] lg:px-0">
          {/* Header Info */}
          <div className="mb-[60px]">
            <h1 className="text-[var(--color-black)] font-['Roboto_Mono'] font-bold text-[32px] md:text-[44px] leading-[120%] tracking-[-0.011em] mb-[20px]">
              Обери, що тебе цікавить
            </h1>
            <p className="text-[var(--color-black)] font-sans text-[14px] md:text-[16px] leading-[150%] max-w-[590px]">
              Скористайся закладками у хедері — натисни на потрібний параметр, щоб швидко знайти книгу за жанром, автором, мовою або настроєм.
            </p>
          </div>

          {/* Results Count */}
          <div className="text-[var(--color-black)] font-sans text-[24px] md:text-[32px] font-semibold">
            Знайдено {totalProducts.toLocaleString("uk-UA")} збігів
          </div>

          {/* Active Filters */}
          {searchParams.toString() && (
            <div className="mt-[30px] flex flex-wrap gap-[8px]">
              {Array.from(searchParams.entries()).map(([key, value]) => (
                <div
                  key={key}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full text-sm"
                >
                  <span className="text-gray-700">
                    {key}: {value}
                  </span>
                  <button
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.delete(key);
                      window.history.replaceState(
                        {},
                        "",
                        `?${params.toString()}`
                      );
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  window.history.replaceState({}, "", "/products");
                }}
                className="inline-flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
              >
                Очистити фільтри
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1220px] mx-auto px-[16px] lg:px-0 py-[60px]">
        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] mb-[60px]">
              {paginatedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="flex justify-center"
                >
                  <BookCard
                    title={product.productName || "Без назви"}
                    price={getProductPrice(product)}
                    image={getProductImage(product)}
                    rating={0}
                  />
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-[20px] py-[40px]">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center w-[40px] h-[40px] rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Попередня сторінка"
                >
                  <svg
                    className="w-[20px] h-[20px]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-[8px]">
                  {pageNumbers.map((pageNum, index) => (
                    pageNum === "..." ? (
                      <span key={`ellipsis-${index}`} className="px-[8px]">
                        ...
                      </span>
                    ) : (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum as number)}
                        className={`flex items-center justify-center w-[40px] h-[40px] rounded-full transition-all font-medium text-[14px] ${
                          currentPage === pageNum
                            ? "bg-[var(--color-black)] text-white"
                            : "bg-white text-[var(--color-black)] border border-[#e0e0e0] hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center w-[40px] h-[40px] rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Наступна сторінка"
                >
                  <svg
                    className="w-[20px] h-[20px]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-[100px]">
            <h2 className="text-[24px] font-bold text-[var(--color-black)] mb-[16px]">
              Товарів не знайдено
            </h2>
            <p className="text-[16px] text-gray-600">
              На жаль, за вашим запитом товарів не знайдено. Спробуйте змінити критерії пошуку.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
