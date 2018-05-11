import {
  LessonAPI
} from '../../APIs';


const resolver = {
  Lesson: {
    subject: ({ subjectId }, args, context) => context.loaders.subject.load(subjectId)
  },
  Query: {
    lesson(_, { id }, context) {
      return context.loaders.lesson.load(id);
    },
    lessons() {
      return LessonAPI.get('/lessons').then(result => result.data.sort((a, b) => a.index > b.index))
    },
    today(_, { classId }) {
      return classId
        ? LessonAPI.get(`/lessons/today/${classId}`).then(result => result.data)
        : LessonAPI.get('/lessons/today').then(result => result.data.slice().sort((a, b) => a.index - b.index));
    }
  }
};

export default resolver;
