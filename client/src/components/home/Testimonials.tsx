import { useEffect, useState } from 'react';
import { TestimonialAPI } from '@/lib/api';
import { Testimonial } from '@shared/schema';
import Spinner from '@/components/ui/spinner';

const defaultTestimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Jane Smith',
      role: 'Home Buyer',
      content: 'Working with Samcom Properties was an excellent experience. They understood my requirements and found me the perfect home within my budget.',
      image: '/img/testimonials/person1.jpg',
      rating: 5
    },
    {
      id: 2,
      name: 'John Davis',
      role: 'Property Investor',
      content: 'I\'ve worked with many real estate agencies, but Samcom Properties stands out with their market knowledge and professional service.',
      image: '/img/testimonials/person2.jpg',
      rating: 5
    },
    {
      id: 3,
      name: 'Mary Johnson',
      role: 'First-time Buyer',
      content: 'The team at Samcom made buying my first home a smooth process. They guided me through every step and answered all my questions.',
      image: '/img/testimonials/person3.jpg',
      rating: 4
    },
    {
      id: 4, 
      name: 'David Williams',
      role: 'Commercial Client',
      content: 'Their expertise in commercial real estate is impressive. They helped us find the perfect location for our new business.',
      image: '/img/testimonials/person4.jpg',
      rating: 5
    }
  ];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const data = await TestimonialAPI.getAllTestimonials();
        setTestimonials(data || defaultTestimonials);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials(defaultTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) return <div className="flex justify-center py-10"><Spinner /></div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800">What Our Clients Say</h2>
          <p className="mt-2 text-gray-600">Hear from our satisfied clients about their experience with us</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d'} 
                    alt={testimonial.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              <div className="mb-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span 
                    key={index} 
                    className={index < Math.floor(testimonial.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-600">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}