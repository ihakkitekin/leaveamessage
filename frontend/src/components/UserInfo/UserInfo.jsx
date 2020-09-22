import React from 'react';
import './userInfo.css';
import { Card, Button } from 'antd';
import { UserContext } from '../../context/userContext';
import { SetUserInfo } from '../../components/SetUserInfo/SetUserInfo';

export function UserInfo() {
  const { displayName, metadata } = React.useContext(UserContext);
  const [showEdit, toggleEdit] = React.useState(false);

  const onEditToggle = React.useCallback(() => {
    toggleEdit((prev) => !prev);
  }, []);

  return <Card className="user-info" hoverable>
    <h3>{displayName}</h3>
    <div>Created At: {metadata.creationTime}</div>
    <div>
      <Button onClick={onEditToggle}>Edit</Button>
    </div>
    <SetUserInfo visible={showEdit} onClose={onEditToggle} />
  </Card>
}