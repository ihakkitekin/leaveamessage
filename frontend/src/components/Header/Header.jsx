import React from 'react';
import './header.css';
import { LoginContainer } from '../LoginContainer/LoginContainer';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

export function Header({ user }) {
  const onSignOut = React.useCallback(() => {
    firebase.auth().signOut()
  }, []);

  return <div className="header">
    <h2>LeaveAMessage</h2>
    <Link to="/profile">Profile</Link>
    {!user && <LoginContainer />}
    {user && <div className="user-container">
      <span>{user.displayName}</span>
      <span className="logout-button" onClick={onSignOut}>Sign Out</span>
    </div>}
  </div>
}