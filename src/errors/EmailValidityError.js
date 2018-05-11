const { createError } = require('apollo-errors');

export const EmailValidityError = createError('EmailValidityError', {
  message: 'The email you have entered is not a valid one!'
});
