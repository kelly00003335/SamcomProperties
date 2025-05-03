import { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { formatPriceDisplay, timeAgo } from '@/lib/utils';
import { PropertyAPI } from '@/lib/api';
import { FirebaseProperty } from '@shared/schema';
import PropertyGallery from '@/components/properties/PropertyGallery';
import PropertyFeatures from '@/components/properties/PropertyFeatures';
import ContactSection from '@/components/home/ContactSection';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import { FaBed, FaBath, FaRuler } from 'react-icons/fa';

export default function PropertyDetail() {
  const [, params] = useRoute('/properties/:id');
  const propertyId = params?.id;

  const [property, setProperty] = useState<FirebaseProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) {
      setError('Property ID not found');
      setLoading(false);
      return;
    }

    const fetchProperty = async () => {
      try {
        const data = await PropertyAPI.getPropertyById(propertyId);
        setProperty(data); //Directly set the data, handling potential null values within the API call.
      } catch (err) {
        console.error('Error fetching property:', err);
        setError('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner className="h-12 w-12 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600">{error}</h1>
        <p className="mt-4">The property you're looking for could not be found.</p>
      </div>
    );
  }

  //Handle potential null values for property fields
  if (!property) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600">Property not found</h1>
        <p className="mt-4">The property you're looking for could not be found.</p>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{property.title}</h1>

      {/* Location and status */}
      <div className="flex flex-wrap items-center mb-6 gap-4">
        <div className="flex items-center">
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
            {property.location || 'Unknown Location'}
          </span>
        </div>
        <div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${property.status === 'for-sale' ? 'bg-blue-600' : 'bg-green-600'}`}>
            {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
          </span>
        </div>
        <div className="ml-auto">
          <span className="text-2xl font-bold text-primary">
            {formatPriceDisplay(property.price || 0, property.status || 'unknown')}
          </span>
        </div>
      </div>

      {/* Property gallery */}
      <div className="mb-10">
        <PropertyGallery images={property.images || []} title={property.title}/> {/* Added title prop */}
      </div>

      {/* Property details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Property Details</h2>

          {/* Property specs */}
          <div className="flex flex-wrap gap-6 mb-6 bg-gray-50 p-4 rounded-lg">
            {property.bedrooms > 0 && (
              <div className="flex items-center">
                <FaBed className="text-primary mr-2" />
                <span>{property.bedrooms} Bedrooms</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center">
                <FaBath className="text-primary mr-2" />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
            )}
            {property.area > 0 && (
              <div className="flex items-center">
                <FaRuler className="text-primary mr-2" />
                <span>{property.area} sq ft</span>
              </div>
            )}
            <div className="flex items-center">
              <span className="text-gray-600">Type: </span>
              <span className="ml-2 capitalize">{property.type || 'Unknown Type'}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{property.description || 'No description available'}</p>
          </div>

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Features</h3>
              <PropertyFeatures features={property.features} />
            </div>
          )}

          {/* Location on map (placeholder) */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Map view will be available soon</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="sticky top-24 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Interested in this property?</h3>
            <p className="mb-4">Contact us for more information or to schedule a viewing.</p>

            <Button className="w-full mb-4">Schedule a Viewing</Button>
            <Button variant="outline" className="w-full">
              Request Information
            </Button>

            {property.createdAt && (
              <p className="text-sm text-gray-500 mt-6">
                Listed {timeAgo(property.createdAt)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Contact section */}
      <div className="mt-16">
        <ContactSection />
      </div>
    </div>
  );
}