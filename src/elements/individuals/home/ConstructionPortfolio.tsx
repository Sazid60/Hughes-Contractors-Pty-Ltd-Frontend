import { useState } from "react";
import MainContainer from "@/layouts/MainContainer";

export default function ConstructionPortfolio() {
  const [activeTab, setActiveTab] = useState<"mission" | "vision">("mission");
  return (
    <MainContainer>
      <section className="bg-white py-12 px-4 md:px-10 lg:px-20">


        <div className="grid grid-cols-1 lg:grid-cols-2  gap-10 items-start">
          {/* === Left Image Section === */}
          <div className="w-full">
            <img
              src="/contractor-1.jpg"
              alt="Construction Site"
              className="w-full  h-full rounded-lg shadow-md object-cover"
            />
          </div>

          {/* === Right Content Section === */}
          <div className="space-y-8">
            {/* === Project Overview === */}
            <div>
              {/* === Section Title === */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-10 uppercase text-left ">
                Explore Our Construction Portfolio
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                Project Overview
              </h2>
              <h5 className="text-xs md:text-sm text-gray-600 mb-3">
                Quis nulla blandit vulputate morbi adipiscing sem vestibulum.
                Nulla turpis integer dui sed posuere sem. Id molestie mi arcu
                gravida lorem potenti.
              </h5>
              <p className="text-xs md:text-sm text-gray-600">
                Elever Architecture is a New-York-based studio practice focused
                on modern design, interiors and landscapes. From our inception in
                2007, we have delivered exceptional public and private
                environments that are stimulating to occupy and fundamental to
                their surroundings.
              </p>
            </div>

            {/* === Architect Info === */}
            <div className="flex items-center gap-4 mt-4">
              <img
                src="/contractor-1.jpg"
                alt="Architect"
                className="w-14 h-14 object-cover rounded-full border"
              />
              <div>
                <span className="block font-semibold text-sm text-gray-800">
                  Markus Danile
                </span>
                <span className="block text-xs text-gray-500">
                  Architect Studio
                </span>
              </div>
            </div>

            {/* === Mission & Vision === */}
            <div>
              {/* === Tab Buttons === */}
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setActiveTab("mission")}
                  className={`px-4 py-2 rounded font-semibold transition-all ${activeTab === "mission"
                    ? "bg-orange-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  Mission
                </button>
                <button
                  onClick={() => setActiveTab("vision")}
                  className={`px-4 py-2 rounded font-semibold transition-all ${activeTab === "vision"
                    ? "bg-orange-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  Vision
                </button>
              </div>

              {/* === Tab Title === */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-orange-500">
                Our {activeTab === "mission" ? "Mission" : "Vision"}
              </h2>

              {/* === Tab Content === */}
              <p className="text-xs md:text-sm text-gray-700">
                {activeTab === "mission" ? (
                  <>
                    t Hughes Contractors Pty Ltd, our mission is to provide dependable, high-quality civil construction and infrastructure services that uphold the highest standards of safety, efficiency, and professionalism. Based in Botany, NSW, we are a family-owned and operated business with a hands-on approach to every project. Backed by a team of experienced engineers, a qualified quantity surveyor, and a skilled workforce of over 75 employees and subcontractors, we are well-positioned to manage and deliver projects of varying scope and complexity throughout Sydney.

                    We pride ourselves on offering tailored solutions that combine technical expertise, modern equipment, and industry best practices. With access to a fleet of unlimited trucks and trailers, we are able to respond quickly and effectively to the evolving needs of our clients. Our company culture is built on reliability, accountability, and a genuine commitment to the welfare of our people. We continuously refine our work practices to ensure projects are completed on time, within budget, and with minimal disruption—while maintaining an unwavering focus on safety, quality, and client satisfaction.

                  </>
                ) : (
                  <>
                    Hughes Contractors Pty Ltd envisions becoming a premier civil construction partner in New South Wales, recognised for our integrity, innovation, and excellence in project delivery. We aspire to be a company of choice for government agencies, private developers, and infrastructure partners by consistently demonstrating our ability to meet complex project demands with professionalism, agility, and care.

                    Our long-term vision is to grow sustainably while maintaining the values of a family-owned business—ensuring that trust, transparency, and personal accountability remain at the core of everything we do. We aim to lead by example in workplace safety, environmental stewardship, and community engagement. By investing in our people, embracing technological advancement, and building strong industry relationships, we seek to contribute meaningfully to the development of Sydney infrastructure and set new standards for excellence in the civil construction industry.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainContainer>
  );
}
