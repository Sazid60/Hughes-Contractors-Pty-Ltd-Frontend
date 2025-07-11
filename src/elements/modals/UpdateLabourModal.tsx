/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { useUpdateLabourMutation } from "@/redux/api/projectApi";
import { toast } from "sonner";

interface ILabourForm {
    jobType: string;
    perHourRate: number;
    minHour: number;
}

interface UpdateLabourModalProps {
    labour: ILabourForm & { _id: string }; // Labour data including id
}

export default function UpdateLabourModal({ labour }: UpdateLabourModalProps) {
    const form = useForm<ILabourForm>({
        mode: "onChange",
        defaultValues: {
            jobType: labour.jobType,
            perHourRate: labour.perHourRate,
            minHour: labour.minHour,
        },
    });

    const { watch } = form;
    const watchedValues = watch();
    const isValid = form.formState.isValid;

    // Detect if form values changed from initial (to disable update if nothing changed)
    const hasChanged = Object.entries(watchedValues).some(
        ([key, value]) => value !== (labour as any)[key]
    );

    const [updateLabour, { isLoading, isError, error }] = useUpdateLabourMutation();

    useEffect(() => {
        if (isError && error) toast.error("Failed to update labour");
    }, [isError, error]);

    const onSubmit: SubmitHandler<ILabourForm> = async (data) => {
        try {
            await updateLabour({ id: labour._id, ...data }).unwrap();
            toast.success("Labour updated successfully");
        } catch {
            toast.error("Failed to update labour");
        }
    };

    return (
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle className="text-center">Update Labour</DialogTitle>
                <DialogDescription className="text-center">
                    Modify and save changes to the labour rate.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Job Type */}
                    <FormField
                        control={form.control}
                        name="jobType"

                        rules={{ required: "Job type is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Type</FormLabel>
                                <FormControl>
                                    <Input className="rounded-none" placeholder="Enter job type" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Per Hour Rate */}
                    <FormField
                        control={form.control}
                        name="perHourRate"
                        rules={{
                            required: "Per hour rate is required",
                            min: { value: 0, message: "Rate must be positive" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Per Hour Rate</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        className="rounded-none"
                                        step="0.01"
                                        placeholder="Enter per hour rate"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Minimum Hour */}
                    <FormField
                        control={form.control}
                        name="minHour"
                        rules={{
                            required: "Minimum hour is required",
                            min: { value: 1, message: "Minimum hour must be at least 1" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Minimum Hour</FormLabel>
                                <FormControl>
                                    <Input
                                        className="rounded-none"
                                        type="number"
                                        placeholder="Enter minimum hours"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Footer buttons */}
                    <DialogFooter className="mt-4 flex justify-between">
                        <DialogClose asChild>
                            <Button className="rounded-none" variant="outline" disabled={isLoading}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <DialogClose asChild disabled={!isValid || !hasChanged || isLoading}>
                            <Button
                                type="submit"
                                disabled={!isValid || !hasChanged || isLoading}
                                className="bg-orange-500 hover:bg-orange-600 text-white rounded-none"
                            >
                                {isLoading ? "Updating..." : "Update Labour"}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}
