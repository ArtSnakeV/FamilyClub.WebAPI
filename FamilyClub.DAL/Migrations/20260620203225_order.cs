using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FamilyClub.DAL.Migrations
{
    /// <inheritdoc />
    public partial class order : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_orders_users_club_member_id",
                table: "orders");

            migrationBuilder.DropIndex(
                name: "ix_orders_club_member_id",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "club_member_id",
                table: "orders");

            migrationBuilder.AlterColumn<string>(
                name: "user_id",
                table: "orders",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateIndex(
                name: "ix_orders_user_id",
                table: "orders",
                column: "user_id");

            migrationBuilder.Sql("DELETE FROM order_items;");
            migrationBuilder.Sql("DELETE FROM orders;");

            migrationBuilder.AddForeignKey(
                name: "fk_orders_asp_net_users_user_id",
                table: "orders",
                column: "user_id",
                principalTable: "AspNetUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_orders_asp_net_users_user_id",
                table: "orders");

            migrationBuilder.DropIndex(
                name: "ix_orders_user_id",
                table: "orders");

            migrationBuilder.AlterColumn<int>(
                name: "user_id",
                table: "orders",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "club_member_id",
                table: "orders",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_orders_club_member_id",
                table: "orders",
                column: "club_member_id");

            migrationBuilder.AddForeignKey(
                name: "fk_orders_users_club_member_id",
                table: "orders",
                column: "club_member_id",
                principalTable: "AspNetUsers",
                principalColumn: "id");
        }
    }
}
