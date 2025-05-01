import { Check } from "lucide-react";

interface PropertyFeaturesProps {
  features: string[];
}

const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ features }) => {
  if (!features || features.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4 font-heading">Property Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <div className="bg-primary-light p-1 rounded-full text-primary mr-3">
              <Check className="h-4 w-4" />
            </div>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyFeatures;
