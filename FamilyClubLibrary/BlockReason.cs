using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FamilyClubLibrary
{
    public class BlockReason
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty; // Спам, Образи, Фейкові відгуки, Порушення правил, Інше

        public string? Description { get; set; }

        public List<ClubMember> ClubMembers { get; set; } = new();
    }
}
