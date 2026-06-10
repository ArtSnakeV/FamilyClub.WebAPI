// src/lib/api/services.ts
import {
  Configuration,
  ProductsApi,
  AuthorsApi,
  AuthClubMemberApi,
  BookSizesApi,
  CategoriesApi,
  ClubMemberApi,
  FormatsApi,
  ReviewsApi,
  LanguagesApi,
  PublishersApi,
  TranslatorsApi,
} from "./generated";

// Configuration tells the client where your backend is
const apiBasePath = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7069";

const apiConfig = new Configuration({
  basePath: apiBasePath,
});

// Create instances for the controllers you want to use
export const productService = new ProductsApi(apiConfig);
export const authorService = new AuthorsApi(apiConfig);
export const authService = new AuthClubMemberApi(apiConfig);
export const categoriesService = new CategoriesApi(apiConfig);
export const clubMemberService = new ClubMemberApi(apiConfig);
export const formatService = new FormatsApi(apiConfig);
export const bookSizeService = new BookSizesApi(apiConfig);
export const reviewService = new ReviewsApi(apiConfig);
export const languageService = new LanguagesApi(apiConfig);
export const publisherService = new PublishersApi(apiConfig);
export const translatorService = new TranslatorsApi(apiConfig);