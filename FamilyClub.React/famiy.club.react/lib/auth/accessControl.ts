import {
    DEFAULT_PERMISSIONS,
    GUEST_COLUMN_KEY,
    normalizeRoleKey,
    PermissionRow,
    PERMISSION_ROW_TEMPLATES,
} from "@/app/(admin-site)/admin/roles/data/rolesData";

export type PermissionId =
    | "dashboard"
    | "books"
    | "orders"
    | "complaints"
    | "reviews"
    | "posts"
    | "users"
    | "managers"
    | "analytics"
    | "platform-settings"
    | "action-log";

/** Збережена матриця: permissionId → roleKey → allowed */
export type AccessMatrixMap = Record<string, Record<string, boolean>>;

const STORAGE_KEY = "familyclub.accessMatrix.v1";
const MATRIX_CHANGED_EVENT = "access-matrix-change";

export const ALL_PERMISSION_IDS: PermissionId[] =
    PERMISSION_ROW_TEMPLATES.map((row) => row.id as PermissionId);

/**
 * Відповідність шляхів адмінки до рядків матриці.
 * `null` — доступ завжди (напр. особисті налаштування).
 */
const ROUTE_PERMISSION_RULES: Array<{
    prefix: string;
    permission: PermissionId | null;
}> = [
    { prefix: "/admin/desktop", permission: "dashboard" },
    { prefix: "/admin/books", permission: "books" },
    { prefix: "/admin/orders", permission: "orders" },
    { prefix: "/admin/complaints", permission: "complaints" },
    { prefix: "/admin/reviews", permission: "reviews" },
    { prefix: "/admin/newspaper", permission: "posts" },
    { prefix: "/admin/users", permission: "users" },
    { prefix: "/admin/managers", permission: "managers" },
    { prefix: "/admin/analytics", permission: "analytics" },
    { prefix: "/admin/platform-settings", permission: "platform-settings" },
    { prefix: "/admin/system", permission: "platform-settings" },
    { prefix: "/admin/roles", permission: "platform-settings" },
    { prefix: "/admin/logs", permission: "action-log" },
    { prefix: "/admin/my-settings", permission: null },
];

export function buildDefaultAccessMatrix(): AccessMatrixMap {
    const matrix: AccessMatrixMap = {};
    for (const row of PERMISSION_ROW_TEMPLATES) {
        matrix[row.id] = {};
        for (const [roleKey, perms] of Object.entries(DEFAULT_PERMISSIONS)) {
            matrix[row.id][roleKey] = perms[row.id] ?? false;
        }
    }
    return matrix;
}

export function permissionRowsToMatrix(rows: PermissionRow[]): AccessMatrixMap {
    const matrix: AccessMatrixMap = {};
    for (const row of rows) {
        matrix[row.id] = {};
        for (const [roleKey, allowed] of Object.entries(row.permissions)) {
            matrix[row.id][normalizeRoleKey(roleKey)] = Boolean(allowed);
        }
    }
    return matrix;
}

export function applyMatrixToPermissionRows(
    rows: PermissionRow[],
    matrix: AccessMatrixMap
): PermissionRow[] {
    return rows.map((row) => {
        const saved = matrix[row.id] ?? {};
        const permissions: Record<string, boolean> = {};
        for (const [roleKey, allowed] of Object.entries(row.permissions)) {
            const normalized = normalizeRoleKey(roleKey);
            permissions[roleKey] =
                normalized in saved
                    ? Boolean(saved[normalized])
                    : Boolean(allowed);
        }
        return { ...row, permissions };
    });
}

export function loadAccessMatrix(): AccessMatrixMap {
    const defaults = buildDefaultAccessMatrix();
    if (typeof window === "undefined") return defaults;

    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaults;
        const parsed = JSON.parse(raw) as AccessMatrixMap;
        if (!parsed || typeof parsed !== "object") return defaults;

        // Merge: defaults + saved (saved wins)
        const merged = buildDefaultAccessMatrix();
        for (const [permId, roleMap] of Object.entries(parsed)) {
            if (!merged[permId]) merged[permId] = {};
            for (const [roleKey, allowed] of Object.entries(roleMap ?? {})) {
                merged[permId][normalizeRoleKey(roleKey)] = Boolean(allowed);
            }
        }
        return merged;
    } catch {
        return defaults;
    }
}

export function saveAccessMatrix(matrix: AccessMatrixMap): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matrix));
    window.dispatchEvent(new Event(MATRIX_CHANGED_EVENT));
}

export function saveAccessMatrixFromRows(rows: PermissionRow[]): void {
    saveAccessMatrix(permissionRowsToMatrix(rows));
}

export function subscribeAccessMatrixChange(handler: () => void): () => void {
    if (typeof window === "undefined") return () => {};
    window.addEventListener(MATRIX_CHANGED_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
        window.removeEventListener(MATRIX_CHANGED_EVENT, handler);
        window.removeEventListener("storage", handler);
    };
}

/**
 * Чи дозволено право для набору ролей користувача.
 * Логіка OR: достатньо однієї ролі з дозволом.
 * Без ролей — колонка guest.
 */
export function hasPermission(
    userRoles: string[] | null | undefined,
    permissionId: PermissionId | string,
    matrix: AccessMatrixMap = loadAccessMatrix()
): boolean {
    const roleKeys =
        userRoles && userRoles.length > 0
            ? userRoles.map(normalizeRoleKey)
            : [GUEST_COLUMN_KEY];

    const row = matrix[permissionId] ?? {};

    return roleKeys.some((roleKey) => {
        if (roleKey in row) return Boolean(row[roleKey]);
        return DEFAULT_PERMISSIONS[roleKey]?.[permissionId] ?? false;
    });
}

