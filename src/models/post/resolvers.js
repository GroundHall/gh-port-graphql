import { withFilter, PubSub } from 'graphql-subscriptions';
import { PostAPI } from '../../APIs';

import { isAuthenticatedResolver } from '../../baseResolvers';

const POST_CHANGED_TOPIC = 'POST_CHANGED_TOPIC';
export const pubsub = new PubSub();
const resolver = {
  Post: {
    hashtag: ({ hashtagId }, args, context) => context.loaders.hashtag.load(hashtagId),
    user: ({ userId }, args, context) => context.loaders.user.load(userId),
    likedBy: ({ likedBy }, args, context) => context.loaders.user.loadMany(likedBy)
  },
  Query: {
    posts: isAuthenticatedResolver.createResolver((_, { limit, skip }, { auth: { credentials: { id } } }) => PostAPI.get('/posts', {
      params: { limit, skip }
    }).then(({ data }) => {
      const posts = data.map((post) => {
        post.iLike = post.likedBy.includes(id);
        return post;
      });
      return posts;
    })),
  },
  Mutation: {
    createPost: isAuthenticatedResolver.createResolver((_, { text, isPublic }, context) => PostAPI.post('/posts', { text, isPublic, userId: context.auth.credentials.id }).then(({ data }) => data.changes[0].new_val)),
    likePost: isAuthenticatedResolver.createResolver((object, { postId }, context) => PostAPI.patch(`/posts/${postId}/like`, { userId: context.auth.credentials.id }).then(
      ({ data }) => {
        const post = data.changes[0].new_val;
        pubsub.publish(POST_CHANGED_TOPIC, { postChanged: post });
        post.iLike = post.likedBy.includes(context.auth.credentials.id);
        return post;
      })),
    unlikePost: isAuthenticatedResolver.createResolver((object, { postId }, context) => PostAPI.patch(`/posts/${postId}/unlike`, { userId: context.auth.credentials.id }).then(
      ({ data }) => {
        const post = data.changes[0].new_val;
        pubsub.publish(POST_CHANGED_TOPIC, { postChanged: post });
        post.iLike = post.likedBy.includes(context.auth.credentials.id);
        return post;
      })
    ),
  },
  Subscription: {
    postChanged: {
      subscribe: withFilter(() => pubsub.asyncIterator(POST_CHANGED_TOPIC), (payload, variables) => {
        if (payload && payload.postChanged) {
          return !!variables.postIds.includes(payload.postChanged.id);
        }
        return false;
      })
    }
  }
};

export default resolver;
