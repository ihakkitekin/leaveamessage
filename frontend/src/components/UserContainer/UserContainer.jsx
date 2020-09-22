import React from 'react';
import { UserContext } from '../../context/userContext';
import { Avatar } from '../Avatar/Avatar';
import './userContainer.css';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

export function UserContainer() {
  const user = React.useContext(UserContext);

  const onSignOut = React.useCallback(() => {
    firebase.auth().signOut()
  }, []);


  return <div className="user-container">
    <div className="user-login">
      <span>{user.nickname}</span>
      <span className="logout-button" onClick={onSignOut}>Sign Out</span>
    </div>
    <Link to="/profile">
      <Avatar id={user.avatarId} />
    </Link>
  </div>
}