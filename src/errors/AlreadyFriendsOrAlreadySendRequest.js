const { createError } = require('apollo-errors');

export const AlreadyFriendsOrAlreadySendRequestError = createError('AlreadyFriendsOrAlreadySendRequestError', {
  message: 'You have already send a friend request to that person or you are already friends'
});
