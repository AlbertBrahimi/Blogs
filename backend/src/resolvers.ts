import { objectType, queryType, mutationType, makeSchema } from 'nexus';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id');
    t.string('name');
    t.string('email');
  }
});

const Query = queryType({
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve: (_parent, _args) => prisma.user.findMany(),
    });
  }
});

const Mutation = mutationType({
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
      }
    });
  }
});

export const schema = makeSchema({
  types: [User, Query, Mutation],
});
