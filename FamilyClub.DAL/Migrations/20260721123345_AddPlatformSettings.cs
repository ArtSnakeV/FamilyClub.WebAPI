using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace FamilyClub.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddPlatformSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "platform_settings",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    company_name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    slogan = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    support_email = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    support_phone = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    company_address = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    books_per_page = table.Column<int>(type: "integer", nullable: false),
                    max_file_size_mb = table.Column<int>(type: "integer", nullable: false),
                    allowed_file_formats = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    image_resize_mode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    logo_data = table.Column<string>(type: "text", nullable: true),
                    logo_content_type = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    icon_data = table.Column<string>(type: "text", nullable: true),
                    icon_content_type = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    banner_data = table.Column<string>(type: "text", nullable: true),
                    banner_content_type = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    maintenance_mode = table.Column<bool>(type: "boolean", nullable: false),
                    maintenance_message = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_platform_settings", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "platform_settings");
        }
    }
}
