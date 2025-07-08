import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSendContactMessageMutation } from "@/redux/api/contactApi";

interface ContactFormValues {
    name: string;
    email: string;
    message: string;
}

export default function ContactForm() {
    const form = useForm<ContactFormValues>({
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = form;

    const [sendContactMessage, { isLoading }] = useSendContactMessageMutation();

    const onSubmit = async (data: ContactFormValues) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res: any = await sendContactMessage(data).unwrap();
            toast.success(res.message || "Message sent successfully!");
            reset();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong.");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                Contact Us
            </h2>

            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Type your message here..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-main hover:bg-purple-800 transition"
                        disabled={isSubmitting || isLoading}
                    >
                        {isSubmitting || isLoading ? "Sending..." : "Send Message"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
