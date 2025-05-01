import { 
  addDoc, 
  collection, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  updateDoc, 
  where,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Agent, ContactMessage, InsertAgent, InsertContactMessage, InsertNewsletter, InsertProperty, InsertTestimonial, Newsletter, Property, Testimonial } from '@shared/schema';

// Firebase collection names
const PROPERTIES_COLLECTION = 'properties';
const AGENTS_COLLECTION = 'agents';
const TESTIMONIALS_COLLECTION = 'testimonials';
const CONTACT_MESSAGES_COLLECTION = 'contactMessages';
const NEWSLETTERS_COLLECTION = 'newsletters';

// Helper function to convert Firestore data to our model types
const convertFirestoreData = <T>(doc: any): T => {
  const data = doc.data();
  const id = doc.id;
  
  // Convert Firestore Timestamp to Date
  const convertedData: any = { ...data, id };
  for (const key in data) {
    if (data[key] instanceof Timestamp) {
      convertedData[key] = data[key].toDate();
    }
  }
  
  return convertedData as T;
};

// Property Services
export const getAllProperties = async (): Promise<Property[]> => {
  const propertiesCollection = collection(db, PROPERTIES_COLLECTION);
  const propertiesSnapshot = await getDocs(propertiesCollection);
  return propertiesSnapshot.docs.map(doc => convertFirestoreData<Property>(doc));
};

export const getPropertyById = async (id: number | string): Promise<Property | undefined> => {
  const propertyDoc = doc(db, PROPERTIES_COLLECTION, String(id));
  const propertySnapshot = await getDoc(propertyDoc);
  if (!propertySnapshot.exists()) return undefined;
  return convertFirestoreData<Property>(propertySnapshot);
};

export const getFeaturedProperties = async (): Promise<Property[]> => {
  const propertiesCollection = collection(db, PROPERTIES_COLLECTION);
  const featuredQuery = query(propertiesCollection, where("isFeatured", "==", true));
  const propertiesSnapshot = await getDocs(featuredQuery);
  return propertiesSnapshot.docs.map(doc => convertFirestoreData<Property>(doc));
};

export const searchProperties = async (options: { 
  location?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Property[]> => {
  let propertiesQuery = collection(db, PROPERTIES_COLLECTION);
  let constraints = [];
  
  if (options.location) {
    constraints.push(where("location", "==", options.location));
  }
  
  if (options.type) {
    constraints.push(where("type", "==", options.type));
  }
  
  // Note: Firestore doesn't support AND with range filters on different fields
  // For price range, we'll filter client-side
  const propertiesSnapshot = await getDocs(constraints.length > 0 
    ? query(propertiesQuery, ...constraints)
    : propertiesQuery
  );
  
  // Filter by price range client-side if needed
  let properties = propertiesSnapshot.docs.map(doc => convertFirestoreData<Property>(doc));
  
  if (options.minPrice !== undefined) {
    properties = properties.filter(p => p.price >= options.minPrice!);
  }
  
  if (options.maxPrice !== undefined) {
    properties = properties.filter(p => p.price <= options.maxPrice!);
  }
  
  return properties;
};

export const createProperty = async (property: InsertProperty): Promise<Property> => {
  const propertyWithTimestamp = {
    ...property,
    createdAt: serverTimestamp()
  };
  
  const docRef = await addDoc(collection(db, PROPERTIES_COLLECTION), propertyWithTimestamp);
  const newPropertySnapshot = await getDoc(docRef);
  return convertFirestoreData<Property>(newPropertySnapshot);
};

export const updateProperty = async (id: number | string, property: Partial<InsertProperty>): Promise<Property> => {
  const propertyRef = doc(db, PROPERTIES_COLLECTION, String(id));
  await updateDoc(propertyRef, property);
  const updatedPropertySnapshot = await getDoc(propertyRef);
  return convertFirestoreData<Property>(updatedPropertySnapshot);
};

export const deleteProperty = async (id: number | string): Promise<void> => {
  await deleteDoc(doc(db, PROPERTIES_COLLECTION, String(id)));
};

// Agent Services
export const getAllAgents = async (): Promise<Agent[]> => {
  const agentsCollection = collection(db, AGENTS_COLLECTION);
  const agentsSnapshot = await getDocs(agentsCollection);
  return agentsSnapshot.docs.map(doc => convertFirestoreData<Agent>(doc));
};

export const getAgentById = async (id: number | string): Promise<Agent | undefined> => {
  const agentDoc = doc(db, AGENTS_COLLECTION, String(id));
  const agentSnapshot = await getDoc(agentDoc);
  if (!agentSnapshot.exists()) return undefined;
  return convertFirestoreData<Agent>(agentSnapshot);
};

export const createAgent = async (agent: InsertAgent): Promise<Agent> => {
  const docRef = await addDoc(collection(db, AGENTS_COLLECTION), agent);
  const newAgentSnapshot = await getDoc(docRef);
  return convertFirestoreData<Agent>(newAgentSnapshot);
};

export const updateAgent = async (id: number | string, agent: Partial<InsertAgent>): Promise<Agent> => {
  const agentRef = doc(db, AGENTS_COLLECTION, String(id));
  await updateDoc(agentRef, agent);
  const updatedAgentSnapshot = await getDoc(agentRef);
  return convertFirestoreData<Agent>(updatedAgentSnapshot);
};

export const deleteAgent = async (id: number | string): Promise<void> => {
  await deleteDoc(doc(db, AGENTS_COLLECTION, String(id)));
};

// Testimonial Services
export const getAllTestimonials = async (): Promise<Testimonial[]> => {
  const testimonialsCollection = collection(db, TESTIMONIALS_COLLECTION);
  const testimonialsSnapshot = await getDocs(testimonialsCollection);
  return testimonialsSnapshot.docs.map(doc => convertFirestoreData<Testimonial>(doc));
};

export const createTestimonial = async (testimonial: InsertTestimonial): Promise<Testimonial> => {
  const docRef = await addDoc(collection(db, TESTIMONIALS_COLLECTION), testimonial);
  const newTestimonialSnapshot = await getDoc(docRef);
  return convertFirestoreData<Testimonial>(newTestimonialSnapshot);
};

// Contact Message Services
export const getAllContactMessages = async (): Promise<ContactMessage[]> => {
  const messagesCollection = collection(db, CONTACT_MESSAGES_COLLECTION);
  const messagesSnapshot = await getDocs(messagesCollection);
  return messagesSnapshot.docs.map(doc => convertFirestoreData<ContactMessage>(doc));
};

export const createContactMessage = async (message: InsertContactMessage): Promise<ContactMessage> => {
  const messageWithTimestamp = {
    ...message,
    createdAt: serverTimestamp()
  };
  
  const docRef = await addDoc(collection(db, CONTACT_MESSAGES_COLLECTION), messageWithTimestamp);
  const newMessageSnapshot = await getDoc(docRef);
  return convertFirestoreData<ContactMessage>(newMessageSnapshot);
};

export const deleteContactMessage = async (id: number | string): Promise<void> => {
  await deleteDoc(doc(db, CONTACT_MESSAGES_COLLECTION, String(id)));
};

// Newsletter Services
export const createNewsletterSubscription = async (subscription: InsertNewsletter): Promise<Newsletter> => {
  const subscriptionWithTimestamp = {
    ...subscription,
    createdAt: serverTimestamp()
  };
  
  const docRef = await addDoc(collection(db, NEWSLETTERS_COLLECTION), subscriptionWithTimestamp);
  const newSubscriptionSnapshot = await getDoc(docRef);
  return convertFirestoreData<Newsletter>(newSubscriptionSnapshot);
};
