import Banner from "@/elements/individuals/user/home/Banner";
import ConstructionPortfolio from "@/elements/individuals/user/home/ConstructionPortfolio";
// import ConstructionPortfolio from "@/elements/individuals/home/ConstructionPortfolio";
import ContactForm from "@/elements/individuals/user/home/ContactForm";
import Services from "@/elements/individuals/user/home/Services";
import SuccessSection from "@/elements/individuals/user/home/SuccessSection";

export default function HomePage() {
  return (
    <>
      <Banner />
      <SuccessSection />
      <Services />
      <ConstructionPortfolio/>
      <ContactForm />
    </>
  );
}
