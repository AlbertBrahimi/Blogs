import React, { useState } from 'react';
import { Card, Col, Row, Button } from 'antd';
import { Post } from '../../generated/operations';
import UpdatePostModal from './UpdatePost';
import  {useDeletePost}  from '../../customHooks/postOperationsHooks';


interface UserBlogsProps {
  posts: (Post | null)[];
  userId?: string;
  refetch?: () => void;
}

const UserBlogs: React.FC<UserBlogsProps> = ({ posts, refetch }) => {
  const { handleDeletePost } = useDeletePost({ refetch });
  
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setUpdateModalVisible(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalVisible(false);
    setSelectedPost(null);
  };

  return (
    <div style={{ padding: '20px' }}>
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
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <p>{post.content}</p>
                <Button
                  type="primary"
                  danger
                  style={{ marginTop: '20px', marginRight: '10px' }}
                  onClick={() => post.id && handleDeletePost(post.id)}
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

