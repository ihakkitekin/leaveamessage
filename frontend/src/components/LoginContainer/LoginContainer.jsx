import React from 'react';
import './loginContainer.css';
import firebase from 'firebase';
import FirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
}

export function LoginContainer() {
  return <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
}