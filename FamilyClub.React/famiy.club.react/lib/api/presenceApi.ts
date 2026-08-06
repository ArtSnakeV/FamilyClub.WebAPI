import { apiBasePath } from "@/lib/api/services";

export type ActiveSessionDto = {
  sessionId: string;
  ipAddress: string;
  lastSeen: string;
  userAgent: string | null;
  userName: string | null;
};

export async function fetchActiveSessions(): Promise<ActiveSessionDto[]> {
  try {
    const res = await fetch(`${apiBasePath}/api/Presence/active-users`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.warn(`Presence active-users API returned status: ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (err) {
    console.warn("Failed to fetch active sessions from backend:", err);
    return [];
  }
}
