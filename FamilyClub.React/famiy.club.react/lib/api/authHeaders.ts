import { getAuthToken } from "@/lib/auth/tokenStorage";

/** JWT headers for manual fetch() calls to the API. */
export function authHeaders(extra?: HeadersInit): HeadersInit {
  const token = getAuthToken();
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(extra ?? {}),
  };
}
