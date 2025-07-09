import Banner from "@/elements/individuals/home/Banner";
import ConstructionPortfolio from "@/elements/individuals/home/ConstructionPortfolio";
import ContactForm from "@/elements/individuals/home/ContactForm";
import Services from "@/elements/individuals/home/Services";
import SuccessSection from "@/elements/individuals/home/SuccessSection";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <SuccessSection />
      <Services />
      <ConstructionPortfolio />
      <ContactForm />
    </div>
  );
}
