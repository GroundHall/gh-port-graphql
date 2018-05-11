import DataLoader from 'dataloader';
import {
  UserAPI,
  RoomAPI,
  SubjectAPI,
  ClassAPI,
  LessonAPI,
  PostAPI,
  HashtagAPI
} from './APIs';

const userLoader = new DataLoader(
  ids => Promise.all(
    ids.map(id => UserAPI.get(`/users/${id}`)
      .then(result => result.data))
  )
);

const roomLoader = new DataLoader(
  ids => Promise.all(
    ids.map(id => RoomAPI.get(`/rooms/${id}`)
      .then(result => result.data))
  )
);

const classLoader = new DataLoader(
  ids => Promise.all(
    ids.map(id => ClassAPI.get(`/classes/${id}`)
      .then(result => result.data))
  )
);

const subjectLoader = new DataLoader(
  ids => Promise.all(
    ids.map(id => SubjectAPI.get(`/subjects/${id}`)
      .then(result => result.data))
  )
);

const lessonLoader = new DataLoader(
  ids => Promise.all(
    ids.map(id => LessonAPI.get(`/lessons/${id}`)
      .then(result => result.data))
  )
);

const postLoader = new DataLoader(
  ids => Promise.all(
    ids.map(id => PostAPI.get(`/posts/${id}`)
      .then(result => result.data))
  )
);

const hashtagLoader = new DataLoader(
  ids => Promise.all(
    ids.map(id => HashtagAPI.get(`/hashtags/${id}`)
      .then(result => result.data))
  )
);

export default {
  user: userLoader,
  room: roomLoader,
  subject: subjectLoader,
  class: classLoader,
  lesson: lessonLoader,
  post: postLoader,
  hashtag: hashtagLoader
};
