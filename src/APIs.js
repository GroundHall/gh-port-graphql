import axios from 'axios';
import env from './env.config';

export const UserAPI = axios.create({
  baseURL: `http://${env.USER_API_HOST}:${env.USER_API_PORT}`
});

export const RoomAPI = axios.create({
  baseURL: `http://${env.ROOM_API_HOST}:${env.ROOM_API_PORT}`
});

export const SubjectAPI = axios.create({
  baseURL: `http://${env.SUBJECT_API_HOST}:${env.SUBJECT_API_PORT}`
});

export const ClassAPI = axios.create({
  baseURL: `http://${env.CLASS_API_HOST}:${env.CLASS_API_PORT}`
});

export const LessonAPI = axios.create({
  baseURL: `http://${env.LESSON_API_HOST}:${env.LESSON_API_PORT}`
});

export const PostAPI = axios.create({
  baseURL: `http://${env.POST_API_HOST}:${env.POST_API_PORT}`
});

export const HashtagAPI = axios.create({
  baseURL: `http://${env.HASHTAG_API_HOST}:${env.HASHTAG_API_PORT}`
});
