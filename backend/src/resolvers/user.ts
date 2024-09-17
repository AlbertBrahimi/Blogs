import { objectType, extendType } from 'nexus';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const UserType = objectType({
  name: 'User',
  definition(t) {
    t.int('id');
    t.string('name');
    t.string('email');
    t.list.field('posts', {
      type: 'Post',
      resolve: (parent) => prisma.post.findMany({ where: { authorId: parent.id } }),
    });
  },
});

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve: (_parent, _args) => prisma.user.findMany({
        orderBy:{name: 'asc'}
      }),
    });
  },
});

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'User',
      args: {
        name: 'String',
        email: 'String',
      },
      resolve: (_parent, { name, email }) => {
        return prisma.user.create({
          data: { name, email },
        });
      },
    });
    t.field('deleteUser', {
      type: 'User',
      args: { id: 'Int' },
      resolve: (_parent, { id }) => {
        return prisma.user.delete({
          where: { id },
        });
      },
    });
  },
});
