import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertySearch from "@/components/properties/PropertySearch";
import { Property } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

const Properties = () => {
  const [location] = useLocation();
  const [searchParams, setSearchParams] = useState<{
    location?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
  }>({});

  // Parse URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1]);
    
    const newParams: any = {};
    if (params.has('location')) newParams.location = params.get('location');
    if (params.has('type')) newParams.type = params.get('type');
    if (params.has('minPrice')) newParams.minPrice = params.get('minPrice');
    if (params.has('maxPrice')) newParams.maxPrice = params.get('maxPrice');
    
    setSearchParams(newParams);
  }, [location]);

  // Build the query string for the API
  const getQueryString = () => {
    const params = new URLSearchParams();
    
    if (searchParams.location) params.append("location", searchParams.location);
    if (searchParams.type) params.append("type", searchParams.type);
    if (searchParams.minPrice) params.append("minPrice", searchParams.minPrice);
    if (searchParams.maxPrice) params.append("maxPrice", searchParams.maxPrice);
    
    const queryString = params.toString();
    return queryString ? `/api/properties/search?${queryString}` : '/api/properties';
  };

  const { data: properties, isLoading, error, refetch } = useQuery<Property[]>({
    queryKey: [getQueryString()],
    refetchOnMount: true,
    staleTime: 0, // Consider data always stale to ensure fresh data
    retry: 3,
    retryDelay: (attempt) => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
  });

  // Build page title based on search params
  const getPageTitle = () => {
    if (Object.keys(searchParams).length === 0) {
      return "All Properties";
    }
    
    const parts = [];
    
    if (searchParams.type) {
      parts.push(
        searchParams.type.charAt(0).toUpperCase() + 
        searchParams.type.slice(1) + 
        "s"
      );
    }
    
    if (searchParams.location) {
      parts.push(`in ${searchParams.location.charAt(0).toUpperCase() + searchParams.location.slice(1)}`);
    }
    
    if (searchParams.minPrice || searchParams.maxPrice) {
      const priceRange = [];
      if (searchParams.minPrice) priceRange.push(`KSh ${parseInt(searchParams.minPrice).toLocaleString()}+`);
      if (searchParams.maxPrice) priceRange.push(`Under KSh ${parseInt(searchParams.maxPrice).toLocaleString()}`);
      parts.push(`(${priceRange.join(" ")})`);
    }
    
    return parts.length > 0 ? parts.join(" ") : "Properties";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Search Form */}
        <div className="mb-12">
          <PropertySearch />
        </div>
        
        {/* Results */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            {getPageTitle()}
          </h1>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Skeleton className="w-full h-64" />
                  <div className="p-6">
                    <Skeleton className="h-7 w-3/4 mb-2" />
                    <Skeleton className="h-5 w-1/2 mb-4" />
                    <Skeleton className="h-5 w-full mb-6" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-2">Error Loading Properties</h3>
              <p className="text-red-500 mb-4">Failed to load properties.</p>
              <Button 
                onClick={() => refetch()} 
                className="bg-primary hover:bg-primary-dark text-white"
              >
                Try Again
              </Button>
            </div>
          ) : properties?.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">No Properties Found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any properties matching your search criteria.
              </p>
              <p className="text-gray-600">
                Try adjusting your search filters or browse our full property listing.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties?.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
