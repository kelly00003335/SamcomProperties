import { useLocation } from "wouter";
import { useEffect, useState, useMemo } from "react";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertySearch from "@/components/properties/PropertySearch";
import { FirebaseProperty } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useFirestoreCollection } from "@/hooks/use-firestore-collection";
import { where, QueryConstraint } from "firebase/firestore";

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
    if (params.has('status')) newParams.status = params.get('status');
    
    setSearchParams(newParams);
  }, [location]);

  // Build Firestore query constraints based on search params
  const constraints = useMemo(() => {
    const constraintArray: QueryConstraint[] = [];
    
    if (searchParams.location) {
      constraintArray.push(where('location', '==', searchParams.location));
    }
    
    if (searchParams.type) {
      constraintArray.push(where('type', '==', searchParams.type));
    }
    
    if (searchParams.status) {
      constraintArray.push(where('status', '==', searchParams.status));
    }
    
    return constraintArray;
  }, [searchParams]);

  // Use real-time listener instead of React Query
  const { documents: properties, loading: isLoading, error } = 
    useFirestoreCollection<FirebaseProperty>('properties', constraints);

  // Additional client-side filtering for price (since Firestore can't do multiple range queries)
  const filteredProperties = useMemo(() => {
    if (!properties) return [];
    
    return properties.filter(property => {
      // Apply price filters if specified
      if (searchParams.minPrice && property.price < parseInt(searchParams.minPrice)) {
        return false;
      }
      
      if (searchParams.maxPrice && property.price > parseInt(searchParams.maxPrice)) {
        return false;
      }
      
      // Filter by location if present in URL but not in Firestore query
      if (searchParams.location && property.location.toLowerCase() !== searchParams.location.toLowerCase()) {
        return false;
      }
      
      // Filter by property type if present in URL but not in Firestore query
      if (searchParams.type && property.type.toLowerCase() !== searchParams.type.toLowerCase()) {
        return false;
      }
      
      // Filter by status if present
      if (searchParams.status && property.status !== searchParams.status) {
        return false;
      }
      
      return true;
    });
  }, [properties, searchParams]);

  // Build page title based on search params
  const getPageTitle = () => {
    if (Object.keys(searchParams).length === 0) {
      return "All Properties";
    }
    
    const parts = [];
    
    if (searchParams.status) {
      parts.push(
        searchParams.status === 'for-sale' ? 'Properties For Sale' : 
        searchParams.status === 'for-rent' ? 'Properties For Rent' : ''
      );
    } else if (searchParams.type) {
      parts.push(
        searchParams.type.charAt(0).toUpperCase() + 
        searchParams.type.slice(1) + 
        "s"
      );
    } else {
      parts.push("Properties");
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
    
    return parts.join(" ");
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
            <div className="text-center py-8">
              <p className="text-red-500">Failed to load properties. Please try again later.</p>
            </div>
          ) : filteredProperties.length === 0 ? (
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
              {filteredProperties.map((property) => (
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
