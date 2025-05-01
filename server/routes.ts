import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertNewsletterSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get('/api/properties', async (req: Request, res: Response) => {
    try {
      const properties = await storage.getAllProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch properties', error });
    }
  });

  app.get('/api/properties/featured', async (req: Request, res: Response) => {
    try {
      const properties = await storage.getFeaturedProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch featured properties', error });
    }
  });

  app.get('/api/properties/search', async (req: Request, res: Response) => {
    try {
      const { location, type, minPrice, maxPrice } = req.query;
      
      const options = {
        location: location as string | undefined,
        type: type as string | undefined,
        minPrice: minPrice ? parseInt(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice as string) : undefined
      };
      
      const properties = await storage.searchProperties(options);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: 'Failed to search properties', error });
    }
  });

  app.get('/api/properties/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const property = await storage.getPropertyById(id);
      
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch property', error });
    }
  });

  app.get('/api/agents', async (req: Request, res: Response) => {
    try {
      const agents = await storage.getAllAgents();
      res.json(agents);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch agents', error });
    }
  });

  app.get('/api/agents/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const agent = await storage.getAgentById(id);
      
      if (!agent) {
        return res.status(404).json({ message: 'Agent not found' });
      }
      
      res.json(agent);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch agent', error });
    }
  });

  app.get('/api/testimonials', async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch testimonials', error });
    }
  });

  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const newMessage = await storage.createContactMessage(validatedData);
      
      // Here you would normally send an email with nodemailer
      // For the sake of this example, we'll just return success
      
      res.status(201).json({ 
        message: 'Message sent successfully',
        contact: newMessage
      });
    } catch (error) {
      res.status(400).json({ message: 'Invalid contact form data', error });
    }
  });

  app.post('/api/newsletter', async (req: Request, res: Response) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription(validatedData);
      
      res.status(201).json({ 
        message: 'Subscribed to newsletter successfully',
        subscription
      });
    } catch (error) {
      res.status(400).json({ message: 'Invalid newsletter subscription data', error });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
