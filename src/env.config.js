/**
 * This file handles all env variables -
 * this includes type validation with joi
 * and exporting an object with every env var
 */
import Joi from 'joi';

const schema = Joi.object({
  SERVICE_HOST: Joi.string().default('localhost'),
  SERVICE_PORT: Joi.number().default(80),
  NODE_ENV: Joi.string().default('development'),
  CLASS_API_HOST: Joi.string().default('localhost'),
  CLASS_API_PORT: Joi.number().default(8001),
  ROOM_API_HOST: Joi.string().default('localhost'),
  ROOM_API_PORT: Joi.number().default(8002),
  SUBJECT_API_HOST: Joi.string().default('localhost'),
  SUBJECT_API_PORT: Joi.number().default(8003),
  LESSON_API_HOST: Joi.string().default('localhost'),
  LESSON_API_PORT: Joi.number().default(8004),
  USER_API_HOST: Joi.string().default('localhost'),
  USER_API_PORT: Joi.number().default(8005),
  POST_API_HOST: Joi.string().default('localhost'),
  POST_API_PORT: Joi.number().default(8015),
  HASHTAG_API_HOST: Joi.string().default('localhost'),
  HASHTAG_API_PORT: Joi.number().default(8017),
  JWT_KEY: Joi.string().default('!!super_secret_stuff!!'),
}).unknown().required();

const {
  error,
  value: env
} = Joi.validate(process.env, schema);
if (error) throw error;

export default env;
