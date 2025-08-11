import { EditClientForm } from "@/components/forms/client-forms";
import ClientMenu from "@/components/menus/client-menu";

export default async function UpdateCliente({ params }: { params: Promise<{ id: string }> }) {
	const resolvedParams = await params;

	return (
		<>
			<h1 className="text-2xl font-semibold mb-8">Update client</h1>
			<ClientMenu clientId={String(resolvedParams.id)} />
			<EditClientForm clientId={String(resolvedParams.id)} />
		</>
	);
}
