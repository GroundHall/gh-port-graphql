import { baseResolver } from './baseResolver';
import { AlreadyAuthenticatedError } from '../errors';

export const isNotAuthenticatedResolver = baseResolver.createResolver((root, args, context, error) => {
  if (context.auth.isAuthenticated && context.auth.credentials) throw new AlreadyAuthenticatedError();
});
