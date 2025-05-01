import { QueryClient } from "@tanstack/react-query";
import { 
  PropertyAPI, 
  AgentAPI, 
  TestimonialAPI, 
  ContactAPI, 
  NewsletterAPI 
} from './api';

// Use Firebase services directly
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      retryDelay: (attempt) => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
      gcTime: 10 * 60 * 1000, // 10 minutes
      onError: (error) => {
        console.error('Query error:', error);
      }
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        console.error('Mutation error:', error);
      }
    },
  },
});

// Legacy apiRequest function - keeping for backward compatibility with existing code
export async function apiRequest(
  url: string,
  method: string = "GET",
  data?: unknown | undefined,
): Promise<any> {
  // This adapter redirects API requests to the Firebase services
  console.log(`API Request to ${url} with method ${method}`);
  
  // Parse the URL to determine which service to call
  if (url.includes('/api/properties')) {
    const id = url.match(/\/api\/properties\/([^\/]+)(?:\/|$)/);
    
    if (method === "GET") {
      if (url.includes('/featured')) {
        console.log('Fetching featured properties via API wrapper');
        const properties = await PropertyAPI.getFeaturedProperties();
        console.log(`Got ${properties.length} featured properties`);
        return { json: async () => properties };
      } else if (url.includes('/search')) {
        // Extract search params from URL query string
        const params = {};
        // Note: In a real implementation, we would parse query params here
        console.log('Searching properties with params:', params);
        const properties = await PropertyAPI.searchProperties(params);
        console.log(`Search returned ${properties.length} properties`);
        return { json: async () => properties };
      } else if (id) {
        console.log(`Fetching property by ID: ${id[1]}`);
        const property = await PropertyAPI.getPropertyById(id[1]);
        console.log('Got property:', property ? property.id : 'null');
        return { json: async () => property };
      } else {
        console.log('Fetching all properties via API wrapper');
        const properties = await PropertyAPI.getAllProperties();
        console.log(`Got ${properties.length} properties:`, properties.map(p => p.id));
        return { json: async () => properties };
      }
    } else if (method === "POST") {
      console.log('Creating property via API:', JSON.stringify(data, null, 2));
      const newProperty = await PropertyAPI.createProperty(data);
      console.log('Property created successfully:', newProperty);
      return { json: async () => newProperty };
    } else if (method === "PATCH" && id) {
      await PropertyAPI.updateProperty(id[1], data);
      return { json: async () => ({}) };
    } else if (method === "DELETE" && id) {
      await PropertyAPI.deleteProperty(id[1]);
      return { json: async () => ({}) };
    }
  }
  
  else if (url.includes('/api/agents')) {
    const id = url.match(/\/api\/agents\/([^\/]+)(?:\/|$)/);
    
    if (method === "GET") {
      if (id) {
        return { json: async () => await AgentAPI.getAgentById(id[1]) };
      } else {
        return { json: async () => await AgentAPI.getAllAgents() };
      }
    } else if (method === "POST") {
      await AgentAPI.createAgent(data);
      return { json: async () => ({}) };
    } else if (method === "PATCH" && id) {
      await AgentAPI.updateAgent(id[1], data);
      return { json: async () => ({}) };
    } else if (method === "DELETE" && id) {
      await AgentAPI.deleteAgent(id[1]);
      return { json: async () => ({}) };
    }
  }
  
  else if (url.includes('/api/testimonials')) {
    if (method === "GET") {
      return { json: async () => await TestimonialAPI.getAllTestimonials() };
    } else if (method === "POST") {
      await TestimonialAPI.createTestimonial(data);
      return { json: async () => ({}) };
    }
  }
  
  else if (url.includes('/api/contact')) {
    const id = url.match(/\/api\/contact\/([^\/]+)(?:\/|$)/);
    
    if (method === "GET") {
      return { json: async () => await ContactAPI.getAllContactMessages() };
    } else if (method === "POST") {
      await ContactAPI.createContactMessage(data);
      return { json: async () => ({}) };
    } else if (method === "DELETE" && id) {
      await ContactAPI.deleteContactMessage(id[1]);
      return { json: async () => ({}) };
    }
  }
  
  else if (url.includes('/api/newsletter')) {
    if (method === "POST" && data && typeof data === 'object' && 'email' in data) {
      await NewsletterAPI.subscribe(data.email as string);
      return { json: async () => ({}) };
    }
  }
  
  // Default fallback
  console.warn(`Unhandled API request: ${method} ${url}`);
  return { json: async () => ({}) };
}
