export const GUEST_COLUMN_KEY = "guest";

export interface MatrixColumn {
    key: string;
    label: string;
    roleName?: string;
}

export interface RoleDisplayInfo {
    title: string;
    icon: string;
    subtitle: string;
    description: string;
    capabilities: string[];
}

export interface PermissionRow {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    permissions: Record<string, boolean>;
}

export interface PermissionRowTemplate {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
}

export const PERMISSION_ROW_TEMPLATES: PermissionRowTemplate[] = [
    {
        id: "dashboard",
        title: "Робочий стіл",
        subtitle: "Перегляд дашборду",
        icon: "/images/admin_manager_layout/desktop.svg",
    },
    {
        id: "books",
        title: "Книги",
        subtitle: "Створення, редагування, видалення",
        icon: "/images/admin_manager_layout/books.svg",
    },
    {
        id: "orders",
        title: "Замовлення",
        subtitle: "Перегляд та керування замовленнями",
        icon: "/images/admin_manager_layout/orders.svg",
    },
    {
        id: "complaints",
        title: "Скарги та повернення",
        subtitle: "Розгляд скарг та повернення",
        icon: "/images/admin_manager_layout/platform_complaints.svg",
    },
    {
        id: "reviews",
        title: "Відгуки",
        subtitle: "Модерація відгуків",
        icon: "/images/admin_manager_layout/reviews.svg",
    },
    {
        id: "posts",
        title: "Пости",
        subtitle: "Створення та редагування постів",
        icon: "/images/admin_manager_layout/newspaper.svg",
    },
    {
        id: "users",
        title: "Користувачі",
        subtitle: "Перегляд та керування користувачами",
        icon: "/images/admin_manager_layout/users.svg",
    },
    {
        id: "managers",
        title: "Менеджери",
        subtitle: "Керування менеджерами та їх доступами",
        icon: "/images/admin_manager_layout/managers.svg",
    },
    {
        id: "analytics",
        title: "Аналітика",
        subtitle: "Перегляд аналітичних звітів",
        icon: "/images/admin_manager_layout/analitics.svg",
    },
    {
        id: "platform-settings",
        title: "Налаштування платформи",
        subtitle: "Зміна системних налаштувань",
        icon: "/images/admin_manager_layout/platform_settings.svg",
    },
    {
        id: "action-log",
        title: "Журнал дій",
        subtitle: "Перегляд системного журналу дій",
        icon: "/images/admin_manager_layout/actions_log.svg",
    },
];

/** Початкові права для відомих ролей (нові ролі отримують false за замовчуванням). */
const DEFAULT_PERMISSIONS: Record<string, Record<string, boolean>> = {
    Admin: {
        dashboard: true,
        books: true,
        orders: true,
        complaints: true,
        reviews: true,
        posts: true,
        users: true,
        managers: true,
        analytics: true,
        "platform-settings": true,
        "action-log": true,
    },
    Manager: {
        dashboard: true,
        books: true,
        orders: true,
        complaints: true,
        reviews: true,
        posts: true,
        users: true,
        managers: false,
        analytics: true,
        "platform-settings": false,
        "action-log": false,
    },
    User: {
        dashboard: false,
        books: false,
        orders: true,
        complaints: true,
        reviews: true,
        posts: false,
        users: false,
        managers: false,
        analytics: false,
        "platform-settings": false,
        "action-log": false,
    },
    Publisher: {
        dashboard: false,
        books: true,
        orders: false,
        complaints: false,
        reviews: false,
        posts: false,
        users: false,
        managers: false,
        analytics: false,
        "platform-settings": false,
        "action-log": false,
    },
    Author: {
        dashboard: false,
        books: true,
        orders: false,
        complaints: false,
        reviews: false,
        posts: true,
        users: false,
        managers: false,
        analytics: false,
        "platform-settings": false,
        "action-log": false,
    },
    [GUEST_COLUMN_KEY]: {
        dashboard: false,
        books: false,
        orders: false,
        complaints: true,
        reviews: true,
        posts: false,
        users: false,
        managers: false,
        analytics: false,
        "platform-settings": false,
        "action-log": false,
    },
};

export const ROLE_LABELS_UK: Record<string, string> = {
    Admin: "Адміністратор",
    Manager: "Менеджер",
    Publisher: "Видавництво",
    Author: "Автор",
    User: "Користувачі",
};

