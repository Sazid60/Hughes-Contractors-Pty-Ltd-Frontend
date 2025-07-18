import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AppointmentModal from "@/elements/individuals/user/modals/AppointmentModal";

export default function Banner() {
    return (
        <>
            <section className="relative w-full h-[calc(100vh)] md:h-[calc(100vh)] overflow-hidden text-white">
                <img
                    src="/Banner-1.webp"
                    alt="Construction Banner"
                    className="absolute top-0 left-0 w-full h-full object-cover bg-bottom"
                    loading="lazy"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/70" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold max-w-4xl mb-4 text-[#ff5c00]">
                        HUGHES CONTRACTORS PTY LTD
                    </h1>
                    <p className="text-sm md:text-base uppercase tracking-widest text-gray-300 mb-4">
                        Your Trusted Service Provider
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold  max-w-4xl">
                        FROM VISION TO VIDEO  WE BUILD STORIES
                    </h1>

                    <div className="mt-8 flex flex-wrap gap-4 justify-center">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-[#ff5c00] hover:bg-[#e44e00] text-white font-semibold px-5 py-3 hover:scale-101 text-xs md:text-sm shadow-md transition rounded-none">
                                    Appointment →
                                </Button>
                            </DialogTrigger>
                            <AppointmentModal />
                        </Dialog>
                        <Button className="border bg-transparent hover:bg-transparent border-white text-white font-semibold px-5 py-3  text-xs md:text-sm shadow-md hover:scale-101  transition rounded-none">
                            Projects →
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
