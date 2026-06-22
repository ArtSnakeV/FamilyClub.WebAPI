"use client"


import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import UserSideBArProfile from "./userSideBar/UserSideBarItems";
import { CategoryDto, ClubMember, ClubMemberReadDto, Configuration, ProductDto } from "@/lib/api/generated";
import { categoriesService, clubMemberService, productService } from "@/lib/api/services";
import BookGrid from "./bookGrid/BookGrid";
import BtnSection from "./section/BtnSection";
import InfoUserSection from "./section/InfoUserSection";
import { useCurrentUser } from "./hooks/useCurrentUser";

function UserProfileContent() {
  const searchParams = useSearchParams();
  const yearParam = searchParams.get("year");
  const sortParam = searchParams.get("sort");
  const ebookParam = searchParams.get("ebook");
  const audioParam = searchParams.get("audio");
  const { user } = useCurrentUser();
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  const categoriesParam = searchParams.get("categories");
  const selectedIds = categoriesParam
    ? categoriesParam.split(",").filter(Boolean).map(Number)
    : [];
  const [products, setProducts] = useState<ProductDto[]>([]);

  useEffect(() => {
    categoriesService
      .apiCategoriesGet()
      .then(setCategories)
      .catch(console.error);
    productService
      .apiProductsGet()
      .then(setProducts)
      .catch(console.error);
  }, []);

  const EBOOK_FORMAT_ID = 1;
  const AUDIO_FORMAT_ID = 2;

  const ebookSelected = ebookParam === "true";
  const audioSelected = audioParam === "true";

  //фільтр по рокам
  let filteredBooks = yearParam
    ? products.filter((p) => {
      if (!p.publishingDate) return false;
      const year = new Date(p.publishingDate).getFullYear().toString();
      return year.includes(yearParam);
    })
    : [...products];

  //  Фільтр по форматах
  if (ebookSelected || audioSelected) {
    filteredBooks = filteredBooks.filter((book) => {
      const formats = book.formatIds ?? [];
      if (ebookSelected && audioSelected) {
        return formats.includes(EBOOK_FORMAT_ID) || formats.includes(AUDIO_FORMAT_ID);
      }
      if (ebookSelected) return formats.includes(EBOOK_FORMAT_ID);
      if (audioSelected) return formats.includes(AUDIO_FORMAT_ID);
      return true;
    });
  }

  // Фільтр по категоріях
  if (selectedIds.length > 0) {
    filteredBooks = filteredBooks.filter((book) =>
      book.categoryIds?.some((id) => selectedIds.includes(id))
    );
  }
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortParam === "name-asc")
      return (a.productName ?? "").localeCompare(b.productName ?? "", "uk");
    if (sortParam === "name-desc")
      return (b.productName ?? "").localeCompare(a.productName ?? "", "uk");
    return 0;
  });
  const shouldShowGrid =
    Boolean(yearParam) ||
    Boolean(sortParam) ||
    ebookSelected ||
    audioSelected ||
    selectedIds.length > 0;
  return (
    <div className="relative min-h-screen" style={{
      backgroundImage: "url('/images/userProfile/Rectangle 326.png')",
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
    }}>
      <div className="w-[calc(100%-700px)] h-[200px] items-center ml-[400px] mt-[160px] flex absolute z-20"><InfoUserSection member={user} /></div>
      <div className="flex relative items-start gap-0">
        <UserSideBArProfile
          categories={categories}
          selectedIds={selectedIds}
          ebookSelected={ebookSelected}
          audioSelected={audioSelected}
        />

      </div>
      <div className="relative h-[200px] w-full top-[41vh]" style={{
        backgroundImage: "url('/images/userProfile/Rectangle 194.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}>
        <div className="flex items-center ml-[332px]">
          <BtnSection />
        </div>
      </div>

      <div className="relative w-full -mb-2" style={{ marginTop: "360px", }}>
        <BookGrid books={shouldShowGrid ? sortedBooks : []} />
      </div>

    </div>
  );

}

export default function Page() {
  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <UserProfileContent />
    </Suspense>
  );
}