/** Порядок колонок як на макеті; Publisher/Author — завжди в матриці. */
const MATRIX_ROLE_ORDER = ["Admin", "Manager", "Publisher", "Author", "User"];

const ROLE_KEY_ALIASES: Record<string, string> = {
    admin: "Admin",
    manager: "Manager",
    user: "User",
    publisher: "Publisher",
    author: "Author",
};

/** Нормалізує назву ролі з API (напр. `user` → `User`). */
export function normalizeRoleKey(name: string): string {
    return ROLE_KEY_ALIASES[name.toLowerCase()] ?? name;
}

export const ROLE_META_BY_NAME: Record<string, RoleDisplayInfo> = {
    Admin: {
        title: "Адміністратор",
        icon: "/images/admin_manager/desktop/user-secret-solid-full 1.svg",
        subtitle: "Повний доступ до всіх функцій та налаштувань платформи.",
        description:
            "Адміністратор має повний доступ до всіх функцій платформи, включаючи керування користувачами, ролями, системними налаштуваннями та перегляд усієї аналітики.",
        capabilities: [
            "Повний доступ до всіх розділів",
            "Керування користувачами та ролями",
            "Налаштування системи та безпеки",
            "Перегляд журналу дій",
            "Експорт даних та аналітики",
        ],
    },
    Manager: {
        title: "Менеджери",
        icon: "/images/admin_manager/desktop/user-tie-solid-full 1.svg",
        subtitle: "Керування контентом, замовлення та взаємодія з користувачами.",
        description:
            "Менеджер відповідає за щоденну роботу платформи: керування книгами, замовленнями, скаргами, відгуками та взаємодію з користувачами.",
        capabilities: [
            "Керування книгами та контентом",
            "Обробка замовлень і скарг",
            "Модерація відгуків",
            "Перегляд аналітики",
            "Робота з користувачами",
        ],
    },
    User: {
        title: "Користувачі",
        icon: "/images/admin_manager/desktop/user-group-solid-full (2) 1.svg",
        subtitle: "Користуються сервісами і функціями сайту.",
        description:
            "Зареєстрований користувач може оформлювати замовлення, залишати відгуки та подавати скарги.",
        capabilities: [
            "Оформлення замовлень",
            "Залишення відгуків",
            "Подання скарг і повернень",
            "Керування профілем",
        ],
    },
};

/** Картки зверху — відомі ролі + сутності (видавництва/автори). */
export interface SummaryCardDefinition {
    key: string;
    apiRoleName?: string;
    entityCount?: "publishers" | "authors";
    title: string;
    icon: string;
    subtitle: string;
    description: string;
    capabilities: string[];
}

export const SUMMARY_CARD_DEFINITIONS: SummaryCardDefinition[] = [
    {
        key: "Admin",
        apiRoleName: "Admin",
        ...ROLE_META_BY_NAME.Admin,
    },
    {
        key: "Manager",
        apiRoleName: "Manager",
        ...ROLE_META_BY_NAME.Manager,
    },
    {
        key: "publishers",
        entityCount: "publishers",
        title: "Видавництва",
        icon: "/images/admin_manager/desktop/leanpub-brands-solid-full 1.svg",
        subtitle: "Виставляють книги на продаж.",
        description:
            "Видавництво керує каталогом своїх книг, додає нові видання та оновлює інформацію про продукти.",
        capabilities: [
            "Додавання та редагування книг",
            "Керування власним каталогом",
            "Оновлення цін і форматів",
            "Перегляд статистики продажів",
        ],
    },
    {
        key: "authors",
        entityCount: "authors",
        title: "Автор",
        icon: "/images/admin_manager/desktop/user-solid-full (4) 1.svg",
        subtitle: "Публікує книги від свого імені.",
        description:
            "Автор публікує власні книги, оновлює описи та взаємодіє з читачами через відгуки й пости.",
        capabilities: [
            "Публікація власних книг",
            "Редагування описів і метаданих",
            "Створення постів",
            "Перегляд відгуків на свої книги",
        ],
    },
    {
        key: "User",
        apiRoleName: "User",
        ...ROLE_META_BY_NAME.User,
    },
];

export function getRoleLabel(roleName: string): string {
    return ROLE_LABELS_UK[normalizeRoleKey(roleName)] ?? roleName;
}

