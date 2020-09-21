import React from 'react';
import './addPost.css';
import PostService from '../../services/postService';

export function AddPost() {
  const [postTitle, setPostTitle] = React.useState('');
  const [postText, setPostText] = React.useState('');

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
    PostService.addPost(postTitle, postText);
  }, [postTitle, postText]);

  return <div className="add-post">
    <form onSubmit={onSubmit} className="add-post-form">
      <div className="add-post-field">
        <label htmlFor="postTitle">Post Title</label>
        <input name="postTitle" value={postTitle} onChange={onChange} />
      </div>
      <div className="add-post-field">
        <label htmlFor="postText">Post Text</label>
        <input name="postText" value={postText} onChange={onChange} />
      </div>
      <button>Submit</button>
    </form>
  </div>
}