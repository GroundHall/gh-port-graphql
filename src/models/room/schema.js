import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const RoomSchema = makeExecutableSchema({
  typeDefs: `
        type Room {
            id: String
            number: Int
            floor: Int
        }

        type Query {
            room(id: String!): Room
            rooms: [Room]  
        }

        type Mutation {
            createRoom(number: Int!, floor: Int!): Room
            editRoom(id: String!, number: Int, floor: Int!): Room
            deleteRoom(id: String!): Boolean
        }
    `,
  resolvers,
  resolverValidationOptions: { requireResolversForAllFields: true }
});

export default RoomSchema;
