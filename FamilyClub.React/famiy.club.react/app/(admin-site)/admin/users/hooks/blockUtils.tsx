export const PERMANENT_THRESHOLD_MS = 1000 * 60 * 60 * 24 * 365 * 10; // 10 років

export function isBlocked(lockoutEnd?: string | null): boolean {
    return !!lockoutEnd && new Date(lockoutEnd).getTime() > Date.now();
}

export function isPermanentBlock(lockoutEnd?: string | null): boolean {
    if (!lockoutEnd) return false;
    return new Date(lockoutEnd).getTime() - Date.now() > PERMANENT_THRESHOLD_MS;
}

export function daysLeft(lockoutEnd?: string | null): number | null {
    if (!lockoutEnd) return null;
    const diff = new Date(lockoutEnd).getTime() - Date.now();
    return diff <= 0 ? 0 : Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function formatDate(dateStr?: string | null): string {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("uk-UA", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function getBlockStatus(lockoutEnd?: string | null) {
    const blocked = isBlocked(lockoutEnd);
    const permanent = isPermanentBlock(lockoutEnd);

    if (!blocked) {
        return {
            blocked,
            permanent,
            label: "Активний",
            className:
                "bg-[color-mix(in_srgb,var(--color-green)_18%,var(--background-elevated))] text-[var(--color-green)]",
        };
    }

    if (permanent) {
        return {
            blocked,
            permanent,
            label: "Заблокований назавжди",
            className:
                "bg-[color-mix(in_srgb,#981717_18%,var(--background-elevated))] text-[#981717]",
        };
    }

    return {
        blocked,
        permanent,
        label: "Тимчасово заблокований",
        className:
            "bg-[color-mix(in_srgb,#C9A227_20%,var(--background-elevated))] text-[#C9A227]",
    };
}