import { objectType, extendType } from 'nexus';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define Post type
export const PostType = objectType({
  name: 'Post',
  definition(t) {
    t.int('id');
    t.string('title');
    t.string('content');
    t.field('author', {
      type: 'User',
      resolve: (parent) => prisma.user.findUnique({ where: { id: parent.authorId } }),
    });
  },
});

// Define Post Queries
export const PostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('posts', {
      type: 'Post',
      resolve: (_parent, _args) => prisma.post.findMany(),
    });
    t.field('post', {
      type: 'Post',
      args: { id: 'Int' },
      resolve: (_parent, { id }) => prisma.post.findUnique({ where: { id } }),
    });
  },
});

// Define Post Mutations
export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createPost', {
      type: 'Post',
      args: {
        title: 'String',
        content: 'String',
        authorId: 'Int',
      },
      resolve: (_parent, { title, content, authorId }) => {
        return prisma.post.create({
          data: { title, content, authorId },
        });
      },
    });
    t.field('updatePost', {
      type: 'Post',
      args: {
        id: 'Int',
        title: 'String',
        content: 'String',
      },
      resolve: (_parent, { id, title, content }) => {
        return prisma.post.update({
          where: { id },
          data: { title, content },
        });
      },
    });
    t.field('deletePost', {
      type: 'Post',
      args: { id: 'Int' },
      resolve: (_parent, { id }) => {
        return prisma.post.delete({
          where: { id },
        });
      },
    });
  },
});
