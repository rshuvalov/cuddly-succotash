import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../db/postgres';

interface UserModelDefenitions extends Model {
  addFile: (file, options?: any) => Promise<void>;
}

export const UserModel = sequelize.define<UserModelDefenitions>('User', {
  _id: { type: DataTypes.UUID, primaryKey: true },
  name: DataTypes.TEXT,
  email: DataTypes.TEXT,
  password: DataTypes.TEXT,
}, {
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
});
