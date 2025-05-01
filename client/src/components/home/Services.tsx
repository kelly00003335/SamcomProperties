import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Key, 
  TrendingUp, 
  FileText 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Home className="h-8 w-8" />,
      title: "Property Sales",
      description: "We help you find the perfect property or sell your current one at the best market price."
    },
    {
      icon: <Key className="h-8 w-8" />,
      title: "Rental Services",
      description: "Find your ideal rental property or let us manage your investment property for maximum returns."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Investment Advisory",
      description: "Expert guidance on real estate investments to help you build and grow your property portfolio."
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Legal Services",
      description: "Professional assistance with documentation, contracts, and legal compliance for property transactions."
    }
  ];

  return (
    <section className="py-16 bg-neutral-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive real estate services to help you buy, sell, rent, or invest in property with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-primary-light inline-flex p-4 rounded-full text-primary mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/about">
            <Button className="bg-primary hover:bg-primary-dark text-white">
              Learn More About Our Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
