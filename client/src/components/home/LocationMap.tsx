
import { MapPin } from "lucide-react";

const LocationMap = () => {
  return (
    <section className="bg-neutral-light">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <MapPin className="h-16 w-16 text-primary mb-4 mx-auto" />
          <h3 className="text-2xl font-bold mb-2 font-heading">Our Location</h3>
          <p className="text-gray-600 mb-6">P.O. Box 2352, Kinamba, Naivasha, Kenya</p>
        </div>
        
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3527.176500592259!2d36.47071157435781!3d-0.7219983352684449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1829187b6e0229b9%3A0xa04b3f4dbdf5d581!2sSAMCOM%20PROPERTIES%20AGENCY!5e1!3m2!1sen!2ske!4v1746191899799!5m2!1sen!2ske" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Samcom Properties Agency Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
