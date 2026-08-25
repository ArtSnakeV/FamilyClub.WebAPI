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
  ComplaintsApi,
  RolesClubMemberApi,
  PromotionsApi,
  BlockReasonsApi,
  NotificationsApi,
  type Middleware,
} from "./generated";
import { getAuthToken } from "@/lib/auth/tokenStorage";

// Browser: empty base → same-origin /api (Next rewrite).
// Server (SSR): INTERNAL_API_URL → NEXT_PUBLIC_API_URL → local Kestrel.
const defaultBasePath =
  typeof window !== "undefined" ? "" : "https://localhost:7069";
export const apiBasePath =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || ""
    : process.env.INTERNAL_API_URL?.replace(/\/$/, "") ||
      process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
      defaultBasePath;

/** Attach Bearer token to every OpenAPI client request (catalog CRUD, etc.). */
const authMiddleware: Middleware = {
  pre: async ({ url, init }) => {
    const token = getAuthToken();
    if (!token) return { url, init };

    const headers = new Headers(init.headers ?? {});
    if (!headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }
// Browser: empty base → same-origin /api (Next rewrite).
// Server (SSR): INTERNAL_API_URL → NEXT_PUBLIC_API_URL → local Kestrel.
export const apiBasePath =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || ""
    : process.env.INTERNAL_API_URL?.replace(/\/$/, "") ||
      process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
      "https://localhost:7069";

    return { url, init: { ...init, headers } };
  },
};

export const apiConfig = new Configuration({
  basePath: apiBasePath,
  middleware: [authMiddleware],
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
export const complaintsService = new ComplaintsApi(apiConfig);
export const roleClubMemberService = new RolesClubMemberApi(apiConfig);
export const promotionService = new PromotionsApi(apiConfig);
export const blockReasonsService = new BlockReasonsApi(apiConfig);
export const notificationService = new NotificationsApi(apiConfig);
