import { apiBasePath } from "./services";

/** Lightweight fetch helper that shares the same API base as OpenAPI clients. */
export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const response = await fetch(`${apiBasePath}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
}
