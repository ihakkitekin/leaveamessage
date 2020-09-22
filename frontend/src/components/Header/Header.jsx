import React from 'react';
import './header.css';
import { LoginContainer } from '../LoginContainer/LoginContainer';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { UserContainer } from '../UserContainer/UserContainer';

export function Header() {
  const user = React.useContext(UserContext);

  return <div className="header">
    <Link to="/">
      <h2>LeaveAMessage</h2>
    </Link>
    {!user && <LoginContainer />}
    {user && <UserContainer />}
  </div>
}