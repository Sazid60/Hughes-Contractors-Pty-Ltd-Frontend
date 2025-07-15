// components/ProjectCard.tsx
import type { IProject } from "@/types/types";
import { Link } from "react-router";


export default function ProjectCard({ project }: { project: IProject }) {
    return (
        <Link to={`/projects/${project._id}`}>

            <div className="relative w-full h-64 overflow-hidden group border border-gray-200 rounded-none shadow-md hover:cursor-pointer">
                {/* Background Image */}
                <img
                    src={project.projectImage}
                    alt={project.title}
                    className="object-cover w-full h-full transition-all duration-300 group-hover:blur-[1px] group-hover:scale-105"
                />

                {/* Title Only (Before Hover) */}
                <div className="absolute bottom-0 left-0 w-full bg-black/40 text-orange-600 px-4 py-2 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0 rounded-none">
                    <h3 className="text-lg font-semibold truncate">{project.title}</h3>
                </div>

                {/* Full Info (On Hover) */}
                <div className="absolute inset-0 flex flex-col justify-start px-4 py-4 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm rounded-none">
                    <h3 className="text-lg font-bold truncate mb-1 text-orange-600">{project.title}</h3>
                    <p className="text-sm">
                        <span className="font-semibold text-orange-600">Client:</span> {project.client}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold text-orange-600">Location:</span> {project.location}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold text-orange-600">Delivered:</span> {project.projectYear}
                        <span className="text-orange-600"> • {project.duration}</span>
                    </p>

                    {/* Fixed-height truncated description */}
                    <p className="text-sm mt-2 line-clamp-3 max-h-[4.5rem] overflow-hidden text-ellipsis italic">
                        {project.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}
