import React from 'react';
import { useGetUsersQuery } from '../generated/operations';

const UserList: React.FC = () => {
  const { data, loading, error } = useGetUsersQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.users?.map(user => 
        user ? <li key={user.id}>{user.name}</li> : null
      )}
    </ul>
  );
};

export default UserList;
