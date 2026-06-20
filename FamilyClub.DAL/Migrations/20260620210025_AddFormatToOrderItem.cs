using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FamilyClub.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddFormatToOrderItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_order_items_order_id_product_id",
                table: "order_items");

            migrationBuilder.AddColumn<string>(
                name: "format",
                table: "order_items",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_order_items_order_id_product_id_format",
                table: "order_items",
                columns: new[] { "order_id", "product_id", "format" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_order_items_order_id_product_id_format",
                table: "order_items");

            migrationBuilder.DropColumn(
                name: "format",
                table: "order_items");

            migrationBuilder.CreateIndex(
                name: "ix_order_items_order_id_product_id",
                table: "order_items",
                columns: new[] { "order_id", "product_id" },
                unique: true);
        }
    }
}
