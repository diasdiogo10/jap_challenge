"use client";

import { useState } from "react";

import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { deleteClient } from "@/lib/api/clients";
import { Button, buttonVariants } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function ClientMenu({ clientId }: { clientId: string }) {
	const router = useRouter();

	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	return (
		<div className="flex justify-between items-center gap-2 mb-8">
			<div className="flex items-center gap-2">
				<Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
					<Trash2 />
					<span>Delete client</span>
				</Button>
				<AlertDialog open={showDeleteDialog}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you sure you want to delete the customer?</AlertDialogTitle>
							<AlertDialogDescription>This action cannot be undone. It will permanently delete the customer and remove their data.</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={() =>
									deleteClient(clientId)
										.then((res) => {
											toast.success("Customer deleted");
											router.push("/clients");
										})
										.catch((err) => toast.error(err.message))
										.finally(() => setShowDeleteDialog(false))
								}
								className={buttonVariants({ variant: "destructive" })}
							>
								Delete client
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}
