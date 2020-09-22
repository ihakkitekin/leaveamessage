import React from 'react';
import './loginContainer.css';
import firebase from 'firebase';
import FirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import UserService from '../../services/userService';

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