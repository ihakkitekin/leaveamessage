import React from 'react';
import './setUserInfo.css';
import { Avatar } from '../../components/Avatar/Avatar';
import { Modal, Input } from 'antd';
import { UserContext } from '../../context/userContext';
import UserService from '../../services/userService';

const AVATARS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export function SetUserInfo({ visible, onClose }) {
  const user = React.useContext(UserContext);
  const [nickname, setNickname] = React.useState(user.nickname);
  const [avatarId, setAvatar] = React.useState(user.avatarId);

  const onChange = React.useCallback((e) => {
    const value = e.currentTarget.value;

    if (e.currentTarget.name === 'nickname') {
      setNickname(value);
    }
  }, []);

  const onAvatarClick = React.useCallback((avatarId) => {
    setAvatar(avatarId);
  }, []);

  const onConfirm = React.useCallback(() => {
    UserService.setUserDetail({ nickname, avatarId });
  }, [nickname, avatarId]);

  return <Modal
    wrapClassName="set-user-info"
    title="Edit Your Profile"
    visible={visible}
    onOk={onConfirm}
    onCancel={onClose}
  >
    <Input name="nickname" placeholder="Your Nickname" value={nickname} onChange={onChange} required />
    <div>
      <h4>Select Your Avatar:</h4>
      <div className="avatar-container">
        {AVATARS.map(id => {
          return <div className="avatar-wrapper" data-selected={avatarId === id} onClick={() => onAvatarClick(id)} key={`avatar-${id}`}><Avatar id={id} /></div>
        })}
      </div>
    </div>
  </Modal >
}