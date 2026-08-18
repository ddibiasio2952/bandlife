using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BandLife.Migrations
{
    /// <inheritdoc />
    public partial class AddBankAndPaycheck : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BankAccount",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "LastPaycheckAt",
                table: "AspNetUsers",
                type: "datetimeoffset",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BankAccount",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LastPaycheckAt",
                table: "AspNetUsers");
        }
    }
}
