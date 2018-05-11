const { createError } = require('apollo-errors');

export const EmailRegistrationError = createError('EmailRegistrationError', {
  message: 'The entered email has been used before!'
});
