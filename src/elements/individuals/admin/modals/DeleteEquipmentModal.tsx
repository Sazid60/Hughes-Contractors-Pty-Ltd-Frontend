import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteEquipmentMutation } from "@/redux/api/projectApi";
import { toast } from "sonner";

interface DeleteEquipmentModalProps {
    equipmentId: string;
}

export default function EquipmentDeleteModal({ equipmentId }: DeleteEquipmentModalProps) {
    const [deleteEquipment, { isLoading }] = useDeleteEquipmentMutation();

    const handleDelete = async () => {
        const res = await deleteEquipment(equipmentId).unwrap();
        toast.success(res.message || "Equipment deleted successfully");
    };

    return (
        <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
                <DialogTitle>Are you sure you want to delete?</DialogTitle>
                <DialogDescription>
                    Once deleted, this equipment cannot be recovered.
                </DialogDescription>
            </DialogHeader>

            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline" className="rounded-none" disabled={isLoading}>
                        Cancel
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-500 text-white rounded-none"
                        disabled={isLoading}
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
}
