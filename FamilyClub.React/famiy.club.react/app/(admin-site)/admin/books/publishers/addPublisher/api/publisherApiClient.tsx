import {
  Configuration,
  PublishersApi,
} from "@/lib/api/generated";

const BASE_PATH = "https://localhost:7069";
const config = new Configuration({ basePath: BASE_PATH });

export const BASE_URL = BASE_PATH;

export const publisherApi = new PublishersApi(config);
