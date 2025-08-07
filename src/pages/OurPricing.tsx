import EquipmentCard from "@/elements/individuals/user/cards/EquipmentCard";
import SecondaryContainer from "@/layouts/containers/SecondaryContainer";
import { useGetEquipmentsQuery, useGetLaboursQuery } from "@/redux/api/projectApi";
import type { IEquipment, ILabour } from "@/types/types";
import { BounceLoader } from "react-spinners";


export default function OurPricing() {
    const { data: labourData, isLoading: isLoadingLabour } = useGetLaboursQuery(undefined);
    const { data: equipmentData, isLoading: isLoadingEquipment } = useGetEquipmentsQuery(undefined);

    const labours: ILabour[] = labourData?.data || [];
    const equipments: IEquipment[] = equipmentData?.data || [];

    const isLoading = isLoadingLabour || isLoadingEquipment;

    if (isLoading) {
        return (
            <div className="flex min-h-screen justify-center items-center py-10">
                <BounceLoader color="#f97316" size={80} />
            </div>
        );
    }

    return (
        <SecondaryContainer>
            <section className="w-full">
                {/* Banner */}
                <div className="w-full h-[45vh] bg-[url('/Banner-1.webp')] bg-center bg-cover flex items-center justify-center overflow-hidden mb-10">
                    <div className="flex flex-col justify-center items-center text-center text-white px-4 max-w-2xl">
                        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 uppercase">
                            Pricing & Equipments
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg">
                            Your construction rates and machines in one place.
                        </p>
                    </div>
                </div>

                {/* Labour Table */}
                <div className="px-1 mb-14">
                    <div className="text-center mb-8">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase mb-2">Labour Rates</h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600">
                            Detailed view of all current labour costs
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border border-gray-300 text-sm">
                            <thead className="bg-orange-100 uppercase text-sm">
                                <tr>
                                    <th className="px-4 py-3 border text-center whitespace-nowrap">Job Type</th>
                                    <th className="px-4 py-3 border text-center whitespace-nowrap">Hourly Rate</th>
                                    <th className="px-4 py-3 border text-center whitespace-nowrap">Minimum Hour</th>
                                    <th className="px-4 py-3 border text-center whitespace-nowrap">After Hour Rate</th> 
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {labours.map((labour) => (
                                    <tr key={labour._id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2 text-center">{labour.jobType}</td>
                                        <td className="border px-4 py-2 text-center">${labour.perHourRate}</td>
                                        <td className="border px-4 py-2 text-center">{labour.minHour} hrs</td>
                                         <td className="border px-4 py-2 text-center">${labour.afterHourRate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Equipment Cards */}
                <div className="px-1 mb-20">
                    <div className="text-center mb-10">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase mb-2">Equipments</h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600">
                            Browse available machinery with their specs
                        </p>
                    </div>

                    {equipments.length === 0 ? (
                        <div className="text-center text-gray-500 text-lg sm:text-xl py-10">
                            No equipment data available.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {equipments.slice().reverse().map((equipment) => (
                                <EquipmentCard key={equipment._id} equipment={equipment} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </SecondaryContainer>
    );
}
