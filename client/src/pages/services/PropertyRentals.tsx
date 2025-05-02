
import ServiceLayout from "@/components/services/ServiceLayout";
import { Check, User, Building, Key } from "lucide-react";

const PropertyRentals = () => {
  const tenantServices = [
    "Wide selection of rental properties across Kenya",
    "Personalized property matching based on your needs",
    "Scheduled viewings at your convenience",
    "Transparent rental agreements and terms",
    "Move-in support and assistance"
  ];

  const landlordServices = [
    "Comprehensive property marketing to attract quality tenants",
    "Rigorous tenant screening and selection process",
    "Rent collection and financial reporting",
    "Regular property inspections and maintenance coordination",
    "Legal compliance and documentation management"
  ];

  return (
    <ServiceLayout 
      title="Property Rentals"
      description="Find your ideal rental property or maximize returns on your investment property"
      image="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1770&auto=format&fit=crop"
    >
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-[#1A237E] mb-6">Comprehensive Rental Services</h2>
        <p className="mb-6">
          Samcom Properties offers specialized rental services for both tenants looking for their ideal home and property owners seeking to maximize returns on their investments. Our experienced team understands the rental market dynamics in Kenya and provides tailored solutions to meet diverse needs.
        </p>
        <p className="mb-6">
          With our extensive network and market knowledge, we connect quality tenants with exceptional properties while ensuring property owners receive reliable management services to protect and enhance their investments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gray-50 p-8 rounded-lg border-t-4 border-[#1A237E]">
          <div className="flex items-center mb-4">
            <User className="h-8 w-8 text-[#1A237E] mr-3" />
            <h3 className="text-2xl font-semibold text-[#1A237E]">For Tenants</h3>
          </div>
          <p className="mb-6">
            Looking for your perfect rental home? We'll help you find a property that meets your requirements, budget, and lifestyle preferences.
          </p>
          <h4 className="font-semibold text-lg mb-3">Our Services for Tenants:</h4>
          <ul className="space-y-3 mb-6">
            {tenantServices.map((service, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-600 mt-1 mr-2 flex-shrink-0" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg border-t-4 border-[#1A237E]">
          <div className="flex items-center mb-4">
            <Building className="h-8 w-8 text-[#1A237E] mr-3" />
            <h3 className="text-2xl font-semibold text-[#1A237E]">For Landlords</h3>
          </div>
          <p className="mb-6">
            Own a rental property? Our property management services help you maximize returns while minimizing stress and hassle.
          </p>
          <h4 className="font-semibold text-lg mb-3">Our Services for Property Owners:</h4>
          <ul className="space-y-3 mb-6">
            {landlordServices.map((service, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-600 mt-1 mr-2 flex-shrink-0" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 p-8 rounded-lg">
        <div className="flex items-center mb-6">
          <Key className="h-8 w-8 text-[#1A237E] mr-3" />
          <h3 className="text-2xl font-semibold text-[#1A237E]">Rental Process</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow-sm">
            <div className="bg-[#1A237E] text-white rounded-full w-8 h-8 flex items-center justify-center mb-4">1</div>
            <h4 className="font-semibold text-lg mb-2">Property Search</h4>
            <p className="text-gray-700">We'll help you find properties that match your requirements and arrange viewings.</p>
          </div>
          
          <div className="bg-white p-6 rounded shadow-sm">
            <div className="bg-[#1A237E] text-white rounded-full w-8 h-8 flex items-center justify-center mb-4">2</div>
            <h4 className="font-semibold text-lg mb-2">Application Process</h4>
            <p className="text-gray-700">Complete application forms and necessary documentation for the rental property.</p>
          </div>
          
          <div className="bg-white p-6 rounded shadow-sm">
            <div className="bg-[#1A237E] text-white rounded-full w-8 h-8 flex items-center justify-center mb-4">3</div>
            <h4 className="font-semibold text-lg mb-2">Move In</h4>
            <p className="text-gray-700">Sign the lease agreement, pay the required fees, and receive keys to your new home.</p>
          </div>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default PropertyRentals;
