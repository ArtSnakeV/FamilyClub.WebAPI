"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BookCard from "@/app/(user-site)/main_page/BookCard";
import { ProductDto } from "@/lib/api/generated";
import { productService } from "@/lib/api/services";

interface CatalogClientProps {
  initialProducts?: ProductDto[];
}

const PRODUCTS_PER_PAGE = 12; // 4 columns × 3 rows

export default function CatalogClient({ initialProducts = [] }: CatalogClientProps) {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState<ProductDto[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<ProductDto[]>(initialProducts);
  const [loading, setLoading] = useState(initialProducts.length === 0);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setLoadError(false);
        const products = (await productService.apiProductsGet().catch(() => [])) ?? [];
        if (!mounted) return;
        setAllProducts(products);
      } catch {
        if (mounted) setLoadError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Apply filters when search params or catalog data change
  useEffect(() => {
    let products = [...allProducts];

    // Filter by category
    const categoryIds = searchParams.getAll("categoryId").flatMap(v => v.split(',')).map(id => parseInt(id)).filter(id => !isNaN(id));
    if (categoryIds.length > 0) {
      products = products.filter(
        (p) => p.categoryIds?.some(id => categoryIds.includes(id))
      );
    }

    // Filter by author
    const authorIds = searchParams.getAll("authorId").flatMap(v => v.split(',')).map(id => parseInt(id)).filter(id => !isNaN(id));
    if (authorIds.length > 0) {
      products = products.filter(
        (p) => p.authorIds?.some(id => authorIds.includes(id))
      );
    }

    // Filter by language
    const languageIds = searchParams.getAll("languageId").flatMap(v => v.split(',')).map(id => parseInt(id)).filter(id => !isNaN(id));
    if (languageIds.length > 0) {
      products = products.filter(
        (p) => p.languageIds?.some(id => languageIds.includes(id))
      );
    }

    // Filter by format
    const formatIds = searchParams.getAll("formatId").flatMap(v => v.split(',')).map(id => parseInt(id)).filter(id => !isNaN(id));
    if (formatIds.length > 0) {
      products = products.filter(
        (p) => p.formatIds?.some(id => formatIds.includes(id))
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
    const ageRestrictionIds = searchParams.getAll("ageRestrictionId").flatMap(v => v.split(',')).map(id => parseInt(id)).filter(id => !isNaN(id));
    if (ageRestrictionIds.length > 0) {
      products = products.filter(
        (p) => p.ageRestrictionIds?.some(id => ageRestrictionIds.includes(id))
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
  }, [searchParams, allProducts]);

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
      const normalizedData = image.imageData.trim();
      if (normalizedData.startsWith("data:") || normalizedData.startsWith("http://") || normalizedData.startsWith("https://")) {
        return normalizedData;
      }

      const isRelativeUrl =
        normalizedData.startsWith("/") &&
        !normalizedData.startsWith("/9j/") &&
        (normalizedData.startsWith("/images/") ||
          normalizedData.startsWith("/static/") ||
          normalizedData.startsWith("/assets/") ||
          normalizedData.startsWith("/uploads/") ||
          normalizedData.startsWith("/_next/") ||
          /\.(jpg|jpeg|png|webp|svg|gif|ico)$/i.test(normalizedData));

      if (isRelativeUrl) {
        return normalizedData;
      }

      const mimeType = (() => {
        if (normalizedData.startsWith("UklGR")) return "image/webp";
        if (normalizedData.startsWith("/9j/") || normalizedData.startsWith("9j/")) return "image/jpeg";
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
      <div className="w-full pt-[200px] pb-[80px] relative">
        <div className="max-w-[1220px] mx-auto px-[16px] lg:px-0 relative">
          <img 
            src="/images/catalog/arrow.svg" 
            alt="Вказівник" 
            className="absolute left-[80px] -top-[120px] w-[120px] h-[72px] -rotate-90 pointer-events-none hidden md:block"
          />
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-0">
            {/* Header Info */}
            <div className="max-w-[590px] font-mono font-semibold text-[16px] tracking-[-0.176px] leading-[1.5]">
              <p className="text-[rgba(36,36,36,0.8)] whitespace-pre-wrap">
                <span className="text-[#242424]">Обери, що тебе цікавить</span>
                <br />
                Скористайся закладками у хедері — натисни на потрібний параметр, щоб швидко знайти книгу за жанром, автором, мовою або настроєм.
              </p>
            </div>

            {/* Results Count */}
            <div className="text-[#242424] font-mono font-semibold text-[24px] md:text-[32px] text-right tracking-[-0.352px] leading-[1.5]">
              {loading
                ? "Завантаження…"
                : `Знайдено ${totalProducts.toLocaleString("uk-UA")} збігів`}
            </div>
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
      <div className="relative w-full overflow-hidden">
        {/* Background Shelf Layer (Fixed or repeating structure) */}
        <div className="absolute inset-0 pointer-events-none z-0 flex flex-col">
          {Array.from({ length: Math.max(1, Math.ceil(paginatedProducts.length / 4)) }).map((_, rowIndex) => (
            <div key={`shelf-${rowIndex}`} className="relative w-full h-[605px] flex-shrink-0">
              {/* Shelf Texture 1 */}
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundImage: "linear-gradient(180.074deg, rgba(36, 36, 36, 0.2) 0.24409%, rgba(36, 36, 36, 0) 17.892%), linear-gradient(180.074deg, rgba(36, 36, 36, 0.5) 9.5072%, rgba(36, 36, 36, 0) 49.996%), linear-gradient(90deg, rgb(245, 243, 238) 0%, rgb(245, 243, 238) 100%)" 
                }} 
              />
              <div className="absolute left-0 right-0 top-0 h-[105px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-[#7e4d1e]">
                <img src="/images/catalog/shelf_tex1.png" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-50" alt="" />
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.27)]" />
              </div>
              <div className="absolute left-0 right-0 top-[35px] h-[70px] bg-[#7e4d1e]">
                <img src="/images/catalog/shelf_tex2.png" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply" alt="" />
                <img src="/images/catalog/shelf_tex3.png" className="absolute inset-0 w-full h-full object-cover" alt="" />
              </div>
            </div>
          ))}
        </div>

        {/* Decorations layer (only on first few rows) */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden xl:block mx-auto max-w-[1920px]">
           {/* Top shelf decorations */}
           <img src="/images/catalog/lilies.png" className="absolute left-0 top-[260px] w-[304px] h-[137px]" alt="" />
           <img src="/images/catalog/pillows.png" className="absolute right-[0px] top-[200px] w-[314px] h-[251px]" alt="" />
           
           {/* Second shelf decorations */}
           <img src="/images/catalog/train.png" className="absolute left-0 top-[660px] w-[306px] h-[210px]" alt="" />
           <img src="/images/catalog/plaid.png" className="absolute right-[0px] top-[710px] w-[295px] h-[286px]" alt="" />
           
           {/* Third shelf decorations */}
           <img src="/images/catalog/hunger_games.png" className="absolute left-0 top-[1210px] w-[336px] h-[128px]" alt="" />
        </div>

        <div className="max-w-[1220px] mx-auto px-[16px] lg:px-0 pt-[180px] pb-[100px] relative z-20">
          {loading ? (
            <div className="text-center py-[100px] relative z-20">
              <p className="text-[18px] text-gray-600 font-mono">Завантаження книг…</p>
            </div>
          ) : loadError ? (
            <div className="text-center py-[100px] relative z-20">
              <h2 className="text-[24px] font-bold text-[var(--color-black)] mb-[16px]">
                Не вдалося завантажити каталог
              </h2>
              <p className="text-[16px] text-gray-600">
                Перевір, що API запущений, і онови сторінку.
              </p>
            </div>
          ) : paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[60px] gap-y-[205px] mb-[60px]">
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
                  className="flex items-center justify-center w-[40px] h-[40px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Попередня сторінка"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 4.29289C13.0976 4.68342 13.0976 5.31658 12.7071 5.70711L7.41421 11L12.7071 16.2929C13.0976 16.6834 13.0976 17.3166 12.7071 17.7071C12.3166 18.0976 11.6834 18.0976 11.2929 17.7071L5.29289 11.7071C4.90237 11.3166 4.90237 10.6834 5.29289 10.2929L11.2929 4.29289C11.6834 3.90237 12.3166 3.90237 12.7071 4.29289Z" fill="#242424"/>
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
                        className={`flex items-center justify-center w-[40px] h-[40px] rounded-full transition-all font-mono font-semibold text-[18px] ${
                          currentPage === pageNum
                            ? "bg-[#242424] text-white"
                            : "bg-transparent text-[#242424] border border-[#e0e0e0] hover:bg-[#242424] hover:text-white"
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
                  className="flex items-center justify-center w-[40px] h-[40px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Наступна сторінка"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.29289 4.29289C6.90237 4.68342 6.90237 5.31658 7.29289 5.70711L12.5858 11L7.29289 16.2929C6.90237 16.6834 6.90237 17.3166 7.29289 17.7071C7.68342 18.0976 8.31658 18.0976 8.70711 17.7071L14.7071 11.7071C15.0976 11.3166 15.0976 10.6834 14.7071 10.2929L8.70711 4.29289C8.31658 3.90237 7.68342 3.90237 7.29289 4.29289Z" fill="#242424"/>
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
            <div className="text-center py-[100px] relative z-20">
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
    </div>
  );
}
