
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
      image: "https://i.imgur.com/IX11M27.jpeg",
      alt: "Kenyan Property",
      title: "Find Your Dream Home",
      description: "Samcom Properties Agency helps you find the perfect property that fits your lifestyle and budget.",
      primaryText: "View Properties",
      primaryLink: "/properties",
      secondaryText: "Contact Us",
      secondaryLink: "/contact"
    },
    {
      image: "https://i.imgur.com/82H7kON.jpeg",
      alt: "Kenyan Residential Area",
      title: "Premium Properties",
      description: "Discover exceptional homes with top-tier amenities and prime locations.",
      primaryText: "Explore Premium Listings",
      primaryLink: "/properties",
      secondaryText: "Meet Our Agents",
      secondaryLink: "/about"
    },
    {
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1776&auto=format&fit=crop",
      alt: "Beautiful Land Investment Opportunity",
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
      src: "https://i.imgur.com/82H7kON.jpeg",
      alt: "Kenyan Residential Property"
    },
    {
      src: "https://i.imgur.com/IX11M27.jpeg",
      alt: "Kenyan Real Estate"
    },
    {
      src: "https://images.unsplash.com/photo-1560184897-ae75f418493e",
      alt: "Kenyan Land Investment"
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      alt: "Modern Kenyan Home"
    }
  ];
};

// Property placeholder image
export const getPropertyPlaceholderImage = () => {
  return "./attached_assets/image_1746189767238.png";
};

// Agent placeholder image
export const getAgentPlaceholderImage = () => {
  return "./attached_assets/image_1746193223567.png";
};
