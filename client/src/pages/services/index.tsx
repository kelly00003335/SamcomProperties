
import { Link } from "wouter";
import { Home, Key, TrendingUp, FileText, MapPin, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      icon: <Home className="h-12 w-12 text-[#1A237E]" />,
      title: "Property Sales",
      description: "We help you find the perfect property or sell your current one at the best market price.",
      link: "/services/property-sales"
    },
    {
      icon: <Key className="h-12 w-12 text-[#1A237E]" />,
      title: "Property Rentals",
      description: "Find your ideal rental property or let us manage your investment property for maximum returns.",
      link: "/services/property-rentals"
    },
    {
      icon: <MapPin className="h-12 w-12 text-[#1A237E]" />,
      title: "Land Surveying",
      description: "Expert land surveying services to determine property boundaries and prepare detailed site plans for development.",
      link: "/services/land-surveying"
    },
    {
      icon: <FileText className="h-12 w-12 text-[#1A237E]" />,
      title: "Title Deed Processing",
      description: "Professional assistance with title deed processing, transfers, and all legal documentation for your property.",
      link: "/services/title-deed-processing"
    },
    {
      icon: <Scale className="h-12 w-12 text-[#1A237E]" />,
      title: "Legal Services",
      description: "Expert legal guidance for all aspects of real estate transactions and property ownership.",
      link: "/services/legal-services"
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-[#1A237E]" />,
      title: "Investment Advisory",
      description: "Expert guidance on real estate investments to help you build and grow your property portfolio.",
      link: "/contact"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-24" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1774&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-white text-xl">
              We provide comprehensive real estate services to help you buy, sell, rent, or invest in property with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/">
              <a className="hover:text-[#1A237E]">Home</a>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#1A237E]">Services</span>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A237E] mb-4">Comprehensive Real Estate Services</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              At Samcom Properties, we offer a wide range of professional services to meet all your real estate needs. Each service is delivered with expertise, integrity, and commitment to your satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#1A237E]">
                <div className="flex flex-col items-center mb-4">
                  {service.icon}
                  <h3 className="text-2xl font-bold mt-4 text-[#1A237E]">{service.title}</h3>
                </div>
                <p className="text-gray-700 text-center mb-6">{service.description}</p>
                <div className="text-center">
                  <Link href={service.link}>
                    <Button className="bg-[#1A237E] hover:bg-[#12195E] text-white">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A237E] mb-4">Why Choose Our Services</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              We are committed to providing exceptional service and value to all our clients. Here's what sets us apart:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-[#1A237E]">Expertise & Experience</h3>
              <p className="text-gray-700">
                Our team consists of industry professionals with extensive experience and specialized knowledge in all aspects of real estate.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-[#1A237E]">Client-Centered Approach</h3>
              <p className="text-gray-700">
                We prioritize your needs and goals, providing personalized service and solutions tailored to your specific requirements.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-[#1A237E]">Comprehensive Solutions</h3>
              <p className="text-gray-700">
                From property sales to legal services, we offer end-to-end solutions for all your real estate needs under one roof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A237E] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Work With Us?</h2>
          <p className="text-white mb-8 max-w-2xl mx-auto">
            Contact our team today to discuss your real estate needs and discover how our services can help you achieve your property goals.
          </p>
          <Link href="/contact">
            <Button className="bg-white text-[#1A237E] hover:bg-gray-100 px-8 py-6 text-lg">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
