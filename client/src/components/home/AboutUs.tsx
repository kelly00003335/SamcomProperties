import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const AboutUs = () => {
  const features = [
    "Trusted Advisors",
    "Market Expertise",
    "Client Satisfaction",
    "Professional Service"
  ];

  const images = [
    {
      src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      alt: "Property Handover"
    },
    {
      src: "https://images.unsplash.com/photo-1582407947304-fd86f028f716",
      alt: "Real Estate Agent"
    },
    {
      src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      alt: "Modern House"
    },
    {
      src: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1",
      alt: "Real Estate Agents Meeting"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">About Samcom Properties Agency</h2>
            <p className="text-gray-600 mb-4">
              Samcom Properties Agency is a leading real estate company in Kenya providing exceptional property services since 2010. 
              We specialize in residential, commercial, and land sales and rentals across major cities in Kenya.
            </p>
            <p className="text-gray-600 mb-4">
              We offer comprehensive land services including buying and selling of plots, title deed processing, 
              transfers, and professional surveying to ensure your investment is secure and legally compliant.
            </p>
            <p className="text-gray-600 mb-6">
              Our mission is to help clients find their dream properties while providing transparent, professional service every step of the way. 
              With a team of experienced agents, we ensure that your property journey is smooth and successful.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="text-primary h-5 w-5 mr-3" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <Link href="/about">
              <Button className="bg-primary hover:bg-primary-dark text-white">
                Learn More About Us
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src={images[0].src} 
                alt={images[0].alt} 
                className="rounded-lg shadow-md w-full h-64 object-cover" 
              />
              <img 
                src={images[1].src} 
                alt={images[1].alt} 
                className="rounded-lg shadow-md w-full h-48 object-cover" 
              />
            </div>
            <div className="space-y-4 mt-6">
              <img 
                src={images[2].src} 
                alt={images[2].alt} 
                className="rounded-lg shadow-md w-full h-48 object-cover" 
              />
              <img 
                src={images[3].src} 
                alt={images[3].alt}
                className="rounded-lg shadow-md w-full h-64 object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
