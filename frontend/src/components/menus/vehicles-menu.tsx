"use client";

import { Plus, UserCog } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VehiclesMenu() {
	return (
		<div className="flex justify-between items-center gap-2 mb-8">
			<div className="flex items-center gap-2">
				<Link href="/vehicles/new">
					<Button variant="outline">
						<Plus />
						<span>New vehicle</span>
					</Button>
				</Link>
			</div>
		</div>
	);
}
