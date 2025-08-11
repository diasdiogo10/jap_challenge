"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RefreshCw, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getContracts } from "@/lib/api/contracts";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Contract {
	id: string;
	startDate: string;
	endDate: string;
	initialMileage: string;
	total: string;
}

export default function ContractsGrid() {
	const router = useRouter();

	const [contracts, setContracts] = useState<Contract[]>([]);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);

	const fetchContracts = () => {
		setLoading(true);
		getContracts()
			.then((res) => setContracts(res))
			.catch((err) => toast.error(err.message, { duration: 12000 }))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		fetchContracts();
	}, []);

	const filteredContracts = contracts.filter((contract) => [contract.startDate, contract.endDate].some((field) => field?.toLowerCase().includes(search.toLowerCase())));

	return (
		<>
			<div className="flex justify-between items-center gap-2 mb-8">
				<div className="flex items-center gap-2 flex-1">
					<Search className="w-5" />
					<Input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full max-w-md" />
					<Button variant="outline" onClick={fetchContracts}>
						<RefreshCw className="mr-2 h-4 w-4" />
						<span>Update</span>
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{loading ? (
					Array(6)
						.fill(0)
						.map((_, idx) => (
							<Card key={idx} className={idx % 2 === 0 ? "bg-muted/40" : "bg-muted/0"}>
								<CardHeader>
									<CardTitle>
										<Skeleton className="h-6 w-3/4" />
									</CardTitle>
									<CardDescription>
										<Skeleton className="h-4 w-full" />
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Skeleton className="h-40 w-full" />
								</CardContent>
								<CardFooter>
									<Skeleton className="h-10 w-full" />
								</CardFooter>
							</Card>
						))
				) : filteredContracts.length > 0 ? (
					filteredContracts.map((contract, idx) => (
						<Card key={contract.id} className={idx % 2 === 0 ? "bg-muted/40 hover:bg-muted" : "bg-muted/0 hover:bg-muted"}>
							<CardHeader>
								<CardTitle>{`${contract.startDate} ${contract.endDate}`}</CardTitle>
								<CardDescription>{contract.initialMileage}</CardDescription>
							</CardHeader>
							<CardContent className="text-sm">
								<p>Total: {contract.total}</p>
							</CardContent>
							<CardFooter>
								<Button className="w-full" onClick={() => router.push(`/contracts/${contract.id}`)}>
									See more
								</Button>
							</CardFooter>
						</Card>
					))
				) : (
					<div className="col-span-full text-center py-8">
						<p className="text-muted-foreground">No vehicle found</p>
					</div>
				)}
			</div>
		</>
	);
}
