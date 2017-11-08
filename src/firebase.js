import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyDYoHQYHPzT3J4tU0vr-XNUsLPfINABk9E",
    authDomain: "appletext-edae2.firebaseapp.com",
    databaseURL: "https://appletext-edae2.firebaseio.com",
    projectId: "appletext-edae2",
    storageBucket: "",
    messagingSenderId: "229957451881"
  });

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database();
