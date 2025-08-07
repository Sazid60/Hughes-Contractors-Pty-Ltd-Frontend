// components/EquipmentCard.tsx

import type { IEquipment } from "@/types/types";

interface EquipmentCardProps {
    equipment: IEquipment;
}

export default function EquipmentCard({ equipment }: EquipmentCardProps) {
    return (
        <div
            className="group relative w-full h-80 overflow-hidden rounded-none shadow-md transition-transform duration-300 hover:shadow-xl"
        >
            {/* Full Image */}
            <img
                src={equipment.equipmentImage}
                alt={equipment.name}
                className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-90"
            />

            {/* Floating Price Label */}
            <div className="absolute top-3 left-3 bg-orange-600 text-white text-xs px-3 py-1 rounded-none shadow">
                ${equipment.hourlyRate}/hr
            </div>

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-0 w-full px-4 py-3 text-white bg-black/50 backdrop-blur-sm text-center">
                <h3 className="text-sm sm:text-base font-bold truncate mb-1 text-orange-500">
                    {equipment.name}
                </h3>
                <p className="text-xs sm:text-sm">
                    <span className="font-semibold text-orange-500">Min Hour:</span> {equipment.minHour} hrs
                </p>
                <p className="text-xs sm:text-sm">
                    <span className="font-semibold text-orange-500">Float Charge:</span> ${equipment.floatCharge}
                </p>
                <p className="text-xs sm:text-sm">
                    <span className="font-semibold text-orange-500">Description:</span> {equipment.description}
                </p>
            </div>
        </div>
    );
}
