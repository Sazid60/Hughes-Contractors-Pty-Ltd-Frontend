/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { useAddEquipmentMutation } from "@/redux/api/projectApi";

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

interface EquipmentFormValues {
    equipmentImageFile: FileList | null;
    name: string;
    hourlyRate: number | string;
    minHour: number | string;
    floatCharge: number | string;
    description: string;
}

export default function AddEquipmentModal() {
    const form = useForm<EquipmentFormValues>({
        mode: "onChange",
        defaultValues: {
            equipmentImageFile: null,
            name: "",
            hourlyRate: 0,
            minHour: 0,
            floatCharge: 0,
            description: "",
        },
    });

    const isValid = form.formState.isValid;
    const [addEquipment, { isLoading, isError, error, data }] = useAddEquipmentMutation();

    async function uploadImage(file: File): Promise<string> {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
            {
                method: "POST",
                body: formData,
            }
        );

        const json = await res.json();
        if (!json.success) throw new Error("Image upload failed");
        return json.data.url;
    }

    useEffect(() => {
        if (isError && error) toast.error("Failed to add equipment");
        if (data) {
            toast.success("Equipment added successfully");
            form.reset();
        }
    }, [isError, error, data, form]);

    const onSubmit: SubmitHandler<EquipmentFormValues> = async (data) => {
        try {
            let imageUrl = "";

            if (data.equipmentImageFile && data.equipmentImageFile.length > 0) {
                imageUrl = await uploadImage(data.equipmentImageFile[0]);
            } else {
                toast.error("Equipment image is required");
                return;
            }

            const { equipmentImageFile, ...rest } = data;

            const equipmentPayload = {
                name: rest.name,
                hourlyRate: Number(rest.hourlyRate),
                minHour: Number(rest.minHour),
                floatCharge: Number(rest.floatCharge),
                equipmentImage: imageUrl,
                description: rest.description,
            };

            console.log("Sending to backend:", equipmentPayload);

            const res = await addEquipment(equipmentPayload).unwrap();
            console.log("Backend response:", res);
        } catch (err) {
            console.error(err);
            toast.error("Failed to upload image or add equipment");
        }
    };

    return (
        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
                <DialogTitle className="text-center">Add Equipment</DialogTitle>
                <DialogDescription className="text-center">
                    Fill out the form to add new equipment.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="equipmentImageFile"
                        rules={{ required: "Equipment image is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Equipment Image</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="rounded-none"
                                        onChange={(e) => field.onChange(e.target.files)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        className="rounded-none"
                                        placeholder="Enter Equipment Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="hourlyRate"
                        rules={{
                            required: "Hourly rate is required",
                            min: { value: 0, message: "Hourly rate must be positive" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hourly Rate</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="rounded-none"
                                        placeholder="Enter Hourly Rate"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="minHour"
                        rules={{
                            required: "Minimum hours is required",
                            min: { value: 1, message: "Minimum hours must be at least 1" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Minimum Hours</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="1"
                                        className="rounded-none"
                                        placeholder="Enter Minimum Hours"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="floatCharge"
                        rules={{
                            required: "Float charge is required",
                            min: { value: 0, message: "Float charge must be positive" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Float Charge</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="rounded-none"
                                        placeholder="Enter Float Charge"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        rules={{ required: "Description is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input
                                        className="rounded-none"
                                        placeholder="Enter equipment description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogFooter className="mt-2 flex justify-between">
                        <DialogClose asChild>
                            <Button
                                className="rounded-none"
                                variant="outline"
                                type="button"
                                disabled={!isValid}
                            >
                                Cancel
                            </Button>
                        </DialogClose>

                        <DialogClose asChild disabled={!isValid || isLoading}>
                            <Button
                                type="submit"
                                disabled={!isValid || isLoading}
                                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-none"
                            >
                                {isLoading ? "Adding..." : "Add Equipment"}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}
