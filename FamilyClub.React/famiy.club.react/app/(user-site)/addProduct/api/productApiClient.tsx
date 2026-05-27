import {
  Configuration,
  ProductsApi,
  AuthorsApi,
  PublishersApi,
  CategoriesApi,
  LanguagesApi,
  FormatsApi,
  BookSizesApi,
} from "@/lib/api/generated";

const config = new Configuration({ basePath: "https://localhost:7069" });

export const authorsApi = new AuthorsApi(config);
export const publishersApi = new PublishersApi(config);
export const categoriesApi = new CategoriesApi(config);
export const languagesApi = new LanguagesApi(config);
export const formatsApi = new FormatsApi(config);
export const bookSizesApi = new BookSizesApi(config);
export const productsApi = new ProductsApi(config);
