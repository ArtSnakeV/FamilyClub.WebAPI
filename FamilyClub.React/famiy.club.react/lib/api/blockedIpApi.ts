import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

export type BlockedIpDto = {
  id: number;
  ipAddress: string;
  reason: string | null;
  createdAt: string;
};

function authHeaders(): HeadersInit {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function fetchBlockedIps(): Promise<BlockedIpDto[]> {
  try {
    const res = await fetch(`${apiBasePath}/api/BlockedIps`, {
      cache: "no-store",
      headers: authHeaders(),
    });
    if (!res.ok) {
      console.warn(`BlockedIps API returned status: ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (err) {
    console.warn("Failed to fetch blocked IPs from backend:", err);
    return [];
  }
}

export async function blockIpAddress(ipAddress: string, reason?: string): Promise<void> {
  const res = await fetch(`${apiBasePath}/api/BlockedIps`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ ipAddress, reason }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Failed to block IP: ${res.status}`);
  }
}

export async function unblockIpAddress(ipAddress: string): Promise<void> {
  const res = await fetch(`${apiBasePath}/api/BlockedIps/${encodeURIComponent(ipAddress)}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) {
    throw new Error(`Failed to unblock IP: ${res.status}`);
  }
}
