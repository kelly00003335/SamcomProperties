import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      await apiRequest('POST', '/api/newsletter', { email });
      
      toast({
        title: "Success!",
        description: "You have successfully subscribed to our newsletter.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe to newsletter. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-neutral-dark text-white pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-heading">Samcom Properties</h3>
            <p className="mb-4">
              Your trusted partner in finding the perfect property across Kenya. 
              We provide professional real estate services tailored to your needs.
            </p>
            <p className="mb-4">
              P.O. Box 2352
              <br />Kinamba Naivasha,
              <br />Kenya
            </p>
            <p className="mb-6">
              <a href="tel:+254723204783" className="hover:text-secondary block">+254 723 204 783</a>
              <a href="tel:+254778249550" className="hover:text-secondary block">+254 778 249 550</a>
              <a href="mailto:samwelgithogori@gmail.com" className="hover:text-secondary block">samwelgithogori@gmail.com</a>
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-secondary text-lg">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white hover:text-secondary text-lg">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/samcomproperties_/" className="text-white hover:text-secondary text-lg">
                <FaInstagram />
              </a>
              <a href="#" className="text-white hover:text-secondary text-lg">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-heading">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-secondary">Home</Link></li>
              <li><Link href="/properties" className="hover:text-secondary">Properties</Link></li>
              <li><Link href="/about" className="hover:text-secondary">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-secondary">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Property Types */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-heading">Property Types</h3>
            <ul className="space-y-3">
              <li><Link href="/properties?type=apartment" className="hover:text-secondary">Apartments</Link></li>
              <li><Link href="/properties?type=house" className="hover:text-secondary">Houses</Link></li>
              <li><Link href="/properties?type=commercial" className="hover:text-secondary">Commercial Properties</Link></li>
              <li><Link href="/properties?type=land" className="hover:text-secondary">Land & Plots</Link></li>
            </ul>
          </div>
          
          {/* Our Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-heading">Our Services</h3>
            <ul className="space-y-3">
              <li><Link href="/properties?status=for-sale" className="hover:text-secondary">Property Sales</Link></li>
              <li><Link href="/properties?status=for-rent" className="hover:text-secondary">Property Rentals</Link></li>
              <li><Link href="/about" className="hover:text-secondary">Land Surveying</Link></li>
              <li><Link href="/about" className="hover:text-secondary">Title Deed Processing</Link></li>
              <li><Link href="/about" className="hover:text-secondary">Legal Services</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-heading">Newsletter</h3>
            <p className="mb-4">
              Subscribe to our newsletter to receive the latest property updates, market insights, and exclusive listings before they hit the market.
            </p>
            <form className="mb-4" onSubmit={handleNewsletterSubmit}>
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-r-none focus:outline-none text-neutral-dark"
                />
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-dark p-3 rounded-l-none transition duration-300"
                  disabled={isSubmitting}
                >
                  <FaPaperPlane />
                </Button>
              </div>
            </form>
            <p className="text-sm">
              By subscribing, you agree to our privacy policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p>© {new Date().getFullYear()} Samcom Properties Agency. All rights reserved.</p>
              <p className="text-sm mt-2">Licensed Real Estate Agency - Registration #KE2010/378</p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-secondary text-sm">Privacy Policy</a>
              <a href="#" className="hover:text-secondary text-sm">Terms & Conditions</a>
              <a href="#" className="hover:text-secondary text-sm">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
