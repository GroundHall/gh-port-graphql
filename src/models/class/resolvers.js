import {
  ClassAPI
} from '../../APIs';

const resolver = {
  Class: {
    // members: ({members}, args, context, info) => {
    //   return context.loaders.user.loadMany(members);
    // }
  },
  Query: {
    class(_, { id }, context) {
      return context.loaders.subject.load(id);
    },
    classes() {
      return ClassAPI.get('/classes').then(result => result.data);
    }
  },
  Mutation: {
    createClass: (_, { graduationYear, members }) => (
      ClassAPI.post('/classes', {
        graduationYear,
        members
      })
    )
  }
};

export default resolver;
