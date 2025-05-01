# Firebase Security Rules for Samcom Properties

The application is currently experiencing a permissions error when trying to write to Firestore collections. The error is:

```
FirebaseError: Missing or insufficient permissions.
```

## How to Fix the Permissions Issue

1. Log into your [Firebase Console](https://console.firebase.google.com/)
2. Select the "samcom-properties" project
3. In the sidebar, click on "Firestore Database"
4. Click on the "Rules" tab
5. Replace the current rules with the following:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to all collections
    match /{document=**} {
      allow read: if true;
    }
    
    // Properties collection
    match /properties/{propertyId} {
      allow write: if true;  // During development, allow unrestricted write access
      // For production: allow write: if request.auth != null && request.auth.uid == 'authorized-admin-uid';
    }
    
    // Agents collection
    match /agents/{agentId} {
      allow write: if true;  // During development, allow unrestricted write access
      // For production: allow write: if request.auth != null && request.auth.uid == 'authorized-admin-uid';
    }
    
    // Testimonials collection
    match /testimonials/{testimonialId} {
      allow write: if true;  // During development, allow unrestricted write access
      // For production: allow write: if request.auth != null && request.auth.uid == 'authorized-admin-uid';
    }
    
    // Contact Messages collection
    match /contactMessages/{messageId} {
      // Anyone can create contact messages
      allow create: if true;
      // Only admin can read/update/delete
      allow read, update, delete: if true;  // During development
      // For production: allow read, update, delete: if request.auth != null && request.auth.uid == 'authorized-admin-uid';
    }
    
    // Newsletter collection
    match /newsletters/{subscriberId} {
      // Anyone can subscribe to newsletter
      allow create: if true;
      // Only admin can read/update/delete
      allow read, update, delete: if true;  // During development
      // For production: allow read, update, delete: if request.auth != null && request.auth.uid == 'authorized-admin-uid';
    }
  }
}
```

6. Click "Publish" to update the rules

## Security Rules Explanation

- During development, we're allowing unrestricted read/write access to all collections for simplicity
- For production, we'll restrict write access to only authenticated admin users
- Read access is public for all collections except messages and newsletters
- Contact message form submissions and newsletter subscriptions allow public creation but restricted read access

## Notes for Production

Before deploying to production, you should replace:

```
allow write: if true;
```

With a rule that checks authentication:

```
allow write: if request.auth != null && request.auth.uid == 'authorized-admin-uid';
```

Replace 'authorized-admin-uid' with the actual Firebase UID of the admin user (likely samwelgithogori@gmail.com).
