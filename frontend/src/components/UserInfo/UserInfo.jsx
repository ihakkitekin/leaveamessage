import React from 'react';
import './userInfo.css';
import { Card } from 'antd';
import { UserContext } from '../../context/userContext';

export function UserInfo() {
  const { displayName, metadata } = React.useContext(UserContext);

  return <Card className="user-info" hoverable>
    <h3>{displayName}</h3>
    <div>Created At: {metadata.creationTime}</div>
  </Card>
}