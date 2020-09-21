import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
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

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
