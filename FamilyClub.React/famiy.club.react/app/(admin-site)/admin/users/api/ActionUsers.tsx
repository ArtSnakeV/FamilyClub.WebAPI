import { apiBasePath } from "@/lib/api/services";

export interface LockUserPayload {
    blockReasonId: number;
    lockoutEnd?: string | null; // ISO-рядок; null/undefined = заблоковано назавжди
    comment: string;
}

export async function lockUser(id: string, payload: LockUserPayload) {
    const res = await fetch(`${apiBasePath}/api/ClubMember/${id}/lock`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        let details = "";
        try {
            details = await res.text();
        } catch {}
        console.error("lockUser failed:", res.status, details);
        throw new Error(`Failed to lock user (${res.status}): ${details}`);
    }

    // Бекенд повертає 204 No Content — тіла немає, res.json() впаде з помилкою
    if (res.status === 204) return null;
    return res.json();
}

export async function lockUser(id: string) {
    await clubMemberAction(id, "lock");
}

export async function unlockUser(id: string) {
    const res = await fetch(`${apiBasePath}/api/ClubMember/${id}/unlock`, {
        method: "PUT",
    });

    if (!res.ok) {
        const details = await res.text().catch(() => "");
        console.error("unlockUser failed:", res.status, details);
        throw new Error(`Failed to unlock user (${res.status}): ${details}`);
    }
}

export async function deleteUser(id: string) {
    const res = await fetch(`${apiBasePath}/api/ClubMember/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const details = await res.text().catch(() => "");
        console.error("deleteUser failed:", res.status, details);
        throw new Error(`Failed to delete user (${res.status}): ${details}`);
    }
}