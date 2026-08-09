import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

export type SeedCatalogResult = {
  success: boolean;
  message: string;
  authorsAdded: number;
  authorsUpdated: number;
  publishersAdded: number;
  categoriesAdded: number;
  productsAdded: number;
  productsSkipped: number;
};

export async function seedCatalogBooks(): Promise<SeedCatalogResult> {
  const token = getAuthToken();
  const res = await fetch(`${apiBasePath}/api/AdminSeed/catalog`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = (await res.json().catch(() => null)) as SeedCatalogResult | null;
  if (!res.ok) {
    const statusHint =
      res.status === 401 || res.status === 403
        ? ` (${res.status} Forbidden/Unauthorized)`
        : ` (${res.status})`;
    throw new Error((data?.message || `Seed failed`) + statusHint);
  }

  return data ?? {
    success: false,
    message: "Empty response",
    authorsAdded: 0,
    authorsUpdated: 0,
    publishersAdded: 0,
    categoriesAdded: 0,
    productsAdded: 0,
    productsSkipped: 0,
  };
}
