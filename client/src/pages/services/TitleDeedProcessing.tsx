
import ServiceLayout from "@/components/services/ServiceLayout";
import { FileText, CheckCircle, AlertTriangle } from "lucide-react";

const TitleDeedProcessing = () => {
  const services = [
    "Title deed transfer processing",
    "Land succession documentation",
    "Resolution of title disputes",
    "Title search and verification",
    "Title deed replacement for lost documents",
    "Registration of cautions and restrictions",
    "Discharge of charges and mortgages",
    "Land subdivision approvals"
  ];

  const commonIssues = [
    {
      title: "Missing or incomplete documentation",
      description: "Important property documents may be missing or incomplete, making it difficult to process title deeds."
    },
    {
      title: "Title disputes and overlapping claims",
      description: "Multiple parties claiming ownership of the same property can lead to complicated legal battles."
    },
    {
      title: "Historical land issues",
      description: "Unresolved historical land allocations or disputes that affect current ownership claims."
    },
    {
      title: "Bureaucratic delays",
      description: "Navigating government offices and processes can lead to significant delays in title processing."
    }
  ];

  return (
    <ServiceLayout 
      title="Title Deed Processing"
      description="Professional assistance with title deed processing, transfers, and all legal documentation for your property"
      image="https://images.unsplash.com/photo-1607968565043-36af90dde238?q=80&w=1774&auto=format&fit=crop"
    >
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-[#1A237E] mb-6 text-center">Professional Title Deed Processing Services</h2>
        <p className="mb-6">
          At Samcom Properties, we understand the importance of proper title documentation for your property. Our title deed processing services provide professional assistance with all aspects of property documentation, ensuring that your ownership rights are legally protected.
        </p>
        <p className="mb-6">
          Whether you're buying a new property, selling an existing one, or dealing with inheritance matters, our team of legal experts will guide you through the entire process, handling all the necessary paperwork and government interactions on your behalf.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div>
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-[#1A237E] mr-3" />
            <h3 className="text-2xl font-semibold text-[#1A237E]">Our Title Deed Services</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 mr-2 flex-shrink-0" />
                <span>{service}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-lg">
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-8 w-8 text-amber-500 mr-3" />
            <h3 className="text-2xl font-semibold text-[#1A237E]">Common Title Issues We Solve</h3>
          </div>
          
          <div className="space-y-4">
            {commonIssues.map((issue, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <h4 className="font-semibold text-lg mb-1">{issue.title}</h4>
                <p className="text-gray-700">{issue.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-8 rounded-lg mb-16">
        <h3 className="text-2xl font-semibold text-[#1A237E] mb-6 text-center">Our Title Deed Processing Approach</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow-sm">
            <div className="bg-[#1A237E] text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">1</div>
            <h4 className="font-semibold text-lg mb-2 text-center">Documentation Review</h4>
            <p className="text-gray-700 text-center">We thoroughly review all existing property documents to identify any issues and determine the necessary steps.</p>
          </div>
          
          <div className="bg-white p-6 rounded shadow-sm">
            <div className="bg-[#1A237E] text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">2</div>
            <h4 className="font-semibold text-lg mb-2 text-center">Title Search & Due Diligence</h4>
            <p className="text-gray-700 text-center">We conduct comprehensive searches to verify ownership history, identify encumbrances, and ensure clear title.</p>
          </div>
          
          <div className="bg-white p-6 rounded shadow-sm">
            <div className="bg-[#1A237E] text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">3</div>
            <h4 className="font-semibold text-lg mb-2 text-center">Government Processing</h4>
            <p className="text-gray-700 text-center">We handle all necessary submissions and follow-ups with relevant government departments and registries.</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg">
        <h3 className="text-2xl font-semibold text-[#1A237E] mb-6">Why Choose Our Title Deed Processing Services?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-lg mb-3">Expert Legal Knowledge</h4>
            <p className="mb-6">Our team consists of legal professionals with extensive experience in Kenyan property law and title deed processing. We stay updated on the latest legal requirements and procedures to ensure smooth processing of your documents.</p>
            
            <h4 className="font-semibold text-lg mb-3">Comprehensive Support</h4>
            <p>We provide end-to-end support throughout the title deed processing journey, from initial consultation to final registration. You'll have a dedicated professional handling your case and keeping you informed at every step.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-3">Time and Cost Efficiency</h4>
            <p className="mb-6">Our expertise in navigating government processes helps reduce delays and expedite your title deed processing. We help you avoid costly mistakes and unnecessary expenses while ensuring all legal requirements are met.</p>
            
            <h4 className="font-semibold text-lg mb-3">Problem Resolution</h4>
            <p>If your title deed has complications or disputed elements, we have the expertise to identify solutions and resolve issues that might otherwise prevent successful processing.</p>
          </div>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default TitleDeedProcessing;
