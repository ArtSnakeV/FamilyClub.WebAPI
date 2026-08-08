import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

export type PlatformSettings = {
    id: number;
    companyName: string;
    slogan: string | null;
    supportEmail: string | null;
    supportPhone: string | null;
    companyAddress: string | null;
    booksPerPage: number;
    maxFileSizeMb: number;
    allowedFileFormats: string;
    imageResizeMode: string;
    logoData: string | null;
    logoContentType: string | null;
    iconData: string | null;
    iconContentType: string | null;
    bannerData: string | null;
    bannerContentType: string | null;
    maintenanceMode: boolean;
    maintenanceMessage: string;
    updatedAt?: string;
};

export const DEFAULT_PLATFORM_SETTINGS: PlatformSettings = {
    id: 1,
    companyName: "Ink & Echo",
    slogan: "Книгарня з характером",
    supportEmail: "support@inkandecho.com",
    supportPhone: "+380 00 000 00 00",
    companyAddress: "Україна",
    booksPerPage: 12,
    maxFileSizeMb: 10,
    allowedFileFormats: "jpg, png, webp, pdf",
    imageResizeMode: "1920",
    logoData: null,
    logoContentType: null,
    iconData: null,
    iconContentType: null,
    bannerData: null,
    bannerContentType: null,
    maintenanceMode: false,
    maintenanceMessage:
        "Ми проводимо технічні роботи. Скоро сервіс знову запрацює!",
};

export function mediaSrc(
    data: string | null | undefined,
    contentType?: string | null
): string | null {
    if (!data) return null;
    const trimmed = data.trim();
    if (
        trimmed.startsWith("data:") ||
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://")
    ) {
        return trimmed;
    }

    const isRelativeUrl =
        trimmed.startsWith("/") &&
        !trimmed.startsWith("/9j/") &&
        (trimmed.startsWith("/images/") ||
            trimmed.startsWith("/static/") ||
            trimmed.startsWith("/assets/") ||
            trimmed.startsWith("/uploads/") ||
            trimmed.startsWith("/_next/") ||
            /\.(jpg|jpeg|png|webp|svg|gif|ico)$/i.test(trimmed));

    if (isRelativeUrl) {
        return trimmed;
    }

    const mime =
        contentType ||
        (trimmed.startsWith("/9j/") || trimmed.startsWith("9j/")
            ? "image/jpeg"
            : trimmed.startsWith("iVBORw0KGgo")
            ? "image/png"
            : trimmed.startsWith("UklGR")
            ? "image/webp"
            : trimmed.startsWith("R0lGOD")
            ? "image/gif"
            : "image/png");

    return `data:${mime};base64,${trimmed}`;
}

function mapDto(raw: Record<string, unknown>): PlatformSettings {
    return {
        id: Number(raw.id ?? raw.Id ?? 1),
        companyName: String(raw.companyName ?? raw.CompanyName ?? "Ink & Echo"),
        slogan: (raw.slogan ?? raw.Slogan ?? null) as string | null,
        supportEmail: (raw.supportEmail ?? raw.SupportEmail ?? null) as string | null,
        supportPhone: (raw.supportPhone ?? raw.SupportPhone ?? null) as string | null,
        companyAddress: (raw.companyAddress ?? raw.CompanyAddress ?? null) as
            | string
            | null,
        booksPerPage: Number(raw.booksPerPage ?? raw.BooksPerPage ?? 12),
        maxFileSizeMb: Number(raw.maxFileSizeMb ?? raw.MaxFileSizeMb ?? 10),
        allowedFileFormats: String(
            raw.allowedFileFormats ?? raw.AllowedFileFormats ?? "jpg, png, webp, pdf"
        ),
        imageResizeMode: String(raw.imageResizeMode ?? raw.ImageResizeMode ?? "1920"),
        logoData: (raw.logoData ?? raw.LogoData ?? null) as string | null,
        logoContentType: (raw.logoContentType ?? raw.LogoContentType ?? null) as
            | string
            | null,
        iconData: (raw.iconData ?? raw.IconData ?? null) as string | null,
        iconContentType: (raw.iconContentType ?? raw.IconContentType ?? null) as
            | string
            | null,
        bannerData: (raw.bannerData ?? raw.BannerData ?? null) as string | null,
        bannerContentType: (raw.bannerContentType ??
            raw.BannerContentType ??
            null) as string | null,
        maintenanceMode: Boolean(
            raw.maintenanceMode ?? raw.MaintenanceMode ?? false
        ),
        maintenanceMessage: String(
            raw.maintenanceMessage ??
                raw.MaintenanceMessage ??
                DEFAULT_PLATFORM_SETTINGS.maintenanceMessage
        ),
        updatedAt: (raw.updatedAt ?? raw.UpdatedAt ?? undefined) as
            | string
            | undefined,
    };
}

export async function fetchPlatformSettings(): Promise<PlatformSettings> {
    const res = await fetch(`${apiBasePath}/api/PlatformSettings`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error(`Failed to load platform settings: ${res.status}`);
    }
    const data = await res.json();
    return mapDto(data);
}

export async function updatePlatformSettings(
    settings: PlatformSettings
): Promise<PlatformSettings> {
    const token = getAuthToken();
    const res = await fetch(`${apiBasePath}/api/PlatformSettings`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(settings),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(
            `Failed to save platform settings: ${res.status} ${text}`
        );
    }
    const data = await res.json();
    return mapDto(data);
}

export function readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}
