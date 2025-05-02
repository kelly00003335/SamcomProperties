import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Square 
} from "lucide-react";
import { Property, FirebaseProperty } from "@shared/schema";
import { formatPriceDisplay } from "@/lib/utils";

interface PropertyCardProps {
  property: Property | FirebaseProperty;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const {
    id,
    title,
    location,
    price,
    status,
    bedrooms,
    bathrooms,
    area,
    images
  } = property;

  return (
    <Card className="property-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300">
      <div className="relative h-40 sm:h-64"> {/* Adjusted height for better mobile display */}
        <img 
          src={images[0]} 
          alt={title} 
          className="w-full h-full object-cover" 
          loading="lazy"
        />
        {/* Added lazy loading for performance */}
        <span 
          className={`
            absolute top-2 left-2 text-white text-xs sm:text-sm px-2 py-1 rounded
            ${status === 'for-sale' ? 'bg-[#1A237E]' : 'bg-[#2E7D32]'}
          `}
        >
          {status === 'for-sale' ? 'For Sale' : 'For Rent'}
        </span>
        <button 
          className="absolute top-2 right-2 bg-white p-1 sm:p-2 rounded-full shadow-md text-[#1A237E] hover:text-[#F5F5DC]"
          aria-label="Add to favorites"
        >
          <Heart className="h-4 sm:h-5 w-4 sm:w-5" />
        </button>
      </div>
      <CardContent className="p-4 sm:p-6"> {/* Reduced padding for smaller screens */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg sm:text-xl font-bold font-heading truncate">{title}</h3> {/* Added truncate for long titles */}
          <p className="text-[#1A237E] text-lg sm:text-xl font-bold">
            {formatPriceDisplay(price, status)}
          </p>
        </div>
        <p className="text-[#212121] mb-3 sm:mb-4 flex items-center text-sm sm:text-base"> {/* Adjusted text size */}
          <MapPin className="h-4 sm:h-4 w-4 sm:w-4 text-[#1A237E] mr-2" /> {location}
        </p>
        <div className="flex flex-wrap sm:justify-between mb-4 sm:mb-6"> {/* Adjusted layout for smaller screens */}
          {bedrooms !== null && (
            <div className="flex items-center mb-2 sm:mb-0 sm:mr-4"> {/* Added margin for spacing */}
              <Bed className="text-[#1A237E] h-4 sm:h-5 w-4 sm:w-5 mr-2" />
              <span className="text-sm sm:text-base">{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
          )}
          {bathrooms !== null && (
            <div className="flex items-center mb-2 sm:mb-0 sm:mr-4">
              <Bath className="text-[#1A237E] h-4 sm:h-5 w-4 sm:w-5 mr-2" />
              <span className="text-sm sm:text-base">{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
          )}
          {area !== null && (
            <div className="flex items-center">
              <Square className="text-[#1A237E] h-4 sm:h-5 w-4 sm:w-5 mr-2" />
              <span className="text-sm sm:text-base">{area} sqft</span>
            </div>
          )}
        </div>
        <Link href={`/properties/${id}`}>
          <Button 
            variant="outline" 
            className="w-full bg-[#F8F9FA] hover:bg-[#F5F5DC] text-[#1A237E] text-sm sm:text-base"
          >
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;