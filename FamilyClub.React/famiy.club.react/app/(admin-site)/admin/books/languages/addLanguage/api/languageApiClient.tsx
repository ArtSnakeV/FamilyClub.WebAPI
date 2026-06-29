import {
  Configuration,
  LanguagesApi,
} from "@/lib/api/generated";
import { apiBasePath } from "@/lib/api/services";

const config = new Configuration({ basePath: apiBasePath });

export const BASE_URL = apiBasePath;

export const languageApi = new LanguagesApi(config);
