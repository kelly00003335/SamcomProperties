
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
      image: "/attached_assets/springfield-by-fanaka-web-banner.jpg",
      alt: "Nairobi Skyline",
      title: "Find Your Dream Home",
      description: "Samcom Properties Agency helps you find the perfect property that fits your lifestyle and budget.",
      primaryText: "View Properties",
      primaryLink: "/properties",
      secondaryText: "Contact Us",
      secondaryLink: "/contact"
    },
    {
      image: "/attached_assets/image_1746189808502.png",
      alt: "Kenyan Residential Area",
      title: "Premium Properties",
      description: "Discover exceptional homes with top-tier amenities and prime locations.",
      primaryText: "Explore Premium Listings",
      primaryLink: "/properties",
      secondaryText: "Meet Our Agents",
      secondaryLink: "/about"
    },
    {
      image: "/attached_assets/image_1746189767238.png",
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
      src: "https://images.unsplash.com/photo-1580746738099-fe7018c07177",
      alt: "Kenyan Real Estate Transaction"
    },
    {
      src: "https://images.unsplash.com/photo-1580746730782-41b52b516f68",
      alt: "Kenyan Real Estate Professional"
    },
    {
      src: "https://images.unsplash.com/photo-1580746769998-d9bb6d4c891e",
      alt: "Modern Kenyan Home"
    },
    {
      src: "https://images.unsplash.com/photo-1581100372057-ae79a48df642",
      alt: "Kenyan Property Development"
    }
  ];
};

// Property placeholder image
export const getPropertyPlaceholderImage = () => {
  return "/attached_assets/image_1746189767238.png";
};

// Agent placeholder image
export const getAgentPlaceholderImage = () => {
  return "/attached_assets/image_1746193223567.png";
};
