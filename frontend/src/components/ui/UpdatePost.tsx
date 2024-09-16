import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { Post, useUpdatePostMutation } from '../../generated/operations';

interface UpdatePostModalProps {
  visible: boolean;
  onClose: () => void;
  post: Post;
  refetch?: () => void;
}

const UpdatePostModal: React.FC<UpdatePostModalProps> = ({ visible, onClose, post, refetch }) => {
  const [form] = Form.useForm();
  const [updatePost] = useUpdatePostMutation({
    onCompleted: () => {
      message.success('Post updated successfully');
      onClose();
      refetch?.();
    },
    onError: (err) => {
      message.error(`Error: ${err.message}`);
    },
  });

  const handleSave = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      updatePost({
        variables: {
          id: post.id!,
          title: values.title,
          content: values.content,
        },
      });
    } catch (error) {
      message.error('Please fill in all required fields');
    }
  };

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
          <Button type="primary" onClick={handleSave}>
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
