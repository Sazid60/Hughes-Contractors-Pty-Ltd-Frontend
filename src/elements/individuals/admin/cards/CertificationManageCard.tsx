import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { ICertification } from "@/types/types";
import { FiTrash2 } from "react-icons/fi";
import DeleteCertificationModal from "../modals/DeleteCertificationModal";


interface CertificationManageCardProps {
    certification: ICertification;
}

export default function CertificationManageCard({ certification }: CertificationManageCardProps) {
    return (
        <div className="relative bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            {/* Delete Button */}
            <div className="absolute top-3 right-3 z-10">
                <Dialog>
                    <DialogTrigger asChild>
                        <button
                            title="Delete Certification"
                            className="p-2 rounded-full bg-orange-600 shadow hover:bg-orange-700 transition"
                        >
                            <FiTrash2 className="text-white text-base sm:text-lg" />
                        </button>
                    </DialogTrigger>
                    <DeleteCertificationModal certificationId={certification._id} />
                </Dialog>
            </div>

            {/* Certification Image */}
            <img
                src={certification.imageUrl || "/placeholder.png"}
                alt={certification.title}
                className="w-full h-48 object-cover rounded-t-sm border-b border-gray-200"
            />

            {/* Title */}
            <div className="p-5 flex flex-col flex-1 justify-center">
                <h3 className="text-sm font-bold text-center">
                    {certification.title}
                </h3>
            </div>
        </div>
    );
}
