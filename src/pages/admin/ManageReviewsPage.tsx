import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { BounceLoader } from "react-spinners";
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useDeleteReviewMutation, useGetReviewsQuery } from "@/redux/api/reviewApi";
import AddReviewModal from "@/elements/individuals/admin/modals/AddReviewModal";
import UpdateReviewModal from "@/elements/individuals/admin/modals/UpdateReviewModal";


interface IReview {
  _id: string;
  name: string;
  designation: string;
  company: string;
  imageUrl: string;
  review: string;
}

export default function ManageReviews() {
  // Fetch reviews from Redux
  const { data, isLoading, isError } = useGetReviewsQuery(undefined, {
    pollingInterval: 3000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [deleteReview] = useDeleteReviewMutation();

  const reviews: IReview[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <BounceLoader color="#f97316" size={80} />
      </div>
    );
  }

  return (
    <section className="w-full md:mt-15 lg:mt-0">
      {/* Banner */}
      <div className="w-full h-[50vh] sm:h-[50vh] md:h-[40vh] xl:h-[40vh] bg-[url('/Banner-1.webp')] bg-fixed bg-center bg-cover flex items-center justify-center rounded-sm overflow-hidden mb-10">
        <div className="flex flex-col justify-center items-center text-center text-white px-4 z-10 max-w-2xl">
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            Manage Customer Reviews
          </h2>
          <p className="mb-6 text-sm sm:text-base md:text-lg">
            Add, update, or delete customer reviews.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-sm px-4 py-3 flex gap-2 items-center bg-orange-500 hover:bg-orange-600 transition rounded-none text-white">
                Add Review
              </Button>
            </DialogTrigger>
            <AddReviewModal />
          </Dialog>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 uppercase">
          All Reviews
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          Below is the list of customer reviews you have added.
        </p>
      </div>

      {/* Error / Empty State */}
      {isError ? (
        <div className="text-center text-red-600 mb-6 px-4">
          <h1>Failed to load reviews.</h1>
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex justify-center items-center py-16 text-gray-500 text-lg sm:text-xl font-medium">
          No reviews found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 px-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="relative bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
            >
              {/* Action Buttons */}
              <div className="absolute top-3 right-3 flex gap-2 z-10">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="p-2 rounded-full bg-orange-600 shadow hover:bg-orange-700 transition" title="Edit Review">
                      <FaEdit className="text-white h-4 w-4" />
                    </button>
                  </DialogTrigger>
                  <UpdateReviewModal review={review} />
                </Dialog>
                <button
                  className="p-2 rounded-full bg-orange-600 shadow hover:bg-orange-700 transition"
                  title="Delete Review"
                  onClick={() => deleteReview(review._id)}
                >
                  <FiTrash2 className="text-white h-4 w-4" />
                </button>
              </div>

              {/* Review Text */}
              <div className="p-5 flex flex-col flex-1 mt-8">
                <p className="text-sm mb-3 line-clamp-3">{review.review}</p>

                {/* Reviewer Info */}
                <div className="flex items-center justify-between mt-auto">
                  <img
                    src={review.imageUrl}
                    alt={review.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow"
                  />
                  <div className="flex flex-col text-right">
                    <h3 className="font-semibold text-sm sm:text-base">{review.name}</h3>
                    <p className="text-xs sm:text-sm italic text-gray-500">
                      {review.designation} | <span className="text-orange-600">{review.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
