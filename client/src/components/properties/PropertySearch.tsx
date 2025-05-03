import { useState } from 'react';
import { useLocation } from 'wouter';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const locationOptions = ['all', 'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'];
const typeOptions = ['all', 'house', 'apartment', 'land', 'commercial'];
const statusOptions = ['all', 'for-sale', 'for-rent'];

export default function PropertySearch() {
  const [, setLocation] = useLocation();
  const [searchParams, setSearchParams] = useState({
    location: 'all',
    type: 'all',
    minPrice: '',
    maxPrice: '',
    status: 'all',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Build the query string from non-empty parameters
    const queryParams = new URLSearchParams();

    if (searchParams.location !== 'all') {
      queryParams.append('location', searchParams.location);
    }

    if (searchParams.type !== 'all') {
      queryParams.append('type', searchParams.type);
    }

    if (searchParams.status !== 'all') {
      queryParams.append('status', searchParams.status);
    }

    if (searchParams.minPrice) {
      queryParams.append('minPrice', searchParams.minPrice);
    }

    if (searchParams.maxPrice) {
      queryParams.append('maxPrice', searchParams.maxPrice);
    }

    const queryString = queryParams.toString();
    setLocation(`/properties${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 -mt-10 relative z-10">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <Select value={searchParams.location} onValueChange={(value) => handleSelectChange('location', value)}>
            <SelectTrigger id="location">
              <SelectValue placeholder="Any location" />
            </SelectTrigger>
            <SelectContent>
              {locationOptions.map((location) => (
                <SelectItem key={location} value={location}>
                  {location === 'all' ? 'Any location' : location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <Select value={searchParams.type} onValueChange={(value) => handleSelectChange('type', value)}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((type) => (
                <SelectItem key={type} value={type}>
                  {type === 'all' ? 'Any type' : type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <Select value={searchParams.status} onValueChange={(value) => handleSelectChange('status', value)}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Any status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status === 'all'
                    ? 'Any status'
                    : status.replace('-', ' ').charAt(0).toUpperCase() + status.replace('-', ' ').slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">
            Price Range (KES)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              id="min-price"
              name="minPrice"
              value={searchParams.minPrice}
              onChange={handleInputChange}
              placeholder="Min"
              className="w-full"
            />
            <Input
              type="number"
              id="max-price"
              name="maxPrice"
              value={searchParams.maxPrice}
              onChange={handleInputChange}
              placeholder="Max"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex items-end">
          <Button type="submit" className="w-full">
            Search Properties
          </Button>
        </div>
      </form>
    </div>
  );
}