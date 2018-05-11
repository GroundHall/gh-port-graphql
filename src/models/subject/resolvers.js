import { PubSub } from 'graphql-subscriptions';
import { SubjectAPI } from '../../APIs';

export const pubsub = new PubSub();
const SUBJECT_CREATED_TOPIC = 'SUBJECT_CREATED_TOPIC';

const resolver = {
  Subject: {

  },
  Query: {
    subject(_, { id }, context) {
      return context.loaders.subject.load(id);
    },
    subjects() {
      return SubjectAPI.get('/subjects').then(result => result.data);
    }
  },
  Mutation: {
    createSubject: (_, args) => SubjectAPI.post('/subjects', args).then((result) => {
      pubsub.publish(SUBJECT_CREATED_TOPIC, { subjectCreated: result.data.changes[0].new_val });
      return result.data.changes[0].new_val;
    }),
    editSubject: (_, { id, ...args }) => SubjectAPI.patch(`/subjects/${id}`, args).then(result => result.data.changes[0].new_val || { id, ...args }),
    deleteSubject: (_, { id }) => SubjectAPI.delete(`/subjects/${id}`).then(() => true)
  },
  Subscription: {
    subjectCreated: {
      subscribe: () => pubsub.asyncIterator(SUBJECT_CREATED_TOPIC),
    },
  },
};

export default resolver;
