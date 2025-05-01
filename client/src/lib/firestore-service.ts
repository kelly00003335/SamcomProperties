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
  FirebaseProperty,
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
  if (!data) {
    console.error('Document exists but has no data');
    return null as unknown as T;
  }
  
  // Extract the document ID and ensure it's interpreted correctly
  const docId = doc.id;
  console.log(`Converting document with ID: ${docId}, type: ${typeof docId}`);
  
  // Create a new object with the data and ID
  const result: any = { 
    ...data,
    // Always ensure the ID is properly set - keep as string to avoid conversion issues
    id: docId
  };
  
  // Convert Firestore Timestamp objects to Date
  Object.keys(data).forEach(key => {
    if (data[key] instanceof Timestamp) {
      result[key] = data[key].toDate();
    }
  });
  
  console.log('Converted document object:', { id: result.id, title: result.title || '(no title)' });
  return result as T;
};

// Properties Collection
export const propertyService = {
  // Get all properties
  async getAll(): Promise<FirebaseProperty[]> {
    console.log('Fetching all properties from Firestore...');
    try {
      const propertiesCollection = collection(db, COLLECTIONS.PROPERTIES);
      console.log('Collection reference:', COLLECTIONS.PROPERTIES);
      
      const querySnapshot = await getDocs(propertiesCollection);
      console.log(`Raw query snapshot size: ${querySnapshot.size}, empty: ${querySnapshot.empty}`);
      
      if (querySnapshot.empty) {
        console.log('No documents found in the properties collection');
        return [];
      }
      
      // Log the raw document IDs before conversion
      const docIds = querySnapshot.docs.map(doc => doc.id);
      console.log('Raw document IDs:', docIds);
      
      // Convert each document to our FirebaseProperty type
      const properties = querySnapshot.docs
        .map(doc => {
          try {
            return convertDocument<FirebaseProperty>(doc);
          } catch (conversionError) {
            console.error(`Error converting document ${doc.id}:`, conversionError);
            return null;
          }
        })
        .filter(Boolean) as FirebaseProperty[];
      
      console.log(`Successfully converted ${properties.length} properties:`, 
        properties.map(p => ({ id: p.id, title: p.title })));
      return properties;
    } catch (error) {
      console.error('Error fetching properties:', error);
      return [];
    }
  },
  
  // Get a property by ID
  async getById(id: string): Promise<FirebaseProperty | null> {
    const docRef = doc(db, COLLECTIONS.PROPERTIES, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return convertDocument<FirebaseProperty>(docSnap);
    }
    
    return null;
  },
  
  // Get featured properties
  async getFeatured(): Promise<FirebaseProperty[]> {
    const q = query(
      collection(db, COLLECTIONS.PROPERTIES),
      where('isFeatured', '==', true),
      limit(6)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDocument<FirebaseProperty>(doc));
  },
  
  // Search properties
  async search(params: {
    location?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    status?: string;
  }): Promise<FirebaseProperty[]> {
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
    
    let properties = querySnapshot.docs.map(doc => convertDocument<FirebaseProperty>(doc));
    
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
  async create(property: InsertProperty): Promise<FirebaseProperty> {
    console.log('Creating property with data:', JSON.stringify(property, null, 2));
    
    try {
      // Make sure all required fields are present
      const propertyWithDefaults = {
        ...property,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        area: property.area || 0,
        features: property.features || [],
        agentId: property.agentId || null,
        isFeatured: property.isFeatured || false,
        createdAt: serverTimestamp(),
      };
      
      console.log('Adding document to Firestore collection with processed data:', 
        JSON.stringify(propertyWithDefaults, null, 2));
      
      const docRef = await addDoc(
        collection(db, COLLECTIONS.PROPERTIES),
        propertyWithDefaults
      );
      
      console.log('Document created with ID:', docRef.id);
      // We need to wait a moment for Firestore to complete the write
      await new Promise(resolve => setTimeout(resolve, 1500)); // Increased to 1.5 seconds for more reliability
      
      // Fetch the newly created document
      const newDoc = await getDoc(docRef);
      if (!newDoc.exists()) {
        console.error(`Created document with ID ${docRef.id} not found, retrying with delay...`);
        
        // Retry after a delay since Firestore writes can be eventual consistent
        await new Promise(resolve => setTimeout(resolve, 2000));
        const retryDoc = await getDoc(docRef);
        
        if (!retryDoc.exists()) {
          console.error(`Document still not found after retry, using fallback approach`);
          // Create a synthetic document as a fallback using the same data we just saved
          // but with the document ID from the creation response
          return {
            ...propertyWithDefaults,
            id: docRef.id,
            // Convert server timestamp to regular Date since we don't have the actual doc
            createdAt: new Date(),
          } as unknown as FirebaseProperty;
        }
        
        // If retry succeeded, convert the document
        return convertDocument<FirebaseProperty>(retryDoc);
      }
      
      const result = convertDocument<FirebaseProperty>(newDoc);
      console.log('Created property:', result);
      
      // Force an immediate refresh of the properties collection
      console.log('Triggering immediate refresh of all properties');
      const allProperties = await this.getAll();
      console.log(`Refresh complete, found ${allProperties.length} properties`);
      
      return result;
    } catch (error) {
      console.error('Error creating property in Firestore:', error);
      throw error;
    }
  },
  
  // Update a property
  async update(id: string, property: Partial<InsertProperty>): Promise<void> {
    console.log(`Updating property with ID: ${id}`, property);
    try {
      const docRef = doc(db, COLLECTIONS.PROPERTIES, id);
      await updateDoc(docRef, property);
      
      // Wait a moment for Firestore to complete the update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Force refresh the property collection
      console.log('Triggering refresh after property update');
      await this.getAll();
      
      // Verify the update
      const updatedDoc = await getDoc(docRef);
      if (updatedDoc.exists()) {
        console.log('Property updated successfully with new data:', convertDocument(updatedDoc));
      } else {
        console.error('Property document no longer exists after update');
      }
    } catch (error) {
      console.error(`Error updating property ${id}:`, error);
      throw error;
    }
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
