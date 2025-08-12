import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CertificationManageCard from "@/elements/individuals/admin/cards/CertificationManageCard";
import AddCertificationModal from "@/elements/individuals/admin/modals/AddCertificationModal";
import { useGetCertificationsQuery } from "@/redux/api/projectApi"; // Make sure you have this in API
import type { ICertification } from "@/types/types";
import { BounceLoader } from "react-spinners";

export default function ManageCertifications() {
    const { data, isLoading, isError } = useGetCertificationsQuery(undefined, {
        pollingInterval: 3000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const certifications: ICertification[] = data?.data ? [...data.data].reverse() : [];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-10">
                <BounceLoader color="#f97316" size={80} />
            </div>
        );
    }

    return (
        <section className="w-full md:mt-15 lg:mt-0">
            {/* Banner Section */}
            <div className="w-full h-[50vh] sm:h-[50vh] md:h-[40vh] xl:h-[40vh] bg-[url('/Banner-1.webp')] bg-fixed bg-center bg-cover flex items-center justify-center rounded-sm overflow-hidden mb-10">
                <div className="flex flex-col justify-center items-center text-center text-white px-4 z-10 max-w-2xl">
                    <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                        Manage Your Certifications
                    </h2>
                    <p className="mb-6 text-sm sm:text-base md:text-lg">
                        Add new certifications to keep your records updated
                    </p>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="text-sm px-4 py-3 flex gap-2 items-center bg-orange-500 hover:bg-orange-600 transition rounded-none text-white">
                                Add Certification
                            </Button>
                        </DialogTrigger>
                        <AddCertificationModal />
                    </Dialog>
                </div>
            </div>

            {/* Section Heading */}
            <div className="text-center mb-10 px-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 uppercase">
                    All Certifications
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                    Below is the list of certifications you have added.
                </p>
            </div>

            {/* Error State */}
            {isError ? (
                <div className="text-center text-red-600 mb-6 px-4">
                    <h1>Failed to load certifications.</h1>
                </div>
            ) : certifications.length === 0 ? (
                <div className="flex justify-center items-center py-16 text-gray-500 text-lg sm:text-xl font-medium">
                    No certifications found.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                    {certifications.map((certification: ICertification) => (
                        <CertificationManageCard key={certification._id} certification={certification} />
                    ))}
                </div>
            )}
        </section>
    );
}
