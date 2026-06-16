import {
  Configuration,
  ProductsApi,
  AuthorsApi,
  PublishersApi,
  CategoriesApi,
  LanguagesApi,
  FormatsApi,
  BookSizesApi,
  AgeRestrictionsApi,
} from "@/lib/api/generated";
import { apiBasePath } from "@/lib/api/services";


// const config = new Configuration({ basePath: "https://localhost:7069" });
const config = new Configuration({ basePath: apiBasePath });

export const authorsApi = new AuthorsApi(config);
export const publishersApi = new PublishersApi(config);
export const categoriesApi = new CategoriesApi(config);
export const languagesApi = new LanguagesApi(config);
export const formatsApi = new FormatsApi(config);
export const ageRestrictionApi = new AgeRestrictionsApi(config);
export const bookSizesApi = new BookSizesApi(config);
export const productsApi = new ProductsApi(config);
