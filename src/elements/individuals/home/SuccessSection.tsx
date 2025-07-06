import { Card, CardContent } from "@/components/ui/card";
import { FiUsers, FiPhone } from "react-icons/fi";
import { FaAward, FaTrophy, FaHome } from "react-icons/fa";
import CountUp from "react-countup";

export default function SuccessSection() {
    const stats = [
        { icon: FiUsers, number: 120, suffix: "+", label: "Happy Clients" },
        { icon: FaAward, number: 25, suffix: "+", label: "Years in Industry" },
        { icon: FaTrophy, number: 186, suffix: "+", label: "Projects Recognized" },
        { icon: FaHome, number: 360, suffix: "+", label: "Properties Delivered" },
    ];

    return (
        <section className="bg-gray-900 text-white py-8 md:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 uppercase">
                        Your Trusted Construction Agent
                    </h2>
                    <p className=" max-w-3xl mx-auto text-sm sm:text-base lg:text-lg">
                        With over two decades of experience in residential and commercial construction, we take pride in transforming visions into durable, high-quality structures on time and on budget.
                    </p>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:col-span-1">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <Card key={index} className="bg-gray-800 border-none flex flex-col justify-center items-center rounded-none">
                                    <CardContent className="p-3 text-center">
                                        <div className="flex justify-center mb-4">
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-2xl sm:text-3xl font-bold mb-1 text-white">
                                            <CountUp end={stat.number} duration={2} />
                                            {stat.suffix}
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">
                                            {stat.label}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Info Card */}
                    <div className="lg:col-span-2">
                        <Card className="relative overflow-hidden min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] bg-gray-800 rounded-none border-none">
                            {/* Background Image */}
                            <img
                                src="/contractor.jpg"
                                alt="Contractor at work"
                                className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-900/90 to-gray-800/60 z-10" />

                            {/* Foreground Content */}
                            <CardContent className="relative z-20 h-full p-3 sm:p-8 lg:p-10 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-white">
                                        Start Building Now
                                    </h3>
                                    <p className="text-white mb-6 text-xs sm:text-sm leading-relaxed">
                                        From modern family homes to complex commercial developments, we provide complete end-to-end construction solutions. Our team of licensed professionals delivers projects built with precision, integrity, and a commitment to excellence.
                                    </p>
                                    <div className="mb-8">
                                        <h4 className="text-lg sm:text-xl font-semibold mb-3 text-white">
                                            <span className="text-orange-500">Planning & Design Expertise:</span>
                                        </h4>
                                        <p className="text-white text-xs sm:text-sm">
                                            We collaborate closely with clients to develop customized blueprints that meet functionality, safety, and aesthetic goals—while ensuring compliance with all regulations and codes.
                                        </p>
                                    </div>
                                </div>

                                {/* Contact Section */}
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <FiPhone className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <a href="tel:+61283849867" className="text-sm sm:text-lg font-bold text-white hover:underline">
                                            +61 2 8384 9867
                                        </a>
                                        <div className="text-xs text-gray-400">Call us for a free consultation</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
