import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { Post } from '../../generated/operations';
import  {useUpdatePost}  from '../../customHooks/postOperationsHooks';


interface UpdatePostModalProps {
  visible: boolean;
  onClose: () => void;
  post: Post;
  refetch?: () => void;
}

const UpdatePostModal: React.FC<UpdatePostModalProps> = ({ visible, onClose, post, refetch }) => {
  const { form, handleUpdatePost } = useUpdatePost({ onClose, post, refetch });

  return (
    <Modal
      visible={visible}
      title="Update Post"
      onCancel={onClose}
      footer={null}
      width={600}
      afterClose={() => form.resetFields()}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ title: post.title, content: post.content }}
      >
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
          <Button type="primary" onClick={handleUpdatePost}>
            Save
          </Button>
          <Button style={{ marginLeft: '10px' }} onClick={onClose}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