export function getRequiredPermissionForPath(
    pathname: string
): PermissionId | null | undefined {
    // undefined = шлях не з адмінки / не відомий
    if (!pathname.startsWith("/admin")) return undefined;

    // Точніші (довші) префікси першими
    const sorted = [...ROUTE_PERMISSION_RULES].sort(
        (a, b) => b.prefix.length - a.prefix.length
    );

    for (const rule of sorted) {
        if (
            pathname === rule.prefix ||
            pathname.startsWith(`${rule.prefix}/`)
        ) {
            return rule.permission;
        }
    }

    // /admin без підшляху або невідомий розділ — потрібен хоча б dashboard
    if (pathname === "/admin" || pathname === "/admin/") {
        return "dashboard";
    }

    return "dashboard";
}

export function canAccessPath(
    pathname: string,
    userRoles: string[] | null | undefined,
    matrix?: AccessMatrixMap
): boolean {
    const required = getRequiredPermissionForPath(pathname);
    if (required === undefined) return true;
    if (required === null) return true;
    return hasPermission(userRoles, required, matrix ?? loadAccessMatrix());
}

export function getFirstAllowedAdminPath(
    userRoles: string[] | null | undefined,
    matrix?: AccessMatrixMap
): string {
    const m = matrix ?? loadAccessMatrix();
    const candidates: Array<{ path: string; permission: PermissionId }> = [
        { path: "/admin/desktop", permission: "dashboard" },
        { path: "/admin/books", permission: "books" },
        { path: "/admin/orders", permission: "orders" },
        { path: "/admin/users", permission: "users" },
        { path: "/admin/my-settings", permission: "dashboard" },
    ];

    for (const c of candidates) {
        if (hasPermission(userRoles, c.permission, m)) return c.path;
    }

    // my-settings завжди доступний за правилами маршрутів
    return "/admin/my-settings";
}

export type SidebarNavPermission = PermissionId | null;

export const SIDEBAR_ITEMS: Array<{
    href: string;
    label: string;
    icon: string;
    permission: SidebarNavPermission;
    match: (pathname: string) => boolean;
}> = [
    {
        href: "/admin/desktop",
        label: "Робочий стіл",
        icon: "/images/admin_manager_layout/desktop.svg",
        permission: "dashboard",
        match: (p) => p === "/admin/desktop" || p.startsWith("/admin/desktop/"),
    },
    {
        href: "/admin/managers",
        label: "Менеджери",
        icon: "/images/admin_manager_layout/managers.svg",
        permission: "managers",
        match: (p) =>
            p === "/admin/managers" || p.startsWith("/admin/managers/"),
    },
    {
        href: "/admin/users",
        label: "Користувачі",
        icon: "/images/admin_manager_layout/users.svg",
        permission: "users",
        match: (p) => p === "/admin/users" || p.startsWith("/admin/users/"),
    },
    {
        href: "/admin/roles",
        label: "Ролі та доступи",
        icon: "/images/admin_manager_layout/roles.svg",
        permission: "platform-settings",
        match: (p) => p === "/admin/roles" || p.startsWith("/admin/roles/"),
    },
    {
        href: "/admin/analytics",
        label: "Аналітика",
        icon: "/images/admin_manager_layout/analitics.svg",
        permission: "analytics",
        match: (p) =>
            p === "/admin/analytics" || p.startsWith("/admin/analytics/"),
    },
    {
        href: "/admin/system",
        label: "Система і безпека",
        icon: "/images/admin_manager_layout/system_and_safety.svg",
        permission: "platform-settings",
        match: (p) => p === "/admin/system" || p.startsWith("/admin/system/"),
    },
    {
        href: "/admin/complaints",
        label: "Скарги платформи",
        icon: "/images/admin_manager_layout/platform_complaints.svg",
        permission: "complaints",
        match: (p) =>
            p === "/admin/complaints" || p.startsWith("/admin/complaints/"),
    },
    {
        href: "/admin/platform-settings",
        label: "Налаштування платформи",
        icon: "/images/admin_manager_layout/platform_settings.svg",
        permission: "platform-settings",
        match: (p) =>
            p === "/admin/platform-settings" ||
            p.startsWith("/admin/platform-settings/"),
    },
    {
        href: "/admin/logs",
        label: "Журнал дій",
        icon: "/images/admin_manager_layout/actions_log.svg",
        permission: "action-log",
        match: (p) => p === "/admin/logs" || p.startsWith("/admin/logs/"),
    },
    {
        href: "/admin/my-settings",
        label: "Мої налаштування",
        icon: "/images/admin_manager_layout/my_settings.svg",
        permission: null,
        match: (p) =>
            p === "/admin/my-settings" || p.startsWith("/admin/my-settings/"),
    },
    {
        href: "/admin/books",
        label: "Книги",
        icon: "/images/admin_manager_layout/books.svg",
        permission: "books",
        match: (p) => p === "/admin/books" || p.startsWith("/admin/books/"),
    },
    {
        href: "/admin/orders",
        label: "Замовлення",
        icon: "/images/admin_manager_layout/orders.svg",
        permission: "orders",
        match: (p) => p === "/admin/orders" || p.startsWith("/admin/orders/"),
    },
    {
        href: "/admin/reviews",
        label: "Відгуки",
        icon: "/images/admin_manager_layout/reviews.svg",
        permission: "reviews",
        match: (p) => p === "/admin/reviews" || p.startsWith("/admin/reviews/"),
    },
];
