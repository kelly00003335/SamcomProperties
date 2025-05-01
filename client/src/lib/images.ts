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
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      alt: "Modern House Exterior",
      title: "Find Your Dream Home",
      description: "Samcom Properties Agency helps you find the perfect property that fits your lifestyle and budget.",
      primaryText: "View Properties",
      primaryLink: "/properties",
      secondaryText: "Contact Us",
      secondaryLink: "/contact"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      alt: "Modern House Exterior",
      title: "Premium Properties",
      description: "Discover exceptional homes with top-tier amenities and prime locations.",
      primaryText: "Explore Premium Listings",
      primaryLink: "/properties",
      secondaryText: "Meet Our Agents",
      secondaryLink: "/about"
    },
    {
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      alt: "Modern House Exterior",
      title: "Invest In Real Estate",
      description: "Grow your wealth with strategic property investments guided by our experts.",
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
      src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      alt: "Property Handover"
    },
    {
      src: "https://images.unsplash.com/photo-1582407947304-fd86f028f716",
      alt: "Real Estate Agent"
    },
    {
      src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      alt: "Modern House"
    },
    {
      src: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1",
      alt: "Real Estate Agents Meeting"
    }
  ];
};

// Property placeholder image
export const getPropertyPlaceholderImage = () => {
  return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
};

// Agent placeholder image
export const getAgentPlaceholderImage = () => {
  return "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
};
