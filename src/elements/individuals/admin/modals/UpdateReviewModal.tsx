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
import { Textarea } from "@/components/ui/textarea";
import { useUpdateReviewMutation } from "@/redux/api/reviewApi";
import { toast } from "sonner";

interface UpdateReviewModalProps {
  review: {
    _id: string;
    name: string;
    designation: string;
    company: string;
    review: string;
    imageUrl: string;
  };
}

interface ReviewFormValues {
  imageFile: FileList | null;
  name: string;
  designation: string;
  company: string;
  review: string;
}

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export default function UpdateReviewModal({ review }: UpdateReviewModalProps) {
  const form = useForm<ReviewFormValues>({
    mode: "onChange",
    defaultValues: {
      imageFile: null,
      name: review.name,
      designation: review.designation,
      company: review.company,
      review: review.review,
    },
  });

  const { watch } = form;
  const watchedValues = watch();
  const isValid = form.formState.isValid;

  const hasChanged = Object.entries(watchedValues).some(([key, value]) => {
    if (key === "imageFile") {
      return value && value.length > 0;
    }
    return value !== (review as any)[key];
  });

  const [updateReview, { isLoading, isError, error }] = useUpdateReviewMutation();

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
    if (isError && error) toast.error("Failed to update review");
  }, [isError, error]);

  const onSubmit: SubmitHandler<ReviewFormValues> = async (data) => {
    try {
      let imageUrl = review.imageUrl;

      if (data.imageFile && data.imageFile.length > 0) {
        imageUrl = await uploadImage(data.imageFile[0]);
      }

      const payload = {
        name: data.name,
        designation: data.designation,
        company: data.company,
        review: data.review,
        imageUrl,
      };

      const res = await updateReview({ id: review._id, payload }).unwrap();
      toast.success(res.message || "Review updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update review");
    }
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="text-center">Update Review</DialogTitle>
        <DialogDescription className="text-center">
          Modify and save changes to the selected review.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {/* Image Upload */}
          <FormField
            control={form.control}
            name="imageFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reviewer Image</FormLabel>
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

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Designation */}
          <FormField
            control={form.control}
            name="designation"
            rules={{ required: "Designation is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Designation</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Designation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company */}
          <FormField
            control={form.control}
            name="company"
            rules={{ required: "Company is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Review */}
          <FormField
            control={form.control}
            name="review"
            rules={{ required: "Review is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter Review Text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="mt-2 flex justify-between">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="rounded-none">
                Cancel
              </Button>
            </DialogClose>

            <DialogClose asChild disabled={!isValid || !hasChanged || isLoading}>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-none"
                disabled={!isValid || !hasChanged || isLoading}
              >
                {isLoading ? "Updating..." : "Update Review"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
