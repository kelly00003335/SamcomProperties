import { useEffect, useState } from "react";
import { Testimonial } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { testimonialService } from "@/lib/firestore-service";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);
        const data = await testimonialService.getAll();

        // If no testimonials are found, use default ones
        if (data.length === 0) {
          // These are fallback testimonials that will display if none are in the database
          const defaultTestimonials: Testimonial[] = [
            {
              id: "1",
              name: "Sarah Kamau",
              role: "Homeowner, Nairobi",
              image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f",
              content: "Samcom Properties helped me find my dream home in a competitive market. Their team was professional and genuinely cared about my needs. Highly recommended!",
              rating: 5,
              createdAt: new Date()
            },
            {
              id: "2",
              name: "James Omondi",
              role: "Property Investor",
              image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4",
              content: "I've worked with many real estate companies, but Samcom stands out for their market knowledge and honesty. They've helped me build a profitable property portfolio.",
              rating: 5,
              createdAt: new Date()
            },
            {
              id: "3",
              name: "Mary Wambui",
              role: "First-time Buyer",
              image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
              content: "As a first-time buyer, I was nervous about the process. The team at Samcom guided me every step of the way. I couldn't be happier with my new apartment!",
              rating: 4,
              createdAt: new Date()
            },
            {
              id: "4",
              name: "Joseph Njoroge",
              role: "Land Investor, Naivasha",
              image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6",
              content: "Samcom's expertise in land surveying and title deed processing made my investment process seamless. Their knowledge of the local market is unmatched.",
              rating: 5,
              createdAt: new Date()
            }
          ];
          setTestimonials(defaultTestimonials);
        } else {
          setTestimonials(data);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index}>
                <CardContent className="p-8">
                  <Skeleton className="h-4 w-24 mb-4" />
                  <Skeleton className="h-20 w-full mb-6" />
                  <div className="flex items-center">
                    <Skeleton className="h-12 w-12 rounded-full mr-4" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">What Our Clients Say</h2>
            <p className="text-red-500">Failed to load testimonials. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // Render stars for rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center mb-4 text-secondary">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="fill-current" />
        ))}
        {hasHalfStar && <StarHalf className="fill-current" />}
      </div>
    );
  };

  return (
    <section className="py-16 bg-neutral-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied clients about their experience working with Samcom Properties Agency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white shadow-md">
              <CardContent className="p-8">
                {renderRating(testimonial.rating)}
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;