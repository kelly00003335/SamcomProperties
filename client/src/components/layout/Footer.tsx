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
    <footer className="bg-[#1A237E] text-white pt-8 md:pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-6 font-heading">Samcom Properties</h3>
            <p className="text-gray-300 text-sm md:text-base">
              Your trusted partner in finding the perfect property across Kenya. 
              We provide professional real estate services tailored to your needs.
            </p>
            <div className="pt-1 md:pt-2">
              <p className="text-gray-300 text-sm md:text-base">P.O. Box 2352</p>
              <p className="text-gray-300 text-sm md:text-base">Kinamba Naivasha,</p>
              <p className="text-gray-300 text-sm md:text-base">Kenya</p>
            </div>
            <div className="pt-1 md:pt-2">
              <p className="text-gray-300 text-sm md:text-base">+254 723 204 783</p>
              <p className="text-gray-300 text-sm md:text-base">+254 778 249 550</p>
              <p className="text-gray-300 text-sm md:text-base">samwelgithogori@gmail.com</p>
            </div>
            <div className="flex space-x-4 pt-1 md:pt-2">
              <a href="#" className="text-white hover:text-secondary text-base md:text-lg">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white hover:text-secondary text-base md:text-lg">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/samcomproperties_/" className="text-white hover:text-secondary text-base md:text-lg">
                <FaInstagram />
              </a>
              <a href="#" className="text-white hover:text-secondary text-base md:text-lg">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-6 font-heading">Quick Links</h3>
            <ul className="space-y-2 md:space-y-3">
              <li><Link href="/" className="text-white hover:text-secondary text-sm md:text-base">Home</Link></li>
              <li><Link href="/properties" className="text-white hover:text-secondary text-sm md:text-base">Properties</Link></li>
              <li><Link href="/about" className="text-white hover:text-secondary text-sm md:text-base">About Us</Link></li>
              <li><Link href="/contact" className="text-white hover:text-secondary text-sm md:text-base">Contact Us</Link></li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-6 font-heading">Property Types</h3>
            <ul className="space-y-2 md:space-y-3">
              <li><Link href="/properties?type=apartment" className="text-white hover:text-secondary text-sm md:text-base">Apartments</Link></li>
              <li><Link href="/properties?type=house" className="text-white hover:text-secondary text-sm md:text-base">Houses</Link></li>
              <li><Link href="/properties?type=commercial" className="text-white hover:text-secondary text-sm md:text-base">Commercial Properties</Link></li>
              <li><Link href="/properties?type=land" className="text-white hover:text-secondary text-sm md:text-base">Land & Plots</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-6 font-heading">Our Services</h3>
            <ul className="space-y-2 md:space-y-3">
              <li><Link href="/properties?status=for-sale" className="text-white hover:text-secondary text-sm md:text-base">Property Sales</Link></li>
              <li><Link href="/properties?status=for-rent" className="text-white hover:text-secondary text-sm md:text-base">Property Rentals</Link></li>
              <li><Link href="/about" className="text-white hover:text-secondary text-sm md:text-base">Land Surveying</Link></li>
              <li><Link href="/about" className="text-white hover:text-secondary text-sm md:text-base">Title Deed Processing</Link></li>
              <li><Link href="/about" className="text-white hover:text-secondary text-sm md:text-base">Legal Services</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-6 font-heading">Newsletter</h3>
            <p className="mb-4 text-gray-300 text-sm md:text-base">
              Subscribe to our newsletter to receive the latest property updates, market insights, and exclusive listings before they hit the market.
            </p>
            <form className="mb-4" onSubmit={handleNewsletterSubmit}>
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-r-none focus:outline-none text-neutral-dark text-sm md:text-base"
                />
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-dark p-3 rounded-l-none transition duration-300 text-sm md:text-base"
                  disabled={isSubmitting}
                >
                  <FaPaperPlane />
                </Button>
              </div>
            </form>
            <p className="text-sm md:text-base text-gray-300">
              By subscribing, you agree to our privacy policy and consent to receive updates from our company.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 py-4 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="text-sm md:text-base">© {new Date().getFullYear()} Samcom Properties Agency. All rights reserved.</p>
              <p className="text-xs md:text-sm mt-2">Licensed Real Estate Agency - Registration #KE2010/378</p>
            </div>
            <div className="flex space-x-4 md:space-x-6 mt-2 md:mt-0">
              <a href="#" className="text-white hover:text-secondary text-xs md:text-sm">Privacy Policy</a>
              <a href="#" className="text-white hover:text-secondary text-xs md:text-sm">Terms & Conditions</a>
              <a href="#" className="text-white hover:text-secondary text-xs md:text-sm">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;