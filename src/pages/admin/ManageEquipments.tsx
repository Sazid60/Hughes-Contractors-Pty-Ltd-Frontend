import { Button } from "@/components/ui/button";
import EquipmentCard from "@/elements/individuals/admin/EquipmentCard";
import { useGetEquipmentsQuery, useGetLaboursQuery } from "@/redux/api/projectApi";
import type { IEquipment, ILabour } from "@/types/types";

import { BounceLoader } from "react-spinners";



export default function ManageEquipments() {
    const { data: labourData, isLoading: isLoadingLabour } = useGetLaboursQuery(undefined);
    const { data: equipmentData, isLoading: isLoadingEquipment } = useGetEquipmentsQuery(undefined);

    const labours: ILabour[] = labourData?.data || [];
    const equipments: IEquipment[] = equipmentData?.data || [];

    const isLoading = isLoadingLabour || isLoadingEquipment;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-10">
                <BounceLoader color="#f97316" size={80} />
            </div>
        );
    }

    return (
        <div className="w-full md:mt-15 lg:mt-0">
            {/* Banner Section */}
            <div className="w-full h-[50vh] sm:h-[50vh] md:h-[40vh] xl:h-[40vh] bg-[url('/Banner.jpg')] bg-fixed bg-center bg-cover flex items-center justify-center rounded-sm overflow-hidden mb-10">
                <div className="flex flex-col justify-center items-center text-center text-white px-4 z-10 max-w-2xl">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2">Manage Equipments & Labour Rates</h2>
                    <p className="mb-6 text-base md:text-lg">
                        Monitor and control your construction resources
                    </p>
                    <div className="flex gap-4">
                        <Button className="px-5 py-3 bg-orange-500 hover:bg-orange-600 transition rounded-none text-white">
                            Labour Rate
                        </Button>
                        <Button className="px-5 py-3 bg-orange-500 hover:bg-orange-600 transition rounded-none text-white">
                            Add Equipment
                        </Button>
                    </div>
                </div>
            </div>

            {/* Labour Rates Table */}
            <div className="px-4 mb-10 overflow-x-auto">
                <h3 className="text-xl font-bold mb-4 text-center">Labour Rates</h3>
                <table className="w-full table-auto border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2 text-left">Job Type</th>
                            <th className="border px-4 py-2 text-left">Per Hour Rate</th>
                            <th className="border px-4 py-2 text-left">Min Hour</th>
                        </tr>
                    </thead>
                    <tbody>
                        {labours.map((labour) => (
                            <tr key={labour._id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{labour.jobType}</td>
                                <td className="border px-4 py-2">${labour.perHourRate}</td>
                                <td className="border px-4 py-2">{labour.minHour} hrs</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Equipment Grid */}
            <div className="px-4 mb-10">
                <h3 className="text-xl font-bold mb-4 text-center">Equipments</h3>
                {equipments.length === 0 ? (
                    <p className="text-center text-gray-500 py-10">No equipment data available.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                        {equipments.map((equipment) => (
                            <EquipmentCard key={equipment._id} equipment={equipment} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
