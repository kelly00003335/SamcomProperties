// Hero slider content
export interface HeroSlide {
  image: string;
  alt: string;
  title: string;
  description: string;
  primaryText: string;
  primaryLink: string;
  secondaryText: string;
  secondaryLink: string;
}

export const getHeroImages = (): HeroSlide[] => {
  return [
    {
      image: "https://images.unsplash.com/photo-1566159196982-6d26d42f5bcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      alt: "Nairobi Skyline",
      title: "Find Your Dream Home",
      description: "Samcom Properties Agency helps you find the perfect property that fits your lifestyle and budget.",
      primaryText: "View Properties",
      primaryLink: "/properties",
      secondaryText: "Contact Us",
      secondaryLink: "/contact"
    },
    {
      image: "https://images.unsplash.com/photo-1611348524140-63c9d5827e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      alt: "Kenyan Residential Area",
      title: "Premium Properties",
      description: "Discover exceptional homes with top-tier amenities and prime locations.",
      primaryText: "Explore Premium Listings",
      primaryLink: "/properties",
      secondaryText: "Meet Our Agents",
      secondaryLink: "/about"
    },
    {
      image: "https://images.unsplash.com/photo-1574236170880-78841035f7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      alt: "Beautiful Kenyan Landscape",
      title: "Invest In Land",
      description: "Grow your wealth with strategic property and land investments guided by our experts.",
      primaryText: "Investment Properties",
      primaryLink: "/properties",
      secondaryText: "Free Consultation",
      secondaryLink: "/contact"
    }
  ];
};

// About page gallery images
export const getAboutPageImages = () => {
  return [
    {
      src: "https://images.unsplash.com/photo-1543236311-719e37bc83e3",
      alt: "Kenyan Real Estate Transaction"
    },
    {
      src: "https://images.unsplash.com/photo-1580902394836-21e0d429b7f4",
      alt: "Kenyan Real Estate Professional"
    },
    {
      src: "https://images.unsplash.com/photo-1613090459-a003e960523f",
      alt: "Modern Kenyan Home"
    },
    {
      src: "https://images.unsplash.com/photo-1581539250439-c96689b516dd",
      alt: "Kenyan Property Development"
    }
  ];
};

// Property placeholder image
export const getPropertyPlaceholderImage = () => {
  return "https://images.unsplash.com/photo-1613090459-a003e960523f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
};

// Agent placeholder image
export const getAgentPlaceholderImage = () => {
  return "https://images.unsplash.com/photo-1580902394724-b08ff9ba7e8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
};
