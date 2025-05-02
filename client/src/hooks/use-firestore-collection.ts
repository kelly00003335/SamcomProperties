import { useState, useEffect, useRef } from "react";
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

  // Use a ref to track the stringified constraints for dependency array
  const constraintsRef = useRef<string>(JSON.stringify(constraints));

  useEffect(() => {
    // Update the ref when constraints change
    constraintsRef.current = JSON.stringify(constraints);
  }, [constraints]);

  useEffect(() => {
    setLoading(true);
    console.log(`Setting up real-time listener for ${collectionName} collection`);
    if (constraints.length > 0) {
      console.log(`With query constraints:`, constraints);
    }

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

          // Basic conversion: ensure ID is set correctly
          const converted: any = { 
            ...data, 
            id: doc.id // Always use Firestore doc ID
          };

          // Convert all timestamp fields to Date objects
          Object.keys(converted).forEach(key => {
            if (converted[key] && typeof converted[key] === 'object' && converted[key].seconds) {
              converted[key] = new Date(converted[key].seconds * 1000);
            }
          });

          // Collection-specific handling
          if (collectionName === 'properties') {
            // Properties collection needs special handling for arrays and defaults
            converted.images = Array.isArray(data.images) ? data.images : [];
            converted.features = Array.isArray(data.features) ? data.features : null;
            converted.bedrooms = data.bedrooms ?? null;
            converted.bathrooms = data.bathrooms ?? null;
            converted.area = data.area ?? null;
            converted.agentId = data.agentId ?? null;
            converted.isFeatured = data.isFeatured ?? false;
            // Ensure createdAt is a Date object (either from converted Timestamp or new Date)
            converted.createdAt = converted.createdAt || new Date();
          } else if (collectionName === 'agents') {
            // Agent-specific defaults if needed
            converted.social = data.social || {};
          } else if (collectionName === 'contact_messages') {
            // Message-specific defaults if needed
            converted.createdAt = converted.createdAt || new Date();
          }

          // Log what we created for debugging
          const logSample = { 
            id: converted.id, 
            title: converted.title || converted.name || '(no title/name)' 
          };
          console.log(`Processed ${collectionName} doc:`, logSample);
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
  }, [collectionName, constraintsRef.current]);

  return { documents, loading, error };
}