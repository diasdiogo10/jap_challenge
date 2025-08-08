const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getClients() {
	try {
		const res = await fetch(`${base_url}/api/Clients`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) throw new Error(res.statusText);

		return await res.json();
	} catch (err: any) {
		throw new Error(err.message);
	}
}