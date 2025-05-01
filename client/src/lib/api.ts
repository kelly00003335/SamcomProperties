import {
  propertyService,
  agentService,
  testimonialService,
  contactService,
  newsletterService
} from './firestore-service';
import { Property, FirebaseProperty, Agent, Testimonial, ContactMessage, Newsletter } from '@shared/schema';

// API wrapper for Property-related operations
export const PropertyAPI = {
  getAllProperties: async (): Promise<FirebaseProperty[]> => {
    console.log('PropertyAPI.getAllProperties called');
    try {
      const properties = await propertyService.getAll();
      console.log(`PropertyAPI returned ${properties.length} properties:`, properties.map(p => ({ id: p.id, title: p.title })));
      return properties;
    } catch (error) {
      console.error('Error in PropertyAPI.getAllProperties:', error);
      throw error;
    }
  },
  
  getPropertyById: async (id: string): Promise<FirebaseProperty | null> => {
    return await propertyService.getById(id);
  },
  
  getFeaturedProperties: async (): Promise<FirebaseProperty[]> => {
    return await propertyService.getFeatured();
  },
  
  searchProperties: async (params: {
    location?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    status?: string;
  }): Promise<FirebaseProperty[]> => {
    return await propertyService.search(params);
  },
  
  createProperty: async (property: any): Promise<FirebaseProperty> => {
    console.log('PropertyAPI.createProperty called with:', JSON.stringify(property, null, 2));
    try {
      const newProperty = await propertyService.create(property);
      console.log('PropertyAPI.createProperty created new property:', JSON.stringify(newProperty, null, 2));
      return newProperty;
    } catch (error) {
      console.error('Error in PropertyAPI.createProperty:', error);
      throw error;
    }
  },
  
  updateProperty: async (id: string, property: any): Promise<void> => {
    return await propertyService.update(id, property);
  },
  
  deleteProperty: async (id: string): Promise<void> => {
    return await propertyService.delete(id);
  }
};

// API wrapper for Agent-related operations
export const AgentAPI = {
  getAllAgents: async (): Promise<Agent[]> => {
    return await agentService.getAll();
  },
  
  getAgentById: async (id: string): Promise<Agent | null> => {
    return await agentService.getById(id);
  },
  
  createAgent: async (agent: any): Promise<Agent> => {
    return await agentService.create(agent);
  },
  
  updateAgent: async (id: string, agent: any): Promise<void> => {
    return await agentService.update(id, agent);
  },
  
  deleteAgent: async (id: string): Promise<void> => {
    return await agentService.delete(id);
  }
};

// API wrapper for Testimonial-related operations
export const TestimonialAPI = {
  getAllTestimonials: async (): Promise<Testimonial[]> => {
    return await testimonialService.getAll();
  },
  
  createTestimonial: async (testimonial: any): Promise<Testimonial> => {
    return await testimonialService.create(testimonial);
  }
};

// API wrapper for Contact-related operations
export const ContactAPI = {
  getAllContactMessages: async (): Promise<ContactMessage[]> => {
    return await contactService.getAll();
  },
  
  createContactMessage: async (message: any): Promise<ContactMessage> => {
    return await contactService.create(message);
  },
  
  deleteContactMessage: async (id: string): Promise<void> => {
    return await contactService.delete(id);
  }
};

// API wrapper for Newsletter-related operations
export const NewsletterAPI = {
  subscribe: async (email: string): Promise<Newsletter> => {
    return await newsletterService.subscribe(email);
  }
};
