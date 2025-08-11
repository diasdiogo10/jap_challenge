"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { getClients } from "@/lib/api/clients";
import { getVehicles } from "@/lib/api/vehicles";
import { postContract } from "@/lib/api/contracts";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";

interface Client {
	id: number;
	fullName: string;
	email: string;
	phone: string;
	drivingLicense: string;
}

interface Vehicle {
	id: number;
	brand: string;
	model: string;
	capacity: number;
	transmissionType: string;
	plateNumber: string;
	manufactureYear: number;
	fuelType: number;
	pricePerDay: string;
	status: string;
}

const FormSchema = z.object({
	startDate: z.date().refine((val) => !!val, {
		message: "Start date is required",
	}),
	endDate: z.date().refine((val) => !!val, {
		message: "End date is required",
	}),
	initialMileage: z.string().nonempty("Initial mileage is required"),
	clientId: z.string().nonempty("Client is required"),
	vehicleId: z.string().nonempty("Vehicle is required"),
});

export function NewContractForm() {
	const router = useRouter();

	const [clients, setClients] = useState<Client[]>([]);
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);

	useEffect(() => {
		getClients()
			.then((res) => setClients(res))
			.catch((err) => toast.error(err.message, { duration: 12000 }));
	}, []);

	useEffect(() => {
		getVehicles()
			.then((res) => setVehicles(res))
			.catch((err) => toast.error(err.message, { duration: 12000 }));
	}, []);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			startDate: undefined,
			endDate: undefined,
			initialMileage: "",
			clientId: "",
			vehicleId: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		const contract = {
			id: 0,
			startDate: format(data.startDate, "yyyy-MM-dd"),
			endDate: format(data.endDate, "yyyy-MM-dd"),
			initialMileage: Number(data.initialMileage),
			clientId: Number(data.clientId),
			vehicleId: Number(data.vehicleId),
		};

		postContract(contract)
			.then(() => {
				toast.success("Contract created!");
				router.push("/contracts");
			})
			.catch((err) => toast.error(err.message));
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-5/6 sm:w-2/3 space-y-6">
				<FormField
					control={form.control}
					name="startDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Start Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<Button variant="outline" data-empty={!field.value} className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal">
										<CalendarIcon />
										{field.value ? format(field.value, "yyyy-MM-dd") : <span>Pick a date</span>}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar mode="single" selected={field.value} onSelect={field.onChange} />
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="endDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>End Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<Button variant="outline" data-empty={!field.value} className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal">
										<CalendarIcon />
										{field.value ? format(field.value, "yyyy-MM-dd") : <span>Pick a date</span>}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar mode="single" selected={field.value} onSelect={field.onChange} />
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="initialMileage"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Initial Mileage</FormLabel>
							<FormControl>
								<Input type="number" className="text-sm" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="clientId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Client</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select client" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{clients.map((client) => (
										<SelectItem key={client.id} value={String(client.id)}>
											{client.fullName}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="vehicleId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Vehicle</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select vehicle" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{vehicles.map((vehicle) => (
										<SelectItem key={vehicle.id} value={String(vehicle.id)}>
											{vehicle.plateNumber}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Create contract</Button>
			</form>
		</Form>
	);
}
