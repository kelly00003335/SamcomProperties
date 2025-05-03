import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const PropertySearch = () => {
  const [location, setLocationPath] = useLocation();
  const [locationFilter, setLocationFilter] = useState("all-locations");
  const [propertyType, setPropertyType] = useState("all-types");
  const [priceRange, setPriceRange] = useState("any-price");

  // Extract search params from URL when component mounts or URL changes
  useEffect(() => {
    if (location.includes('?')) {
      const params = new URLSearchParams(location.split('?')[1]);

      // Set form values based on URL parameters
      if (params.has('location')) {
        setLocationFilter(params.get('location') || 'all-locations');
      }

      if (params.has('type')) {
        setPropertyType(params.get('type') || 'all-types');
      }

      if (params.has('minPrice') || params.has('maxPrice')) {
        const min = params.get('minPrice') || '';
        const max = params.get('maxPrice') || '';
        const range = min && max ? `${min}-${max}` : 
                     min ? `${min}-` : 
                     max ? `0-${max}` : 'any-price';
        setPriceRange(range);
      }
    }
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Build query string
    const params = new URLSearchParams();

    if (locationFilter && locationFilter !== 'all-locations') params.append("location", locationFilter);
    if (propertyType && propertyType !== 'all-types') params.append("type", propertyType);

    if (priceRange && priceRange !== 'any-price') {
      const [min, max] = priceRange.split("-");
      if (min) params.append("minPrice", min);
      if (max) params.append("maxPrice", max);
    }

    // Navigate to properties page with search parameters
    setLocationPath(`/properties?${params.toString()}`);

    console.log('Search parameters:', {
      location: locationFilter,
      type: propertyType,
      priceRange
    });
  };

  return (
    <Card className="bg-[#F8F9FA] rounded-lg shadow-lg">
      <CardContent className="p-4 sm:p-6"> {/* Added padding for smaller screens */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4"> {/* Responsive grid */}
          <div>
            <Label htmlFor="location" className="block text-sm sm:text-base font-medium text-[#212121] mb-1">
              Location
            </Label>
            <Select value={locationFilter} onValueChange={setLocationFilter} className="text-[#212121] w-full"> {/* Added w-full for full width */}
              <SelectTrigger id="location">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-locations">All Locations</SelectItem>
                <SelectItem value="nairobi">Nairobi</SelectItem>
                <SelectItem value="mombasa">Mombasa</SelectItem>
                <SelectItem value="kisumu">Kisumu</SelectItem>
                <SelectItem value="nakuru">Nakuru</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="property-type" className="block text-sm sm:text-base font-medium text-[#212121] mb-1">
              Property Type
            </Label>
            <Select value={propertyType} onValueChange={setPropertyType} className="text-[#212121] w-full">
              <SelectTrigger id="property-type">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="land">Land</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price-range" className="block text-sm sm:text-base font-medium text-[#212121] mb-1">
              Price Range
            </Label>
            <Select value={priceRange} onValueChange={setPriceRange} className="text-[#212121] w-full">
              <SelectTrigger id="price-range">
                <SelectValue placeholder="Any Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any-price">Any Price</SelectItem>
                <SelectItem value="0-5000000">KSh 0 - 5M</SelectItem>
                <SelectItem value="5000000-10000000">KSh 5M - 10M</SelectItem>
                <SelectItem value="10000000-20000000">KSh 10M - 20M</SelectItem>
                <SelectItem value="20000000-">KSh 20M+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="sm:mt-6 md:mt-0"> {/* Added spacing for better mobile layout */}
            <Button
              type="submit"
              className="w-full bg-[#1A237E] hover:bg-[#0D1642] text-white"
            >
              Search Properties
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertySearch;