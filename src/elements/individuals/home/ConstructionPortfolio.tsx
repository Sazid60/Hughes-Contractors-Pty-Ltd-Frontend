import { useState } from "react";
import constructionImage from "/construction-portfolio.webp";
import constructionMan from "/image-5.png";

export default function ConstructionPortfolio() {
    const [activeTab, setActiveTab] = useState<"mission" | "vision">("mission");
  return (
    <section className="bg-white py-12 px-4 md:px-10 lg:px-20">
   

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* === Left Image Section === */}
        <div className="w-full">
          <img
            src={constructionImage}
            alt="Construction Site"
            className="w-full  lg:h-[550px]  rounded-lg shadow-md object-cover"
          />
        </div>

        {/* === Right Content Section === */}
        <div className="space-y-8">
          {/* === Project Overview === */}
          <div>
               {/* === Section Title === */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 uppercase text-center text-gray-800">
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
              src={constructionMan}
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
          className={`px-4 py-2 rounded font-semibold transition-all ${
            activeTab === "mission"
              ? "bg-orange-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Mission
        </button>
        <button
          onClick={() => setActiveTab("vision")}
          className={`px-4 py-2 rounded font-semibold transition-all ${
            activeTab === "vision"
              ? "bg-orange-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Vision
        </button>
      </div>

      {/* === Tab Title === */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 text-orange-500">
        Our {activeTab === "mission" ? "Mission" : "Vision"}
      </h2>

      {/* === Tab Content === */}
      <p className="text-xs md:text-sm text-gray-700">
        {activeTab === "mission" ? (
          <>
            We build multi-family and affordable housing communities,
            industrial facilities, public and private healthcare facilities,
            fitness centers and office buildings. We improve the supply chain
            management process, increase operational efficiency and contribute
            to community well-being through thoughtful, sustainable
            construction.
          </>
        ) : (
          <>
            To be a leading force in the construction industry, setting
            benchmarks for safety, quality, and environmental responsibility. We
            envision shaping communities with innovative designs and lasting
            value.
          </>
        )}
      </p>
    </div>
        </div>
      </div>
    </section>
  );
}
