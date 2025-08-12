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
import { useAddCertificationMutation } from "@/redux/api/projectApi";
import { toast } from "sonner";
import { useEffect } from "react";

interface CertificationFormValues {
  title: string;
  certificationImage: FileList | null;
}

export default function AddCertificationModal() {
  const form = useForm<CertificationFormValues>({
    mode: "onChange",
    defaultValues: {
      title: "",
      certificationImage: null,
    },
  });

  const isValid = form.formState.isValid;
  const [addCertification, { isLoading, isError, data }] = useAddCertificationMutation();

  useEffect(() => {
    if (isError) toast.error("Failed to upload certification");
    if (data) {
      toast.success("Certification uploaded successfully");
      form.reset();
    }
  }, [isError, data, form]);

  const onSubmit: SubmitHandler<CertificationFormValues> = async (formData) => {
    try {
      if (!formData.certificationImage || formData.certificationImage.length === 0) {
        toast.error("No image selected");
        return;
      }

      const file = formData.certificationImage[0];
      const uploadForm = new FormData();
      uploadForm.append("title", formData.title);
      uploadForm.append("file", file);

      await addCertification(uploadForm).unwrap();
    } catch {
      toast.error("Something went wrong while uploading");
    }
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle className="text-center">Add Certification</DialogTitle>
        <DialogDescription className="text-center">
          Upload your certification image and provide a title.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter certification title"
                    {...field}
                    className="rounded-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="certificationImage"
            rules={{ required: "Image file is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certification Image</FormLabel>
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
