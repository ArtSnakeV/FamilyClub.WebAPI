import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

export interface LockUserPayload {
    blockReasonId: number;
    /** ISO-рядок; null/undefined = заблоковано назавжди (бекенд ставить +100 років) */
    lockoutEnd?: string | null;
    comment: string;
}

function authHeaders(json = false): HeadersInit {
    const token = getAuthToken();
    return {
        ...(json ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}

async function readError(res: Response): Promise<string> {
    try {
        return await res.text();
    } catch {
        return "";
    }
}

export async function lockUser(id: string, payload: LockUserPayload) {
    if (!id) throw new Error("User id is missing");

    const res = await fetch(
        `${apiBasePath}/api/ClubMember/${encodeURIComponent(id)}/lock`,
        {
            method: "PUT",
            headers: authHeaders(true),
            body: JSON.stringify({
                blockReasonId: payload.blockReasonId,
                comment: payload.comment,
                lockoutEnd: payload.lockoutEnd ?? null,
            }),
        }
    );

    if (!res.ok) {
        const details = await readError(res);
        console.error("lockUser failed:", res.status, details);
        throw new Error(
            `Failed to lock user (${res.status})${details ? `: ${details}` : ""}`
        );
    }

    if (res.status === 204) return null;
    return res.json();
}

export async function unlockUser(id: string) {
    if (!id) throw new Error("User id is missing");

    const res = await fetch(
        `${apiBasePath}/api/ClubMember/${encodeURIComponent(id)}/unlock`,
        {
            method: "PUT",
            headers: authHeaders(),
        }
    );

    if (!res.ok) {
        const details = await readError(res);
        console.error("unlockUser failed:", res.status, details);
        throw new Error(
            `Failed to unlock user (${res.status})${details ? `: ${details}` : ""}`
        );
    }
}

export async function deleteUser(id: string) {
    if (!id) throw new Error("User id is missing");

    const res = await fetch(
        `${apiBasePath}/api/ClubMember/${encodeURIComponent(id)}`,
        {
            method: "DELETE",
            headers: authHeaders(),
        }
    );

    if (!res.ok) {
        const details = await readError(res);
        console.error("deleteUser failed:", res.status, details);
        throw new Error(
            `Failed to delete user (${res.status})${details ? `: ${details}` : ""}`
        );
    }
}
