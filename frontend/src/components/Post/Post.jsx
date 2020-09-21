import React from 'react';
import './post.css';

export function Post({ title, text }) {
  return <div className="post">
    <h4>{title}</h4>
    <p>{text}</p>
  </div>
}