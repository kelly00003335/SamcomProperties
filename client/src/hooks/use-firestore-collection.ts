import { useEffect, useState } from 'react';
import { collection, query, onSnapshot, where, Query, DocumentData, QueryConstraint, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Define types for common document fields that need special handling
type CommonFields = {
  id: string | number;
  createdAt?: Date | null;
};

/**
 * Custom hook for real-time Firestore collection data
 * @param collectionName The name of the collection to listen to
 * @param constraints Optional query constraints (where clauses, etc)
 * @returns Object containing the documents array, loading state, and any error
 */
export function useFirestoreCollection<T extends CommonFields>(
  collectionName: string,
  constraints: QueryConstraint[] = []
) {
  const [documents, setDocuments] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    console.log(`Setting up real-time listener for ${collectionName} collection`);
    
    // Create a query reference with optional constraints
    let q: Query<DocumentData>;
    if (constraints.length > 0) {
      q = query(collection(db, collectionName), ...constraints);
    } else {
      q = collection(db, collectionName);
    }

    // Set up the real-time listener
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        console.log(`Received snapshot update for ${collectionName} with ${snapshot.docs.length} docs`);
        // Debug the first document structure
        if (snapshot.docs.length > 0) {
          const firstDoc = snapshot.docs[0];
          console.log('First doc ID:', firstDoc.id, 'type:', typeof firstDoc.id);
          console.log('First doc data sample:', JSON.stringify(firstDoc.data(), null, 2).substring(0, 500));
        }
        
        // Convert and store the documents
        const docs = snapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(`Doc ID: ${doc.id}, raw data sample:`, JSON.stringify(data).substring(0, 100));
          
          // Convert timestamps to dates and ensure data is correctly structured
          const converted: any = { 
            ...data, 
            id: doc.id, // Ensure ID is set explicitly from Firestore doc ID
            // Ensure critical fields have default values if missing
            images: Array.isArray(data.images) ? data.images : [],
            features: Array.isArray(data.features) ? data.features : null,
            bedrooms: data.bedrooms ?? null,
            bathrooms: data.bathrooms ?? null,
            area: data.area ?? null,
            agentId: data.agentId ?? null,
            isFeatured: data.isFeatured ?? false,
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date()
          };
          
          // Convert any other timestamp fields
          for (const key in data) {
            if (data[key]?.toDate && key !== 'createdAt') { // Skip createdAt since we handled it above
              converted[key] = data[key].toDate();
            }
          }
          
          console.log('Converted doc:', { id: converted.id, title: converted.title });
          return converted as T;
        });
        
        setDocuments(docs);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(`Error in ${collectionName} listener:`, err);
        setError(err);
        setLoading(false);
      }
    );

    // Clean up listener on unmount
    return () => {
      console.log(`Unsubscribing from ${collectionName} listener`);
      unsubscribe();
    };
  }, [collectionName, JSON.stringify(constraints)]);

  return { documents, loading, error };
}
