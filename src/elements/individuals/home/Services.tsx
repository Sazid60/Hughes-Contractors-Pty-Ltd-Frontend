import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import MainContainer from "@/layouts/MainContainer"
import { FaArrowRight, FaHardHat, FaIndustry, FaTools, FaBuilding, FaSolarPanel, FaTruckMoving, FaBroom, FaShieldAlt, FaLeaf } from "react-icons/fa"

export default function Services() {
  const services = [
    {
      id: "01",
      title: "Civil Construction",
      description:
        "We handle all stages of civil construction from earthworks and drainage to roadworks and site prep. Our skilled team ensures efficient delivery, safety compliance, and quality outcomes for commercial, residential, and government projects.",
      icon: FaHardHat,
    },
    {
      id: "02",
      title: "Plant Decommission",
      description:
        "We offer end-to-end industrial plant decommissioning, including planning, dismantling, and site restoration. Our approach ensures safety, regulatory compliance, and minimal disruption to surrounding operations.",
      icon: FaIndustry,
    },
    {
      id: "03",
      title: "Demolition Consultant",
      description:
        "We guide demolition projects with expert planning, risk assessments, permits, and waste management. Our consulting ensures safety, cost control, and full regulatory compliance from start to finish.",
      icon: FaTools,
    },
    {
      id: "04",
      title: "Building & Construction Demolition",
      description:
        "We support construction from excavation to structural work, offering skilled labor, equipment, and safety-focused operations for both small renovations and large-scale developments.",
      icon: FaBuilding,
    },
    {
      id: "05",
      title: "Early Work Constructing",
      description:
        "We manage pre-construction activities such as site clearing, leveling, access roads, and utility coordination to ensure smooth and risk-free project execution from the ground up.",
      icon: FaTruckMoving,
    },
    {
      id: "06",
      title: "Renewable Energy",
      description:
        "We support solar, wind, and battery projects with civil works, road access, trenching, and environmental management ensuring sustainable, compliant, and timely energy infrastructure delivery.",
      icon: FaSolarPanel,
    },
    {
      id: "07",
      title: "Decontamination Services",
      description:
        "Our licensed team removes hazardous materials like asbestos and lead under strict guidelines. We provide site assessment, safe removal, and post-clearance testing for total compliance.",
      icon: FaBroom, // New icon: Represents gear & handling
    },
    {
      id: "08",
      title: "Environment & Government Projects",
      description:
        "We work with councils and agencies on eco-sensitive projects like stormwater systems, park upgrades, and heritage preservation, ensuring sustainability and regulatory compliance.",
      icon: FaLeaf, // New icon: Represents eco/environmental efforts
    },
    {
      id: "09",
      title: "Defense Constructions",
      description:
        "We provide secure services for Defense sites, including excavation, civil works, and hazardous material removal delivering with full compliance to safety and Defense protocols.",
      icon: FaShieldAlt, // New icon: Represents defense/protection
    },

  ]
  return (
    <MainContainer>
      <section className="relative min-h-screen py-10 px-0 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-6 md:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 md:gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xl sm:text-4xl lg:text-5xl  font-bold mb-3 md:mb-6 uppercase">Our Core Services</h2>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Hughes Contractors Pty Ltd offers a diverse range of expert services tailored to meet modern construction,
                demolition, and infrastructure needs.
              </p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-xs md:text-sm font-semibold self-start lg:self-auto rounded-none">
              Book Appointment
              <FaArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Background Image with Service Cards */}
        <div className="max-w-7xl mx-auto">
          <div
            className="relative  overflow-hidden min-h-[600px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/services.jpg')",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Service Cards */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 p-2 md:p-8 lg:p-12 h-full items-end">
              {services.map((service) => {
                const IconComponent = service.icon
                return (
                  <Card key={service.id} className=" bg-black/40 backdrop-blur-sm border-0 shadow-xl rounded-none">
                    <CardContent className="p-6 ">
                      {/* Icon and Number */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-orange-500 p-3 ">
                          <IconComponent className="h-3 w-3 md:h-6 md:w-6 text-white" />
                        </div>
                        <span className="text-3xl md:text-6xl font-bold text-gray-200 leading-none">{service.id}</span>
                      </div>

                      {/* Content */}
                      <h3 className="text-sm sm:text-lg  font-bold text-orange-500 mb-3 text-center">{service.title}</h3>
                      <p className="text-white text-xs sm:text-sm  leading-relaxed mb-4 min-h-[90px] md:min-h-[150px] text-center">{service.description}</p>

                      {/* Read More Link */}
                      {/* <button className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors flex items-center group">
                      Read More
                      <FaArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button> */}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </MainContainer>

  )
}
