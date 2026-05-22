using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FamilyClub.DAL.Migrations
{
    /// <inheritdoc />
    public partial class ClubMember_update2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "image_name",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "image_data",
                table: "AspNetUsers",
                newName: "avatar_data");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "avatar_data",
                table: "AspNetUsers",
                newName: "image_data");

            migrationBuilder.AddColumn<string>(
                name: "image_name",
                table: "AspNetUsers",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true);
        }
    }
}
