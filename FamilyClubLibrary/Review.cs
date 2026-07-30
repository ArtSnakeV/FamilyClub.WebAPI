using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FamilyClubLibrary
{
    public class Review
    {
        public int Id { get; set; }

        public int ProductId { get; set; } // Foreign key to Product
        public Product Product { get; set; } = default!; // Added naviagation

        //public required string UserId { get; set; }
        public string? UserId { get; set; }   // nullable в БД — переживає видалення юзера

        [ForeignKey(nameof(UserId))]
        //public ClubMember ClubMember { get; set; } = default!; // Added navigation
        public ClubMember? ClubMember { get; set; }

        [Range(0, 5)]
        public double Rating { get; set; } = 5; // Maximum by default

        public string? Comment { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Default to now

        public bool Approved { get; set; } = false; // Field to make sure that `Review` was checked by Admin
    }
}
