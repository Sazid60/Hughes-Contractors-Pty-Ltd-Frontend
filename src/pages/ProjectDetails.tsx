import { useParams, useNavigate } from "react-router";
import { useGetProjectByIdQuery } from "@/redux/api/projectApi";
import SecondaryContainer from "@/layouts/containers/SecondaryContainer";

export default function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, isError } = useGetProjectByIdQuery(id!);
    const project = data?.data;

    if (isLoading) {
        return (
            <p className="p-4 text-center text-orange-600">Loading project details...</p>
        );
    }

    if (isError || !project) {
        return (
            <p className="p-4 text-center text-red-600">Project not found or failed to load.</p>
        );
    }

    return (
        <>
            <SecondaryContainer>
                <div className=" md:px-8 md:py-6 lg:py-10">

                    {/* Container: side by side on md+, stacked on sm */}
                    <div className="flex flex-col lg:flex-row md:gap-8">

                        {/* Image */}
                        <div className="md:flex-1 md:h-auto overflow-hidden border border-gray-700 shadow-md">
                            <img
                                src={project.projectImage}
                                alt={project.title}
                                className="w-full h-full object-cover block"
                                style={{ minHeight: "300px" }}
                            />
                        </div>

                        {/* Details */}
                        <div className="md:flex-1 bg-opacity-80 backdrop-blur-md border border-gray-700 p-3 md:p-4 shadow-lg  mt-6 md:mt-0 flex flex-col justify-center">

                            <h1 className="text-lg sm:text-3xl font-bold mb-6 text-orange-600">{project.title}</h1>

                            <div className="space-y-3 text-xs sm:text-sm leading-relaxed">
                                <p>
                                    <span className="font-semibold text-orange-600">Client:</span> {project.client}
                                </p>
                                <p>
                                    <span className="font-semibold text-orange-600">Location:</span> {project.location}
                                </p>
                                <p>
                                    <span className="font-semibold text-orange-600">Delivered:</span> {project.projectYear}
                                    <span className="text-orange-600"> • {project.duration}</span>
                                </p>
                                <p className="italic">{project.description}</p>
                            </div>

                            {/* Back Button below details on large screens */}
                            <button
                                onClick={() => navigate(-1)}
                                className="mt-8 text-orange-600 hover:text-orange-500 font-semibold self-start text-xs"
                            >
                                ← Back to Projects
                            </button>
                        </div>
                    </div>
                </div>
            </SecondaryContainer>
        </>
    );
}
