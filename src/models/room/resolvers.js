import { RoomAPI } from '../../APIs';

const resolver = {
  Room: {

  },
  Query: {
    room(_, { id }, context) {
      return context.loaders.room.load(id);
    },
    rooms() {
      return RoomAPI.get('/rooms').then(result => result.data);
    },
  },
  Mutation: {
    createRoom: (_, args) => RoomAPI.post('/rooms', args).then(result => result.data.changes[0].new_val),
    editRoom: (_, { id, ...args }) => RoomAPI.patch(`/rooms/${id}`, args).then(result => result.data.changes[0].new_val),
    deleteRoom: (_, { id }) => RoomAPI.delete(`/rooms/${id}`).then(() => true)
  }
};

export default resolver;
