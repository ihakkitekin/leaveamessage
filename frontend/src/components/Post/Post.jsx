import React from 'react';
import './post.css';
import { Card } from 'antd';
import { Avatar } from '../Avatar/Avatar';

export function Post({ post }) {
  return <Card className="post" size="small" hoverable>
    <div className="post-user-info">
      <Avatar id={post.userAvatarId} />
      <b>{post.userNickname}</b>
      <i className="post-timestamp">posted at {new Date(post.createdAt.seconds * 1000).toLocaleString()}</i>
    </div>
    <h3>{post.title}</h3>
    <p>{post.text}</p>
  </Card>
}