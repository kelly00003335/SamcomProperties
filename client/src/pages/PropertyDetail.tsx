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
      setLoading(true);
      try {
        const data = await PropertyAPI.getById(propertyId);
        if (data) {
          console.log('Property data:', data);
          setProperty(data);
          setError(null);
        } else {
          setError('Property not found');
        }
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
      <div className="container mx-auto py-20 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto py-20">
        <div className="bg-red-50 p-6 rounded-lg text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-2">Error</h1>
          <p className="text-red-500">{error || 'Property not found'}</p>
          <Button className="mt-4" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Property Gallery */}
      <PropertyGallery images={property.images || []} title={property.title} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-wrap justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">{property.title}</h1>
                  <p className="text-gray-500 mb-2">{property.location}</p>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold text-blue-600">
                    {formatPriceDisplay(property.price)}
                  </span>
                  {property.status === 'for-rent' && <span className="text-gray-500 text-sm"> / month</span>}
                </div>
              </div>

              {/* Property specs */}
              <div className="grid grid-cols-3 gap-4 mb-6 border-t border-b border-gray-100 py-4">
                {property.bedrooms !== null && (
                  <div className="flex flex-col items-center p-2">
                    <div className="flex items-center text-blue-600 mb-1">
                      <FaBed className="mr-2" />
                      <span className="font-semibold text-xl">{property.bedrooms}</span>
                    </div>
                    <span className="text-gray-500 text-sm">Bedrooms</span>
                  </div>
                )}

                {property.bathrooms !== null && (
                  <div className="flex flex-col items-center p-2">
                    <div className="flex items-center text-blue-600 mb-1">
                      <FaBath className="mr-2" />
                      <span className="font-semibold text-xl">{property.bathrooms}</span>
                    </div>
                    <span className="text-gray-500 text-sm">Bathrooms</span>
                  </div>
                )}

                {property.area !== null && (
                  <div className="flex flex-col items-center p-2">
                    <div className="flex items-center text-blue-600 mb-1">
                      <FaRuler className="mr-2" />
                      <span className="font-semibold text-xl">{property.area}</span>
                    </div>
                    <span className="text-gray-500 text-sm">sq.ft</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
                <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
              </div>

              {/* Property features */}
              {property.features && property.features.length > 0 && (
                <PropertyFeatures features={property.features} />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Details</h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold text-gray-800 capitalize">
                    {property.status?.replace('-', ' ') || 'N/A'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold text-gray-800 capitalize">{property.type || 'N/A'}</span>
                </div>

                {property.bedrooms !== null && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bedrooms:</span>
                    <span className="font-semibold text-gray-800">{property.bedrooms}</span>
                  </div>
                )}

                {property.bathrooms !== null && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bathrooms:</span>
                    <span className="font-semibold text-gray-800">{property.bathrooms}</span>
                  </div>
                )}

                {property.area !== null && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Area:</span>
                    <span className="font-semibold text-gray-800">{property.area} sq.ft</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-semibold text-gray-800">{property.location}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-semibold text-blue-600">
                    {formatPriceDisplay(property.price)}
                    {property.status === 'for-rent' && <span className="text-sm text-gray-500"> / month</span>}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full">Contact Agent</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact section */}
      <ContactSection />
    </div>
  );
}