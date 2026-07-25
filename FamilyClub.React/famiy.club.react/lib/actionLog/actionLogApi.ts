import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

export type ActionLogLevel = "info" | "success" | "warning" | "error";

export type ActionLogDto = {
  id: number;
  createdAt: string;
  clubMemberId: string | null;
  userName: string | null;
  userRoleHint: string | null;
  action: string;
  module: string;
  details: string | null;
  ipAddress: string | null;
  level: string;
};

export type ActionLogPagedDto = {
  items: ActionLogDto[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export type ActionLogStatsDto = {
  total: number;
  success: number;
  warning: number;
  error: number;
  info: number;
  uniqueUsers: number;
};

export type ActionLogFilter = {
  search?: string;
  action?: string;
  module?: string;
  clubMemberId?: string;
  level?: string;
  fromUtc?: string;
  toUtc?: string;
  page?: number;
  pageSize?: number;
};

function authHeaders(): HeadersInit {
  const token = getAuthToken();
  return {
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function mapPaged(raw: Record<string, unknown>): ActionLogPagedDto {
  const itemsRaw = (raw.items ?? raw.Items ?? []) as Record<string, unknown>[];
  return {
    items: itemsRaw.map((row) => ({
      id: Number(row.id ?? row.Id ?? 0),
      createdAt: String(row.createdAt ?? row.CreatedAt ?? ""),
      clubMemberId: (row.clubMemberId ?? row.ClubMemberId ?? null) as
        | string
        | null,
      userName: (row.userName ?? row.UserName ?? null) as string | null,
      userRoleHint: (row.userRoleHint ?? row.UserRoleHint ?? null) as
        | string
        | null,
      action: String(row.action ?? row.Action ?? ""),
      module: String(row.module ?? row.Module ?? ""),
      details: (row.details ?? row.Details ?? null) as string | null,
      ipAddress: (row.ipAddress ?? row.IpAddress ?? null) as string | null,
      level: String(row.level ?? row.Level ?? "info").toLowerCase(),
    })),
    totalCount: Number(raw.totalCount ?? raw.TotalCount ?? 0),
    page: Number(raw.page ?? raw.Page ?? 1),
    pageSize: Number(raw.pageSize ?? raw.PageSize ?? 10),
  };
}

function mapStats(raw: Record<string, unknown>): ActionLogStatsDto {
  return {
    total: Number(raw.total ?? raw.Total ?? 0),
    success: Number(raw.success ?? raw.Success ?? 0),
    warning: Number(raw.warning ?? raw.Warning ?? 0),
    error: Number(raw.error ?? raw.Error ?? 0),
    info: Number(raw.info ?? raw.Info ?? 0),
    uniqueUsers: Number(raw.uniqueUsers ?? raw.UniqueUsers ?? 0),
  };
}

export async function fetchActionLogs(
  filter: ActionLogFilter = {}
): Promise<ActionLogPagedDto> {
  const params = new URLSearchParams();
  if (filter.search) params.set("search", filter.search);
  if (filter.action) params.set("action", filter.action);
  if (filter.module) params.set("module", filter.module);
  if (filter.clubMemberId) params.set("clubMemberId", filter.clubMemberId);
  if (filter.level) params.set("level", filter.level);
  if (filter.fromUtc) params.set("fromUtc", filter.fromUtc);
  if (filter.toUtc) params.set("toUtc", filter.toUtc);
  params.set("page", String(filter.page ?? 1));
  params.set("pageSize", String(filter.pageSize ?? 10));

  const res = await fetch(
    `${apiBasePath}/api/ActionLogs?${params.toString()}`,
    {
      cache: "no-store",
      headers: authHeaders(),
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to load action logs: ${res.status}`);
  }
  const data = (await res.json()) as Record<string, unknown>;
  return mapPaged(data);
}

export async function fetchActionLogStats(options?: {
  fromUtc?: string;
  toUtc?: string;
}): Promise<ActionLogStatsDto> {
  const params = new URLSearchParams();
  if (options?.fromUtc) params.set("fromUtc", options.fromUtc);
  if (options?.toUtc) params.set("toUtc", options.toUtc);
  const qs = params.toString();

  const res = await fetch(
    `${apiBasePath}/api/ActionLogs/stats${qs ? `?${qs}` : ""}`,
    {
      cache: "no-store",
      headers: authHeaders(),
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to load action log stats: ${res.status}`);
  }
  const data = (await res.json()) as Record<string, unknown>;
  return mapStats(data);
}

export type ActionLogArchiveInfo = {
  id: number;
  createdAt: string;
  periodFromUtc: string;
  periodToUtc: string;
  recordCount: number;
};

export type ActionLogArchiveResult = {
  archived: boolean;
  movedCount: number;
  retentionDays: number;
  archive: ActionLogArchiveInfo | null;
  message: string;
};

function mapArchiveInfo(raw: Record<string, unknown>): ActionLogArchiveInfo {
  return {
    id: Number(raw.id ?? raw.Id ?? 0),
    createdAt: String(raw.createdAt ?? raw.CreatedAt ?? ""),
    periodFromUtc: String(raw.periodFromUtc ?? raw.PeriodFromUtc ?? ""),
    periodToUtc: String(raw.periodToUtc ?? raw.PeriodToUtc ?? ""),
    recordCount: Number(raw.recordCount ?? raw.RecordCount ?? 0),
  };
}

export async function fetchActionLogArchiveInfo(): Promise<ActionLogArchiveInfo | null> {
  const res = await fetch(`${apiBasePath}/api/ActionLogs/archive`, {
    cache: "no-store",
    headers: authHeaders(),
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to load archive info: ${res.status}`);
  }
  const data = (await res.json()) as Record<string, unknown>;
  return mapArchiveInfo(data);
}

export async function runActionLogArchive(): Promise<ActionLogArchiveResult> {
  const token = getAuthToken();
  const res = await fetch(`${apiBasePath}/api/ActionLogs/archive`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to run archive: ${res.status}`);
  }
  const raw = (await res.json()) as Record<string, unknown>;
  const archiveRaw = (raw.archive ?? raw.Archive ?? null) as Record<
    string,
    unknown
  > | null;
  return {
    archived: Boolean(raw.archived ?? raw.Archived ?? false),
    movedCount: Number(raw.movedCount ?? raw.MovedCount ?? 0),
    retentionDays: Number(raw.retentionDays ?? raw.RetentionDays ?? 90),
    archive: archiveRaw ? mapArchiveInfo(archiveRaw) : null,
    message: String(raw.message ?? raw.Message ?? ""),
  };
}

export function getActionLogArchiveDownloadUrl(): string {
  return `${apiBasePath}/api/ActionLogs/archive/download`;
}

export async function downloadActionLogArchive(): Promise<void> {
  const res = await fetch(getActionLogArchiveDownloadUrl(), {
    headers: authHeaders(),
  });
  if (!res.ok) {
    throw new Error(`Failed to download archive: ${res.status}`);
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `action-log-archive-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export const ACTION_LABELS_UK: Record<string, string> = {
  Created: "Створено",
  Deleted: "Видалено",
  Blocked: "Заблоковано",
  Unblocked: "Розблоковано",
  RoleAssigned: "Призначено ролі",
  RoleRemoved: "Знято ролі",
  PermissionsUpdated: "Оновлено права",
  MaintenanceEnabled: "Увімкнено обслуговування",
  MaintenanceDisabled: "Вимкнено обслуговування",
};

export const MODULE_LABELS_UK: Record<string, string> = {
  Books: "Книги",
  Authors: "Автори",
  Users: "Користувачі",
  Managers: "Менеджери",
  Roles: "Ролі",
  Access: "Доступи",
  Platform: "Платформа",
};

export function formatLogDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function actionTone(
  action: string
): "success" | "warning" | "neutral" {
  if (action === "Deleted" || action === "Blocked" || action === "MaintenanceEnabled") {
    return "warning";
  }
  if (
    action === "Created" ||
    action === "Unblocked" ||
    action === "RoleAssigned" ||
    action === "MaintenanceDisabled"
  ) {
    return "success";
  }
  return "neutral";
}
