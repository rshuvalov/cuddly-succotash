import { DataTypes } from 'sequelize';
import { sequelize } from '../../../db/postgres';

export const FileModel = sequelize.define('File', {
  _id: { type: DataTypes.UUID, primaryKey: true },
  originalFilename: DataTypes.TEXT,
  newFilename: DataTypes.TEXT,
  path: DataTypes.TEXT,
}, {
  tableName: 'file',
  createdAt: false,
  updatedAt: false,
});

// export const UserFileModel = sequelize.define('UserFile', {}, {
//   tableName: 'user_file',
//   createdAt: false,
//   updatedAt: false,
// });