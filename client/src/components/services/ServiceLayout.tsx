
import { ReactNode } from 'react';
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';

interface ServiceLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  image: string;
}

const ServiceLayout = ({ title, description, children, image }: ServiceLayoutProps) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-20" style={{ backgroundImage: `url(${image})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
            <p className="text-white text-xl">{description}</p>
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
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/services">
              <a className="hover:text-[#1A237E]">Services</a>
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-[#1A237E]">{title}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A237E] py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-white mb-6 max-w-2xl mx-auto">Contact our team today to learn more about our {title.toLowerCase()} services and how we can help you.</p>
          <Link href="/contact">
            <Button className="bg-white text-[#1A237E] hover:bg-gray-100">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceLayout;
