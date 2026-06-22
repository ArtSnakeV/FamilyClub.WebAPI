using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FamilyClub.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddFavoriteProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MemberFavoriteProducts",
                columns: table => new
                {
                    favorite_products_id = table.Column<int>(type: "integer", nullable: false),
                    favorited_by_id = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_member_favorite_products", x => new { x.favorite_products_id, x.favorited_by_id });
                    table.ForeignKey(
                        name: "fk_member_favorite_products_asp_net_users_favorited_by_id",
                        column: x => x.favorited_by_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_member_favorite_products_products_favorite_products_id",
                        column: x => x.favorite_products_id,
                        principalTable: "products",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_member_favorite_products_favorited_by_id",
                table: "MemberFavoriteProducts",
                column: "favorited_by_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MemberFavoriteProducts");
        }
    }
}
