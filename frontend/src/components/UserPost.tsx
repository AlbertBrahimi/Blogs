import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Empty } from 'antd'; 
import { Post, useGetUserPostsQuery } from '../generated/operations';
import UserBlogs from './ui/BlogsCrad';
import PostModal from './ui/PostModal';
import './ui/styles/global.css';

const UserPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error, refetch } = useGetUserPostsQuery({
    variables: { userId: Number(id) || 0 },
  });
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const posts = (data?.userPosts || []).filter((post): post is Post => post !== null);

  return (
    <div>
    <div className='createButton'>
       <Button
        type="primary"
        onClick={showModal}
      >
        Create a Post
      </Button>
    </div>
      <PostModal 
        visible={modalVisible} 
        onClose={closeModal} 
        authorId={id ?? '0'} 
        refetch={refetch}
      />
      {posts.length > 0 ? (
        <UserBlogs posts={posts} refetch={refetch}/>
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
