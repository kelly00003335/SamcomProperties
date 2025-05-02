import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Key, 
  TrendingUp, 
  FileText,
  MapPin
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Home className="h-8 w-8 text-[#1A237E]" />,
      title: "Property Sales",
      description: "We help you find the perfect property or sell your current one at the best market price.",
      link: "/services/property-sales"
    },
    {
      icon: <Key className="h-8 w-8 text-[#1A237E]" />,
      title: "Rental Services",
      description: "Find your ideal rental property or let us manage your investment property for maximum returns.",
      link: "/services/property-rentals"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[#1A237E]" />,
      title: "Land Sales",
      description: "Specializing in buying and selling plots and land across Kenya with secure transactions and fair market prices.",
      link: "/services/property-sales"
    },
    {
      icon: <FileText className="h-8 w-8 text-[#1A237E]" />,
      title: "Title Deed Processing",
      description: "Professional assistance with title deed processing, transfers, and all legal documentation for your property.",
      link: "/services/title-deed-processing"
    },
    {
      icon: <MapPin className="h-8 w-8 text-[#1A237E]" />,
      title: "Land Surveying",
      description: "Expert land surveying services to determine property boundaries and prepare detailed site plans for development.",
      link: "/services/land-surveying"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[#1A237E]" />,
      title: "Legal Services",
      description: "Expert legal guidance for all aspects of real estate transactions and property ownership.",
      link: "/services/legal-services"
    }
  ];

  return (
    <section className="py-16 bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-[#1A237E]">Our Services</h2>
          <p className="text-[#212121] max-w-2xl mx-auto">
            We provide comprehensive real estate services to help you buy, sell, rent, or invest in property with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link href={service.link} key={index}>
              <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105 border-t-4 border-[#1A237E] cursor-pointer">
                <div className="text-[#1A237E] mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-[#1A237E]">{service.title}</h3>
                <p className="text-[#212121]">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services">
            <Button className="bg-[#1A237E] hover:bg-[#12195E] text-white">
              Learn More About Our Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;