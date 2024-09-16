import React, { useState } from 'react';
import { Card, Col, Row, Button, message } from 'antd';
import { Post } from '../../generated/operations';
import PostModal from './PostModal';
import UpdatePostModal from './UpdatePost';
import { useDeletePostMutation } from '../../generated/operations';

interface UserBlogsProps {
  posts: (Post | null)[];
  userId?: string;
  refetch?: () => void;
}

const UserBlogs: React.FC<UserBlogsProps> = ({ posts, userId, refetch }) => {
  const [deletePost] = useDeletePostMutation({
    onCompleted: () => {
      refetch?.();
      message.success('Post deleted successfully');
    },
    onError: (err) => {
      message.error(`Error: ${err.message}`);
    },
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleDelete = (id: number) => {
    deletePost({ variables: { id } });
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setUpdateModalVisible(true);
  };

  const showModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const closeUpdateModal = () => {
    setUpdateModalVisible(false);
    setSelectedPost(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button
        type="primary"
        onClick={showModal}
        style={{ marginBottom: '20px' }}
      >
        Create a Post
      </Button>
      <Row gutter={16}>
        {posts
          .filter((post): post is Post => post !== null)
          .map((post) => (
            <Col span={8} key={post.id}>
              <Card
                title={<span style={{ color: '#1890ff' }}>{post.title}</span>}
                style={{
                  marginBottom: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                <p>{post.content}</p>
                <Button 
                  type="primary" 
                  danger 
                  style={{ marginTop: '20px', marginRight: '10px' }} 
                  onClick={() => post.id !== null && post.id !== undefined && handleDelete(post.id)}
                >
                  Delete Post
                </Button>
                <Button 
                  type="default" 
                  style={{ marginTop: '20px' }} 
                  onClick={() => handleEdit(post)}
                >
                  Edit Post
                </Button>
              </Card>
            </Col>
          ))}
      </Row>
      <PostModal 
        visible={modalVisible} 
        onClose={closeModal} 
        authorId={userId ?? '0'} 
        refetch={refetch}
      />
      {selectedPost && (
        <UpdatePostModal 
          visible={updateModalVisible} 
          onClose={closeUpdateModal} 
          post={selectedPost} 
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default UserBlogs;
