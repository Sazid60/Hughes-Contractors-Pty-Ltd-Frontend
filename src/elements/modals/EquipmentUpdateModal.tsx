/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
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
import { useUpdateEquipmentMutation } from "@/redux/api/projectApi";
import { toast } from "sonner";
import type { IEquipment } from "@/types/types";

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

interface EquipmentFormValues {
    equipmentImageFile: FileList | null;
    name: string;
    hourlyRate: number | string;
    minHour: number | string;
    floatCharge: number | string;
}

interface EquipmentUpdateModalProps {
    equipment: IEquipment;
}

export default function EquipmentUpdateModal({ equipment }: EquipmentUpdateModalProps) {
    const form = useForm<EquipmentFormValues>({
        mode: "onChange",
        defaultValues: {
            equipmentImageFile: null,
            name: equipment.name,
            hourlyRate: equipment.hourlyRate,
            minHour: equipment.minHour,
            floatCharge: equipment.floatCharge,
        },
    });

    const { watch } = form;
    const isValid = form.formState.isValid;
    const watchedValues = watch();

    const hasChanged = Object.entries(watchedValues).some(([key, value]) => {
        if (key === "equipmentImageFile") {
            return value && (value as FileList).length > 0;
        }
        return value !== (equipment as any)[key];
    });

    const [updateEquipment, { isLoading, isError, error }] = useUpdateEquipmentMutation();

    async function uploadImage(file: File): Promise<string> {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: "POST",
            body: formData,
        });

        const json = await res.json();
        if (!json.success) throw new Error("Image upload failed");
        return json.data.url;
    }

    useEffect(() => {
        if (isError && error) toast.error("Failed to update equipment");
    }, [isError, error]);

    const onSubmit: SubmitHandler<EquipmentFormValues> = async (data) => {
        try {
            let imageUrl = equipment.equipmentImage;

            if (data.equipmentImageFile && data.equipmentImageFile.length > 0) {
                imageUrl = await uploadImage(data.equipmentImageFile[0]);
            }

            const updatedPayload = {
                name: data.name,
                hourlyRate: Number(data.hourlyRate),
                minHour: Number(data.minHour),
                floatCharge: Number(data.floatCharge),
                equipmentImage: imageUrl,
            };

            const res = await updateEquipment({ id: equipment._id, ...updatedPayload }).unwrap();
            toast.success(res.message || "Equipment updated successfully");
        } catch (err) {
            toast.error("Failed to update equipment");
        }
    };

    return (
        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
                <DialogTitle className="text-center">Update Equipment</DialogTitle>
                <DialogDescription className="text-center">
                    Modify and save changes to the selected equipment.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                        control={form.control}
                        name="equipmentImageFile"
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
                                    <Input className="rounded-none" placeholder="Enter Equipment Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="hourlyRate"
                        rules={{ required: "Hourly rate is required", min: { value: 0, message: "Must be positive" } }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hourly Rate</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" className="rounded-none" placeholder="Hourly Rate" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="minHour"
                        rules={{ required: "Minimum hours required", min: { value: 1, message: "At least 1" } }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Minimum Hours</FormLabel>
                                <FormControl>
                                    <Input type="number" min="1" className="rounded-none" placeholder="Minimum Hours" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="floatCharge"
                        rules={{ required: "Float charge is required", min: { value: 0, message: "Must be positive" } }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Float Charge</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" className="rounded-none" placeholder="Float Charge" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogFooter className="mt-2 flex justify-between">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="rounded-none">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild disabled={!isValid || !hasChanged || isLoading}>
                            <Button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-600 text-white rounded-none"
                                disabled={!isValid || !hasChanged || isLoading}
                            >
                                {isLoading ? "Updating..." : "Update Equipment"}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}
