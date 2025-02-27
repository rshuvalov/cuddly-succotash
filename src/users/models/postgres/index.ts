import { UserModel } from './users.model';
import { FileModel } from './files.model';

UserModel.belongsToMany(FileModel, { through: 'user_file' });
FileModel.belongsToMany(UserModel, { through: 'user_file' });

export * from './users.model';
export * from './files.model';
