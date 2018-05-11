import jwt from 'jsonwebtoken';
import { createResolver } from 'apollo-resolvers';
import { isInstance } from 'apollo-errors';

import env from '../env.config';
import { UnknownError } from '../errors';

export const baseResolver = createResolver(
  // incoming requests will pass through this resolver like a no-op
  null,

  /*
     Only mask outgoing errors that aren't already apollo-errors,
     such as ORM errors etc
   */
  (root, args, context, error) => {
    console.log(error);
    if (isInstance(error)) {
      return error;
    }
    return new UnknownError({ error });
  }
);
