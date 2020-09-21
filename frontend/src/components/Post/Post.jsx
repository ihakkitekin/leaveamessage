import React from 'react';
import './post.css';
import { Card } from 'antd';

export function Post({ post }) {
  return <Card className="post" hoverable>
    <h3>{post.title}</h3>
    <p>{post.text}</p>
  </Card>
}