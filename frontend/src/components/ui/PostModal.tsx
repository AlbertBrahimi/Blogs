import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import  {useCreatePost}  from '../../customHooks/postOperationsHooks';

interface PostModalProps {
  visible: boolean;
  onClose: () => void;
  authorId?: string;
  refetch?: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ visible, onClose, authorId, refetch }) => {
  const { form, handleCreatePost } = useCreatePost({ authorId, onClose, refetch });

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
