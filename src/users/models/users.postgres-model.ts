import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/postgres';

export const UserModel = sequelize.define('user', {
  _id: { type: DataTypes.UUID, primaryKey: true },
  name: DataTypes.TEXT,
  email: DataTypes.TEXT,
  password: DataTypes.TEXT,
}, {
  createdAt: false,
  updatedAt: false,
});
