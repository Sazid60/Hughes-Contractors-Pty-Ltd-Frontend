import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FaArrowRight, FaHardHat, FaIndustry, FaTools, FaBuilding, FaSolarPanel, FaTruckMoving } from "react-icons/fa"

export default function Services() {
  const services = [
    {
      id: "01",
      title: "Civil Construction",
      description:
        "  Hi specialize in infrastructure and civil construction, including roads, drainage, earthworks, and structural concrete projects.",
      icon: FaHardHat,
    },
    {
      id: "02",
      title: "Plant Decommission",
      description:
        "Safe, compliant, and efficient decommissioning of industrial plants, ensuring minimal disruption and full regulatory adherence.",
      icon: FaIndustry,
    },
    {
      id: "03",
      title: "Demolition Consultant",
      description:
        "Expert demolition planning, regulatory guidance, and risk assessments to ensure a smooth and cost-effective demolition process.",
      icon: FaTools,
    },
    {
      id: "04",
      title: "Building & Construction Demolition",
      description:
        "Full-service demolition for residential and commercial properties, with a focus on safety, recycling, and site readiness.",
      icon: FaBuilding,
    },
    {
      id: "05",
      title: "Early Work Constructing",
      description:
        "We deliver early works including site clearance, temporary facilities, and access routes to fast-track your major projects.",
      icon: FaTruckMoving,
    },
    {
      id: "06",
      title: "Renewable Energy",
      description:
        "Supporting Australia’s energy future through civil and demolition works for solar farms, wind projects, and battery storage sites.",
      icon: FaSolarPanel,
    },
  ]

  return (
    <section className="relative min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl  font-bold mb-6 uppercase">Our Core Services</h2>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              Hughes Contractors Pty Ltd offers a diverse range of expert services tailored to meet modern construction,
              demolition, and infrastructure needs.
            </p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold self-start lg:self-auto rounded-none">
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
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 lg:p-12 h-full items-end">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <Card key={service.id} className=" bg-black/40 backdrop-blur-sm border-0 shadow-xl rounded-none">
                  <CardContent className="p-6 ">
                    {/* Icon and Number */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-orange-500 p-3 ">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-6xl font-bold text-gray-200 leading-none">{service.id}</span>
                    </div>

                    {/* Content */}
                    <h3 className="text-sm sm:text-lg  font-bold text-orange-500 mb-3">{service.title}</h3>
                    <p className="text-white text-xs sm:text-sm  leading-relaxed mb-4">{service.description}</p>

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
  )
}
