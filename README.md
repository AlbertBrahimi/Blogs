## Backend Technologies

- **Express**: A web application framework for Node.js used to build the server.
- **Prisma**: An ORM (Object-Relational Mapping) tool to interact with the MySQL database.
- **MySQL**: The relational database used for data storage.
- **Nexus**: A GraphQL schema construction library that allows you to define your GraphQL schema using a programmatic approach. It provides a way to create GraphQL types, queries, and mutations in a type-safe manner.
- **Nodemon**: A tool that monitors for file changes and automatically restarts the server during development.
- **Apollo Server**: A GraphQL server implementation that connects with Express to handle GraphQL requests.

## Frontend Technologies

- **React**: A JavaScript library for building user interfaces.
- **GraphQL Code Generator**: A tool to generate TypeScript types and React hooks for GraphQL operations.
- **TypeScript**: A superset of JavaScript that adds static types to the language for improved developer experience.
- **Apollo Client**: A library to manage GraphQL data and integrate it with React components.
- **Ant Design**: A design system and React UI library to build the user interface with pre-designed components.

# Project Setup and Commands

## Prerequisites

Before running any commands, make sure you have MySQL running on your server. For development, we used XAMPP.

## Backend

1. **Start the Backend**

   Navigate to the backend directory and run:

   ```bash
   npm run start
   ```

   This command will start the backend server. Make sure you are in the correct directory before running it.

2. **Start the Frontend**
   Navigate to the frontend directory and run:

```bash
npm run start
```

This command will start the frontend development server. Ensure you are in the correct directory before running it.

**Prisma**

1. If you make changes to the Prisma schema, run the following commands:

```bash
npx prisma migrate dev --name TheName
```

Replace TheName with a descriptive name for your migration. 2. Generate prisma client

```bash
npx prisma generate
```

Make sure you are in backend directory.
**Graphql Codegen**

For the frontend, we have implemented GraphQL Codegen to streamline development. After writing a query or mutation, run:

```bash
npx graphql-codegen
```

This command will generate hooks that you can use in the frontend.

Make sure you are in frontend directory.
