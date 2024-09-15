import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserPostsQuery } from '../generated/operations'; 

const UserPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useGetUserPostsQuery({
    variables: { userId: Number(id) || 0 },
  });

  if (loading) return <p>Loading posts...</p>; 
  if (error) return <p>Error: {error.message}</p>; 

  if (!data || !data.userPosts || data.userPosts.length === 0) {
    return <p>No posts found for user ID: {id}</p>;
  }

  return (
    <div>
      <div>
        {data.userPosts.map((post) => (
          <div key={post?.id}>
            <h2>{post?.title}</h2>
            <p>{post?.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPost;
