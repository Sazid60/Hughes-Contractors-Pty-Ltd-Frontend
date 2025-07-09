import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteProjectMutation } from "@/redux/api/projectApi";
import { toast } from "sonner";

interface DeleteBookModalProps {
    projectId: string
}

export default function DeleteProjectModal({ projectId }: DeleteBookModalProps) {

    const [deleteProject, { isLoading }] = useDeleteProjectMutation();


    const handleDelete = async () => {
        const res = await deleteProject(projectId).unwrap();
        toast.success(res.message);
    }
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