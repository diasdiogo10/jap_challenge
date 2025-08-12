const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getContracts() {
	try {
		const res = await fetch(`${base_url}/api/Contracts`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}));
			throw new Error(errorData.message || res.statusText);
		}

		return await res.json();
	} catch (err: any) {
		throw new Error(err.message);
	}
}

export async function getContract(id: any) {
	try {
		const res = await fetch(`${base_url}/api/Contracts/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}));
			throw new Error(errorData.message || res.statusText);
		}

		return await res.json();
	} catch (err: any) {
		throw new Error(err.message);
	}
}

export async function postContract(client: any) {
	try {
		const res = await fetch(`${base_url}/api/Contracts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(client),
		});

		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}));
			throw new Error(errorData.message || res.statusText);
		}

		return await res.json();
	} catch (err: any) {
		throw new Error(err.message);
	}
}
