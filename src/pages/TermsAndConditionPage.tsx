import { useGetTermsQuery } from "@/redux/api/projectApi";
import { BounceLoader } from "react-spinners";
import SecondaryContainer from "@/layouts/containers/SecondaryContainer";

export default function TermsPage() {
  const { data, isLoading, isError } = useGetTermsQuery(undefined);

  return (
    <SecondaryContainer>
      <section className="w-full">
        {/* Banner */}
        <div className="w-full h-[45vh] bg-[url('/Banner-1.webp')] bg-center bg-cover flex items-center justify-center overflow-hidden mb-10">
          <div className="flex flex-col justify-center items-center text-center text-white px-4 max-w-2xl">
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 uppercase">
              Terms & Conditions
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-4">
              Please read our latest Terms & Conditions carefully before proceeding.
            </p>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center mb-10 px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase mb-2">
            Latest Terms Document
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            The document below outlines the rules, responsibilities, and agreements
            between our company and our clients.
          </p>
        </div>

        {/* PDF Viewer */}
        <div className=" pb-20">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <BounceLoader color="#f97316" size={80} />
            </div>
          ) : isError || !data?.data?.pdfUrl ? (
            <div className="text-center text-gray-500">
              The Terms & Conditions document is currently unavailable.
            </div>
          ) : (
            <>
              {/* Desktop/Laptop Viewer */}
              <div className="hidden md:block w-full h-screen border shadow-md mb-6">
                <iframe
                  src={data.data.pdfUrl}
                  className="w-full h-full"
                  title="Terms PDF"
                />
              </div>

              {/* Mobile/Tablet Viewer */}
              <div className="block md:hidden w-full h-screen border shadow-md mb-6">
                <iframe
                  src={`https://docs.google.com/gview?url=${encodeURIComponent(
                    data.data.pdfUrl
                  )}&embedded=true`}
                  className="w-full h-full bg-white"
                  title="Terms PDF"
                />
              </div>
            </>
          )}
        </div>
      </section>
    </SecondaryContainer>
  );
}
