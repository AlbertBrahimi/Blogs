import { gql } from '@apollo/client';

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
      name
    }
  }
`;

export const CREATE_USER = gql`
mutation CreateOneUser($name: String!, $email: String!) {
  createUser(name: $name, email: $email) {
    id
    name
    email
  }
}
`
