using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FamilyClub.BLL.DTOs.ClubMember
{
    public class LockUserDto
    {
        [Required]
        public int BlockReasonId { get; set; }

        // null = заблоковано назавжди; вказана дата = тимчасово (до цієї дати)
        public DateTimeOffset? LockoutEnd { get; set; }
        [Required, MaxLength(500)]
        public string Comment { get; set; } = string.Empty;
    }
}
