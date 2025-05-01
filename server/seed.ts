import { db } from "./db";
import { sql } from "drizzle-orm";
import {
  properties, agents, testimonials,
  type InsertProperty, type InsertAgent, type InsertTestimonial
} from "@shared/schema";

async function seed() {
  console.log('Seeding database...');
  
  // Sample agents
  const agentsData: InsertAgent[] = [
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

  await db.insert(agents).values(agentsData);
  console.log('✓ Agents seeded');
  
  // Sample properties
  // First get the agent IDs
  const agentRows = await db.select({ id: agents.id }).from(agents);
  const agentIds = agentRows.map(agent => agent.id);
  
  const propertiesData: InsertProperty[] = [
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
      agentId: agentIds[0],
      isFeatured: true,
      createdAt: new Date()
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
      agentId: agentIds[1],
      isFeatured: true,
      createdAt: new Date()
    },
    {
      title: "Modern Townhouse in Kilimani",
      description: "Contemporary 3-bedroom townhouse in a gated community offering modern amenities and convenient location.",
      price: 28000000, // 28M KES
      location: "Kilimani, Nairobi",
      type: "house",
      status: "for-sale",
      bedrooms: 3,
      bathrooms: 2,
      area: 2200,
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
      ],
      features: ["Gated Community", "Garden", "Security", "Parking"],
      agentId: agentIds[2],
      isFeatured: true,
      createdAt: new Date()
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
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83",
        "https://images.unsplash.com/photo-1523217582562-09d0def993a6"
      ],
      features: ["Beachfront", "Swimming Pool", "Garden", "Security", "Staff Quarters"],
      agentId: agentIds[3],
      isFeatured: false,
      createdAt: new Date()
    },
    {
      title: "Commercial Space in Upperhill",
      description: "Prime commercial space in Upperhill area, suitable for office or retail use with high foot traffic.",
      price: 320000, // 320K KES per month
      location: "Upperhill, Nairobi",
      type: "commercial",
      status: "for-rent",
      bedrooms: null,
      bathrooms: 2,
      area: 3200,
      images: [
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36"
      ],
      features: ["24/7 Security", "Parking", "Elevator", "Backup Generator"],
      agentId: agentIds[1],
      isFeatured: false,
      createdAt: new Date()
    }
  ];

  await db.insert(properties).values(propertiesData);
  console.log('✓ Properties seeded');
  
  // Sample testimonials
  const testimonialsData: InsertTestimonial[] = [
    {
      name: "Sarah Kamau",
      role: "Homeowner, Nairobi",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      content: "Samcom Properties helped me find my dream home in a competitive market. Their team was professional and genuinely cared about my needs. Highly recommended!",
      rating: 5
    },
    {
      name: "James Omondi",
      role: "Property Investor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      content: "I've worked with many real estate companies, but Samcom stands out for their market knowledge and honesty. They've helped me build a profitable property portfolio.",
      rating: 5
    },
    {
      name: "Mary Wambui",
      role: "First-time Buyer",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      content: "As a first-time buyer, I was nervous about the process. The team at Samcom guided me every step of the way. I couldn't be happier with my new apartment!",
      rating: 4
    }
  ];
  
  await db.insert(testimonials).values(testimonialsData);
  console.log('✓ Testimonials seeded');
  
  console.log('Database seeding completed successfully!');
}

// Check if we need to seed the database
async function run() {
  // Check if there are any agents in the database
  try {
    const result = await db.execute(sql`SELECT COUNT(*) as count FROM ${agents}`);
    console.log('Count result:', result.rows[0]);
    
    if (Number(result.rows[0].count) === 0) {
      await seed();
    } else {
      console.log('Database already has data, skipping seed');
    }
  } catch (error) {
    console.error('Error checking database:', error);
    // If there's an error, try to seed anyway
    await seed();
  }
}

run().catch(error => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
