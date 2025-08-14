import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EquipmentCard from "@/elements/individuals/admin/cards/EquipmentCard";
import AddEquipmentModal from "@/elements/individuals/admin/modals/AddEquipmentModal";
import AddLabourModal from "@/elements/individuals/admin/modals/AddLabourModal";
import LabourDeleteModal from "@/elements/individuals/admin/modals/LabourDeleteModal";
import UpdateLabourModal from "@/elements/individuals/admin/modals/UpdateLabourModal";

import { useGetEquipmentsQuery, useGetLaboursQuery } from "@/redux/api/projectApi";
import type { IEquipment, ILabour } from "@/types/types";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import { BounceLoader } from "react-spinners";

export default function ManageEquipmentsPage() {
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
        <>
            <section className="w-full">
                {/* Banner Section */}
                <div className="w-full h-[50vh] sm:h-[50vh] md:h-[40vh] xl:h-[40vh] bg-[url('/Banner-1.webp')] bg-fixed bg-center bg-cover flex items-center justify-center rounded-sm overflow-hidden mb-10">
                    <div className="flex flex-col justify-center items-center text-center text-white px-4 z-10 max-w-2xl">
                        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                            Manage Equipments & Labour Rates
                        </h2>
                        <p className="mb-6 text-sm sm:text-base md:text-lg">
                            Monitor and control your construction resources
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="text-sm px-4 py-3 bg-orange-500 hover:bg-orange-600 transition rounded-none text-white w-full sm:w-auto">
                                        Labour Rate
                                    </Button>
                                </DialogTrigger>
                                <AddLabourModal />
                            </Dialog>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="text-sm px-4 py-3 bg-orange-500 hover:bg-orange-600 transition rounded-none text-white w-full sm:w-auto">
                                        Add Equipment
                                    </Button>
                                </DialogTrigger>
                                <AddEquipmentModal />
                            </Dialog>
                        </div>
                    </div>
                </div>

                {/* Labour Rates Table */}
                <div className="mb-10">
                    <div className="text-center mb-10 px-4">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 uppercase">Current Labour Rate</h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600">
                            Below is the list of labour Rate you have added.
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border text-sm uppercase px-4 py-2 text-left whitespace-nowrap">Job Type</th>
                                    <th className="border text-sm uppercase px-4 py-2 text-left whitespace-nowrap">Per Hour Rate</th>
                                    <th className="border text-sm uppercase px-4 py-2 text-left whitespace-nowrap">Min Hour</th>
                                    <th className="border text-sm uppercase px-4 py-2 text-left whitespace-nowrap">After Hour Rate</th> 
                                    <th className="border text-sm uppercase px-1 py-2 text-right whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {labours.map((labour) => (
                                    <tr key={labour._id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{labour.jobType}</td>
                                        <td className="border px-4 py-2">${labour.perHourRate}</td>
                                        <td className="border px-4 py-2">{labour.minHour} hrs</td>
                                        <td className="border px-4 py-2">${labour.afterHourRate}</td>
                                        <td className="border px-2 py-2 whitespace-nowrap text-sm">
                                            <div className="flex justify-end gap-2">
                                                {/* Edit Icon Button */}
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            size="icon"
                                                            className="bg-none rounded-full text-white p-2"
                                                        >
                                                            <FiEdit size={16} />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <UpdateLabourModal labour={labour} />
                                                </Dialog>

                                                {/* Delete Icon Button */}
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            size="icon"
                                                            variant="destructive"
                                                            className="rounded-full p-2"
                                                        >
                                                            <FiTrash2 size={16} />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <LabourDeleteModal labourId={labour._id} />
                                                </Dialog>
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>

                {/* Equipment Grid */}
                <div className="px-0 mb-10">
                    <div className="text-center mb-10 px-4">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 uppercase">All Equipments</h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600">
                            Below is the list of Equipments you have added.
                        </p>
                    </div>
                    {equipments.length === 0 ? (
                        <p className="text-center text-gray-500 py-10">No equipment data available.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                            {equipments.slice().reverse().map((equipment) => (
                                <EquipmentCard key={equipment._id} equipment={equipment} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
