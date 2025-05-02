import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, User } from "lucide-react";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn 
} from "react-icons/fa";
import { useAuth } from "@/hooks/use-auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [location] = useLocation();
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      {/* Top Contact Bar - Hidden on mobile */}
      <div className="bg-primary text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="tel:+254722123456" className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2" /> +254 722 123 456
            </a>
            <a href="mailto:info@samcom.co.ke" className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2" /> info@samcom.co.ke
            </a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-secondary">
              <FaFacebookF />
            </a>
            <a href="#" className="text-white hover:text-secondary">
              <FaTwitter />
            </a>
            <a href="#" className="text-white hover:text-secondary">
              <FaInstagram />
            </a>
            <a href="#" className="text-white hover:text-secondary">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`bg-white py-4 shadow-md z-50 ${
          isSticky ? "navbar-fixed" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <img 
                src="https://i.imgur.com/81eAvY3.jpeg" 
                alt="Samcom Properties Logo" 
                className="h-12 w-auto"
              />
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/" text="Home" isActive={location === '/'} />
              <NavLink href="/properties" text="Properties" isActive={location.startsWith('/properties')} />
              <NavLink href="/about" text="About Us" isActive={location === '/about'} />
              <NavLink href="/contact" text="Contact" isActive={location === '/contact'} />
              
              {/* Admin Link - Hidden for normal users */}
              {user?.email === 'samwelgithogori@gmail.com' && (
                <Link href="/admin">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
              )}
              
              <Link href="/contact">
                <Button 
                  className="bg-primary hover:bg-primary-dark text-white"
                >
                  List Property
                </Button>
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-neutral-dark focus:outline-none" 
                onClick={toggleMenu}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-3">
                <NavLink href="/" text="Home" isActive={location === '/'} isMobile />
                <NavLink href="/properties" text="Properties" isActive={location.startsWith('/properties')} isMobile />
                <NavLink href="/about" text="About Us" isActive={location === '/about'} isMobile />
                <NavLink href="/contact" text="Contact" isActive={location === '/contact'} isMobile />
                <Link href="/contact">
                  <Button 
                    className="w-full bg-primary hover:bg-primary-dark text-white mt-2"
                  >
                    List Property
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  text: string;
  isActive: boolean;
  isMobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, text, isActive, isMobile }) => {
  return (
    <Link href={href}>
      <div 
        className={`
          ${isActive ? "text-primary font-medium" : "text-neutral-dark font-medium hover:text-primary"} 
          ${isMobile ? "py-2" : ""}
          cursor-pointer
        `}
      >
        {text}
      </div>
    </Link>
  );
};

export default Navbar;
