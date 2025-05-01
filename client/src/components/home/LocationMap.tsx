import { MapPin } from "lucide-react";

const LocationMap = () => {
  return (
    <section className="h-96 bg-neutral-light">
      <div className="w-full h-full flex items-center justify-center bg-neutral">
        <div className="text-center">
          <MapPin className="h-16 w-16 text-primary mb-4 mx-auto" />
          <h3 className="text-2xl font-bold mb-2 font-heading">Our Location</h3>
          <p className="text-gray-600">Samcom House, Ngong Road, Nairobi, Kenya</p>
          <p className="text-sm text-gray-500 mt-4">
            {/* In a real implementation, this would be replaced with a Google Maps component */}
            Interactive map would be displayed here
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
