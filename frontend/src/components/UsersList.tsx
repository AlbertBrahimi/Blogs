import { useState } from 'react';
import { useGetUsersQuery, useDeleteUserMutation } from '../generated/operations';
import { Table, Button, message } from 'antd';
import CreateUserModal from './CreateUserModal';  
import {createUserColumns} from './Colums'; 
interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const { data,refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation({
    onCompleted: () => {
      refetch();
      message.success('User deleted successfully');
    },
    onError: (err) => {
      message.error(`Error: ${err.message}`);
    },
  });

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleDelete = (id: number) => {
    deleteUser({ variables: { id } });
  };

  const columns = createUserColumns(handleDelete);


  const filteredUsers = data?.users?.filter(user => user !== null) as User[];
  const pageSize = filteredUsers?.length > 5 ? 5 : filteredUsers?.length;

  return (
    <>
    <div className='createButton'>
      <Button type="primary" onClick={openModal}>
        Create a User
      </Button>

    </div>

      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        pagination={{ pageSize }}
      />
      <CreateUserModal visible={isModalVisible} onClose={closeModal} refetchData={refetch} />
    </>
  );
};

export default UserList;
