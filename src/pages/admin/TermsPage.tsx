// import { useGetTermsQuery } from "@/redux/api/projectApi";
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { BounceLoader } from "react-spinners";
// // import { toast } from "sonner";

// import AddTermsModal from "@/elements/individuals/admin/modals/AddTermsModal";

// export default function TermsPage() {
//   const { data, isLoading, isError } = useGetTermsQuery(undefined);
//   // const { data, isLoading, isError, refetch } = useGetTermsQuery(undefined);
//   // const [deleteTerms, { isLoading: isDeleting }] = useDeleteTermsMutation();

//   // const handleDelete = async () => {
//   //     try {
//   //         await deleteTerms().unwrap();
//   //         toast.success("Terms deleted successfully");
//   //         refetch();
//   //     } catch {
//   //         toast.error("Failed to delete Terms");
//   //     }
//   // };

//   return (
//     <section className="w-full">
//       {/* Banner Section */}
//       <div className="w-full h-[50vh] sm:h-[50vh] md:h-[40vh] xl:h-[40vh] bg-[url('/Banner-1.webp')] bg-fixed bg-center bg-cover flex items-center justify-center rounded-sm overflow-hidden mb-10">
//         <div className="flex flex-col justify-center items-center text-center text-white px-4 z-10 max-w-2xl">
//           <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
//             Manage Your Construction Projects
//           </h2>
//           <p className="mb-6 text-sm sm:text-base md:text-lg">
//             Add new projects to keep your records updated
//           </p>
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-none">
//                 Upload Terms PDF
//               </Button>
//             </DialogTrigger>
//             <AddTermsModal />
//           </Dialog>
//         </div>

//       </div>

//       <div className="text-center mb-10 px-4">
//         <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 uppercase">All Projects</h2>
//         <p className="text-sm sm:text-base md:text-lg text-gray-600">
//           Below is the list of projects you have added.
//         </p>
//       </div>

//       {/* PDF Viewer Section */}
//       <div className=" px-4 pb-20">
//         {isLoading ? (
//           <div className="flex justify-center items-center py-10">
//             <BounceLoader color="#f97316" size={80} />
//           </div>
//         ) : isError || !data?.data?.pdfUrl ? (
//           <div className="text-center text-gray-500">
//             No Terms PDF uploaded yet.
//           </div>
//         ) : (
//           <>
//             <div className="w-full h-screen border shadow-md mb-6">
//               <iframe
//                 src={data.data.pdfUrl}
//                 className="w-full h-full"
//                 title="Terms PDF"
//               />
//             </div>

//             {/* <div className="text-center">
//                             <Button
//                                 variant="destructive"
//                                 className="rounded-none"
//                                 onClick={handleDelete}
//                                 disabled={isDeleting}
//                             >
//                                 {isDeleting ? "Deleting..." : "Delete Terms PDF"}
//                             </Button>
//                         </div> */}
//           </>
//         )}
//       </div>
//     </section>
//   );
// }


import { useGetTermsQuery } from "@/redux/api/projectApi";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BounceLoader } from "react-spinners";
// import { toast } from "sonner";

import AddTermsModal from "@/elements/individuals/admin/modals/AddTermsModal";

export default function TermsPage() {
  const { data, isLoading, isError } = useGetTermsQuery(undefined);

  return (
    <section className="w-full">
      {/* Banner Section */}
      <div className="w-full h-[50vh] sm:h-[50vh] md:h-[40vh] xl:h-[40vh] bg-[url('/Banner-1.webp')] bg-fixed bg-center bg-cover flex items-center justify-center rounded-sm overflow-hidden mb-10">
        <div className="flex flex-col justify-center items-center text-center text-white px-4 z-10 max-w-2xl">
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            Manage Your Company’s Terms & Conditions
          </h2>
          <p className="mb-6 text-sm sm:text-base md:text-lg">
            Upload the latest Terms & Conditions document for transparency and compliance.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-none">
                Upload Terms PDF
              </Button>
            </DialogTrigger>
            <AddTermsModal />
          </Dialog>
        </div>
      </div>

      <div className="text-center mb-10 px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 uppercase">
          Current Terms & Conditions
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          View your most recently uploaded Terms & Conditions document below.
        </p>
      </div>

      {/* PDF Viewer Section */}
      <div className="px-4 pb-20">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <BounceLoader color="#f97316" size={80} />
          </div>
        ) : isError || !data?.data?.pdfUrl ? (
          <div className="text-center text-gray-500">
            No Terms PDF uploaded yet.
          </div>
        ) : (
          <>
            <div className="w-full h-screen border shadow-md mb-6">
              <iframe
                src={data.data.pdfUrl}
                className="w-full h-full"
                title="Terms PDF"
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
