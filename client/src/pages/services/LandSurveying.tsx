
import ServiceLayout from "@/components/services/ServiceLayout";
import { MapPin, Ruler, FileText, Clock, CheckSquare } from "lucide-react";

const LandSurveying = () => {
  const services = [
    {
      icon: <MapPin className="h-10 w-10 text-[#1A237E]" />,
      title: "Boundary Surveys",
      description: "Accurate determination and marking of property boundaries to establish legal property lines."
    },
    {
      icon: <Ruler className="h-10 w-10 text-[#1A237E]" />,
      title: "Topographic Surveys",
      description: "Detailed mapping of land features including elevations, trees, buildings, and other improvements."
    },
    {
      icon: <FileText className="h-10 w-10 text-[#1A237E]" />,
      title: "Subdivision Planning",
      description: "Technical planning for dividing larger parcels of land into smaller lots for development or sale."
    },
    {
      icon: <Clock className="h-10 w-10 text-[#1A237E]" />,
      title: "Site Planning",
      description: "Comprehensive site analysis and planning for construction and development projects."
    }
  ];

  return (
    <ServiceLayout 
      title="Land Surveying"
      description="Expert land surveying services to determine property boundaries and prepare detailed site plans"
      image="https://images.unsplash.com/photo-1572976595884-89875e7823cd?q=80&w=1770&auto=format&fit=crop"
    >
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-[#1A237E] mb-6 text-center">Professional Land Surveying Services</h2>
        <p className="mb-6 text-center">
          Samcom Properties offers comprehensive land surveying services to accurately determine property boundaries, prepare detailed site plans, and support your development projects. Our team of qualified surveyors uses advanced technology and techniques to deliver precise results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {services.map((service, index) => (
          <div key={index} className="bg-gray-50 p-8 rounded-lg border-t-4 border-[#1A237E]">
            <div className="flex flex-col items-center mb-4">
              {service.icon}
              <h3 className="text-2xl font-semibold text-[#1A237E] mt-4">{service.title}</h3>
            </div>
            <p className="text-center mb-4">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-8 rounded-lg mb-16">
        <h3 className="text-2xl font-semibold text-[#1A237E] mb-6 text-center">Our Land Surveying Process</h3>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Process steps with connecting line */}
            <div className="hidden md:block absolute left-[20px] top-[40px] bottom-[40px] w-[2px] bg-[#1A237E]"></div>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-start">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-[#1A237E] text-white rounded-full mb-4 md:mb-0 mx-auto md:mx-0">1</div>
                <div className="md:ml-8">
                  <h4 className="text-xl font-semibold mb-2 text-center md:text-left">Initial Consultation</h4>
                  <p className="text-gray-700 text-center md:text-left">We meet with you to understand your specific surveying needs, the property location, and any existing documentation you have.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-start">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-[#1A237E] text-white rounded-full mb-4 md:mb-0 mx-auto md:mx-0">2</div>
                <div className="md:ml-8">
                  <h4 className="text-xl font-semibold mb-2 text-center md:text-left">Research and Planning</h4>
                  <p className="text-gray-700 text-center md:text-left">Our team researches existing records, maps, and legal documents related to your property before planning the field work.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-start">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-[#1A237E] text-white rounded-full mb-4 md:mb-0 mx-auto md:mx-0">3</div>
                <div className="md:ml-8">
                  <h4 className="text-xl font-semibold mb-2 text-center md:text-left">Field Survey</h4>
                  <p className="text-gray-700 text-center md:text-left">Our surveyors visit the site to collect measurements and data using advanced surveying equipment and GPS technology.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-start">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-[#1A237E] text-white rounded-full mb-4 md:mb-0 mx-auto md:mx-0">4</div>
                <div className="md:ml-8">
                  <h4 className="text-xl font-semibold mb-2 text-center md:text-left">Data Processing and Analysis</h4>
                  <p className="text-gray-700 text-center md:text-left">We process the collected data to create accurate maps, plans, and reports according to your requirements.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-start">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-[#1A237E] text-white rounded-full mb-4 md:mb-0 mx-auto md:mx-0">5</div>
                <div className="md:ml-8">
                  <h4 className="text-xl font-semibold mb-2 text-center md:text-left">Delivery and Consultation</h4>
                  <p className="text-gray-700 text-center md:text-left">We present our findings, explain the survey results, and provide all necessary documentation for your records or submission to relevant authorities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg border border-gray-200">
        <div className="flex items-center mb-6">
          <CheckSquare className="h-8 w-8 text-[#1A237E] mr-3" />
          <h3 className="text-2xl font-semibold text-[#1A237E]">Why Choose Our Land Surveying Services?</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-6">
            <h4 className="font-semibold text-lg mb-2">Expertise and Experience</h4>
            <p className="text-gray-700 mb-4">Our team consists of qualified surveyors with years of experience in the Kenyan landscape, ensuring accurate and reliable results.</p>
            
            <h4 className="font-semibold text-lg mb-2">Advanced Technology</h4>
            <p className="text-gray-700">We utilize the latest surveying equipment and software to deliver precise measurements and detailed plans.</p>
          </div>
          
          <div className="pt-4 md:pt-0 md:pl-6">
            <h4 className="font-semibold text-lg mb-2">Comprehensive Service</h4>
            <p className="text-gray-700 mb-4">From initial consultation to final delivery, we handle all aspects of the land surveying process to provide a seamless experience.</p>
            
            <h4 className="font-semibold text-lg mb-2">Legal Compliance</h4>
            <p className="text-gray-700">Our surveys comply with all local regulations and standards, ensuring that your documents are legally sound and acceptable by relevant authorities.</p>
          </div>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default LandSurveying;
