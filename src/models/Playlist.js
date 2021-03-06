import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Playlist',
  tableName: 'playlists',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
  },
  relations: {
    user_id: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: true,
      cascade: true,
    },
    songs: {
      target: 'Song',
      type: 'many-to-many',
      joinTable: true,
    },
  },
});
