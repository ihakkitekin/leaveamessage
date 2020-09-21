import React from 'react';
import './home.css';
import { Post } from '../components/Post/Post';
import { AddPost } from '../components/AddPost/AddPost';
import { LoginContainer } from '../components/LoginContainer/LoginContainer';
import PostService from '../services/postService';



export function HomePage() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    PostService.getPosts().then(res => setPosts(res));
    PostService.onNewPostCreated((posts) => {
      setPosts(prev => [...posts, ...prev]);
    });
  }, []);

  return <div className="home-page">
    <h3>Home</h3>
    <LoginContainer />
    <AddPost />
    {posts.map(post => {
      return <Post key={post.id} title={post.title} text={post.text} />
    })}
  </div>
} 