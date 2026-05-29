using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace FamilyClub.DAL.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAgeRestriction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "age_restriction",
                table: "products");

            migrationBuilder.CreateTable(
                name: "age_restrictions",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    code = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_age_restrictions", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ProductsAgeRestrictions",
                columns: table => new
                {
                    age_restrictions_id = table.Column<int>(type: "integer", nullable: false),
                    products_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_products_age_restrictions", x => new { x.age_restrictions_id, x.products_id });
                    table.ForeignKey(
                        name: "fk_products_age_restrictions_age_restrictions_age_restrictions_id",
                        column: x => x.age_restrictions_id,
                        principalTable: "age_restrictions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_products_age_restrictions_products_products_id",
                        column: x => x.products_id,
                        principalTable: "products",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_products_age_restrictions_products_id",
                table: "ProductsAgeRestrictions",
                column: "products_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductsAgeRestrictions");

            migrationBuilder.DropTable(
                name: "age_restrictions");

            migrationBuilder.AddColumn<int>(
                name: "age_restriction",
                table: "products",
                type: "integer",
                nullable: true);
        }
    }
}
