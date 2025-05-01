import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore';
import { db } from './firebase';
import {
  Agent, 
  ContactMessage, 
  InsertAgent, 
  InsertContactMessage, 
  InsertNewsletter, 
  InsertProperty, 
  InsertTestimonial, 
  Newsletter, 
  Property, 
  Testimonial
} from '@shared/schema';

// Collection names
const COLLECTIONS = {
  PROPERTIES: 'properties',
  AGENTS: 'agents',
  TESTIMONIALS: 'testimonials',
  CONTACT_MESSAGES: 'contactMessages',
  NEWSLETTERS: 'newsletters',
};

// Helper to convert Firestore document to our data models
const convertDocument = <T>(doc: DocumentData): T => {
  const data = doc.data();
  const id = doc.id;
  
  const result: any = { ...data, id };
  
  // Convert Firestore Timestamp objects to Date
  Object.keys(data).forEach(key => {
    if (data[key] instanceof Timestamp) {
      result[key] = data[key].toDate();
    }
  });
  
  return result as T;
};

// Properties Collection
export const propertyService = {
  // Get all properties
  async getAll(): Promise<Property[]> {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.PROPERTIES));
    return querySnapshot.docs.map(doc => convertDocument<Property>(doc));
  },
  
  // Get a property by ID
  async getById(id: string): Promise<Property | null> {
    const docRef = doc(db, COLLECTIONS.PROPERTIES, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return convertDocument<Property>(docSnap);
    }
    
    return null;
  },
  
  // Get featured properties
  async getFeatured(): Promise<Property[]> {
    const q = query(
      collection(db, COLLECTIONS.PROPERTIES),
      where('isFeatured', '==', true),
      limit(6)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDocument<Property>(doc));
  },
  
  // Search properties
  async search(params: {
    location?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    status?: string;
  }): Promise<Property[]> {
    let q = collection(db, COLLECTIONS.PROPERTIES);
    const filters = [];
    
    if (params.location) {
      filters.push(where('location', '==', params.location));
    }
    
    if (params.type) {
      filters.push(where('type', '==', params.type));
    }
    
    if (params.status) {
      filters.push(where('status', '==', params.status));
    }
    
    // Note: Firestore can't filter on multiple range comparisons
    // So we'll handle price filtering client-side
    
    const querySnapshot = await getDocs(
      filters.length ? query(q, ...filters) : q
    );
    
    let properties = querySnapshot.docs.map(doc => convertDocument<Property>(doc));
    
    // Filter by price range client-side
    if (params.minPrice !== undefined) {
      properties = properties.filter(p => p.price >= params.minPrice!);
    }
    
    if (params.maxPrice !== undefined) {
      properties = properties.filter(p => p.price <= params.maxPrice!);
    }
    
    return properties;
  },
  
  // Create a property
  async create(property: InsertProperty): Promise<Property> {
    console.log('Creating property with data:', JSON.stringify(property, null, 2));
    
    try {
      const propertyWithTimestamp = {
        ...property,
        createdAt: serverTimestamp(),
      };
      
      console.log('Adding document to Firestore collection:', COLLECTIONS.PROPERTIES);
      const docRef = await addDoc(
        collection(db, COLLECTIONS.PROPERTIES),
        propertyWithTimestamp
      );
      
      console.log('Document created with ID:', docRef.id);
      const newDoc = await getDoc(docRef);
      return convertDocument<Property>(newDoc);
    } catch (error) {
      console.error('Error creating property in Firestore:', error);
      throw error;
    }
  },
  
  // Update a property
  async update(id: string, property: Partial<InsertProperty>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.PROPERTIES, id);
    await updateDoc(docRef, property);
  },
  
  // Delete a property
  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTIONS.PROPERTIES, id));
  },
};

// Agents Collection
export const agentService = {
  // Get all agents
  async getAll(): Promise<Agent[]> {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.AGENTS));
    return querySnapshot.docs.map(doc => convertDocument<Agent>(doc));
  },
  
  // Get agent by ID
  async getById(id: string): Promise<Agent | null> {
    const docRef = doc(db, COLLECTIONS.AGENTS, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return convertDocument<Agent>(docSnap);
    }
    
    return null;
  },
  
  // Create an agent
  async create(agent: InsertAgent): Promise<Agent> {
    console.log('Creating agent with data:', JSON.stringify(agent, null, 2));
    
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.AGENTS), agent);
      console.log('Agent document created with ID:', docRef.id);
      const newDoc = await getDoc(docRef);
      return convertDocument<Agent>(newDoc);
    } catch (error) {
      console.error('Error creating agent in Firestore:', error);
      throw error;
    }
  },
  
  // Update an agent
  async update(id: string, agent: Partial<InsertAgent>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.AGENTS, id);
    await updateDoc(docRef, agent);
  },
  
  // Delete an agent
  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTIONS.AGENTS, id));
  },
};

// Testimonials Collection
export const testimonialService = {
  // Get all testimonials
  async getAll(): Promise<Testimonial[]> {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.TESTIMONIALS));
    return querySnapshot.docs.map(doc => convertDocument<Testimonial>(doc));
  },
  
  // Create a testimonial
  async create(testimonial: InsertTestimonial): Promise<Testimonial> {
    const docRef = await addDoc(collection(db, COLLECTIONS.TESTIMONIALS), testimonial);
    const newDoc = await getDoc(docRef);
    return convertDocument<Testimonial>(newDoc);
  },
};

// Contact Messages Collection
export const contactService = {
  // Get all contact messages
  async getAll(): Promise<ContactMessage[]> {
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.CONTACT_MESSAGES),
        orderBy('createdAt', 'desc')
      )
    );
    return querySnapshot.docs.map(doc => convertDocument<ContactMessage>(doc));
  },
  
  // Create a contact message
  async create(message: InsertContactMessage): Promise<ContactMessage> {
    const messageWithTimestamp = {
      ...message,
      createdAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(
      collection(db, COLLECTIONS.CONTACT_MESSAGES),
      messageWithTimestamp
    );
    
    const newDoc = await getDoc(docRef);
    return convertDocument<ContactMessage>(newDoc);
  },
  
  // Delete a contact message
  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTIONS.CONTACT_MESSAGES, id));
  },
};

// Newsletter Collection
export const newsletterService = {
  // Subscribe to newsletter
  async subscribe(email: string): Promise<Newsletter> {
    const newsletterData: InsertNewsletter = {
      email,
    };
    
    const subscriptionWithTimestamp = {
      ...newsletterData,
      createdAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(
      collection(db, COLLECTIONS.NEWSLETTERS),
      subscriptionWithTimestamp
    );
    
    const newDoc = await getDoc(docRef);
    return convertDocument<Newsletter>(newDoc);
  },
};
