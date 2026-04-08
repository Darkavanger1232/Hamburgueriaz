rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /usuarios/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    match /pedidos/{id} {
      allow create: if request.auth != null;
      allow read: if request.auth.uid == resource.data.userId;
      allow update: if request.auth != null;
    }
  }
}
