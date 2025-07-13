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
import { Textarea } from "@/components/ui/textarea";
import { useAddProjectMutation } from "@/redux/api/projectApi";
import { toast } from "sonner";

// Read from environment
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

// Form values interface
interface ProjectFormValues {
    projectImageFile: FileList | null;
    title: string;
    client: string;
    location: string;
    projectYear: string;
    duration: string;
    description: string;
}

export default function AddProjectModal() {
    const form = useForm<ProjectFormValues>({
        mode: "onChange",
        defaultValues: {
            projectImageFile: null,
            title: "",
            client: "",
            location: "",
            projectYear: "",
            duration: "",
            description: "",
        },
    });

    const isValid = form.formState.isValid;
    const [addProject, { isLoading, isError, error, data }] = useAddProjectMutation();

    // Upload image to imgbb
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
        if (isError && error) toast.error("Failed to add project");
        if (data) {
            toast.success("Project added successfully");
            form.reset();
        }
    }, [isError, error, data, form]);

    const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
        try {
            let imageUrl = "";

            if (data.projectImageFile && data.projectImageFile.length > 0) {
                imageUrl = await uploadImage(data.projectImageFile[0]);
            }

            const { projectImageFile, ...rest } = data;
            const projectPayload = {
                ...rest,
                projectImage: imageUrl,
            };

            await addProject(projectPayload).unwrap();
        } catch {
            toast.error("Failed to upload image or add project");
        }
    };

    return (
        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
                <DialogTitle className="text-center">Add Project</DialogTitle>
                <DialogDescription className="text-center">
                    Fill out the form to add a new project.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Image Upload */}
                    <FormField
                        control={form.control}
                        name="projectImageFile"
                        rules={{ required: "Project image is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Image</FormLabel>
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

                    {/* Title */}
                    <FormField
                        control={form.control}
                        name="title"
                        rules={{ required: "Title is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input className="rounded-none" placeholder="Enter Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Client */}
                    <FormField
                        control={form.control}
                        name="client"
                        rules={{ required: "Client is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Client</FormLabel>
                                <FormControl>
                                    <Input className="rounded-none" placeholder="Enter Client Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Location */}
                    <FormField
                        control={form.control}
                        name="location"
                        rules={{ required: "Location is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input className="rounded-none" placeholder="Enter Location" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Project Year */}
                    <FormField
                        control={form.control}
                        name="projectYear"
                        rules={{ required: "Project Year is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Year</FormLabel>
                                <FormControl>
                                    <Input className="rounded-none" placeholder="Enter Project Year (e.g. 2023)" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Duration */}
                    <FormField
                        control={form.control}
                        name="duration"
                        rules={{ required: "Duration is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Duration</FormLabel>
                                <FormControl>
                                    <Input className="rounded-none" placeholder="Enter Duration (e.g. 10 months)" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="description"
                        rules={{ required: "Description is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea className="rounded-none" placeholder="Enter Project Description" {...field} />
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
                                {isLoading ? "Adding..." : "Add Project"}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}
