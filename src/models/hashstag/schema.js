import { makeExecutableSchema } from 'graphql-tools';

const HashtagSchema = makeExecutableSchema({
  typeDefs: `
    type Hashtag {
      id: String
      name: String
    }

    type Query {
      hashtags: [Hashtag]
    }
`
});

export default HashtagSchema;
