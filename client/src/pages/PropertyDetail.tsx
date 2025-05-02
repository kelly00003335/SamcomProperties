import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Property, FirebaseProperty } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { PropertyAPI, AgentAPI } from "@/lib/api";
import PropertyGallery from "@/components/properties/PropertyGallery";
import PropertyFeatures from "@/components/properties/PropertyFeatures";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPriceDisplay } from "@/lib/utils";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Phone, 
  Mail, 
  ArrowLeft 
} from "lucide-react";

const PropertyDetail = () => {
  const [match, params] = useRoute<{ id: string }>('/properties/:id');
  const propertyId = match ? params.id : null;

  const { data: property, isLoading, error } = useQuery<FirebaseProperty>({
    queryKey: ['property', propertyId],
    queryFn: async () => {
      console.log(`Fetching property with ID: ${propertyId}`);
      return await PropertyAPI.getPropertyById(propertyId || '');
    },
    enabled: !!propertyId,
  });

  const { data: agent } = useQuery<any>({
    queryKey: ['agent', property?.agentId],
    queryFn: async () => {
      console.log(`Fetching agent with ID: ${property?.agentId}`);
      return await AgentAPI.getAgentById(property?.agentId || '');
    },
    enabled: !!property?.agentId,
  });

  if (isLoading) {
    return (
      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-[500px] w-full rounded-lg mb-8" />
              <Skeleton className="h-6 w-48 mb-3" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-full mb-8" />

              <Skeleton className="h-6 w-48 mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            </div>

            <div>
              <Skeleton className="h-64 w-full rounded-lg mb-6" />
              <Skeleton className="h-6 w-32 mb-3" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-6">Property Not Found</h1>
          <p className="text-gray-600 mb-8">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/properties">
            <Button className="bg-primary hover:bg-primary-dark text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Property Navigation */}
        <div className="mb-8">
          <Link href="/properties">
            <Button variant="ghost" className="p-0 text-primary hover:text-primary-dark hover:bg-transparent">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to Properties
            </Button>
          </Link>
        </div>

        {/* Property Title */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 font-heading">{property.title}</h1>
              <p className="text-gray-600 flex items-center">
                <MapPin className="h-4 w-4 text-primary mr-2" /> {property.location}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-3xl font-bold text-primary">
                {formatPriceDisplay(property.price, property.status)}
              </p>
            </div>
          </div>
        </div>

        {/* Property Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Property Gallery */}
            <PropertyGallery images={property.images} title={property.title} />

            {/* Property Details */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {property.bedrooms !== null && (
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Bed className="h-6 w-6 text-primary mb-2" />
                    <span className="text-lg font-semibold">{property.bedrooms}</span>
                    <span className="text-gray-500 text-sm">Bedrooms</span>
                  </div>
                )}

                {property.bathrooms !== null && (
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Bath className="h-6 w-6 text-primary mb-2" />
                    <span className="text-lg font-semibold">{property.bathrooms}</span>
                    <span className="text-gray-500 text-sm">Bathrooms</span>
                  </div>
                )}

                {property.area !== null && (
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Square className="h-6 w-6 text-primary mb-2" />
                    <span className="text-lg font-semibold">{property.area}</span>
                    <span className="text-gray-500 text-sm">Square Feet</span>
                  </div>
                )}

                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary mb-2" />
                  <span className="text-lg font-semibold">
                    {new Date(property.createdAt).getFullYear()}
                  </span>
                  <span className="text-gray-500 text-sm">Listed</span>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 font-heading">Description</h3>
              <p className="text-gray-600 mb-4">{property.description}</p>

              {/* Property Features */}
              <PropertyFeatures features={property.features || []} />
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Agent Card */}
            {agent && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 font-heading">Property Agent</h3>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img 
                      src={agent.image} 
                      alt={agent.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{agent.name}</h4>
                    <p className="text-gray-600">{agent.title}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{agent.bio}</p>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-primary hover:bg-primary-dark text-white"
                    onClick={() => window.location.href = `tel:${agent.phone}`}
                  >
                    <Phone className="mr-2 h-4 w-4" /> Call Agent
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary-light"
                    onClick={() => window.location.href = `mailto:${agent.email}?subject=Inquiry about ${property?.title || 'property'}`}
                  >
                    <Mail className="mr-2 h-4 w-4" /> Email Agent
                  </Button>
                </div>
              </div>
            )}

            {/* Schedule Viewing Button */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 font-heading">Interested in this property?</h3>
              <p className="text-gray-600 mb-4">
                Schedule a viewing or request more information about this property.
              </p>
              <Link href={`/contact?subject=Inquiry for ${property?.title || 'Property'} (ID: ${propertyId})`}>
                <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                  Request Information
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;