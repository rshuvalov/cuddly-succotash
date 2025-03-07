import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../db/postgres';

export const UserModel = sequelize.define('User', {
  _id: { type: DataTypes.UUID, primaryKey: true },
  email: DataTypes.TEXT,
  password: DataTypes.TEXT,
}, {
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
});
