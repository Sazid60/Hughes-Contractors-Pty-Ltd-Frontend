import Marquee from "react-fast-marquee";
import { Card, CardContent } from "@/components/ui/card";

interface CustomerFeedbackProps {
  feedbacks: {
    name: string;
    designation: string;
    company: string;
    imageUrl: string;
    review: string;
  }[];
}

export default function CustomerFeedback({ feedbacks }: CustomerFeedbackProps) {
  if (!feedbacks || feedbacks.length === 0) return null;

  return (
    <section className="mt-10 px-4 sm:px-6 bg-background mb-20">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-lg sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 uppercase">
          Customer Feedback
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
          What our customers are saying about our ride management services.
        </p>
      </div>

      <Marquee pauseOnHover gradient={false} speed={30} className="pl-2 sm:pl-6">
        <div className="flex gap-4 sm:gap-6 mr-6">
          {feedbacks.map((fb, idx) => (
            <Card
              key={idx}
              className="flex-shrink-0 w-[85vw] sm:w-72 md:w-80 lg:w-96 bg-white p-4 sm:p-6 border shadow-lg rounded-none"
            >
              <CardContent className="p-0 flex flex-col gap-4 h-full">
                {/* Fixed height review container with ellipsis */}
                <div className="text-xs sm:text-sm leading-relaxed text-gray-700 text-left h-24 overflow-hidden">
                  {fb.review.length > 200 ? fb.review.slice(0, 200) + "..." : fb.review}
                </div>

                <div className="flex items-center justify-between gap-3 mt-2">
                  <img
                    src={fb.imageUrl || "https://i.pravatar.cc/100?img=default"}
                    alt={fb.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow"
                  />
                  <div className="flex flex-col text-right">
                    <h3 className="font-semibold text-sm md:text-base">{fb.name}</h3>
                    <p className="text-xs sm:text-sm italic text-gray-500">
                      {fb.designation} <br />
                      <span className="text-xs sm:text-sm text-orange-600 font-medium">
                        {fb.company}
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Marquee>
    </section>
  );
}
