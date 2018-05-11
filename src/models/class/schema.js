import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const ClassSchema = makeExecutableSchema({
  typeDefs: `
        type Class {
            id: String
            graduationYear: Int
        }

        type Query {
            class(id: String!): Class
            classes: [Class]
        }

        type Mutation {
            createClass(graduationYear: Int!, members: [String]): Class
            addStudent(classId: String!, studentId: String!): Boolean
            removeStudent(classId: String!, studentId: String!): Boolean
            editClass(id: String!, number: Int, floor: Int!): Class
            deleteClass(id: String!): Class
        }
    `,
  resolvers,
  resolverValidationOptions: { requireResolversForAllFields: true }
});

export default ClassSchema;
