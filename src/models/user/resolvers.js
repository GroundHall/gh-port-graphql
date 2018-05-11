import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import env from '../../env.config';
import { UserAPI } from '../../APIs';
import checkEmailValidity from '../../helpers/checkEmailValidity';
import { isNotAuthenticatedResolver, isAuthenticatedResolver } from '../../baseResolvers';
import { AuthenticationProblem, EmailRegistrationError, EmailValidityError, AlreadyFriendsOrAlreadySendRequestError } from '../../errors';

const resolver = {
  User: {
    friends: isAuthenticatedResolver.createResolver(({ friends }, args, context) => context.loaders.user.loadMany(friends)),
    receivedFriendRequests: isAuthenticatedResolver.createResolver(({ receivedFriendRequests }, args, context) => context.loaders.user.loadMany(receivedFriendRequests)),
    sendFriendRequests: isAuthenticatedResolver.createResolver(({ sendFriendRequests }, args, context) => context.loaders.user.loadMany(sendFriendRequests)),
  },
  Query: {
    me: isAuthenticatedResolver.createResolver((_, args, context) => context.loaders.user.load(context.auth.credentials.id)),
    user: isAuthenticatedResolver.createResolver((_, { id }, context) => context.loaders.user.load(id)),
    users: isAuthenticatedResolver.createResolver(() => UserAPI.get('/users').then(result => result.data)),
  },
  Mutation: {
    register: isNotAuthenticatedResolver.createResolver(
      async (_, { password, email, ...args }, context) => {
        const isEmailValid = checkEmailValidity(email);
        if (!isEmailValid) throw new EmailValidityError({ data: { email } });
        const isEmailRegistered = await UserAPI.get(`/users/email/${email}`).then(({ data }) => !!data);
        if (isEmailRegistered) throw new EmailRegistrationError({ data: { email } });
        return bcrypt.hash(password, 3).then(async (hash) => {
          args.password = hash;
          args.email = email;
          return UserAPI.post('/users', args).then(({ data }) => data.changes[0].new_val);
        });
      }
    ),
    authenticate: isNotAuthenticatedResolver.createResolver(
      async (_, { email, password }) => {
        const user = await UserAPI.get(`/users/email/${email}`)
          .then(({ data }) => {
            if (!data) {
              throw new AuthenticationProblem({
                data: { email, password }
              });
            }
            return data;
          });
        const isPassCorrect = await bcrypt.compare(password, user.password);
        if (!isPassCorrect) {
          throw new AuthenticationProblem({
            data: { email, password }
          });
        }
        const token = jwt.sign({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          type: user.type
        }, env.JWT_KEY);
        return Promise.resolve(token);
      }
    ),
    sendFriendRequest: isAuthenticatedResolver.createResolver(
      async (_, { toId }, { auth: { credentials: { id } } }) => {
        const toUser = await UserAPI.get(`/users/${toId}`).then(({ data }) => data);
        const isRequestValid =
          !toUser.receivedFriendRequests.includes(id) && !toUser.friends.includes(id) && toUser.id !== id;
        if (!isRequestValid) {
          throw new AlreadyFriendsOrAlreadySendRequestError({
            id,
            toId,
          });
        }
        return UserAPI.patch('/users/sendFriendRequest', {
          fromId: id,
          toId
        });
      }
    ),
    cancelFriendRequest: isAuthenticatedResolver.createResolver(
      async (_, { toId }, { auth: { credentials: { id } } }) => {
        const toUser = await UserAPI.get(`/users/${toId}`).then(({ data }) => data);
        const isRequestValid =
          toUser.receivedFriendRequests.includes(id) && !toUser.friends.includes(id);
        if (!isRequestValid) {
          throw new AlreadyFriendsOrAlreadySendRequestError({
            id,
            toId,
          });
        }
        return UserAPI.patch('/users/cancelFriendRequest', {
          fromId: id,
          toId
        });
      },
    ),
    acceptFriendRequest: isAuthenticatedResolver.createResolver(
      async (_, { fromId }, { auth: { credentials: { id } } } ) => {
        const me = await UserAPI.get(`/users/${id}`).then(({ data }) => data);
        const isRequestValid =
            me.receivedFriendRequests.includes(fromId) && !me.friends.includes(fromId);
        if (!isRequestValid) {
          throw new AlreadyFriendsOrAlreadySendRequestError({
            id,
            fromId,
          });
        }
        return UserAPI.patch('/users/acceptFriendRequest', {
          fromId,
          toId: id
        });
      }
    )
  }
};

export default resolver;
