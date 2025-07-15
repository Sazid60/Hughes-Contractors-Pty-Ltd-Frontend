import { useGetProjectsQuery } from "@/redux/api/projectApi";
import type { IProject } from "@/types/types";
import SecondaryContainer from "@/layouts/containers/SecondaryContainer";
import { BounceLoader } from "react-spinners";
import ProjectCard from "@/elements/individuals/user/cards/ProjectCard";


export default function Projects() {
  const { data, isLoading, isError } = useGetProjectsQuery(undefined, {
    pollingInterval: 3000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const projects: IProject[] = data?.data ? [...data.data].reverse() : [];

  if (isLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center py-10">
        <BounceLoader color="#f97316" size={80} />
      </div>
    );
  }

  return (
    <>
      <SecondaryContainer>
        <section className="w-full">
          {/* Banner Section */}
          <div className="w-full h-[45vh] bg-[url('/Banner-1.webp')] bg-center bg-cover flex items-center justify-center overflow-hidden mb-10">
            <div className="flex flex-col justify-center items-center text-center text-white px-4 max-w-2xl">
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 uppercase">
                All Projects
              </h2>
              <p className="text-sm sm:text-base md:text-lg">
                Explore the list of all construction projects with detailed information.
              </p>
            </div>
          </div>

          {/* Error State */}
          {isError ? (
            <div className="text-center text-red-600 mb-6 px-4">
              <h1>Failed to load projects.</h1>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex justify-center items-center py-16 text-gray-500 text-lg sm:text-xl font-medium">
              No projects found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
              {projects.map((project: IProject) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </section>
      </SecondaryContainer>
    </>
  );
}
