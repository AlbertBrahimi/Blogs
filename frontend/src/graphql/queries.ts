import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

export const GET_USERS_DATA_BY_ID = gql`

query GetUserPosts ($userId:Int!){
userPosts(userId: $userId) {
  id
  title
  content
}
}
`;
