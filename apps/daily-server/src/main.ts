import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { TeamScheduleResolver } from './app/resolvers/teamScheduleResolver';

(async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TeamScheduleResolver],
      container: Container,
    }),
  });

  apolloServer.start();

  const app = express();

  apolloServer.applyMiddleware({ app, cors: false });

  new Promise(() => app.listen({ port: 4000 }));
  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  );
})();
