const { createError } = require('apollo-errors');

export const AlreadyAuthenticatedError = createError('AuthenticationRequiredError', {
  message: 'You are already logged in!'
});
