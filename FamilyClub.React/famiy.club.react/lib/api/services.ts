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
  CartsApi,
  OrdersApi,
  FavoritesApi,
  AgeRestrictionsApi,
} from "./generated";

const defaultBasePath = typeof window !== "undefined" ? "" : (process.env.BACKEND_URL || "https://localhost:7069");
export const apiBasePath = process.env.NEXT_PUBLIC_API_URL !== undefined ? process.env.NEXT_PUBLIC_API_URL : defaultBasePath;


export const apiConfig = new Configuration({
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
export const cartService = new CartsApi(apiConfig);
export const orderService = new OrdersApi(apiConfig);
export const favoriteService = new FavoritesApi(apiConfig);
export const ageRestrictionService = new AgeRestrictionsApi(apiConfig);