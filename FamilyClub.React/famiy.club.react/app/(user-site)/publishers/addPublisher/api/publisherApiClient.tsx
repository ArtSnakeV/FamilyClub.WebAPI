import {
  Configuration,
  PublishersApi,
} from "@/lib/api/generated";
import { apiBasePath } from "@/lib/api/services";

// const BASE_PATH = "https://localhost:7069";

const config = new Configuration({ basePath: apiBasePath });

export const BASE_URL = apiBasePath;

export const publisherApi = new PublishersApi(config);
