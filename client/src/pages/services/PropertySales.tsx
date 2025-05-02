
import ServiceLayout from "@/components/services/ServiceLayout";
import { Check } from "lucide-react";

const PropertySales = () => {
  const benefits = [
    "Access to exclusive property listings",
    "Market analysis and valuation services",
    "Negotiation expertise for the best price",
    "Comprehensive marketing for your property",
    "Support through the entire sales process",
    "Legal guidance on property transactions"
  ];

  const process = [
    {
      title: "Initial Consultation",
      description: "We'll discuss your needs, budget, and preferences to understand what you're looking for in a property."
    },
    {
      title: "Property Search",
      description: "Our team will curate a selection of properties that match your criteria from our extensive database."
    },
    {
      title: "Viewings",
      description: "We'll arrange viewings of selected properties at times convenient for you."
    },
    {
      title: "Negotiation",
      description: "Once you find your ideal property, we'll negotiate the best possible price and terms on your behalf."
    },
    {
      title: "Legal Process",
      description: "We'll guide you through the legal requirements and documentation needed for the purchase."
    },
    {
      title: "Closing",
      description: "We'll be with you every step of the way until the keys are in your hand."
    }
  ];

  return (
    <ServiceLayout 
      title="Property Sales"
      description="Find your dream home or sell your property for the best market price"
      image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1774&auto=format&fit=crop"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-[#1A237E] mb-6">We Help You Buy or Sell with Confidence</h2>
          <p className="mb-6">
            At Samcom Properties, we understand that buying or selling a property is one of the most significant financial decisions you'll make. Our experienced team of property sales professionals is dedicated to making this process as smooth and successful as possible.
          </p>
          <p className="mb-6">
            Whether you're looking to find your dream home or sell your current property at the best market price, we offer comprehensive services tailored to your specific needs. Our deep knowledge of the Kenyan real estate market enables us to provide expert guidance at every stage.
          </p>
          <h3 className="text-2xl font-semibold text-[#1A237E] mb-4">Why Choose Our Property Sales Services?</h3>
          <ul className="space-y-3 mb-8">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-600 mt-1 mr-2 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl font-semibold text-[#1A237E] mb-6">Our Property Sales Process</h3>
          <div className="space-y-6">
            {process.map((step, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                <div className="flex items-center mb-2">
                  <div className="bg-[#1A237E] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <h4 className="font-semibold text-xl">{step.title}</h4>
                </div>
                <p className="pl-11 text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default PropertySales;
