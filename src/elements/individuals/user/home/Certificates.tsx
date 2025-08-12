/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetCertificationsQuery } from "@/redux/api/projectApi";
import { BounceLoader } from "react-spinners";

const Certificates = () => {
  const { data, isLoading, isError } = useGetCertificationsQuery(undefined);

  const certifications = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <BounceLoader color="#f97316" size={80} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 py-12">
        Failed to load certifications.
      </div>
    );
  }

  if (certifications.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        No certifications found.
      </div>
    );
  }

  return (
    <section className="w-full py-12 px-4 sm:px-8 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 uppercase">
          Our Certifications
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
          We are proud to hold certifications that validate our commitment to
          quality, safety, and excellence.
        </p>

        {/* Grid */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-6">
          {certifications.map((cert: any) => (
            <div
              key={cert._id}
              className="flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-30 md:h-30 rounded-lg shadow-sm overflow-hidden flex items-center justify-center bg-white">
                <img
                  src={cert.imageUrl || "/placeholder.png"}
                  alt={cert.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-1 text-xs font-medium text-gray-700">
                {cert.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
