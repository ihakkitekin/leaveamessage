import React from 'react';
import './home.css';
import { Post } from '../../components/Post/Post';
import { AddPost } from '../../components/AddPost/AddPost';
import PostService from '../../services/postService';
import { UserContext } from '../../context/userContext';
import { Button, Result, Spin } from 'antd';
import config from '../../utils/config';


export function HomePage() {
  const user = React.useContext(UserContext);

  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
    const unsubscribeNewPosts = PostService.onNewPostCreated((posts) => {
      setPosts(prev => [...posts, ...prev]);
      setLoading(false);
    });

    return () => {
      unsubscribeNewPosts();
    }
  }, []);

  const loadOldPosts = React.useCallback(() => {
    const lastPost = posts[posts.length - 1];

    if (lastPost) {
      PostService.getPosts(lastPost.id).then(res => {
        setPosts(prev => [...prev, ...res.posts]);
        setHasMore(res.hasMore);
        setLoading(false);
      });
    }
  }, [posts]);

  const hasPosts = posts.length > 0;
  const hasMorePosts = hasMore && posts.length >= config.getNumber('POST_PAGINATION_COUNT');

  return <div className="home-page">
    {user && <AddPost />}
    {hasPosts && posts.map(post => {
      return <Post key={post.id} post={post} />
    })}
    {loading && <Spin tip="Loading..." />}
    {!hasPosts && !loading && <Result title="There are currently no posts."
    />}
    {hasMorePosts && <Button className="load-old-posts-button" onClick={loadOldPosts}>Old Posts</Button>}
  </div>
} 