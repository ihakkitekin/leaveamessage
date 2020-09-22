import React from 'react';
import './avatar.css';

export function Avatar({ id }) {
  return <div className="avatar">
    <img className={`avatar-img avatar-img-${id}`} src="/avatars.png" />
  </div>
}