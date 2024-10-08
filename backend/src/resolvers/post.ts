import { objectType, extendType } from 'nexus';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const PostType = objectType({
  name: 'Post',
  definition(t) {
    t.int('id');
    t.string('title');
    t.string('content');
    t.int('authorId');
    t.field('author', {
      type: 'User',
      resolve: (parent) => prisma.user.findUnique({ where: { id: parent.authorId } }),
    });
  },
});

export const PostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('userPosts', {
      type: 'Post',
      args: { userId: 'Int' },
      resolve: (_parent, { userId }) => prisma.post.findMany({ where: { authorId: userId } }),
    });
  },
});

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
