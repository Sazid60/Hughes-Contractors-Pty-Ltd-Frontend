/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
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
        mode: "onChange",
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
        formState: { isSubmitting, isValid },
    } = form;

    const [sendContactMessage, { isLoading }] = useSendContactMessageMutation();

    const onSubmit = async (data: ContactFormValues) => {
        try {
            const res: any = await sendContactMessage(data).unwrap();
            toast.success(res.message || "Message sent successfully!");
            reset();
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong.");
        }
    };

    return (
        <section
            className="relative w-full bg-cover bg-center bg-no-repeat py-16 px-4 sm:px-6 lg:px-12"
            style={{ backgroundImage: "url('/contact.jpg')" }} // Replace with your image
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/70 z-0" />

            {/* Form content wrapper */}
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 bg-black/60 backdrop-blur-md p-6 md:p-10 ">
                {/* Left Image */}
                <div className="w-full lg:w-1/2  overflow-hidden">
                    <img
                        src="/meeting.jpg"
                        alt="Discussion"
                        className="w-full h-full object-cover "
                    />
                </div>

                {/* Right Form */}
                <div className="w-full lg:w-1/2 text-white">
                    <h2 className=" mb-8 text-xl sm:text-2xl lg:text-3xl font-bold">
                        Would you like to discuss a project?
                    </h2>

                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Name + Email */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <FormField
                                    control={control}
                                    name="name"
                                    rules={{ required: "Name is required" }}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input
                                                    placeholder="Full Name"
                                                    {...field}
                                                    className="bg-[#1f1f1f] text-white placeholder-gray-400 border border-gray-600 rounded-none"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs text-red-500 px-1 mt-1" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="email"
                                    rules={{
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                            message: "Invalid email address",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Email Address"
                                                    {...field}
                                                    className="bg-[#1f1f1f] text-white placeholder-gray-400 border border-gray-600 rounded-none"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs text-red-500 px-1 mt-1" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Message */}
                            <FormField
                                control={control}
                                name="message"
                                rules={{ required: "Message is required" }}
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormControl>
                                            <Textarea
                                                placeholder="Type your Message"
                                                {...field}
                                                className="bg-[#1f1f1f] text-white placeholder-gray-400 border border-gray-600 resize-none min-h-[150px] rounded-none"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-500 px-0 mt-0 mb-0" />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 text-xs md:text-sm  font-medium transition rounded-none"
                                disabled={isSubmitting || isLoading || !isValid}
                            >
                                {isSubmitting || isLoading ? "Sending..." : "Send Message →"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    );
}
