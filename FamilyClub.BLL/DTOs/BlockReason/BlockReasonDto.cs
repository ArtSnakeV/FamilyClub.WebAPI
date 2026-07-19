using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FamilyClub.BLL.DTOs.BlockReason
{
    public class BlockReasonDto
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty; // Спам, Образи, Фейкові відгуки, Порушення правил, Інше

        public string? Description { get; set; }

    }
}
