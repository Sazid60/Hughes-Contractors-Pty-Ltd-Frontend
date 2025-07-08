import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FaArrowRight, FaHardHat, FaIndustry, FaTools, FaBuilding, FaSolarPanel, FaTruckMoving } from "react-icons/fa"

export default function Services() {
  const services = [
    {
      id: "01",
      title: "Civil Construction",
      description:
        " Our civil construction services encompass all phases of infrastructure development, including bulk earthworks, excavation, storm water and drainage system installation, roadworks, and site preparation. We have extensive experience working on commercial, residential, and government projects where precision, safety, and adherence to strict timelines are critical. Utilizing advanced equipment and a skilled workforce, we ensure efficient project delivery while maintaining environmental and safety standards.",
      icon: FaHardHat,
    },
    {
      id: "02",
      title: "Plant Decommission",
      description:
        "We specialize in the controlled decommissioning of industrial plants and equipment, offering a turnkey service from initial planning through to dismantling, removal, and site rehabilitation. Our approach focuses on environmental risk management, compliance with all regulatory requirements, and minimizing disruption to ongoing operations. We work closely with clients to develop customized decommissioning plans that ensure safety and cost efficiency throughout the project lifecycle..",
      icon: FaIndustry,
    },
    {
      id: "03",
      title: "Demolition Consultant",
      description:
        "Our demolition consulting team provides expert guidance to ensure projects are executed safely, efficiently, and in full compliance with local regulations and environmental standards. We assist with demolition methodology development, risk assessments, permit applications, and waste management planning. By integrating best practices and innovative solutions, we help clients mitigate risks, control costs, and reduce environmental impact during demolition activities.",
      icon: FaTools,
    },
    {
      id: "04",
      title: "Building & Construction Demolition",
      description:
        "We provide comprehensive support for building and construction projects, offering skilled labour, excavation services, and construction assistance from the early groundwork stages through to structural completion. Our team collaborates with builders and developers to deliver foundation works, earthmoving, and material handling with a focus on quality, safety, and timeliness. Whether for small renovations or large-scale developments, we tailor our approach to meet project requirements.",
      icon: FaBuilding,
    },
    {
      id: "05",
      title: "Early Work Constructing",
      description:
        "Our early works contracting services provide the essential groundwork to prepare sites for main construction activities. This includes vegetation clearing, site levelling, temporary access roads, utility location and coordination, and initial excavation. By managing these early stages effectively, we help streamline project delivery and minimize downstream risks and delays.",
      icon: FaTruckMoving,
    },
    {
      id: "06",
      title: "Renewable Energy",
      description:
        "As the renewable energy sector grows, we are proud to support wind, solar, and battery storage projects with specialist civil works, infrastructure preparation, and site services. Our expertise includes earthworks, trenching for electrical conduits, access road construction, and environmental management to facilitate smooth project progression. We understand the unique challenges of renewable projects and work to minimize environmental impact while meeting tight schedules.",
      icon: FaSolarPanel,
    },
    {
      id: "07",
      title: "Decontamination Services",
      description:
        "Our certified decontamination team specializes in the safe removal and disposal of hazardous materials such as asbestos, lead, and other environmental contaminants. We operate under strict NSW regulations and industry best practices to protect workers, the public, and the environment. Our services include site assessments, abatement planning, controlled removal, and post-clearance testing, ensuring complete site safety and compliance.",
      icon: FaSolarPanel,
    },
    {
      id: "08",
      title: "Environment & Government Projects",
      description:
        "We partner with local councils, state government bodies, and environmental agencies to deliver critical infrastructure and remediation projects that meet stringent regulatory, ecological, and heritage requirements. Our work includes storm water management systems, park upgrades, site remediation, and heritage conservation. We prioritize compliance, sustainability, and community impact in every project.",
      icon: FaSolarPanel,
    },
    {
      id: "09",
      title: "Defense Constructions",
      description:
        "We deliver secure, compliant services to Australia’s Defense sector, including excavation, civil works, internal strip-outs, and licensed hazardous material removal. With experience working in high-security environments such as naval bases and government facilities, we operate with strict adherence to Defense protocols, WHS standards, and environmental regulations. Our team ensures every project is handled with discretion, safety, and precision.",
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
