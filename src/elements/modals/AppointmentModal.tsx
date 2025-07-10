/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useSendContactMessageMutation } from "@/redux/api/contactApi";
import { toast } from "sonner";

interface ContactFormValues {
    name: string;
    email: string;
    message: string;
}

export default function AppointmentModal() {
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
        <DialogContent className="bg-black/70 backdrop-blur-xs border border-gray-700 p-6 md:p-8 sm:max-w-[600px] rounded-none text-white">
            <DialogHeader>
                <DialogTitle className="text-lg md:text-xl mb-4 text-white mt-4">
                    Would You Like to Discuss A Project?
                </DialogTitle>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name & Email */}
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
                                    value:
                                        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
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
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        placeholder="Type your Message"
                                        {...field}
                                        className="bg-[#1f1f1f] text-white placeholder-gray-400 border border-gray-600 resize-none min-h-[120px] rounded-none"
                                    />
                                </FormControl>
                                <FormMessage className="text-xs text-red-500 px-1 mt-1" />
                            </FormItem>
                        )}
                    />

                    {/* Submit */}
                    <DialogClose className="" disabled={isSubmitting || isLoading || !isValid}>
                        <Button
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 text-xs md:text-sm font-medium transition rounded-none"
                            disabled={isSubmitting || isLoading || !isValid}
                        >
                            {isSubmitting || isLoading ? "Sending..." : "Send Message →"}
                        </Button>
                    </DialogClose>
                </form>
            </Form>
        </DialogContent>
    );
}
