using System.ComponentModel.DataAnnotations;

namespace FamilyClubLibrary;

/// <summary>
/// Єдиний архів журналу дій (старше 90 днів).
/// При створенні нового архіву попередній видаляється.
/// </summary>
public class ActionLogArchive
{
    public long Id { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>Найраніший запис у цьому архіві.</summary>
    public DateTime PeriodFromUtc { get; set; }

    /// <summary>Найпізніший запис у цьому архіві.</summary>
    public DateTime PeriodToUtc { get; set; }

    public int RecordCount { get; set; }

    /// <summary>JSON-масив архівованих записів.</summary>
    [Required]
    public string PayloadJson { get; set; } = "[]";
}
