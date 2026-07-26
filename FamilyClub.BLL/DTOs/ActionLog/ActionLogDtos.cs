using System.ComponentModel.DataAnnotations;

namespace FamilyClub.BLL.DTOs.ActionLog;

public class ActionLogDto
{
    public long Id { get; set; }
    public DateTime CreatedAt { get; set; }

    public string? ClubMemberId { get; set; }
    public string? UserName { get; set; }
    public string? UserRoleHint { get; set; }

    public string Action { get; set; } = string.Empty;
    public string Module { get; set; } = string.Empty;
    public string? Details { get; set; }
    public string? IpAddress { get; set; }
    public string Level { get; set; } = "info";
}

public class ActionLogFilterDto
{
    public string? Search { get; set; }
    public string? Action { get; set; }
    public string? Module { get; set; }
    public string? ClubMemberId { get; set; }
    public string? Level { get; set; }
    public DateTime? FromUtc { get; set; }
    public DateTime? ToUtc { get; set; }

    [Range(1, int.MaxValue)]
    public int Page { get; set; } = 1;

    [Range(1, 100)]
    public int PageSize { get; set; } = 10;
}

public class ActionLogPagedDto
{
    public IReadOnlyList<ActionLogDto> Items { get; set; } = Array.Empty<ActionLogDto>();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
}

public class ActionLogStatsDto
{
    public int Total { get; set; }
    public int Success { get; set; }
    public int Warning { get; set; }
    public int Error { get; set; }
    public int Info { get; set; }
    public int UniqueUsers { get; set; }
}

public class ActionLogArchiveInfoDto
{
    public long Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime PeriodFromUtc { get; set; }
    public DateTime PeriodToUtc { get; set; }
    public int RecordCount { get; set; }
}

public class ActionLogArchiveResultDto
{
    public bool Archived { get; set; }
    public int MovedCount { get; set; }
    public int RetentionDays { get; set; } = ActionLogCodes.RetentionDays;
    public ActionLogArchiveInfoDto? Archive { get; set; }
    public string Message { get; set; } = string.Empty;
}

/// <summary>Стабільні коди для Module / Action / Level.</summary>
public static class ActionLogCodes
{
    /// <summary>Скільки днів тримати записи в «живому» журналі.</summary>
    public const int RetentionDays = 90;

    public static class Modules
    {
        public const string Books = "Books";
        public const string Authors = "Authors";
        public const string Users = "Users";
        public const string Managers = "Managers";
        public const string Roles = "Roles";
        public const string Access = "Access";
        public const string Platform = "Platform";
    }

    public static class Actions
    {
        public const string Created = "Created";
        public const string Deleted = "Deleted";
        public const string Blocked = "Blocked";
        public const string Unblocked = "Unblocked";
        public const string RoleAssigned = "RoleAssigned";
        public const string RoleRemoved = "RoleRemoved";
        public const string PermissionsUpdated = "PermissionsUpdated";
        public const string MaintenanceEnabled = "MaintenanceEnabled";
        public const string MaintenanceDisabled = "MaintenanceDisabled";
    }

    public static class Levels
    {
        public const string Info = "info";
        public const string Success = "success";
        public const string Warning = "warning";
        public const string Error = "error";
    }
}
