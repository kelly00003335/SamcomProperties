import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Agent } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Award,
  Users,
  Home,
  CheckCircle
} from "lucide-react";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn 
} from "react-icons/fa";

const About = () => {
  const { data: agents, isLoading: agentsLoading } = useQuery<Agent[]>({
    queryKey: ['/api/agents'],
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-neutral-light py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">About Samcom Properties</h1>
            <p className="text-lg text-gray-700 mb-8">
              We are a trusted real estate agency dedicated to helping clients find their dream properties and make smart real estate investments.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-heading">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Samcom Properties was founded in 2010 with a simple mission: to make the process of buying, selling, and renting properties as smooth and transparent as possible. What started as a small office with just three agents has grown into one of Kenya's most trusted real estate agencies.
              </p>
              <p className="text-gray-600 mb-4">
                We have expanded our services to include land and plot sales, title deed processing, transfers, and professional land surveying to provide a complete solution for all your real estate needs in Kenya.
              </p>
              <p className="text-gray-600 mb-4">
                Our founder, Samuel Mwangi, started the company after noticing a gap in the market for customer-centric real estate services. He believed that clients deserved honest advice, personalized attention, and access to the best properties in the market.
              </p>
              <p className="text-gray-600 mb-6">
                Today, Samcom Properties continues to uphold these values while leveraging modern technology and industry expertise to provide exceptional service to our clients across Kenya.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="./attached_assets/image_1746189767238.png" 
                alt="Samcom Office" 
                className="rounded-lg shadow-md w-full h-64 object-cover" 
              />
              <img 
                src="./attached_assets/image_1746189808502.png" 
                alt="Team Meeting" 
                className="rounded-lg shadow-md w-full h-64 object-cover mt-8" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Calendar className="h-12 w-12 mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">13+</p>
              <p className="text-lg">Years of Experience</p>
            </div>
            <div>
              <Home className="h-12 w-12 mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">1200+</p>
              <p className="text-lg">Properties Sold</p>
            </div>
            <div>
              <Users className="h-12 w-12 mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">950+</p>
              <p className="text-lg">Happy Clients</p>
            </div>
            <div>
              <Award className="h-12 w-12 mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">15+</p>
              <p className="text-lg">Industry Awards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-heading">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At Samcom Properties, we are guided by a set of core values that shape our approach to business and client relationships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-primary-light inline-flex p-4 rounded-full text-primary mb-6">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">Integrity</h3>
              <p className="text-gray-600">We conduct our business with the highest ethical standards and transparency.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-primary-light inline-flex p-4 rounded-full text-primary mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">Client Focus</h3>
              <p className="text-gray-600">We prioritize our clients' needs and goals above all else in our services.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-primary-light inline-flex p-4 rounded-full text-primary mb-6">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">Excellence</h3>
              <p className="text-gray-600">We strive for excellence in every aspect of our service and operations.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-primary-light inline-flex p-4 rounded-full text-primary mb-6">
                <Home className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">Innovation</h3>
              <p className="text-gray-600">We embrace new technologies and approaches to improve our service delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-heading">Our Expert Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet our team of experienced real estate professionals dedicated to helping you achieve your property goals.
            </p>
          </div>
          
          {agentsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Skeleton className="w-full h-72" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-1/2 mb-3" />
                    <Skeleton className="h-16 w-full mb-4" />
                    <div className="flex space-x-3">
                      <Skeleton className="h-6 w-6" />
                      <Skeleton className="h-6 w-6" />
                      <Skeleton className="h-6 w-6" />
                      <Skeleton className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {agents?.map((agent) => (
                <div key={agent.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-72 overflow-hidden">
                    <img 
                      src={agent.image} 
                      alt={agent.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 font-heading">{agent.name}</h3>
                    <p className="text-primary font-medium mb-3">{agent.title}</p>
                    <p className="text-gray-600 mb-4">{agent.bio}</p>
                    <div className="flex space-x-3">
                      <a href="#" className="text-gray-600 hover:text-primary">
                        <FaLinkedinIn />
                      </a>
                      <a href="#" className="text-gray-600 hover:text-primary">
                        <FaTwitter />
                      </a>
                      <a href={`mailto:${agent.email}`} className="text-gray-600 hover:text-primary">
                        <Mail size={18} />
                      </a>
                      <a href={`tel:${agent.phone}`} className="text-gray-600 hover:text-primary">
                        <Phone size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Office Location */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-heading">Our Office</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit us at our office in Kinamba Naivasha, Kenya.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 max-w-md mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary-light inline-flex p-4 rounded-full text-primary mb-6">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading">Our Location</h3>
              <p className="text-gray-600 mb-4">P.O. Box 2352, Kinamba Naivasha, Kenya</p>
              <div className="flex items-center mb-2">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <p>+254 723 204 783</p>
              </div>
              <div className="flex items-center mb-2">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <p>+254 778 249 550</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <p>samwelgithogori@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-heading">Ready to Work With Us?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Contact our team today to discuss your real estate needs and let us help you find your perfect property.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Contact Us Now
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default About;
