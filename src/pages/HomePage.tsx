import Banner from "@/elements/individuals/user/home/Banner";
import ConstructionPortfolio from "@/elements/individuals/user/home/ConstructionPortfolio";
import ContactForm from "@/elements/individuals/user/home/ContactForm";
import Services from "@/elements/individuals/user/home/Services";
import SuccessSection from "@/elements/individuals/user/home/SuccessSection";
import Certificates from "@/elements/individuals/user/home/Certificates";
import CustomerFeedback from "@/elements/individuals/user/home/CustomerFeedback";

import { BounceLoader } from "react-spinners";
import { useGetCertificationsQuery } from "@/redux/api/projectApi";
import { useGetReviewsQuery } from "@/redux/api/reviewApi";

export default function HomePage() {
  const { data: certData, isLoading: certLoading, isError: certError } = useGetCertificationsQuery(undefined);
  const { data: reviewData, isLoading: reviewLoading, isError: reviewError } = useGetReviewsQuery(undefined);

  const certifications = certData?.data || [];
  const reviews = reviewData?.data || [];

  if (certLoading || reviewLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <BounceLoader color="#f97316" size={80} />
      </div>
    );
  }

  return (
    <>
      <Banner />
      <SuccessSection />
      <Services />
      <ConstructionPortfolio />

      {/* Only render if there are reviews */}
      {!reviewError && reviews.length > 0 && (
        <CustomerFeedback feedbacks={reviews} />
      )}

      <ContactForm />

      {!certError && certifications.length > 0 && (
        <Certificates certifications={certifications} />
      )}
    </>
  );
}