export function getRoleDisplayInfo(roleKey: string): RoleDisplayInfo {
    if (roleKey === GUEST_COLUMN_KEY) {
        return {
            title: "Незареєстровані користувачі",
            icon: "/images/admin_manager/desktop/user-minus-solid-full 1.svg",
            subtitle: "Відвідувачі без облікового запису.",
            description:
                "Незареєстровані користувачі мають обмежений доступ до публічних функцій сайту.",
            capabilities: [
                "Перегляд каталогу",
                "Подання скарг",
                "Залишення відгуків",
            ],
        };
    }

    const summary = SUMMARY_CARD_DEFINITIONS.find(
        (c) => c.key === roleKey || c.apiRoleName === roleKey
    );
    if (roleKey === "Publisher") {
        const pub = SUMMARY_CARD_DEFINITIONS.find((c) => c.key === "publishers");
        if (pub) {
            return {
                title: pub.title,
                icon: pub.icon,
                subtitle: pub.subtitle,
                description: pub.description,
                capabilities: pub.capabilities,
            };
        }
    }
    if (roleKey === "Author") {
        const author = SUMMARY_CARD_DEFINITIONS.find((c) => c.key === "authors");
        if (author) {
            return {
                title: author.title,
                icon: author.icon,
                subtitle: author.subtitle,
                description: author.description,
                capabilities: author.capabilities,
            };
        }
    }
    if (summary) {
        return {
            title: summary.title,
            icon: summary.icon,
            subtitle: summary.subtitle,
            description: summary.description,
            capabilities: summary.capabilities,
        };
    }

    return {
        title: getRoleLabel(roleKey),
        icon: "/images/admin_manager/desktop/user-solid-full (4) 1.svg",
        subtitle: "Роль платформи FamilyClub.",
        description: `Користувачі з роллю «${getRoleLabel(roleKey)}» мають доступ згідно з матрицею прав.`,
        capabilities: ["Доступи налаштовуються адміністратором"],
    };
}

export function buildMatrixColumns(roleNames: string[]): MatrixColumn[] {
    const apiRoles = roleNames.map(normalizeRoleKey);
    const apiSet = new Set(apiRoles);
    const orderedKeys: string[] = [];

    MATRIX_ROLE_ORDER.forEach((name) => {
        if (name === "Publisher" || name === "Author" || apiSet.has(name)) {
            if (!orderedKeys.includes(name)) {
                orderedKeys.push(name);
            }
        }
    });

    apiRoles.forEach((name) => {
        if (!orderedKeys.includes(name)) {
            orderedKeys.push(name);
        }
    });

    return [
        ...orderedKeys.map((name) => ({
            key: name,
            label: getRoleLabel(name),
            roleName: apiSet.has(name) ? name : undefined,
        })),
        {
            key: GUEST_COLUMN_KEY,
            label: "Незареєстровані користувачі",
        },
    ];
}

function defaultPermission(roleKey: string, permissionId: string): boolean {
    const key = normalizeRoleKey(roleKey);
    return DEFAULT_PERMISSIONS[key]?.[permissionId] ?? false;
}

export function buildPermissionMatrix(columns: MatrixColumn[]): PermissionRow[] {
    return PERMISSION_ROW_TEMPLATES.map((row) => ({
        ...row,
        permissions: Object.fromEntries(
            columns.map((column) => [
                column.key,
                defaultPermission(column.key, row.id),
            ])
        ),
    }));
}

/** Додає нові колонки до існуючої матриці, зберігаючи зміни користувача. */
export function mergeMatrixWithColumns(
    currentRows: PermissionRow[],
    columns: MatrixColumn[]
): PermissionRow[] {
    const columnKeys = columns.map((c) => c.key);

    return PERMISSION_ROW_TEMPLATES.map((template) => {
        const existing = currentRows.find((row) => row.id === template.id);
        const permissions: Record<string, boolean> = {};
        const existingPermissions = existing
            ? Object.fromEntries(
                  Object.entries(existing.permissions).map(([key, value]) => [
                      normalizeRoleKey(key),
                      value,
                  ])
              )
            : {};

        columnKeys.forEach((key) => {
            const normalizedKey = normalizeRoleKey(key);
            if (normalizedKey in existingPermissions) {
                permissions[key] = existingPermissions[normalizedKey];
            } else {
                permissions[key] = defaultPermission(key, template.id);
            }
        });

        return { ...template, permissions };
    });
}
