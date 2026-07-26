import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

export interface ClaimWithMemberDto {
    memberId: string;
    email?: string | null;
    userName?: string | null;
    phoneNumber?: string | null;
    claimType: string;
    claimValue: string;
}

export interface ClubMemberOption {
    id: string;
    email?: string | null;
    phoneNumber?: string | null;
    name?: string | null;
    surname?: string | null;
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

export async function fetchAllClaims(): Promise<ClaimWithMemberDto[]> {
    const res = await fetch(`${apiBasePath}/api/ClaimsClubMember`, {
        headers: authHeaders(),
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(
            `Не вдалося завантажити claims (${res.status}): ${await readError(res)}`
        );
    }

    const data = await res.json();
    return (Array.isArray(data) ? data : []).map(
        (c: Record<string, string | null | undefined>) => ({
            memberId: String(c.memberId ?? c.MemberId ?? ""),
            email: c.email ?? c.Email ?? null,
            userName: c.userName ?? c.UserName ?? null,
            phoneNumber: c.phoneNumber ?? c.PhoneNumber ?? null,
            claimType: String(c.claimType ?? c.ClaimType ?? ""),
            claimValue: String(c.claimValue ?? c.ClaimValue ?? ""),
        })
    );
}

export async function fetchMembersForPicker(): Promise<ClubMemberOption[]> {
    const res = await fetch(`${apiBasePath}/api/ClubMember`, {
        headers: authHeaders(),
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(
            `Не вдалося завантажити користувачів (${res.status}): ${await readError(res)}`
        );
    }

    const data = await res.json();
    return (Array.isArray(data) ? data : [])
        .filter((m: { id?: string }) => m?.id)
        .map((m: ClubMemberOption) => ({
            id: m.id,
            email: m.email ?? null,
            phoneNumber: m.phoneNumber ?? null,
            name: m.name ?? null,
            surname: m.surname ?? null,
        }));
}

export async function addClaim(
    memberId: string,
    claimType: string,
    claimValue: string
): Promise<void> {
    const res = await fetch(
        `${apiBasePath}/api/ClaimsClubMember/${encodeURIComponent(memberId)}/add`,
        {
            method: "POST",
            headers: authHeaders(true),
            body: JSON.stringify({ claimType, claimValue }),
        }
    );

    if (!res.ok) {
        throw new Error(
            `Не вдалося додати claim (${res.status}): ${await readError(res)}`
        );
    }
}

export async function updateClaim(
    memberId: string,
    oldClaimType: string,
    oldClaimValue: string,
    newClaimType: string,
    newClaimValue: string
): Promise<void> {
    const res = await fetch(
        `${apiBasePath}/api/ClaimsClubMember/${encodeURIComponent(memberId)}/update`,
        {
            method: "PUT",
            headers: authHeaders(true),
            body: JSON.stringify({
                memberId,
                oldClaimType,
                oldClaimValue,
                newClaimType,
                newClaimValue,
            }),
        }
    );

    if (!res.ok) {
        throw new Error(
            `Не вдалося оновити claim (${res.status}): ${await readError(res)}`
        );
    }
}

export async function deleteClaim(
    memberId: string,
    claimType: string,
    claimValue: string
): Promise<void> {
    const res = await fetch(
        `${apiBasePath}/api/ClaimsClubMember/${encodeURIComponent(memberId)}/remove`,
        {
            method: "DELETE",
            headers: authHeaders(true),
            body: JSON.stringify({ claimType, claimValue }),
        }
    );

    if (!res.ok) {
        throw new Error(
            `Не вдалося видалити claim (${res.status}): ${await readError(res)}`
        );
    }
}

export function claimRowKey(c: ClaimWithMemberDto): string {
    return `${c.memberId}::${c.claimType}::${c.claimValue}`;
}
