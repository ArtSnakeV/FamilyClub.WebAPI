import { useState, useEffect } from "react";
import {
  AuthorDTO,
  PublisherDto,
  CategoryDto,
  LanguageDto,
  FormatDto,
  BookSizeDto,
} from "@/lib/api/generated";
import {
  authorsApi,
  publishersApi,
  categoriesApi,
  languagesApi,
  formatsApi,
  bookSizesApi,
} from "@/app/addProduct/api/productApiClient";

type ProductData = {
  authors: AuthorDTO[];
  publishers: PublisherDto[];
  categories: CategoryDto[];
  languages: LanguageDto[];
  formats: FormatDto[];
  bookSizes: BookSizeDto[];
};

export function useProductData() {
  const [data, setData] = useState<ProductData>({
    authors: [],
    publishers: [],
    categories: [],
    languages: [],
    formats: [],
    bookSizes: [],
  });

  useEffect(() => {
    Promise.all([
      authorsApi.apiAuthorsGet(),
      publishersApi.apiPublishersGet(),
      categoriesApi.apiCategoriesGet(),
      languagesApi.apiLanguagesGet(),
      formatsApi.apiFormatsGet(),
      bookSizesApi.apiBookSizesGet(),
    ]).then(([authors, publishers, categories, languages, formats, bookSizes]) =>
      setData({ authors, publishers, categories, languages, formats, bookSizes })
    );
  }, []);

  return data;
}