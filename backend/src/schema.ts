import { makeSchema } from 'nexus';
import { UserType, UserQuery, UserMutation } from './resolvers/user';
import { PostType, PostQuery, PostMutation } from './resolvers/post';

export const schema = makeSchema({
  types: [UserType, PostType, UserQuery, UserMutation, PostQuery, PostMutation],
});
