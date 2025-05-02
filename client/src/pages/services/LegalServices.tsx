
import ServiceLayout from "@/components/services/ServiceLayout";
import { Scale, Shield, BookOpen, Users } from "lucide-react";

const LegalServices = () => {
  const services = [
    {
      icon: <Scale className="h-10 w-10 text-[#1A237E]" />,
      title: "Property Law Consulting",
      description: "Expert legal advice on property transactions, land ownership, and real estate investments to protect your interests."
    },
    {
      icon: <Shield className="h-10 w-10 text-[#1A237E]" />,
      title: "Legal Due Diligence",
      description: "Comprehensive background checks and verification of property ownership, encumbrances, and legal status."
    },
    {
      icon: <BookOpen className="h-10 w-10 text-[#1A237E]" />,
      title: "Contract Preparation & Review",
      description: "Professional drafting and review of sale agreements, lease contracts, and other real estate legal documents."
    },
    {
      icon: <Users className="h-10 w-10 text-[#1A237E]" />,
      title: "Dispute Resolution",
      description: "Skilled representation and mediation services for property disputes, boundary issues, and ownership conflicts."
    }
  ];

  const faq = [
    {
      question: "What legal documents do I need when buying property in Kenya?",
      answer: "When buying property in Kenya, you'll need several key documents including a sale agreement, transfer of land/property forms, land rent clearance certificate, land rates clearance certificate, consent to transfer from the land control board (for agricultural land), and eventually, the title deed. Our legal team can guide you through obtaining all necessary documentation."
    },
    {
      question: "How long does the legal process of property transfer typically take?",
      answer: "The timeline for property transfer in Kenya typically ranges from 60-90 days, depending on various factors such as the property's location, type of title, and whether there are any complications with the documentation. Our legal services help streamline this process and avoid unnecessary delays."
    },
    {
      question: "Can you help with resolving property boundary disputes?",
      answer: "Yes, our legal team specializes in property boundary dispute resolution. We employ a combination of legal expertise, surveying services, and negotiation skills to resolve boundary conflicts efficiently, often without the need for lengthy court proceedings."
    },
    {
      question: "Do you provide legal services for commercial property leases?",
      answer: "Absolutely. We offer comprehensive legal services for commercial property leases, including drafting and reviewing lease agreements, negotiating terms, and ensuring compliance with relevant laws and regulations. Our team helps protect your interests whether you're a landlord or tenant."
    }
  ];

  return (
    <ServiceLayout 
      title="Legal Services"
      description="Expert legal guidance for all aspects of real estate transactions and property ownership"
      image="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1770&auto=format&fit=crop"
    >
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-[#1A237E] mb-6 text-center">Comprehensive Real Estate Legal Services</h2>
        <p className="mb-6">
          At Samcom Properties, we understand that navigating the legal complexities of real estate transactions can be challenging. Our specialized legal services team provides expert guidance and support throughout all aspects of property acquisition, ownership, and transfer.
        </p>
        <p className="mb-6">
          With our in-depth knowledge of Kenyan property law, we ensure that your real estate interests are protected, all legal requirements are met, and transactions proceed smoothly without unexpected complications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {services.map((service, index) => (
          <div key={index} className="bg-gray-50 p-8 rounded-lg border-t-4 border-[#1A237E]">
            <div className="flex flex-col items-center mb-4">
              {service.icon}
              <h3 className="text-2xl font-semibold text-[#1A237E] mt-4">{service.title}</h3>
            </div>
            <p className="text-center">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-8 rounded-lg mb-16">
        <h3 className="text-2xl font-semibold text-[#1A237E] mb-6 text-center">Our Legal Process</h3>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Process steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-[#1A237E] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">1</div>
              <h4 className="font-semibold text-lg mb-2">Initial Consultation</h4>
              <p className="text-gray-700">Discuss your legal needs and objectives with our property law experts.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-[#1A237E] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">2</div>
              <h4 className="font-semibold text-lg mb-2">Legal Strategy</h4>
              <p className="text-gray-700">Receive a customized legal plan tailored to your specific situation.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-[#1A237E] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">3</div>
              <h4 className="font-semibold text-lg mb-2">Documentation</h4>
              <p className="text-gray-700">Professional preparation and review of all necessary legal documents.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-[#1A237E] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">4</div>
              <h4 className="font-semibold text-lg mb-2">Implementation</h4>
              <p className="text-gray-700">Execution of legal processes with regular updates and guidance.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-2xl font-semibold text-[#1A237E] mb-6">Frequently Asked Legal Questions</h3>
        
        <div className="space-y-6">
          {faq.map((item, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">{item.question}</h4>
              <p className="text-gray-700">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg border border-gray-200">
        <h3 className="text-2xl font-semibold text-[#1A237E] mb-6">Why Choose Our Legal Services</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-[#1A237E] bg-opacity-10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-[#1A237E]" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Specialized Expertise</h4>
            <p className="text-gray-700">Our legal team specializes exclusively in real estate and property law in Kenya.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-[#1A237E] bg-opacity-10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-[#1A237E]" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Preventive Approach</h4>
            <p className="text-gray-700">We identify and address potential legal issues before they become problems.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-[#1A237E] bg-opacity-10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-[#1A237E]" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Client-Centered Service</h4>
            <p className="text-gray-700">We explain complex legal matters in clear, straightforward terms you can understand.</p>
          </div>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default LegalServices;
