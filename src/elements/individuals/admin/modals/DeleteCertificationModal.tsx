/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteCertificationMutation } from "@/redux/api/projectApi";

import { toast } from "sonner";

interface DeleteCertificationModalProps {
    certificationId: string;
}

export default function DeleteCertificationModal({ certificationId }: DeleteCertificationModalProps) {
    const [deleteCertification, { isLoading }] = useDeleteCertificationMutation();

    const handleDelete = async () => {
        try {
            const res = await deleteCertification(certificationId).unwrap();
            toast.success(res.message);
        } catch (error : any) {
            console.log(error)
            toast.error("Failed to delete certification.");
        }
    };

    return (
        <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
                <DialogTitle>Are You Sure You Want To Delete?</DialogTitle>
                <DialogDescription>
                    Once deleted, the data cannot be recovered.
                </DialogDescription>
            </DialogHeader>

            <DialogFooter>
                <DialogClose asChild>
                    <Button className="rounded-none" variant="outline" disabled={isLoading}>
                        Cancel
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="bg-red-600 hover:bg-red-500 text-white rounded-none"
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
}
