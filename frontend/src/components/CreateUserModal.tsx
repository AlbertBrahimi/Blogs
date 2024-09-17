import { Modal, Button, Form, Input, message } from 'antd';
import { useCreateOneUserMutation } from '../generated/operations';

interface CreateUserModalProps {
  visible: boolean;
  onClose: () => void;
  refetchData?: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ visible, onClose, refetchData }) => {
  const [form] = Form.useForm();
  const [createUser, { loading }] = useCreateOneUserMutation({
    onCompleted: () => {
      message.success('User created successfully');
      onClose(); 
      refetchData?.();
    },
    onError: (err: { message: string; }) => {
      message.error(`Error: ${err.message}`);
    },
  });

  const handleCreateUser = (values: { name: string; email: string }) => {
    createUser({ variables: values });
  };

  return (
    <Modal
      visible={visible}
      title="Create a New User"
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreateUser}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the user name!' }]}
        >
          <Input placeholder="Enter user name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input the user email!' }]}
        >
          <Input placeholder="Enter user email" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create User
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
