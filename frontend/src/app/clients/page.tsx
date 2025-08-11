import ClientsTable from "@/components/tables/clients-table";
import ClientsMenu from "@/components/menus/clients-menu";

export default function Clients() {
	return (
		<>
			<ClientsMenu />
			<ClientsTable />
		</>
	);
}
