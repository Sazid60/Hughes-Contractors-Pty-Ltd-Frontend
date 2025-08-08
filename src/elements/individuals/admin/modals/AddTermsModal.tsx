
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useUploadTermsMutation } from "@/redux/api/projectApi";
import { toast } from "sonner";
import { useEffect } from "react";

// Form values
interface TermsFormValues {
    termsFile: FileList | null;
}

export default function AddTermsModal() {
    const form = useForm<TermsFormValues>({
        mode: "onChange",
        defaultValues: {
            termsFile: null,
        },
    });

    const isValid = form.formState.isValid;
    const [uploadTerms, { isLoading, isError, error, data }] = useUploadTermsMutation();

    useEffect(() => {
        if (isError && error) toast.error("Failed to upload terms");
        if (data) {
            toast.success("Terms PDF uploaded successfully");
            form.reset();
        }
    }, [isError, error, data, form]);

    const onSubmit: SubmitHandler<TermsFormValues> = async (formData) => {
        try {
            if (!formData.termsFile || formData.termsFile.length === 0) {
                toast.error("No file selected");
                return;
            }

            const file = formData.termsFile[0];
            const uploadForm = new FormData();
            uploadForm.append("file", file);

            await uploadTerms(uploadForm).unwrap();
        } catch {
            toast.error("Something went wrong while uploading");
        }
    };

    return (
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle className="text-center">Upload Terms PDF</DialogTitle>
                <DialogDescription className="text-center">
                    Choose a PDF file containing your terms and conditions.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="termsFile"
                        rules={{ required: "PDF file is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>PDF File</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="application/pdf"
                                        className="rounded-none"
                                        onChange={(e) => field.onChange(e.target.files)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogFooter className="mt-2 flex justify-between">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="rounded-none"
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                        </DialogClose>

                        <DialogClose asChild disabled={!isValid || isLoading}>
                            <Button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-none"
                                disabled={!isValid || isLoading}
                            >
                                {isLoading ? "Uploading..." : "Upload"}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}
