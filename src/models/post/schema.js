import { makeExecutableSchema } from 'graphql-tools';

const PostSchema = makeExecutableSchema({
  typeDefs: `
    type Post {
        id: String
        text: String
        imageURL: String
        likeCount: Int
        iLike: Boolean
        isPublic: Boolean
    }

    type Query {
        posts(limit: Int, skip: Int): [Post]
    }

    type Mutation {
        createPost(
            text: String!
            isPublic: Boolean
        ): Post
        likePost(postId: String!): Post
        unlikePost(postId: String!): Post
    }

    type Subscription {
        postChanged(postIds: [String]): Post
    } 
`
});

export default PostSchema;
