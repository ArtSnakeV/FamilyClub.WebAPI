using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FamilyClub.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddFormatToCartItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_cart_items_cart_id_product_id",
                table: "cart_items");

            migrationBuilder.AddColumn<string>(
                name: "format",
                table: "cart_items",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_cart_items_cart_id_product_id_format",
                table: "cart_items",
                columns: new[] { "cart_id", "product_id", "format" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_cart_items_cart_id_product_id_format",
                table: "cart_items");

            migrationBuilder.DropColumn(
                name: "format",
                table: "cart_items");

            migrationBuilder.CreateIndex(
                name: "ix_cart_items_cart_id_product_id",
                table: "cart_items",
                columns: new[] { "cart_id", "product_id" },
                unique: true);
        }
    }
}
