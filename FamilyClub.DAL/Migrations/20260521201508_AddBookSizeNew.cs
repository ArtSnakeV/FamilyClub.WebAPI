using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace FamilyClub.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddBookSizeNew : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "book_size",
                table: "products");

            migrationBuilder.CreateTable(
                name: "book_sizes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    code = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_book_sizes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ProductBookSizes",
                columns: table => new
                {
                    book_sizes_id = table.Column<int>(type: "integer", nullable: false),
                    products_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_product_book_sizes", x => new { x.book_sizes_id, x.products_id });
                    table.ForeignKey(
                        name: "fk_product_book_sizes_book_sizes_book_sizes_id",
                        column: x => x.book_sizes_id,
                        principalTable: "book_sizes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_product_book_sizes_products_products_id",
                        column: x => x.products_id,
                        principalTable: "products",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_product_book_sizes_products_id",
                table: "ProductBookSizes",
                column: "products_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductBookSizes");

            migrationBuilder.DropTable(
                name: "book_sizes");

            migrationBuilder.AddColumn<int>(
                name: "book_size",
                table: "products",
                type: "integer",
                nullable: true);
        }
    }
}
