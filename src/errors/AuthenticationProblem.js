const { createError } = require('apollo-errors');

export const AuthenticationProblem = createError('AuthenticationProblem', {
  message: 'Incorrect email and/or password!'
});
