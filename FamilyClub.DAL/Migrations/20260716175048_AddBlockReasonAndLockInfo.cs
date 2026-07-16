using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace FamilyClub.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddBlockReasonAndLockInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "block_reason_id",
                table: "AspNetUsers",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "locked_at",
                table: "AspNetUsers",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "locked_by_id",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "block_reasons",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_block_reasons", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_asp_net_users_block_reason_id",
                table: "AspNetUsers",
                column: "block_reason_id");

            migrationBuilder.CreateIndex(
                name: "ix_asp_net_users_locked_by_id",
                table: "AspNetUsers",
                column: "locked_by_id");

            migrationBuilder.AddForeignKey(
                name: "fk_asp_net_users_asp_net_users_locked_by_id",
                table: "AspNetUsers",
                column: "locked_by_id",
                principalTable: "AspNetUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "fk_asp_net_users_block_reasons_block_reason_id",
                table: "AspNetUsers",
                column: "block_reason_id",
                principalTable: "block_reasons",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_asp_net_users_asp_net_users_locked_by_id",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "fk_asp_net_users_block_reasons_block_reason_id",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "block_reasons");

            migrationBuilder.DropIndex(
                name: "ix_asp_net_users_block_reason_id",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "ix_asp_net_users_locked_by_id",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "block_reason_id",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "locked_at",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "locked_by_id",
                table: "AspNetUsers");
        }
    }
}
