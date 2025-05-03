
import { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { formatPriceDisplay, timeAgo } from '@/lib/utils';
import { PropertyAPI } from '@/lib/api';
import { ContactAPI } from '@/lib/api';
import { FirebaseProperty } from '@shared/schema';
import PropertyGallery from '@/components/properties/PropertyGallery';
import PropertyFeatures from '@/components/properties/PropertyFeatures';
import ContactSection from '@/components/home/ContactSection';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { FaBed, FaBath, FaRuler } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function PropertyDetail() {
  const [, params] = useRoute('/properties/:id');
  const propertyId = params?.id;
  const { toast } = useToast();

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
        <PropertyGallery images={property.images || []} title={property.title}/> 
      </div>

      {/* Property details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Property Details</h2>

          {/* Property specs */}
          <div className="flex flex-wrap gap-6 mb-6 bg-gray-50 p-4 rounded-lg">
            {(property.bedrooms ?? 0) > 0 && (
              <div className="flex items-center">
                <FaBed className="text-primary mr-2" />
                <span>{property.bedrooms} Bedrooms</span>
              </div>
            )}
            {(property.bathrooms ?? 0) > 0 && (
              <div className="flex items-center">
                <FaBath className="text-primary mr-2" />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
            )}
            {(property.area ?? 0) > 0 && (
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

            <Dialog data-dialog-viewing>
              <DialogTrigger asChild>
                <Button className="w-full mb-4">Schedule a Viewing</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Schedule a Viewing</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to schedule a viewing for this property.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4" onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name') as string;
                  const email = formData.get('email') as string;
                  const phone = formData.get('phone') as string;
                  const date = formData.get('date') as string;
                  const time = formData.get('time') as string;

                  try {
                    // Create a message to send to the contact messages collection
                    await ContactAPI.createContactMessage({
                      name,
                      email,
                      phone,
                      subject: `Viewing Request for ${property.title}`,
                      message: `Viewing requested for property: ${property.title} (ID: ${property.id})
                      
Requested Date: ${date}
Requested Time: ${time}

Property Information:
Location: ${property.location}
Price: ${formatPriceDisplay(property.price || 0, property.status || 'unknown')}
Status: ${property.status}
`,
                    });
                    
                    // Show success message and close the dialog
                    toast({
                      title: "Request Submitted",
                      description: "Your viewing request has been sent successfully. We'll contact you soon to confirm.",
                    });
                    
                    // Close the dialog by clicking the dialog close button
                    const closeButton = document.querySelector('[data-dialog-viewing] button[data-state="open"]');
                    if (closeButton) {
                      (closeButton as HTMLButtonElement).click();
                    }
                  } catch (error) {
                    console.error('Error submitting viewing request:', error);
                    toast({
                      variant: "destructive",
                      title: "Error",
                      description: "There was a problem submitting your request. Please try again.",
                    });
                  }
                }}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" name="name" className="col-span-3" placeholder="Your full name" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input id="email" name="email" type="email" className="col-span-3" placeholder="Your email" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">
                        Phone
                      </Label>
                      <Input id="phone" name="phone" type="tel" className="col-span-3" placeholder="Your phone number" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Date
                      </Label>
                      <Input id="date" name="date" type="date" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="time" className="text-right">
                        Time
                      </Label>
                      <Input id="time" name="time" type="time" className="col-span-3" required />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Submit Request</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog data-dialog-info>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  Request Information
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Request Information</DialogTitle>
                  <DialogDescription>
                    Ask us anything about this property and we'll get back to you.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4" onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('info-name') as string;
                  const email = formData.get('info-email') as string;
                  const phone = formData.get('info-phone') as string;
                  const message = formData.get('info-message') as string;

                  try {
                    // Create a message to send to the contact messages collection
                    await ContactAPI.createContactMessage({
                      name,
                      email,
                      phone,
                      subject: `Information Request for ${property.title}`,
                      message: `Information requested for property: ${property.title} (ID: ${property.id})
                      
Client's message: ${message}

Property Information:
Location: ${property.location}
Price: ${formatPriceDisplay(property.price || 0, property.status || 'unknown')}
Status: ${property.status}
`,
                    });
                    
                    // Show success message and close the dialog
                    toast({
                      title: "Request Submitted",
                      description: "Your information request has been sent successfully. We'll contact you soon.",
                    });
                    
                    // Close the dialog by clicking the dialog close button
                    const closeButton = document.querySelector('[data-dialog-info] button[data-state="open"]');
                    if (closeButton) {
                      (closeButton as HTMLButtonElement).click();
                    }
                  } catch (error) {
                    console.error('Error submitting information request:', error);
                    toast({
                      variant: "destructive",
                      title: "Error",
                      description: "There was a problem submitting your request. Please try again.",
                    });
                  }
                }}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="info-name" className="text-right">
                        Name
                      </Label>
                      <Input id="info-name" name="info-name" className="col-span-3" placeholder="Your full name" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="info-email" className="text-right">
                        Email
                      </Label>
                      <Input id="info-email" name="info-email" type="email" className="col-span-3" placeholder="Your email" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="info-phone" className="text-right">
                        Phone
                      </Label>
                      <Input id="info-phone" name="info-phone" type="tel" className="col-span-3" placeholder="Your phone number" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="info-message" className="text-right">
                        Message
                      </Label>
                      <Textarea id="info-message" name="info-message" className="col-span-3" placeholder="Your questions about this property" required />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Send Request</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

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
