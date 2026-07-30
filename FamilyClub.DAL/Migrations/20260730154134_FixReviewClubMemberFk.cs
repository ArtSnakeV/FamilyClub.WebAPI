using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FamilyClub.DAL.Migrations
{
    /// <inheritdoc />
    public partial class FixReviewClubMemberFk : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_reviews_users_club_member_id",
                table: "reviews");

            migrationBuilder.AlterColumn<string>(
                name: "user_id",
                table: "reviews",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            // Видаляємо тестові відгуки з битим user_id (юзер не існує)
            migrationBuilder.Sql(@"
        DELETE FROM reviews r
        WHERE r.user_id IS NOT NULL
          AND NOT EXISTS (SELECT 1 FROM ""AspNetUsers"" u WHERE u.id = r.user_id);
    ");

            migrationBuilder.CreateIndex(
                name: "ix_reviews_user_id",
                table: "reviews",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "fk_reviews_asp_net_users_club_member_id",
                table: "reviews",
                column: "club_member_id",
                principalTable: "AspNetUsers",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_reviews_users_user_id",
                table: "reviews",
                column: "user_id",
                principalTable: "AspNetUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_reviews_asp_net_users_club_member_id",
                table: "reviews");

            migrationBuilder.DropForeignKey(
                name: "fk_reviews_users_user_id",
                table: "reviews");

            migrationBuilder.DropIndex(
                name: "ix_reviews_user_id",
                table: "reviews");

            migrationBuilder.AlterColumn<string>(
                name: "user_id",
                table: "reviews",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "fk_reviews_users_club_member_id",
                table: "reviews",
                column: "club_member_id",
                principalTable: "AspNetUsers",
                principalColumn: "id");
        }
    }
}
