using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FamilyClub.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddEnumProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_notification_users_club_member_id",
                table: "notification");

            migrationBuilder.DropColumn(
                name: "age_restrictions",
                table: "products");

            migrationBuilder.DropColumn(
                name: "format",
                table: "products");

            migrationBuilder.AddColumn<int>(
                name: "age_restriction",
                table: "products",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "availability",
                table: "products",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "book_size",
                table: "products",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "cover_type",
                table: "products",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "product_format",
                table: "products",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "quantity_in_stock",
                table: "products",
                type: "integer",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "fk_notification_asp_net_users_club_member_id",
                table: "notification",
                column: "club_member_id",
                principalTable: "AspNetUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_notification_asp_net_users_club_member_id",
                table: "notification");

            migrationBuilder.DropColumn(
                name: "age_restriction",
                table: "products");

            migrationBuilder.DropColumn(
                name: "availability",
                table: "products");

            migrationBuilder.DropColumn(
                name: "book_size",
                table: "products");

            migrationBuilder.DropColumn(
                name: "cover_type",
                table: "products");

            migrationBuilder.DropColumn(
                name: "product_format",
                table: "products");

            migrationBuilder.DropColumn(
                name: "quantity_in_stock",
                table: "products");

            migrationBuilder.AddColumn<string>(
                name: "age_restrictions",
                table: "products",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "format",
                table: "products",
                type: "text",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "fk_notification_users_club_member_id",
                table: "notification",
                column: "club_member_id",
                principalTable: "AspNetUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
