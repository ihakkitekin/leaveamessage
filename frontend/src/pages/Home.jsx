import React from 'react';
import './home.css';
import { Post } from '../components/Post/Post';
import { AddPost } from '../components/AddPost/AddPost';
import PostService from '../services/postService';
import { UserContext } from '../context/userContext';



export function HomePage() {
  const user = React.useContext(UserContext);

  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    const unsubscribe = PostService.onNewPostCreated((posts) => {
      setPosts(prev => [...posts, ...prev]);
    });

    return () => {
      unsubscribe();
    }
  }, []);

  return <div className="home-page">
    {user && <AddPost />}
    {posts.map(post => {
      return <Post key={post.id} post={post} />
    })}
  </div>
} 