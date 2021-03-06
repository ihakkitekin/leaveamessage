import React from 'react';
import './addPost.css';
import PostService from '../../services/postService';
import { Input, Button } from 'antd';

export function AddPost() {
  const [postTitle, setPostTitle] = React.useState('');
  const [postText, setPostText] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onChange = React.useCallback((e) => {
    const value = e.currentTarget.value;

    if (e.currentTarget.name === 'postTitle') {
      setPostTitle(value)
    } else {
      setPostText(value)
    }
  }, []);

  const onSubmit = React.useCallback((e) => {
    e.preventDefault();
    if (loading || !postTitle || !postText) return;

    setLoading(true);
    PostService
      .addPost(postTitle, postText)
      .then(() => setLoading(false));
  }, [postTitle, postText, loading]);

  return <div className="add-post">
    <h3>Create New Post</h3>
    <form onSubmit={onSubmit} className="add-post-form">
      <div className="add-post-field">
        <Input name="postTitle" placeholder="Post Title" value={postTitle} onChange={onChange} required />
      </div>
      <div className="add-post-field">
        <Input.TextArea rows={3} name="postText" placeholder="Post Text" value={postText} onChange={onChange} required />
      </div>
      <Button type="primary" htmlType="submit" disabled={loading}>Submit</Button>
    </form>
  </div>
}