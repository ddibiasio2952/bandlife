using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BandLife.Migrations
{
    /// <inheritdoc />
    public partial class AddIdentityRevision : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AcceptedEventId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "EventAcceptedAt",
                table: "AspNetUsers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AcceptedEventId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EventAcceptedAt",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: true);
        }
    }
}
