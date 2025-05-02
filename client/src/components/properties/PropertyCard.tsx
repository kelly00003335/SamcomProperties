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
      <div className="relative">
        <img 
          src={images[0]} 
          alt={title} 
          className="w-full h-64 object-cover" 
        />
        <span 
          className={`
            absolute top-4 left-4 text-white text-sm px-3 py-1 rounded
            ${status === 'for-sale' ? 'bg-primary' : 'bg-secondary'}
          `}
        >
          {status === 'for-sale' ? 'For Sale' : 'For Rent'}
        </span>
        <button 
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-primary hover:text-secondary"
          aria-label="Add to favorites"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold font-heading">{title}</h3>
          <p className="text-primary text-xl font-bold">
            {formatPriceDisplay(price, status)}
          </p>
        </div>
        <p className="text-gray-500 mb-4 flex items-center">
          <MapPin className="h-4 w-4 text-primary mr-2" /> {location}
        </p>
        <div className="flex justify-between mb-6">
          {bedrooms !== null && (
            <div className="flex items-center">
              <Bed className="text-primary h-5 w-5 mr-2" />
              <span>{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
          )}
          {bathrooms !== null && (
            <div className="flex items-center">
              <Bath className="text-primary h-5 w-5 mr-2" />
              <span>{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
          )}
          {area !== null && (
            <div className="flex items-center">
              <Square className="text-primary h-5 w-5 mr-2" />
              <span>{area} sqft</span>
            </div>
          )}
        </div>
        <Link href={`/properties/${id}`}>
          <Button 
            variant="outline" 
            className="w-full bg-neutral-light hover:bg-gray-200 text-primary"
          >
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
