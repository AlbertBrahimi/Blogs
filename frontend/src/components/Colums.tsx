import { ColumnsType } from 'antd/lib/table';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export const createUserColumns = (handleDelete: (id: number) => void): ColumnsType<any> => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <Link to={`/user/${record.id}`}>{text}</Link>
    ),
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
