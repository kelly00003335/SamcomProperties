import {
  properties, agents, testimonials, contactMessages, newsletters,
  type Property, type InsertProperty, 
  type Agent, type InsertAgent,
  type Testimonial, type InsertTestimonial,
  type ContactMessage, type InsertContactMessage,
  type Newsletter, type InsertNewsletter
} from "@shared/schema";

export interface IStorage {
  // Property methods
  getAllProperties(): Promise<Property[]>;
  getPropertyById(id: number): Promise<Property | undefined>;
  getFeaturedProperties(): Promise<Property[]>;
  searchProperties(options: { 
    location?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;

  // Agent methods
  getAllAgents(): Promise<Agent[]>;
  getAgentById(id: number): Promise<Agent | undefined>;
  createAgent(agent: InsertAgent): Promise<Agent>;

  // Testimonial methods
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;

  // Newsletter methods
  createNewsletterSubscription(subscription: InsertNewsletter): Promise<Newsletter>;
}

export class MemStorage implements IStorage {
  private properties: Map<number, Property>;
  private agents: Map<number, Agent>;
  private testimonials: Map<number, Testimonial>;
  private contactMessages: Map<number, ContactMessage>;
  private newsletters: Map<number, Newsletter>;
  
  private propertyId: number;
  private agentId: number;
  private testimonialId: number;
  private contactMessageId: number;
  private newsletterId: number;

  constructor() {
    this.properties = new Map();
    this.agents = new Map();
    this.testimonials = new Map();
    this.contactMessages = new Map();
    this.newsletters = new Map();
    
    this.propertyId = 1;
    this.agentId = 1;
    this.testimonialId = 1;
    this.contactMessageId = 1;
    this.newsletterId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  // Property methods
  async getAllProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getPropertyById(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(property => property.isFeatured);
  }

  async searchProperties(options: { 
    location?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(property => {
      let match = true;
      
      if (options.location && options.location !== '') {
        match = match && property.location.toLowerCase().includes(options.location.toLowerCase());
      }
      
      if (options.type && options.type !== '') {
        match = match && property.type === options.type;
      }
      
      if (options.minPrice !== undefined) {
        match = match && property.price >= options.minPrice;
      }
      
      if (options.maxPrice !== undefined) {
        match = match && property.price <= options.maxPrice;
      }
      
      return match;
    });
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const id = this.propertyId++;
    const createdAt = new Date();
    const newProperty: Property = { ...property, id, createdAt };
    this.properties.set(id, newProperty);
    return newProperty;
  }

  // Agent methods
  async getAllAgents(): Promise<Agent[]> {
    return Array.from(this.agents.values());
  }

  async getAgentById(id: number): Promise<Agent | undefined> {
    return this.agents.get(id);
  }

  async createAgent(agent: InsertAgent): Promise<Agent> {
    const id = this.agentId++;
    const newAgent: Agent = { ...agent, id };
    this.agents.set(id, newAgent);
    return newAgent;
  }

  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialId++;
    const newTestimonial: Testimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  // Contact message methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageId++;
    const createdAt = new Date();
    const newMessage: ContactMessage = { ...message, id, createdAt };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }

  // Newsletter methods
  async createNewsletterSubscription(subscription: InsertNewsletter): Promise<Newsletter> {
    const id = this.newsletterId++;
    const createdAt = new Date();
    const newSubscription: Newsletter = { ...subscription, id, createdAt };
    this.newsletters.set(id, newSubscription);
    return newSubscription;
  }

  // Initialize sample data for the in-memory storage
  private initializeSampleData() {
    // Sample agents
    const agents: InsertAgent[] = [
      {
        name: "David Njoroge",
        title: "Senior Property Agent",
        bio: "Specializing in high-end residential properties in Nairobi's premium neighborhoods.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
        email: "david@samcom.co.ke",
        phone: "+254701123456",
        social: { linkedin: "#", twitter: "#", email: "#", phone: "#" }
      },
      {
        name: "Grace Wanjiku",
        title: "Commercial Property Specialist",
        bio: "Expert in commercial real estate with over 10 years of experience in the Kenyan market.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
        email: "grace@samcom.co.ke",
        phone: "+254702123456",
        social: { linkedin: "#", twitter: "#", email: "#", phone: "#" }
      },
      {
        name: "John Kipkorir",
        title: "Investment Advisor",
        bio: "Specialized in helping clients build profitable real estate investment portfolios.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
        email: "john@samcom.co.ke",
        phone: "+254703123456",
        social: { linkedin: "#", twitter: "#", email: "#", phone: "#" }
      },
      {
        name: "Fatima Ali",
        title: "Coastal Properties Specialist",
        bio: "Expert in luxury coastal properties along the Kenyan coast, including Mombasa and Malindi.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        email: "fatima@samcom.co.ke",
        phone: "+254704123456",
        social: { linkedin: "#", twitter: "#", email: "#", phone: "#" }
      }
    ];

    agents.forEach(agent => {
      this.createAgent(agent);
    });

    // Sample properties
    const properties: InsertProperty[] = [
      {
        title: "Modern Villa in Karen",
        description: "Luxurious 4-bedroom villa with stunning views and modern finishes in the exclusive Karen neighborhood.",
        price: 45000000, // 45M KES
        location: "Karen, Nairobi",
        type: "house",
        status: "for-sale",
        bedrooms: 4,
        bathrooms: 3,
        area: 3500,
        images: [
          "https://images.unsplash.com/photo-1613977257363-707ba9348227",
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa"
        ],
        features: ["Swimming Pool", "Garden", "Security", "Servant Quarter", "CCTV"],
        agentId: 1,
        isFeatured: true
      },
      {
        title: "Luxury Apartment in Westlands",
        description: "Modern 3-bedroom apartment with high-end finishes and stunning city views in the heart of Westlands.",
        price: 180000, // 180K KES per month
        location: "Westlands, Nairobi",
        type: "apartment",
        status: "for-rent",
        bedrooms: 3,
        bathrooms: 2,
        area: 2000,
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
        ],
        features: ["24/7 Security", "Gym", "Parking", "Elevator", "Furnished"],
        agentId: 2,
        isFeatured: true
      },
      {
        title: "Modern Townhouse in Kilimani",
        description: "Contemporary 3-bedroom townhouse in a gated community offering modern amenities and convenient location.",
        price: 28000000, // 28M KES
        location: "Kilimani, Nairobi",
        type: "house",
        status: "for-sale",
        bedrooms: 3,
        bathrooms: 2.5,
        area: 2200,
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        ],
        features: ["Gated Community", "Garden", "Security", "Parking"],
        agentId: 3,
        isFeatured: true
      },
      {
        title: "Beachfront Villa in Diani",
        description: "Exquisite 5-bedroom beachfront villa with private access to the pristine Diani Beach.",
        price: 75000000, // 75M KES
        location: "Diani, Mombasa",
        type: "house",
        status: "for-sale",
        bedrooms: 5,
        bathrooms: 4,
        area: 4500,
        images: [
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
        ],
        features: ["Beachfront", "Swimming Pool", "Garden", "Security", "Staff Quarters"],
        agentId: 4,
        isFeatured: false
      },
      {
        title: "Commercial Space in Nairobi CBD",
        description: "Prime commercial space in the heart of Nairobi's Central Business District, ideal for offices or retail.",
        price: 250000, // 250K KES per month
        location: "CBD, Nairobi",
        type: "commercial",
        status: "for-rent",
        bedrooms: null,
        bathrooms: 2,
        area: 1800,
        images: [
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
          "https://images.unsplash.com/photo-1604328698692-f76ea9498e76"
        ],
        features: ["Prime Location", "24/7 Security", "Elevator", "Parking"],
        agentId: 2,
        isFeatured: false
      },
      {
        title: "Residential Plot in Kitengela",
        description: "Prime 1/4 acre residential plot in a developing area of Kitengela with ready title deed.",
        price: 3500000, // 3.5M KES
        location: "Kitengela, Kajiado",
        type: "land",
        status: "for-sale",
        bedrooms: null,
        bathrooms: null,
        area: 10890, // 1/4 acre in square feet
        images: [
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
          "https://images.unsplash.com/photo-1575517111478-7f6afd0973db",
          "https://images.unsplash.com/photo-1575517111478-7f6afd0973db"
        ],
        features: ["Ready Title", "Electricity", "Water", "Access Road"],
        agentId: 1,
        isFeatured: false
      }
    ];

    properties.forEach(property => {
      this.createProperty(property);
    });

    // Sample testimonials
    const testimonials: InsertTestimonial[] = [
      {
        name: "Sarah Kamau",
        role: "Homeowner, Nairobi",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        content: "Samcom Properties helped me find my dream home in Nairobi. Their agents were professional, knowledgeable, and patient throughout the entire process. I highly recommend their services!",
        rating: 5
      },
      {
        name: "James Ochieng",
        role: "Property Investor",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
        content: "As an investor, I was looking for properties with good returns. Samcom's investment advisory team provided excellent guidance and helped me build a profitable portfolio. Their market insights are invaluable.",
        rating: 5
      },
      {
        name: "Linda Mwangi",
        role: "Property Seller, Mombasa",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
        content: "Selling my property through Samcom was a smooth experience. They handled everything professionally, from marketing to negotiating with buyers. I got a great price and the process was stress-free.",
        rating: 4.5
      }
    ];

    testimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }
}

export const storage = new MemStorage();
