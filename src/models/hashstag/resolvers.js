import {
  HashtagAPI
} from '../../APIs';


const resolver = {
  Hashtag: {

  },
  Query: {
    hashtags() {
      return HashtagAPI.get('/hashtags').then(result => result.data);
    },
  }
};

export default resolver;
