import Banner from "@/elements/individuals/user/home/Banner";
import ConstructionPortfolio from "@/elements/individuals/user/home/ConstructionPortfolio";
import ContactForm from "@/elements/individuals/user/home/ContactForm";
import Services from "@/elements/individuals/user/home/Services";
import SuccessSection from "@/elements/individuals/user/home/SuccessSection";

import { BounceLoader } from "react-spinners";
import { useGetCertificationsQuery } from "@/redux/api/projectApi";
import Certificates from "@/elements/individuals/user/home/Certificates";

export default function HomePage() {
  const { data, isLoading, isError } = useGetCertificationsQuery(undefined);

  const certifications = data?.data || [];

  if (isLoading) {
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
      <ContactForm />

      {!isError && certifications.length > 0 && (
        <Certificates certifications={certifications} />
      )}
    </>
  );
}
