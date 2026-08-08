using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BandLife.Migrations
{
    /// <inheritdoc />
    public partial class _080820260741 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BandIncome",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Job",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "JobIncome",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Listeners",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Popularity",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Releases",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "BandIncome",
                table: "Events",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Job",
                table: "Events",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "JobIncome",
                table: "Events",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Listeners",
                table: "Events",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Members",
                table: "Events",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Popularity",
                table: "Events",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BandIncome",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Job",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "JobIncome",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Listeners",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Popularity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Releases",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BandIncome",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Job",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "JobIncome",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Listeners",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Members",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Popularity",
                table: "Events");
        }
    }
}
