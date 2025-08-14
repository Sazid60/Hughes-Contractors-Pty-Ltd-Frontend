import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FiTrash2 } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import type { IEquipment } from "@/types/types";
import EquipmentUpdateModal from "@/elements/individuals/admin/modals/EquipmentUpdateModal";
import EquipmentDeleteModal from "@/elements/individuals/admin/modals/DeleteEquipmentModal";



interface EquipmentCardProps {
    equipment: IEquipment;
}

export default function EquipmentCard({ equipment }: EquipmentCardProps) {
    return (
        <div className="relative bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex gap-2 z-10">
                {/* Edit Button */}
                <Dialog>
                    <DialogTrigger asChild>
                        <button
                            title="Edit Equipment"
                            className="p-2 rounded-full bg-orange-600 shadow hover:bg-orange-700 transition"
                        >
                            <FaEdit className="text-white h-4 w-4" />
                        </button>
                    </DialogTrigger>
                    <EquipmentUpdateModal equipment={equipment} />
                </Dialog>

                {/* Delete Button */}
                <Dialog>
                    <DialogTrigger asChild>
                        <button
                            title="Delete Equipment"
                            className="p-2 rounded-full bg-orange-600 shadow hover:bg-orange-700 transition"
                        >
                            <FiTrash2 className="text-white h-4 w-4" />
                        </button>
                    </DialogTrigger>
                    <EquipmentDeleteModal equipmentId={equipment._id!} />
                </Dialog>
            </div>

            {/* Image */}
            <img
                src={equipment.equipmentImage}
                alt={equipment.name}
                className="w-full h-48 object-cover rounded-t-sm border-b border-gray-200"
            />

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-2">{equipment.name}</h3>

                <div className="text-sm space-y-1 text-gray-700">
                    <p>
                        <span className="font-semibold">Hourly Rate:</span> ${equipment.hourlyRate}
                    </p>
                    <p>
                        <span className="font-semibold">Minimum Hour:</span> {equipment.minHour} hrs
                    </p>
                    <p>
                        <span className="font-semibold">Float Charge:</span> ${equipment.floatCharge}
                    </p>
                    <p className="min-h-[60px] sm:min-h-[80px] md:min-h-[90px] overflow-hidden">
                        <span className="font-semibold">Description:</span> {equipment.description}
                    </p>


                </div>
            </div>
        </div>
    );
}
