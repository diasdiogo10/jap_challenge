using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JAPChallenge.Migrations
{
    /// <inheritdoc />
    public partial class AddPricePerDayCapacityTransmissionTypeToVehicle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Capacity",
                table: "Vehicles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "PricePerDay",
                table: "Vehicles",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "TransmissionType",
                table: "Vehicles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Capacity",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "PricePerDay",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "TransmissionType",
                table: "Vehicles");
        }
    }
}
