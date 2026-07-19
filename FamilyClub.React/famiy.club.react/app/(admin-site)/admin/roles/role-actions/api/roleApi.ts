import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

export interface RoleDto {
    id: string;
    name: string;
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

export async function fetchRoles(): Promise<RoleDto[]> {
    const res = await fetch(`${apiBasePath}/api/RolesClubMember`, {
        headers: authHeaders(),
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Failed to load roles (${res.status}): ${await readError(res)}`);
    }

    const data = await res.json();
    return (Array.isArray(data) ? data : [])
        .filter((r: { id?: string; name?: string }) => r?.id && r?.name)
        .map((r: { id: string; name: string }) => ({ id: r.id, name: r.name }));
}

export async function fetchRoleById(id: string): Promise<RoleDto> {
    const res = await fetch(
        `${apiBasePath}/api/RolesClubMember/${encodeURIComponent(id)}`,
        { headers: authHeaders(), cache: "no-store" }
    );

    if (!res.ok) {
        throw new Error(`Failed to load role (${res.status}): ${await readError(res)}`);
    }

    const data = await res.json();
    return { id: data.id, name: data.name };
}

/** API expects raw JSON string body: "RoleName" */
export async function createRole(roleName: string): Promise<void> {
    const clean = roleName.trim();
    if (!clean) throw new Error("Назва ролі не може бути порожньою");

    const res = await fetch(`${apiBasePath}/api/RolesClubMember`, {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify(clean),
    });

    if (!res.ok) {
        throw new Error(
            `Не вдалося створити роль (${res.status}): ${await readError(res)}`
        );
    }
}

export async function updateRole(id: string, newName: string): Promise<void> {
    const clean = newName.trim();
    if (!clean) throw new Error("Назва ролі не може бути порожньою");

    const res = await fetch(
        `${apiBasePath}/api/RolesClubMember/${encodeURIComponent(id)}`,
        {
            method: "PUT",
            headers: authHeaders(true),
            body: JSON.stringify(clean),
        }
    );

    if (!res.ok) {
        throw new Error(
            `Не вдалося оновити роль (${res.status}): ${await readError(res)}`
        );
    }
}

export async function deleteRole(id: string): Promise<void> {
    const res = await fetch(
        `${apiBasePath}/api/RolesClubMember/${encodeURIComponent(id)}`,
        {
            method: "DELETE",
            headers: authHeaders(),
        }
    );

    if (!res.ok) {
        throw new Error(
            `Не вдалося видалити роль (${res.status}): ${await readError(res)}`
        );
    }
}

/** Системні ролі Identity — не дозволяємо видаляти з UI */
export const PROTECTED_ROLE_NAMES = new Set(["Admin", "User", "Manager"]);

export function isProtectedRole(name: string): boolean {
    return PROTECTED_ROLE_NAMES.has(name);
}
