import {
  Configuration,
  ProductsApi,
  AuthorsApi,
} from "@/lib/api/generated";
import { apiBasePath } from "@/lib/api/services";

const config = new Configuration({ basePath: apiBasePath });

export const BASE_URL = apiBasePath;

export const authorsApi = new AuthorsApi(config);
export const productsApi = new ProductsApi(config);
