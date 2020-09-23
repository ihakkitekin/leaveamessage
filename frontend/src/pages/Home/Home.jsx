import React from 'react';
import './home.css';
import { Post } from '../../components/Post/Post';
import { AddPost } from '../../components/AddPost/AddPost';
import PostService from '../../services/postService';
import { UserContext } from '../../context/userContext';
import { Button } from 'antd';



export function HomePage() {
  const user = React.useContext(UserContext);

  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const unsubscribeNewPosts = PostService.onNewPostCreated((posts) => {
      setPosts(prev => [...posts, ...prev]);
    });

    return () => {
      unsubscribeNewPosts();
    }
  }, []);

  const loadOldPosts = React.useCallback(() => {
    const lastPost = posts[posts.length - 1];

    PostService.getPosts(lastPost.id).then(res => {
      setPosts(prev => [...prev, ...res]);
    });
  }, [posts]);

  return <div className="home-page">
    {user && <AddPost />}
    {posts.map(post => {
      return <Post key={post.id} post={post} />
    })}
    <Button className="load-old-posts-button" onClick={loadOldPosts}>Old Posts</Button>
  </div>
} 