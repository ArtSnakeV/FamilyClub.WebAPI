using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FamilyClub.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddNotificationSender : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_notification_asp_net_users_club_member_id",
                table: "notification");

            migrationBuilder.DropPrimaryKey(
                name: "pk_notification",
                table: "notification");

            migrationBuilder.RenameTable(
                name: "notification",
                newName: "notifications");

            migrationBuilder.RenameIndex(
                name: "ix_notification_club_member_id",
                table: "notifications",
                newName: "ix_notifications_club_member_id");

            migrationBuilder.AddColumn<string>(
                name: "sender_id",
                table: "notifications",
                type: "text",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "pk_notifications",
                table: "notifications",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "ix_notifications_sender_id",
                table: "notifications",
                column: "sender_id");

            migrationBuilder.AddForeignKey(
                name: "fk_notifications_asp_net_users_club_member_id",
                table: "notifications",
                column: "club_member_id",
                principalTable: "AspNetUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_notifications_asp_net_users_sender_id",
                table: "notifications",
                column: "sender_id",
                principalTable: "AspNetUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_notifications_asp_net_users_club_member_id",
                table: "notifications");

            migrationBuilder.DropForeignKey(
                name: "fk_notifications_asp_net_users_sender_id",
                table: "notifications");

            migrationBuilder.DropPrimaryKey(
                name: "pk_notifications",
                table: "notifications");

            migrationBuilder.DropIndex(
                name: "ix_notifications_sender_id",
                table: "notifications");

            migrationBuilder.DropColumn(
                name: "sender_id",
                table: "notifications");

            migrationBuilder.RenameTable(
                name: "notifications",
                newName: "notification");

            migrationBuilder.RenameIndex(
                name: "ix_notifications_club_member_id",
                table: "notification",
                newName: "ix_notification_club_member_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_notification",
                table: "notification",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_notification_asp_net_users_club_member_id",
                table: "notification",
                column: "club_member_id",
                principalTable: "AspNetUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
