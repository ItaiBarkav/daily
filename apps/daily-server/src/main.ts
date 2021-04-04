import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { TeamMembersResolver } from './app/resolvers/teamMembersResolver';
import { TeamScheduleResolver } from './app/resolvers/teamScheduleResolver';

(async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TeamScheduleResolver, TeamMembersResolver],
      container: Container,
    }),
  });

  apolloServer.start();

  const app = express();

  apolloServer.applyMiddleware({
    app,
    path: '/api',
    cors: true,
  });

  new Promise(() => app.listen({ port: process.env.PORT || 4000 }));
  console.log(
    `🚀 Daily server ready at http://localhost:4000${apolloServer.graphqlPath}`
  );
})();
