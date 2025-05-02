import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FirebaseProperty } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save } from "lucide-react";

// Custom schema with validation
const propertyFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.coerce.number().min(1, {
    message: "Price must be a positive number",
  }),
  location: z.string().min(1, { message: "Location is required" }),
  type: z.string().min(1, { message: "Property type is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  bedrooms: z.coerce.number().min(0, {
    message: "Bedrooms must be a positive number or zero",
  }),
  bathrooms: z.coerce.number().min(0, {
    message: "Bathrooms must be a positive number or zero",
  }),
  area: z.coerce.number().min(1, {
    message: "Area must be a positive number",
  }),
  featuresString: z.string(), // Will be converted to array
  imagesString: z.string().min(1, { message: "At least one image URL is required" }), // Will be converted to array
  isFeatured: z.boolean().default(false),
  agentId: z.number().optional()
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

interface PropertyFormProps {
  property: FirebaseProperty | null;
  onClose: () => void;
}

const PropertyForm = ({ property, onClose }: PropertyFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with default values or existing property data
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: property
      ? {
          title: property.title,
          description: property.description,
          price: property.price,
          location: property.location,
          type: property.type,
          status: property.status,
          bedrooms: property.bedrooms || 0,
          bathrooms: property.bathrooms || 0,
          area: property.area || 0,
          featuresString: property.features ? property.features.join(",") : "",
          imagesString: property.images.join(","),
          isFeatured: property.isFeatured || false,
          agentId: property.agentId || undefined
        }
      : {
          title: "",
          description: "",
          price: 0,
          location: "",
          type: "apartment",
          status: "for-sale",
          bedrooms: 0,
          bathrooms: 0,
          area: 0,
          featuresString: "",
          imagesString: "",
          isFeatured: false,
          agentId: undefined
        },
  });

  // Create or update property mutation
  const propertyMutation = useMutation({
    mutationFn: async (data: PropertyFormValues) => {
      // Process data to match schema
      const processedData = {
        title: data.title,
        description: data.description,
        price: data.price,
        location: data.location,
        type: data.type,
        status: data.status,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area: data.area,
        // Convert string to array
        features: data.featuresString.split(",").filter(Boolean).map(f => f.trim()),
        // Convert string to array
        images: data.imagesString.split(",").filter(Boolean).map(img => img.trim()),
        isFeatured: data.isFeatured,
        // Set agentId to null instead of undefined for Firestore compatibility
        agentId: data.agentId || null
      };

      if (property) {
        // Update existing property
        return apiRequest(`/api/properties/${property.id}`, "PATCH", processedData);
      } else {
        // Create new property
        return apiRequest("/api/properties/create", "POST", processedData);
      }
    },
    onSuccess: () => {
      toast({
        title: property ? "Property updated" : "Property created",
        description: property
          ? "The property has been updated successfully."
          : "New property has been created successfully.",
      });

      // Note: We don't need to manually invalidate or refresh queries anymore
      // since we're using real-time Firestore listeners that will automatically
      // update when the database changes!
      
      console.log('Property successfully saved to Firebase - real-time listeners will update UI');
      
      // Close the form
      onClose();
    },
    onError: (error) => {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `There was a problem ${property ? "updating" : "creating"} the property.`,
      });
    },
  });

  const onSubmit = async (data: PropertyFormValues) => {
    try {
      console.log('PropertyForm onSubmit with data:', JSON.stringify(data, null, 2));
      setIsSubmitting(true);
      
      // Add a property ID tracking log
      console.log('Current property being edited:', property ? `ID: ${property.id}` : 'New property');
      
      // Execute the mutation - the onSuccess handler will show the toast and close the form
      await propertyMutation.mutateAsync(data);
      
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        variant: "destructive",
        title: "Error Saving Property",
        description: `There was a problem saving your property. Please try again.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onClose} className="mr-4" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">
          {property ? "Edit Property" : "Add New Property"}
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6 bg-white p-6 rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Modern 3 Bedroom Apartment" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (KSh)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="nairobi">Nairobi</SelectItem>
                        <SelectItem value="mombasa">Mombasa</SelectItem>
                        <SelectItem value="kisumu">Kisumu</SelectItem>
                        <SelectItem value="nakuru">Nakuru</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="for-sale">For Sale</SelectItem>
                        <SelectItem value="for-rent">For Rent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the property..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <h3 className="text-lg font-semibold">Property Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Bedrooms */}
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bathrooms */}
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Area (square feet) */}
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area (Square Feet)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input type="number" {...field} />
                        <div className="flex flex-wrap gap-2 text-xs">
                          <button 
                            type="button" 
                            onClick={() => form.setValue('area', 5000)}
                            className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                          >
                            50x100 (5,000 sq.ft)
                          </button>
                          <button 
                            type="button" 
                            onClick={() => form.setValue('area', 10000)}
                            className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                          >
                            100x100 (10,000 sq.ft)
                          </button>
                          <button 
                            type="button" 
                            onClick={() => form.setValue('area', 43560)}
                            className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                          >
                            1 Acre (43,560 sq.ft)
                          </button>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      <button 
                        type="button"
                        onClick={() => document.getElementById('size-guide-dialog')?.classList.toggle('hidden')}
                        className="text-primary text-sm underline"
                      >
                        View land size reference chart
                      </button>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Features */}
            <FormField
              control={form.control}
              name="featuresString"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Swimming Pool, Garden, Garage"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter features separated by commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <h3 className="text-lg font-semibold">Property Images</h3>

            {/* Images */}
            <FormField
              control={form.control}
              name="imagesString"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URLs</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter image URLs separated by commas. The first image will be used as the main image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting
                ? property
                  ? "Updating..."
                  : "Creating..."
                : property
                ? "Update Property"
                : "Create Property"}
            </Button>
          </div>
        </form>
      </Form>

      {/* Land Size Reference Dialog */}
      <div 
        id="size-guide-dialog" 
        className="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            document.getElementById('size-guide-dialog')?.classList.add('hidden');
          }
        }}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Land Size Reference Chart</h3>
            <button 
              onClick={() => document.getElementById('size-guide-dialog')?.classList.add('hidden')}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Unit Name</th>
                  <th className="border p-2 text-left">Size (Approx.)</th>
                  <th className="border p-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-medium">Acre</td>
                  <td className="border p-2">43,560 sq. ft. or ~4,047 m²</td>
                  <td className="border p-2">Standard for large properties or farming</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Hectare</td>
                  <td className="border p-2">2.471 acres or 10,000 m²</td>
                  <td className="border p-2">Less commonly used in real estate ads</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Plot</td>
                  <td className="border p-2">Varies (often 50x100 ft)</td>
                  <td className="border p-2">Common term, size depends on region</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">50x100 ft</td>
                  <td className="border p-2">5,000 sq. ft. (approx. 1/8 acre)</td>
                  <td className="border p-2">Urban residential standard</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">100x100 ft</td>
                  <td className="border p-2">10,000 sq. ft. (approx. 1/4 acre)</td>
                  <td className="border p-2">Popular for corner plots</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Square Meters</td>
                  <td className="border p-2">Used in legal docs & title deeds</td>
                  <td className="border p-2">Metric option, often seen in titles</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Acres & Hectares</td>
                  <td className="border p-2">Used in rural, commercial, or agri plots</td>
                  <td className="border p-2">Especially large tracts</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>For land property listings, it's important to specify the exact measurements. Common standard plot sizes in Kenya are 50x100 ft plots (1/8 acre).</p>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button 
              onClick={() => document.getElementById('size-guide-dialog')?.classList.add('hidden')}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
