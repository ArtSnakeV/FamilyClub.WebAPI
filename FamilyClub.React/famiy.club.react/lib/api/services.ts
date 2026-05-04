// src/lib/api/services.ts
import { Configuration, ProductsApi, AuthorsApi, AuthClubMemberApi, CategoriesApi, ReviewsApi } from "./generated";

// Configuration tells the client where your backend is
const apiConfig = new Configuration({
  basePath: "https://localhost:7069", // Your ASP.NET URL
});

// Create instances for the controllers you want to use
export const productService = new ProductsApi(apiConfig);
export const authorService = new AuthorsApi(apiConfig);
export const authService = new AuthClubMemberApi(apiConfig);
export const categoriesService = new CategoriesApi(apiConfig);
export const reviewService = new ReviewsApi(apiConfig);