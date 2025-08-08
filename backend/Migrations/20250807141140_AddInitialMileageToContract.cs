using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JAPChallenge.Migrations
{
    /// <inheritdoc />
    public partial class AddInitialMileageToContract : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InitialMileage",
                table: "Contracts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InitialMileage",
                table: "Contracts");
        }
    }
}
