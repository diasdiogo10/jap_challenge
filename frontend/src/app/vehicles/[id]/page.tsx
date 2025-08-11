import { EditVehicleForm } from "@/components/forms/vehicle-forms";
import VehicleMenu from "@/components/menus/vehicle-menu";

export default async function UpdateVehicle({ params }: { params: Promise<{ id: string }> }) {
	const resolvedParams = await params;

	return (
		<>
			<h1 className="text-2xl font-semibold mb-8">Update vehicle</h1>
			<VehicleMenu vehicleId={String(resolvedParams.id)} />
			<EditVehicleForm vehicleId={String(resolvedParams.id)} />
		</>
	);
}
