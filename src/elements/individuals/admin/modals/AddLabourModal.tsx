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
import { useAddLabourMutation } from "@/redux/api/projectApi";
import { toast } from "sonner";

// Interface
interface LabourFormValues {
    jobType: string;
    perHourRate: number;
    minHour: number;
}

export default function AddLabourModal() {
    const form = useForm<LabourFormValues>({
        mode: "onChange",
        defaultValues: {
            jobType: "",
            perHourRate: 0,
            minHour: 1,
        },
    });

    const isValid = form.formState.isValid;
    const [addLabour, { isLoading, isError, error, data }] = useAddLabourMutation();

    useEffect(() => {
        if (isError && error) toast.error("Failed to add labour");
        if (data) {
            toast.success("Labour added successfully");
            form.reset();
        }
    }, [isError, error, data, form]);

    const onSubmit: SubmitHandler<LabourFormValues> = async (formData) => {
        try {
            await addLabour(formData).unwrap();
        } catch {
            toast.error("Failed to add labour");
        }
    };

    return (
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle className="text-center">Add Labour</DialogTitle>
                <DialogDescription className="text-center">
                    Fill in the details to create a new labour entry.
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
                                    <Input
                                        className="rounded-none"
                                        placeholder="e.g., Electrician"
                                        {...field}
                                    />
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
                            min: { value: 0, message: "Rate must be a positive number" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Per Hour Rate ($)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        className="rounded-none"
                                        placeholder="e.g., 50"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        value={field.value ?? ""}
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
                            required: "Minimum hours required",
                            min: { value: 1, message: "Must be at least 1 hour" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Minimum Hours</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        className="rounded-none"
                                        placeholder="e.g., 2"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        value={field.value ?? ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Footer */}
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
                                {isLoading ? "Adding..." : "Add Labour"}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}
