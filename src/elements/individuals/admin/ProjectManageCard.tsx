import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { IProject } from "@/types/types";
import { FiTrash2 } from "react-icons/fi";
import DeleteProjectModal from "./DeleteProjectModal";
import ProjectUpdateModal from "./ProjectUpdateModal";
import { FaEdit } from "react-icons/fa";


interface ProjectCardProps {
    project: IProject;
}

export default function ProjectManageCard({ project }: ProjectCardProps) {
    return (
        <div className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full overflow-hidden">
            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex gap-2 z-10">
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <button
                                title="Edit Project"
                                className="p-2 rounded-full bg-orange-600 shadow hover:bg-orange-700 transition"
                            >
                                <FaEdit className="text-white h-4 w-4" />
                            </button>
                        </DialogTrigger>
                        <ProjectUpdateModal project={project} />
                    </Dialog>
                </div>
                <div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <button
                                title="Delete Project"
                                className="p-2 rounded-full bg-orange-600 shadow hover:bg-orange-700 transition"
                            >
                                <FiTrash2 className="text-white text-base sm:text-lg" />
                            </button>
                        </DialogTrigger>
                        <DeleteProjectModal projectId={project._id} />
                    </Dialog>
                </div>
            </div>

            {/* Project Image */}
            <img
                src={project.projectImage}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-xl border-b border-gray-200"
            />

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold  mb-3">
                    {project.title}
                </h3>

                {/* Meta Info */}
                <div className="text-sm  mb-3 space-y-1">
                    <p><span className="font-semibold">Client : </span> {project.client}</p>
                    <p><span className="font-semibold">Location : </span> {project.location}</p>
                </div>

                {/* Year and Duration */}
                <p className="text-sm  mb-3">
                    <span className="font-semibold">Delivered : </span> {project.projectYear} • {project.duration}
                </p>

                {/* Description */}
                <div className="text-sm  mt-auto">
                    <p className="font-semibold mb-1">Description : </p>
                    <p className="line-clamp-3">{project.description}</p>
                </div>
            </div>
        </div>
    );
}
