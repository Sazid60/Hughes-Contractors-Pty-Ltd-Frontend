// import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddProjectModal from "@/elements/individuals/admin/AddProjectModal";
import { useGetProjectsQuery } from "@/redux/api/projectApi";
import type { IProject } from "@/types/types";
import { FaPlus } from "react-icons/fa";


export default function ManageProjects() {
    const { data, isLoading, isError, error } = useGetProjectsQuery(undefined, {
        pollingInterval: 3000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    console.log({ data, isLoading, isError, error })
    const projects: IProject[] = data?.data ? [...data.data].reverse() : [];

    console.log(projects)

    console.log()

    return (
        <div>
            <div className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] xl:h-[70vh] bg-[url('/Banner.jpg')]  bg-fixed bg-center bg-cover flex items-center justify-center rounded-xl overflow-hidden mb-10">
                <div className="  flex flex-col justify-center items-center text-center text-white px-4 z-10">
                    <h2 className="text-lg md:text-3xl lg:text-4xl font-bold mb-2">
                        Manage Your Construction Projects
                    </h2>
                    <p className="mb-6 text-sm md:text-lg">
                        Add new projects to keep your records updated
                    </p>
                    <Dialog >
                        <DialogTrigger asChild>
                            <Button
                                className="text-sm p-6  bg-orange-500 hover:bg-orange-600 transition rounded-none text-white"
                            >
                                <FaPlus />
                                Add Project
                            </Button>
                        </DialogTrigger>
                        <AddProjectModal />
                    </Dialog>
                </div>
            </div>
            <div className="text-center my-6">
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2">All Projects</h2>
                <p className="text-base md:text-lg text-gray-600">
                    Below is the list of projects you have added.
                </p>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-10">
                    {/* <BounceLoader color="#f97316" size={80} /> */}
                    Loading...........
                </div>
            ) : isError ? (
                <div className="text-center text-red-600 mb-6">
                    <h1>
                        Failed to load projects.
                    </h1>

                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-16">
                    {projects.map((project: IProject) => (
                        <div key={project.title} className="bg-white shadow rounded p-4 space-y-2">
                            <img
                                src={project.projectImage}
                                alt={project.title}
                                className="w-full h-48 object-cover rounded"
                            />
                            <h3 className="text-lg font-bold">{project.title}</h3>
                            <p className="text-sm text-gray-600">{project.client}</p>
                            <p className="text-sm text-gray-600">{project.location}</p>
                            <p className="text-xs text-gray-500">{project.projectYear} • {project.duration}</p>
                            <p className="text-sm">{project.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
