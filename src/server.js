import 'babel-polyfill';
import Hapi from 'hapi';
import JWT from 'jsonwebtoken';
import { formatError } from 'apollo-errors';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import env from './env.config';
import schema from './models/schema';
import loaders from './loaders';

async function StartServer() {
  const server = new Hapi.Server({
    port: env.SERVICE_PORT,
  });

  server.route({
    method: 'GET',
    path: '/authorizationError',
    handler: () => 'Something went wrong with the authorization token! Please Authorize, again!'
  });

  server.ext('onRequest', (request, reply) => {
    const auth = request.headers.authorization;
    if (auth && auth !== null) {
      return JWT.verify(auth, env.JWT_KEY, (err, decoded) => {
        if (err) {
          request.setUrl('/authorizationError');
        }

        request.auth.credentials = decoded;
        request.auth.isAuthenticated = true;
        return reply.continue;
      });
    }

    return reply.continue;
  });


  await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: request => ({
        formatError,
        schema,
        context: {
          auth: request.auth,
          loaders
        }
      }),
      route: {
        cors: true
      }
    },
  });

  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/graphql',
        subscriptionsEndpoint: `ws://localhost:${env.SERVICE_PORT}/subscriptions`
      },
      route: {
        cors: true
      }
    },
  });

  // await server.connection({ routes: { cors: true } });


  server.listener.listen(env.SERVICE_PORT, () => {
    console.log(`Apollo Server is now running on http://localhost:${env.SERVICE_PORT}`);
    // Set up the WebSocket for handling GraphQL subscriptions
    new SubscriptionServer({
      execute,
      subscribe,
      schema,
      onConnect: (connectionParams, webSocket) => ({ loaders }),
    }, {
      server: server.listener,
      path: '/subscriptions',
    });
  });

  try {
    await server.start();
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }

  console.log(`Server running at: ${server.info.uri}`);
}

StartServer();
