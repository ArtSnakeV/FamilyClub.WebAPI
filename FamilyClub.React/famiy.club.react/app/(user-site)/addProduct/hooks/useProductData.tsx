import { useState, useEffect } from "react";
import {
  AuthorDTO,
  PublisherDto,
  CategoryDto,
  LanguageDto,
  FormatDto,
  BookSizeDto,
  AgeRestrictionDto,
} from "@/lib/api/generated";
import {
  authorsApi,
  publishersApi,
  categoriesApi,
  languagesApi,
  formatsApi,
  bookSizesApi,
  ageRestrictionApi,
} from "@/app/(user-site)/addProduct/api/productApiClient";

type ProductData = {
  authors: AuthorDTO[];
  publishers: PublisherDto[];
  categories: CategoryDto[];
  languages: LanguageDto[];
  formats: FormatDto[];
  bookSizes: BookSizeDto[];
  ageRestrictions: AgeRestrictionDto[];
};

export function useProductData() {
  const [data, setData] = useState<ProductData>({
    authors: [],
    publishers: [],
    categories: [],
    languages: [],
    formats: [],
    bookSizes: [],
    ageRestrictions: [],
  });

  useEffect(() => {
    Promise.all([
      authorService.apiAuthorsGet(),
      publisherService.apiPublishersGet(),
      categoriesService.apiCategoriesGet(),
      languageService.apiLanguagesGet(),
      formatService.apiFormatsGet(),
      bookSizeService.apiBookSizesGet(),
      ageRestrictionService.apiAgeRestrictionsGet(),
    ]).then(([authors, publishers, categories, languages, formats, bookSizes, ageRestrictions,]) =>
      setData({ authors, publishers, categories, languages, formats, bookSizes, ageRestrictions, })
    );
  }, []);

  return data;
}