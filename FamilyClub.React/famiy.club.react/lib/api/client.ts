import { apiBasePath } from "./services";
const BASE_URL = apiBasePath;

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}