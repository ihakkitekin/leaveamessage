import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyALDHquKDPAU31WLCR1InWXcrIG7oU686Y",                             // Auth / General Use
  appId: "1:737533290806:web:d04b3be7cb8d43543e2b97",      // General Use
  projectId: "leaveamessage-a4475",               // General Use
  authDomain: "leaveamessage-a4475.firebaseapp.com",         // Auth with popup/redirect
  databaseURL: "https://leaveamessage-a4475.firebaseio.com", // Realtime Database
  storageBucket: "leaveamessage-a4475.appspot.com",          // Storage
  // messagingSenderId: "123456789",                  // Cloud Messaging
  // measurementId: "G-12345"                        // Analytics
});

const app = firebase.app();
const functions = app.functions();
const db = app.firestore();
const remoteConfig = app.remoteConfig();

if (process.env.NODE_ENV === 'development') {
  functions.useFunctionsEmulator('http://localhost:5001')
}


export default { functions, app, db, remoteConfig }