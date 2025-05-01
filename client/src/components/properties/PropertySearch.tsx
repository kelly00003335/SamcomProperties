import { useState } from "react";
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
  const [_, setLocationPath] = useLocation();
  const [locationFilter, setLocationFilter] = useState("all-locations");
  const [propertyType, setPropertyType] = useState("all-types");
  const [priceRange, setPriceRange] = useState("any-price");

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
  };

  return (
    <Card className="bg-white rounded-lg shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </Label>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
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
            <Label htmlFor="property-type" className="block text-sm font-medium text-gray-700 mb-1">
              Property Type
            </Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
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
            <Label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">
              Price Range
            </Label>
            <Select value={priceRange} onValueChange={setPriceRange}>
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
          
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1 opacity-0">
              Search
            </Label>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary-dark text-white"
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
