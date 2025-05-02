import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Firebase configuration from client/src/lib/firebase.ts
const firebaseConfig = {
  apiKey: "AIzaSyC7bAJSEcskwqRFQu5FXDbVeA7RDYikA4w",
  authDomain: "samcom-properties.firebaseapp.com",
  projectId: "samcom-properties",
  storageBucket: "samcom-properties.appspot.com",
  messagingSenderId: "715886325931",
  appId: "1:715886325931:web:e2bb26d00a32287ba4c7ee",
  measurementId: "G-BS5887DT13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addTestProperty() {
  try {
    // Create a test property
    const testProperty = {
      title: "Test Property " + new Date().toISOString(),
      description: "This is a test property created to test real-time updates",
      price: 15000000,
      location: "nairobi",
      type: "apartment",
      status: "for-sale",
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      features: ["Swimming Pool", "Garden", "Security"],
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1170&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=1170&auto=format&fit=crop"
      ],
      isFeatured: true,
      agentId: null,
      createdAt: serverTimestamp()
    };

    // Add to Firestore
    const docRef = await addDoc(collection(db, "properties"), testProperty);
    console.log("Property added with ID: ", docRef.id);
    
    // Wait 3 seconds to make sure the listener has time to detect the change
    console.log("Waiting 3 seconds...");
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("Done! The property should now appear in the UI via the real-time listener.");
    
    process.exit(0);
  } catch (error) {
    console.error("Error adding property: ", error);
    process.exit(1);
  }
}

addTestProperty();
