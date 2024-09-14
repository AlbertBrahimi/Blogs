import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './schema';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

const server = new ApolloServer({
  schema,
  context: () => ({ prisma }),
});

async function startServer() {
  await server.start();
  //@ts-expect-error
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer().catch((error) => {
  console.error('Server failed to start:', error);
});
