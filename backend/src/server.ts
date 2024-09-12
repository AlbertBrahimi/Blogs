import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './resolvers'; // Import the Nexus schema
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

const server = new ApolloServer({
  schema,
  context: () => ({ prisma }),
});

async function startServer() {
  // Start the Apollo Server
  await server.start();
  //@ts-expect-error
  server.applyMiddleware({ app });

  // Start the Express server
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

// Start the server and handle any errors
startServer().catch((error) => {
  console.error('Server failed to start:', error);
});
