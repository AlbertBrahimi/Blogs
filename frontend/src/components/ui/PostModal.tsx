import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useCreatePostMutation } from '../../generated/operations';

interface PostModalProps {
  visible: boolean;
  onClose: () => void;
  authorId?: string;
  refetch?: () => void; 
}

const PostModal: React.FC<PostModalProps> = ({ visible, onClose, authorId, refetch }) => {
  const [form] = Form.useForm();
  const [createPost] = useCreatePostMutation({
    onCompleted: () => {
      message.success('Post created successfully!');
      form.resetFields();
      if (refetch) {
        refetch(); // Refetch to update the post list
      }
      onClose();
    },
    onError: (error) => {
      console.error('Failed to create post:', error);
      message.error('Failed to create post. Please try again.');
    }
  });

  const handleCreatePost = (values: { title: string; content: string }) => {
    createPost({
      variables: { ...values, authorId: Number(authorId) },
    });
  };

  return (
    <Modal
      title="Create a New Post"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleCreatePost}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter the title' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: 'Please enter the content' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Post
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PostModal;
