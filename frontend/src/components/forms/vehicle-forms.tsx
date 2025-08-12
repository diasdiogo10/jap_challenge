"use client";

import { useEffect, useState } from "react";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { getVehicle, postVehicle, putVehicle } from "@/lib/api/vehicles";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const FormSchema = z.object({
	brand: z.string().nonempty("Brand is required"),
	model: z.string().nonempty("Model is required"),
	plateNumber: z.string().nonempty("Plate number is required"),
	manufactureYear: z.string().nonempty("Manufacture year is required"),
	fuelType: z.string().nonempty("Fuel type is required"),
	capacity: z.string().nonempty("Capacity is required"),
	pricePerDay: z.string().nonempty("Price per day is required"),
	transmissionType: z.string().nonempty("Transmission type is required"),
});

export function NewVehicleForm() {
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			brand: "",
			model: "",
			plateNumber: "",
			manufactureYear: "",
			fuelType: "",
			capacity: "",
			pricePerDay: "",
			transmissionType: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		const vehicle = {
			brand: data.brand,
			model: data.model,
			plateNumber: data.plateNumber,
			manufactureYear: data.manufactureYear,
			fuelType: data.fuelType,
			capacity: data.capacity,
			pricePerDay: data.pricePerDay,
			transmissionType: data.transmissionType,
		};

		postVehicle(vehicle)
			.then(() => {
				toast.success("Vehicle created!");
				router.push("/vehicles");
			})
			.catch((err) => toast.error(err.message));
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-5/6 sm:w-2/3 space-y-6">
				<FormField
					control={form.control}
					name="brand"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Brand</FormLabel>
							<FormControl>
								<Input className="text-sm" placeholder="Enter the vehicle brand" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="model"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Model</FormLabel>
							<FormControl>
								<Input className="text-sm" placeholder="Enter the vehicle model" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="plateNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Plate Number</FormLabel>
							<FormControl>
								<Input className="text-sm" placeholder="Enter the vehicle plate number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="manufactureYear"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Manufacture Year</FormLabel>
							<FormControl>
								<Input className="text-sm" placeholder="Enter the manufacture year" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid lg:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="fuelType"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Fuel Type</FormLabel>
								<FormControl>
									<Input className="text-sm" placeholder="Enter the fuel type" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="capacity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Capacity</FormLabel>
								<FormControl>
									<Input type="number" className="text-sm" placeholder="Enter the capacity" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="pricePerDay"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price Per Day</FormLabel>
								<FormControl>
									<Input type="number" className="text-sm" placeholder="Enter the price per day" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="transmissionType"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Transmission Type</FormLabel>
								<FormControl>
									<Input className="text-sm" placeholder="Enter the transmission type" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit">Add Vehicle</Button>
			</form>
		</Form>
	);
}

export function EditVehicleForm({ vehicleId }: { vehicleId: string }) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			brand: "",
			model: "",
			plateNumber: "",
			manufactureYear: "",
			fuelType: "",
			capacity: "",
			pricePerDay: "",
			transmissionType: "",
		},
	});

	useEffect(() => {
		getVehicle(vehicleId)
			.then((res) => {
				form.reset({
					brand: res.brand ?? "",
					model: res.model ?? "",
					plateNumber: res.plateNumber ?? "",
					manufactureYear: res.manufactureYear ?? "",
					fuelType: res.fuelType ?? "",
					capacity: res.capacity ?? 0,
					pricePerDay: res.pricePerDay ?? 0,
					transmissionType: res.transmissionType ?? "",
				});
			})
			.catch((err) => toast.error(err.message));
	}, [vehicleId, form]);

	function onSubmit(data: z.infer<typeof FormSchema>) {
		putVehicle(vehicleId, data)
			.then(() => toast.success("Vehicle updated!"))
			.catch((err) => toast.error(err.message));
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-5/6 sm:w-2/3 space-y-6">
				<FormField
					control={form.control}
					name="brand"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Brand</FormLabel>
							<FormControl>
								<Input className="text-sm" placeholder="Enter the vehicle brand" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="model"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Model</FormLabel>
							<FormControl>
								<Input className="text-sm" placeholder="Enter the vehicle model" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="plateNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Plate Number</FormLabel>
							<FormControl>
								<Input className="text-sm" placeholder="Enter the vehicle plate number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="manufactureYear"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Manufacture Year</FormLabel>
							<FormControl>
								<Input className="text-sm" placeholder="Enter the manufacture year" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid lg:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="fuelType"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Fuel Type</FormLabel>
								<FormControl>
									<Input className="text-sm" placeholder="Enter the fuel type" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="capacity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Capacity</FormLabel>
								<FormControl>
									<Input type="number" className="text-sm" placeholder="Enter the capacity" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="pricePerDay"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price Per Day</FormLabel>
								<FormControl>
									<Input type="number" className="text-sm" placeholder="Enter the price per day" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="transmissionType"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Transmission Type</FormLabel>
								<FormControl>
									<Input className="text-sm" placeholder="Enter the transmission type" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit">Update vehicle</Button>
			</form>
		</Form>
	);
}
