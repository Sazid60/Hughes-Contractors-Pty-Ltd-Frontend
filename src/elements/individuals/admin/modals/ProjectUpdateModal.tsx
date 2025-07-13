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
import { Textarea } from "@/components/ui/textarea";

import { useUpdateProjectMutation } from "@/redux/api/projectApi";
import { toast } from "sonner";
import type { IProjectProp, ProjectFormValues } from "@/types/types";

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export default function ProjectUpdateModal({ project }: IProjectProp) {
    const form = useForm<ProjectFormValues>({
        mode: "onChange",
        defaultValues: {
            projectImageFile: null,
            title: project.title,
            client: project.client,
            location: project.location,
            projectYear: project.projectYear,
            duration: project.duration,
            description: project.description,
        },
    });

    const { watch } = form;
    const isValid = form.formState.isValid;
    const watchedValues = watch();

    const hasChanged = Object.entries(watchedValues).some(([key, value]) => {
        if (key === "projectImageFile") {
            return value && value.length > 0;
        }
        return value !== (project as any)[key];
    });

    const [updateProject, { isLoading, isError, error }] =
        useUpdateProjectMutation();

    // Image upload
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
        if (isError && error) toast.error("Failed to update project");
    }, [isError, error]);

    const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
        try {
            let imageUrl = project.projectImage;

            if (data.projectImageFile && data.projectImageFile.length > 0) {
                imageUrl = await uploadImage(data.projectImageFile[0]);
            }

            const updatedPayload = {
                title: data.title,
                client: data.client,
                location: data.location,
                projectYear: data.projectYear,
                duration: data.duration,
                description: data.description,
                projectImage: imageUrl,
            };

            const res = await updateProject({
                id: project._id,
                ...updatedPayload,
            }).unwrap();

            toast.success(res.message || "Project updated successfully");
        } catch (err) {
            toast.error("Failed to update project");
        }
    };

    return (
        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
                <DialogTitle className="text-center">Update Project</DialogTitle>
                <DialogDescription className="text-center">
                    Modify and save changes to the selected project.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    {/* Image Upload */}
                    <FormField
                        control={form.control}
                        name="projectImageFile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Image</FormLabel>
                                {/* Preview old image */}
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
                                    <Input placeholder="Enter Title" {...field} />
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
                                    <Input placeholder="Enter Client Name" {...field} />
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
                                    <Input placeholder="Enter Location" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Project Year */}
                    <FormField
                        control={form.control}
                        name="projectYear"
                        rules={{ required: "Project year is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Year</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Year" {...field} />
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
                                    <Input placeholder="Enter Duration" {...field} />
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
                                    <Textarea placeholder="Enter Description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Footer */}
                    <DialogFooter className="mt-2 flex justify-between">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="rounded-none"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild disabled={!isValid || !hasChanged || isLoading}>
                            <Button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-600 text-white rounded-none"
                                disabled={!isValid || !hasChanged || isLoading}
                            >
                                {isLoading ? "Updating..." : "Update Project"}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}
