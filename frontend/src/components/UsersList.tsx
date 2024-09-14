import { useGetUsersQuery, useDeleteUserMutation } from '../generated/operations';
import { Table, Button, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const { data, loading, error, refetch } = useGetUsersQuery();  
  const [deleteUser] = useDeleteUserMutation({
    onCompleted: () => {
      refetch();
      message.success('User deleted successfully');
    },
    onError: (err) => {
      message.error(`Error: ${err.message}`);
    },
  });

  const handleDelete = (id: number) => {
    deleteUser({ variables: { id } });
  };

  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_text, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredUsers = data?.users?.filter(user => user !== null) as User[]; 
  const pageSize = filteredUsers.length > 5 ? 5 : filteredUsers.length;

  return (
    <Table 
      columns={columns} 
      dataSource={filteredUsers} 
      rowKey="id"
      pagination={{ pageSize }} 
    />
  );
};

export default UserList;
