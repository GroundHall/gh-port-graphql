import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const UserSchema = makeExecutableSchema({
  typeDefs: `
        type User { 
            id: String
            firstName: String
            lastName: String
            email: String
            avatarURL: String
            type: String
            friends: [User]
            receivedFriendRequests: [User]
            sendFriendRequests: [User]
        }

        enum UserType {
            student
            teacher
            admin
        }

        type Query {
            user(id: String!): User
            users: [User]
            me: User
        }

        type Mutation {
            authenticate(email: String!, password: String!): String
            register(
                email: String!,
                password: String!,
                firstName: String!,
                lastName: String!,
                type: UserType!
            ): User
            sendFriendRequest(toId: String!): String
            cancelFriendRequest(toID: String!): String
            acceptFriendRequest(fromId: String!): String
        }

        type Subscription {
            userCreated: User
        }
    `,
  resolvers,
  resolverValidationOptions: { requireResolversForAllFields: true }
});

export default UserSchema;
