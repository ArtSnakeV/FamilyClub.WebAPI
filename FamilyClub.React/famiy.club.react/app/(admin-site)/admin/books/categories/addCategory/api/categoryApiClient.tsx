import { apiBasePath } from "@/lib/api/services";
import {
  Configuration,
  CategoriesApi,
} from "@/lib/api/generated";

const BASE_PATH = apiBasePath;
const config = new Configuration({ basePath: BASE_PATH });

export const BASE_URL = BASE_PATH;

export const categoriesApi = new CategoriesApi(config);
