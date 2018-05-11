import { baseResolver } from './baseResolver';
import { AuthenticationRequiredError } from '../errors';


export const isAuthenticatedResolver = baseResolver.createResolver((root, args, context, error) => {
  if (!context.auth.isAuthenticated) {
    throw new AuthenticationRequiredError();
  }
});
