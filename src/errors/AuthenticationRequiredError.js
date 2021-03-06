const { createError } = require('apollo-errors');

export const AuthenticationRequiredError = createError('AuthenticationRequiredError', {
  message: 'You must be logged in to do this action!'
});
