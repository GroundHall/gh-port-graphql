import { makeExecutableSchema } from 'graphql-tools';

const LessonSchema = makeExecutableSchema({
  typeDefs: `
    type Lesson {
        id: String
        index: Int
        day: String
        timeStart: String
        timeEnd: String
    }

    type Query {
        lesson(id: String!): Lesson
        lessons: [Lesson]
        today(class_id: String): [Lesson]
    }

    type Mutation {
        createLesson(number: Int!, floor: Int!): Lesson
        editLesson(id: String!, number: Int, floor: Int!): Lesson
        deleteLesson(id: String!): Boolean
    }
`
});

export default LessonSchema;
