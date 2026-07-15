using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FamilyClub.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddNameToPromotion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "promotions",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "name",
                table: "promotions");
        }
    }
}
