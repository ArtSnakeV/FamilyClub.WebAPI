import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

async function clubMemberAction(
    id: string,
    action: "lock" | "unlock" | "delete"
): Promise<void> {
    if (!id) {
        throw new Error("User id is missing");
    }

    const token = getAuthToken();
    const url =
        action === "delete"
            ? `${apiBasePath}/api/ClubMember/${encodeURIComponent(id)}`
            : `${apiBasePath}/api/ClubMember/${encodeURIComponent(id)}/${action}`;

    const res = await fetch(url, {
        method: action === "delete" ? "DELETE" : "PUT",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!res.ok) {
        const details = await res.text().catch(() => "");
        throw new Error(
            `Failed to ${action} user (${res.status})${details ? `: ${details}` : ""}`
        );
    }
}

export async function lockUser(id: string) {
    await clubMemberAction(id, "lock");
}

export async function unlockUser(id: string) {
    await clubMemberAction(id, "unlock");
}

export async function deleteUser(id: string) {
    await clubMemberAction(id, "delete");
}
