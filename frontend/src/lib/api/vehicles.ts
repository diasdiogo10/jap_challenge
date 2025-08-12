const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getVehicles() {
	try {
		const res = await fetch(`${base_url}/api/Vehicles`, {
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

export async function getVehicle(id: any) {
	try {
		const res = await fetch(`${base_url}/api/Vehicles/${id}`, {
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

export async function postVehicle(client: any) {
	try {
		const res = await fetch(`${base_url}/api/Vehicles`, {
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

export async function putVehicle(id: any, client: any) {
	try {
		const res = await fetch(`${base_url}/api/Vehicle/${id}`, {
			method: "PUT",
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

export async function deleteVehicle(id: any) {
	try {
		const res = await fetch(`${base_url}/api/Vehicles/${id}`, {
			method: "DELETE",
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
