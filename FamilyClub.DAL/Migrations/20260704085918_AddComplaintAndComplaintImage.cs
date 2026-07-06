using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace FamilyClub.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddComplaintAndComplaintImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "complaints",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    complaint_text = table.Column<string>(type: "text", nullable: false),
                    complaint_type = table.Column<string>(type: "text", nullable: false),
                    is_resolved = table.Column<bool>(type: "boolean", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    resolved_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    club_member_id = table.Column<string>(type: "text", nullable: false),
                    resolution_notes = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_complaints", x => x.id);
                    table.ForeignKey(
                        name: "fk_complaints_users_club_member_id",
                        column: x => x.club_member_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "complaint_images",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    image_data = table.Column<byte[]>(type: "bytea", nullable: false),
                    image_name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    content_type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    uploaded_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    complaint_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_complaint_images", x => x.id);
                    table.ForeignKey(
                        name: "fk_complaint_images_complaints_complaint_id",
                        column: x => x.complaint_id,
                        principalTable: "complaints",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_complaint_images_complaint_id",
                table: "complaint_images",
                column: "complaint_id");

            migrationBuilder.CreateIndex(
                name: "ix_complaints_club_member_id",
                table: "complaints",
                column: "club_member_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "complaint_images");

            migrationBuilder.DropTable(
                name: "complaints");
        }
    }
}
