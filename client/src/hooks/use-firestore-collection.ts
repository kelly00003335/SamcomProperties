import { useEffect, useState } from 'react';
import { collection, query, onSnapshot, where, Query, DocumentData, QueryConstraint } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Custom hook for real-time Firestore collection data
 * @param collectionName The name of the collection to listen to
 * @param constraints Optional query constraints (where clauses, etc)
 * @returns Object containing the documents array, loading state, and any error
 */
export function useFirestoreCollection<T>(
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
        
        // Convert and store the documents
        const docs = snapshot.docs.map((doc) => {
          const data = doc.data();
          
          // Convert timestamps to dates
          const converted: any = { ...data, id: doc.id };
          for (const key in data) {
            if (data[key]?.toDate) {
              converted[key] = data[key].toDate();
            }
          }
          
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
