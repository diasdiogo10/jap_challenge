"use client";

import { useEffect, useState } from "react";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { getClient, postClient, putClient } from "@/lib/api/clients";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const FormSchema = z.object({
	fullName: z.string().nonempty("Client full name is required"),
	email: z.string().nonempty("Client email is required"),
	phone: z.string().nonempty("Client phone is required"),
	drivingLicense: z.string().nonempty("Client divring license is required"),
});

export function NewClientForm() {
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			fullName: "",
			email: "",
			phone: "",
			drivingLicense: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		const client = {
			fullName: data.fullName,
			email: data.email,
			phone: data.phone,
			drivingLicense: data.drivingLicense,
		};

		postClient(client)
			.then(() => {
				toast.success("Client created!");
				router.push("/clients");
			})
			.catch((err) => toast.error(err.message));
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-5/6 sm:w-2/3 space-y-6">
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input className="text-sm" placeholder="Enter the client full name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input className="text-sm" placeholder="Enter the client email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone</FormLabel>
							<FormControl>
								<Input className="text-sm" placeholder="Enter the client phone" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid lg:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="drivingLicense"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Driving Licence</FormLabel>
								<FormControl>
									<Input className="text-sm" placeholder="Enter de client driving license" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit">Add client</Button>
			</form>
		</Form>
	);
}

export function EditClientForm({ clientId }: { clientId: string }) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			fullName: "",
			email: "",
			phone: "",
			drivingLicense: "",
		},
	});

	useEffect(() => {
		getClient(clientId)
			.then((res) => {
				form.reset({
					fullName: res.fullName ? res.fullName : "",
					email: res.email ? res.email : "",
					phone: res.phone ? res.phone : "",
					drivingLicense: res.drivingLicense ? res.drivingLicense : "",
				});
			})
			.catch((err) => toast.error(err.message));
	}, [clientId, form]);

	function onSubmit(data: z.infer<typeof FormSchema>) {
		putClient(clientId, data)
			.then(() => toast.success("Client updated!"))
			.catch((err) => toast.error(err.message));
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-5/6 sm:w-2/3 space-y-6">
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input className="text-sm" placeholder="Enter de client full name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input className="text-sm" placeholder="Enter de client email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone</FormLabel>
							<FormControl>
								<Input className="text-sm" placeholder="Enter de client phone" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid lg:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="drivingLicense"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Driving Licence</FormLabel>
								<FormControl>
									<Input className="text-sm" placeholder="Enter de client driving license" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit">Update client</Button>
			</form>
		</Form>
	);
}
