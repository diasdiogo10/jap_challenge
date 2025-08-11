const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getClients() {
	try {
		const res = await fetch(`${base_url}/api/Clients`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) throw new Error(res.statusText);

		return await res.json();
	} catch (err: any) {
		throw new Error(err.message);
	}
}

export async function getClient(id: any) {
	try {
		const res = await fetch(`${base_url}/api/Clients/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) throw new Error(res.statusText);

		return await res.json();
	} catch (err: any) {
		throw new Error(err.message);
	}
}

export async function postClient(client: any) {
	try {
		const res = await fetch(`${base_url}/api/Clients`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(client),
		});

		if (!res.ok) throw new Error(res.statusText);

		console.log(res.text());

		return await res.json();
	} catch (err: any) {
		throw new Error(err.message);
	}
}

export async function putClient(id: any, client: any) {
	try {
		const res = await fetch(`${base_url}/api/Clients/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(client),
		});

		if (!res.ok) throw new Error(res.statusText);

		return await res.json();
	} catch (err: any) {
		throw new Error(err.message);
	}
}

export async function deleteClient(id: any) {
	try {
		const res = await fetch(`${base_url}/api/Clients/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) throw new Error(res.statusText);

		return await res.json();
	} catch (err: any) {
		throw new Error(err.message);
	}
}
