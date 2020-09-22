import React from 'react';
import './setUserInfo.css';
import { Avatar } from '../../components/Avatar/Avatar';
import { Modal, Input } from 'antd';
import { UserContext } from '../../context/userContext';

const AVATARS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export function SetUserInfo({ visible, onClose }) {
  const { displayName } = React.useContext(UserContext);
  const [nickname, setNickname] = React.useState('');
  const [avatar, setAvatar] = React.useState();

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
    console.log('nickname', nickname)
  }, [nickname]);

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
        {AVATARS.map(avatarId => {
          return <div className="avatar-wrapper" data-selected={avatar === avatarId} onClick={() => onAvatarClick(avatarId)} key={`avatar-${avatarId}`}><Avatar id={avatarId} /></div>
        })}
      </div>
    </div>
  </Modal >
}