using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FamilyClub.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddMemberFavoriteCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MemberFavoriteCategories",
                columns: table => new
                {
                    favorite_categories_id = table.Column<int>(type: "integer", nullable: false),
                    favorited_by_id = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_member_favorite_categories", x => new { x.favorite_categories_id, x.favorited_by_id });
                    table.ForeignKey(
                        name: "fk_member_favorite_categories_asp_net_users_favorited_by_id",
                        column: x => x.favorited_by_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_member_favorite_categories_categories_favorite_categories_id",
                        column: x => x.favorite_categories_id,
                        principalTable: "categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_member_favorite_categories_favorited_by_id",
                table: "MemberFavoriteCategories",
                column: "favorited_by_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MemberFavoriteCategories");
        }
    }
}
