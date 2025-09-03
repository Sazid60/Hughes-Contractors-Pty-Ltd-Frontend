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
import { useAddReviewMutation } from "@/redux/api/reviewApi";
import { toast } from "sonner";

// Form values interface
interface ReviewFormValues {
  imageFile: FileList | null;
  name: string;
  designation: string;
  company: string;
  review: string;
}

// IMGBB API key
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export default function AddReviewModal() {
  const form = useForm<ReviewFormValues>({
    mode: "onChange",
    defaultValues: {
      imageFile: null,
      name: "",
      designation: "",
      company: "",
      review: "",
    },
  });

  const isValid = form.formState.isValid;
  const [addReview, { isLoading, isError, error, data }] = useAddReviewMutation();

  // Upload image to IMGBB and return URL
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
    if (isError && error) toast.error("Failed to add review");
    if (data) {
      toast.success("Review added successfully");
      form.reset();
    }
  }, [isError, error, data, form]);

  const onSubmit: SubmitHandler<ReviewFormValues> = async (values) => {
    try {
      let imageUrl = "";

      if (values.imageFile && values.imageFile.length > 0) {
        imageUrl = await uploadImage(values.imageFile[0]);
      }

      // Send payload as plain JSON object
      const payload = {
        name: values.name,
        designation: values.designation,
        company: values.company,
        review: values.review,
        imageUrl,
      };

      console.log(payload)

      await addReview(payload).unwrap();
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image or add review");
    }
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="text-center">Add Review</DialogTitle>
        <DialogDescription className="text-center">
          Fill out the form to add a new customer review.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Image Upload */}
          <FormField
            control={form.control}
            name="imageFile"
            rules={{ required: "Reviewer image is required" }}
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
                  <Input className="rounded-none" placeholder="Enter Name" {...field} />
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
                  <Input className="rounded-none" placeholder="Enter Designation" {...field} />
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
                  <Input className="rounded-none" placeholder="Enter Company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Review */}
          <FormField
            control={form.control}
            name="review"
            rules={{ required: "Review text is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review</FormLabel>
                <FormControl>
                  <Textarea className="rounded-none" placeholder="Enter Review Text" {...field} />
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
                {isLoading ? "Adding..." : "Add Review"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
