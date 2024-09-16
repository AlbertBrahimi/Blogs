import React from 'react';
import { useParams } from 'react-router-dom';
import { Empty } from 'antd'; 
import { Post, useGetUserPostsQuery } from '../generated/operations';
import UserBlogs from './ui/BlogsCrad';

const UserPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error, refetch } = useGetUserPostsQuery({
    variables: { userId: Number(id) || 0 },
  });

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const posts = (data?.userPosts || []).filter((post): post is Post => post !== null);

  return (
    <div>
      {posts.length > 0 ? (
        <UserBlogs posts={posts} userId={id} refetch={refetch}/>
      ) : (
        <Empty
          description={<span>No posts found for user ID: {id}</span>}
          style={{ marginTop: '20px' }}
        />
      )}
    </div>
  );
};

export default UserPost;
