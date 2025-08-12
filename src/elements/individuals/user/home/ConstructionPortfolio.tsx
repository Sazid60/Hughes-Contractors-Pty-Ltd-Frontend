"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


export default function ConstructionPortfolio() {
  const [activeTab, setActiveTab] = useState("mission")

  return (
    <section className=" py-8 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 justify-center items-center">

          {/* Left Side - Image */}
          <div className="relative w-full h-full">
            <img
              src="/contractorPortfolio.webp"
              alt="Construction worker building wooden frame"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div> 
          </div>



          {/* Right Side - Content */}
          <div className="flex flex-col justify-center">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-lg sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 uppercase">
                Construction Portfolio
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Hughes Contractors Pty Ltd delivers high-quality civil construction projects with a focus on safety,precision, and client satisfaction. From excavation to full-scale infrastructure, we bring hands-on expertise to every site.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Based in Botany, NSW, our family-owned team partners with clients across sectors to deliver tailored construction solutions. With modern equipment, experienced professionals, and a commitment to excellence, we help shape the infrastructure that supports growing communities.
              </p>
            </div>

            {/* Profile and ABN Section */}
            <div className=" text-center mb-6 gap-4">
              {/* Profile */}

              {/* ABN Number */}
              <div className="border-2 px-4 py-2 ">
                <p className="text-lg sm:text-xl font-bold text-orange-400">
                  ABN: 21633533276
                </p>
              </div>
            </div>

            {/* Mission/Vision Buttons */}
            <div className="flex mb-6">
              <Button
                onClick={() => setActiveTab("mission")}
                className={`px-6 py-2 text-xs font-semibold transition-colors border-r-0 rounded-none ${activeTab === "mission"
                  ? "bg-orange-500 text-white hover:bg-orange-600 border-orange-500"
                  : "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                variant={activeTab === "mission" ? "default" : "outline"}
              >
                Our Mission
              </Button>
              <Button
                onClick={() => setActiveTab("vision")}
                className={`px-6 py-2 text-xs font-semibold transition-colors rounded-none ${activeTab === "vision"
                  ? "bg-orange-500 text-white hover:bg-orange-600 border-orange-500"
                  : "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                variant={activeTab === "vision" ? "default" : "outline"}
              >
                Our Vision
              </Button>
            </div>

            {/* Mission/Vision Content */}
            <Card className=" rounded-none">
              <CardContent className="p-4 sm:p-6">
                <div className="">
                  {activeTab === "mission" ? (
                    <p className="text-sm  leading-relaxed italic">
                      We deliver high-quality civil construction and infrastructure services with a strong commitment to safety, professionalism, and client-focused outcomes. Based in Botany, NSW, we are a family-owned company supported by experienced engineers, a qualified quantity surveyor, and a skilled team of over 75. With access to unlimited trucks and trailers, we offer fast, tailored solutions for projects of all sizes. Our approach is built on reliability, accountability, and efficiency—ensuring every client receives exceptional service, on-time delivery, and lasting value on every project we manage.

                    </p>
                  ) : (
                    <p className="text-sm  leading-relaxed italic">
                      Our vision is to be a trusted civil construction partner in NSW—recognised for our innovation, integrity, and excellence in client delivery. We aim for sustainable growth while preserving our family-owned values of trust and transparency. By investing in our people, embracing new technology, and prioritizing safety and the environment, we strive to build a better future. Our goal is to create long-term client relationships and deliver infrastructure that strengthens communities, exceeds expectations, and sets new benchmarks for performance and professionalism in the industry.

                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section >
  )
}
