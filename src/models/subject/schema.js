import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const SubjectSchema = makeExecutableSchema({
  typeDefs: `
        type Subject {
            id: String
            name: String
        }

        type Query {
            subject(id: String!): Subject
            subjects: [Subject]
        }

        type Mutation {
            createSubject(name: String!): Subject
            editSubject(id: String!, number: Int, floor: Int!): Subject
            deleteSubject(id: String!): Subject
        }

        type Subscription {
            subjectCreated: Subject
        } 
    `,
  resolvers,
  resolverValidationOptions: { requireResolversForAllFields: true }
});

export default SubjectSchema;
